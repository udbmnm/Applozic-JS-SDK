import {
  useState,
  useCallback,
  useLayoutEffect,
  LegacyRef,
  useRef,
  RefObject
} from 'react';

const debounce = (
  limit: number | undefined,
  callback: { (): number; (args_0: any[]): void }
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, limit, args);
  };
};

interface Dimensions {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}

function getDimensionObject(node: HTMLDivElement): Dimensions {
  const rect = node.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    x: rect.x,
    y: rect.y,
    right: rect.right,
    bottom: rect.bottom
  };
}

export default function useBoundingRect(limit?: number) {
  const [dimensions, setDimensions] = useState<Dimensions>();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if ('undefined' !== typeof window && node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject(node))
        );
      measure();

      const listener = debounce(limit ? limit : 100, measure);

      window.addEventListener('resize', listener);
      window.addEventListener('scroll', listener);
      return () => {
        window.removeEventListener('resize', listener);
        window.removeEventListener('scroll', listener);
      };
    }
  }, [ref, limit]);

  return { ref, dimensions };
}
