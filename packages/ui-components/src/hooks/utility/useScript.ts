import { useState, useEffect } from "react";

// Hook
interface ScriptPromiseMap {
  [key: string]: Promise<HTMLScriptElement> | undefined;
}

const scriptPromiseMap: ScriptPromiseMap = {};

const useScript = (src: string) => {
  // Keeping track of script loaded and error state

  const [state, setState] = useState({
    loading: true,
    loaded: false,
    error: false,
  });

  useEffect(() => {
    // Create script
    let scriptLoadPromise: Promise<HTMLScriptElement> | undefined;
    if (scriptPromiseMap[src]) {
      scriptLoadPromise = scriptPromiseMap[src];
    } else {
      scriptLoadPromise = scriptPromiseMap[src] = new Promise(
        (resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          script.onload = () => {
            resolve(script);
          };
          script.onerror = () => {
            reject(new Error(`Script load error for ${src}`));
          };
          document.body.appendChild(script);
        }
      );
    }
    if (scriptLoadPromise) {
      scriptLoadPromise
        .then(() => {
          setState({
            loading: false,
            loaded: true,
            error: false,
          });
        })
        .catch(() => {
          setState({
            loading: false,
            loaded: true,
            error: true,
          });

          delete scriptPromiseMap[src]; // Allow try loading again
        });
    }
  }, [src]); // Only re-run effect if script src changes

  return [state.loading, state.loaded, state.error];
};

export default useScript;
