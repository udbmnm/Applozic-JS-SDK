import { useEffect, useState } from 'react';
import { getReadableMinutes, getReadableHours } from '../../time-utils';
import getBlobDuration from 'get-blob-duration';

interface FormatConfig {
  type: string;
  extension: string;
}

export enum FORMATS {
  OGG = 'ogg',
  WAV = 'wav'
  // MP3 = 'mp3'
}

const FORMAT_CONFIG: { [key: string]: FormatConfig } = {
  [FORMATS.OGG]: {
    type: 'audio/ogg codecs=opus',
    extension: 'ogg'
  },
  [FORMATS.WAV]: {
    type: 'audio/wav',
    extension: 'wav'
  }
  // [FORMATS.MP3]: {
  //   type: 'audio/mpeg',
  //   extension: 'mp3'
  // }
};

interface AudioObject {
  formatConfig: FormatConfig;
  blob: Blob;
  file: File;
  durationSeconds: number;
}

interface IUseRecorder {
  isRecording: boolean;
  audioFile: AudioObject | undefined;
  startRecording: () => void;
  stopRecording: () => void;
  clearRecording: () => void;
  recordingError: Error | undefined;
  clearRecordingError: () => void;
}

const getFileName = (): string => {
  const now = new Date();
  return `Voice Message ${getReadableHours(now)}:${getReadableMinutes(
    now
  )}:${now.getSeconds()} ${now.getDate()}/${
    now.getMonth() + 1
  }/${now.getFullYear()}`;
};

const useRecorder = (
  recordingFormat = FORMAT_CONFIG[FORMATS.WAV]
): IUseRecorder => {
  const [isRecording, setIsRecording] = useState(false);
  const [streamAvailable, setStreamAvailable] = useState(false);
  const [recordingError, setRecordingError] = useState<Error | undefined>();
  const [audioFileObject, setAudioFileObject] = useState<
    AudioObject | undefined
  >();
  const [recorder, setRecorder] = useState<MediaRecorder | undefined>();

  const startRecording = () => {
    if (!recordingError && !isRecording) {
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const clearRecording = () => {
    setAudioFileObject(undefined);
  };

  const clearRecordingError = () => {
    setRecordingError(undefined);
  };

  const requestRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStreamAvailable(true);
      setRecorder(new MediaRecorder(stream));
    } catch (e) {
      setRecordingError(e as any);
      stopRecording();
    }
  };

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (!recorder) {
      if (isRecording) {
        requestRecorder();
      }
      return;
    }

    if (isRecording && !streamAvailable) {
      requestRecorder();
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      // Stop all streams
      recorder.stream.getTracks().forEach(track => track.stop());
      recorder.stop();
      setStreamAvailable(false);
    }

    // Obtain the audio when ready.
    const handleData = (e: BlobEvent) => {
      const audioBlob = new Blob([e.data], {
        type: recordingFormat.type
      });
      const filename = `${getFileName()}.${recordingFormat.extension}`;
      const audioFile = new File([audioBlob], filename, {
        type: recordingFormat.type
      });
      // handleAudioFile({
      //   formatConfig: recordingFormat,
      //   blob: audioBlob,
      //   file: audioFile,
      //   durationSeconds: 0
      // });
      const audioFileDurationInMs = 0;

      const audio = document.createElement('audio');
      audio.src = URL.createObjectURL(audioFile);
      getBlobDuration(audioBlob).then(duration => {
        setAudioFileObject({
          formatConfig: recordingFormat,
          blob: audioBlob,
          file: audioFile,
          durationSeconds: duration
        });
      });
    };

    recorder.addEventListener('dataavailable', handleData);
    return () => recorder.removeEventListener('dataavailable', handleData);
  }, [recorder, isRecording]);

  return {
    audioFile: audioFileObject,
    recordingError,
    isRecording,
    startRecording,
    stopRecording,
    clearRecording,
    clearRecordingError
  };
};

export default useRecorder;
