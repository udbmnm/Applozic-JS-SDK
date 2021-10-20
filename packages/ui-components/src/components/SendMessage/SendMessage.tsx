import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  Box,
  HStack,
  Textarea,
  VStack,
  useColorModeValue as mode,
  useToast,
  Spacer,
  Square,
  Center
} from '@chakra-ui/react';
import EmojiPopup from '../../components/EmojiPopup';
import useRecorder from '../../hooks/utility/useRecorder';
import { FileMeta } from '@applozic/core-sdk';
import DocDownloadItem, { VARIANTS } from '../DocDownloadItem';
import MapPickerPopup from '../MapPickerPopup';
import { Coords } from '../MapPicker';
import Icon from '../Icon';
import ReactWaves from '@dschoon/react-waves';

export interface SendMessageProps {
  giphyApiKey?: string;
  gMapsApiKey?: string;
  isSending?: boolean;
  attachment?: FileMeta;
  handleSend?: (text: string) => void;
  handleSendFile?: (file: File) => void;
  handleTyping?: (isTyping: boolean) => void;
  onFileSelected?: (file: File) => Promise<FileMeta | undefined>;
  onFileDiscarded?: () => void | Promise<void>;
  onSendLocation?: (location: Coords) => void | Promise<void>;
}

function SendMessage({
  giphyApiKey,
  gMapsApiKey,
  attachment,
  handleSend,
  handleSendFile,
  handleTyping,
  onFileSelected,
  onFileDiscarded,
  onSendLocation
}: SendMessageProps) {
  const [messageText, setMessageText] = useState('');
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);

  const {
    audioFile,
    isRecording,
    recordingError,
    startRecording,
    stopRecording,
    clearRecording,
    clearRecordingError
  } = useRecorder();

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  const toast = useToast();

  useEffect(() => {
    if (recordingError) {
      toast({
        title: 'Permission Error',
        description: 'Please check permissions for using the mic',
        status: 'error',
        duration: 4000,
        variant: 'left-accent',
        position: 'bottom',
        isClosable: true
      });
      clearRecordingError();
    }
  }, [recordingError]);

  const downloadRecording = () => {
    if (audioFile) {
      const audioFileUrl = window.URL.createObjectURL(audioFile.file);
      const tempLink = document.createElement('a');
      tempLink.href = audioFileUrl;
      tempLink.setAttribute('download', 'filename.wav');
      tempLink.click();
    }
  };

  const handleUpload = () => {
    if (onFileSelected && audioFile?.file) {
      onFileSelected(audioFile.file);
    }
    clearRecording();
  };

  const inputFile = useRef<HTMLInputElement>(null);

  // Show file picker on clicking attachmentIcon
  const onButtonClick = () => inputFile?.current && inputFile.current.click();

  const onEmojiSelected = (emoji: string) => {
    setMessageText(`${messageText} ${emoji}`);
  };

  const sendMessage = () => {
    if (audioFile && handleSendFile) {
      handleSendFile(audioFile.file);
      clearRecording();
    } else if (handleSend) {
      if (attachment) {
        // Allow blank message if attachment is provided
        setMessageText('');
        clearRecording();
        handleSend(messageText.trim());
      } else {
        if (messageText.trim().length > 0) {
          setMessageText('');
          clearRecording();
          handleSend(messageText.trim());
        }
      }
    }
  };

  const handleLocationSend = (position: Coords) => {
    if (onSendLocation) {
      onSendLocation(position);
    }
  };

  useEffect(() => {
    if (handleTyping) {
      if (messageText.length > 0) {
        handleTyping(true);
      } else {
        handleTyping(false);
      }
    }
  }, [messageText]);

  const getHourMinutsSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const secondsLeft = Math.ceil(seconds - hours * 3600 - minutes * 60);
    return { hours, minutes, secondsLeft };
  };

  const audioTime = getHourMinutsSeconds(audioFile?.durationSeconds || 0);

  return (
    <VStack
      flex={'0 0 48px'}
      marginRight={12}
      marginLeft={12}
      pt={2}
      spacing={0}
    >
      {/* TODO remove temporary VStack to debug recording */}
      {attachment && (
        <Box
          width="100%"
          padding="10px"
          borderTopRadius="12px"
          bg={mode('sendMessageBg.500', '#373539')}
        >
          <DocDownloadItem
            doc={attachment}
            variant={VARIANTS.DEFAULT}
            icon={
              <Square
                onClick={() => onFileDiscarded && onFileDiscarded()}
                size="20px"
                cursor="pointer"
              >
                <Center h="full" w="full">
                  <Icon
                    color={'textMain.500'}
                    style={{ opacity: 0.7 }}
                    icon={'fill-close'}
                    size={16}
                  />
                </Center>
              </Square>
            }
          />
        </Box>
      )}

      <HStack
        width="100%"
        bg={mode('sendMessageBg.500', '#373539')}
        paddingLeft="20px"
        paddingRight="20px"
        borderTopRadius={attachment ? '0px' : '12px'}
        borderBottomRadius="12px"
        height="40px"
        marginTop={0}
      >
        {audioFile && !isRecording && (
          <>
            <Box onClick={clearRecording} cursor="pointer">
              <Icon
                icon={'delete'}
                size={16}
                style={{ opacity: 0.6 }}
                color={'textMain.400'}
              />
            </Box>

            <Text width="60px" textAlign="right">
              {audioTime.hours > 0 && <>{audioTime.hours}h</>}
              {audioTime.minutes > 0 && <>{audioTime.minutes}m</>}
              {audioTime.secondsLeft > 0 && <>{audioTime.secondsLeft}s</>}
            </Text>
            <Box
              onClick={() => setIsPlayingRecording(!isPlayingRecording)}
              cursor="pointer"
            >
              <Icon
                icon={'play'}
                size={16}
                style={{ opacity: 0.6 }}
                color={'textMain.400'}
              />
            </Box>
            <ReactWaves
              audioFile={audioFile.file}
              style={{ padding: '0' }}
              options={{
                barHeight: 36,
                cursorWidth: 0,
                height: 38,
                hideScrollbar: true,
                progressColor: '#6139C0',
                responsive: true,
                waveColor: '#D1D6DA',
                barWidth: 1
              }}
              volume={1}
              zoom={1}
              playing={isPlayingRecording}
            />
            <Spacer />
          </>
        )}
        {isRecording && (
          <>
            <Box onClick={stopRecording} cursor="pointer">
              <Icon
                icon={'close-1'}
                size={16}
                style={{ opacity: 0.9 }}
                color={'red'}
              />
            </Box>
            <Text color="textMain.400">Recording...</Text>
            <Spacer />
          </>
        )}
        {!audioFile && !isRecording && (
          <>
            <EmojiPopup
              giphyApiKey={giphyApiKey}
              onEmojiSelected={onEmojiSelected}
              onGifSelected={onFileSelected}
            />
            <Textarea
              resize={'none'}
              minHeight="20px"
              overflowY="auto"
              border="0"
              type={'text'}
              value={messageText}
              placeholder="Enter your message"
              onChange={e => {
                setMessageText(e.target.value.toString());
              }}
              onKeyDown={e => {
                //check is keydown is enter
                if (!e.shiftKey && e.key === 'Enter') {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <Box onClick={onButtonClick} cursor="pointer">
              <input
                type="file"
                id="file"
                ref={inputFile}
                value={''}
                style={{ display: 'none' }}
                onChange={e => {
                  if (
                    e.target.files &&
                    e.target.files.length > 0 &&
                    onFileSelected
                  ) {
                    onFileSelected(e.target.files[0]);
                  }
                  if (inputFile?.current) {
                    inputFile.current.value = '';
                  }
                }}
              />
              <Icon icon={'fill-attached'} size={18} color={'textMain.400'} />
            </Box>

            {/* Show map picker if google maps key provided */}
            {gMapsApiKey && (
              <MapPickerPopup
                gMapsApiKey={gMapsApiKey}
                onLocationSelected={handleLocationSend}
              />
            )}
          </>
        )}
        <Box onClick={toggleRecording} cursor="pointer">
          <Icon
            icon={isRecording ? 'fill-mike' : 'mike'}
            size={18}
            color={isRecording ? 'red' : 'textMain.400'}
          />
        </Box>

        {(messageText.length > 0 || audioFile) && (
          <Box onClick={sendMessage} cursor="pointer">
            <Icon icon={'fill-send-1'} size={18} color={'#6139C0'} />
          </Box>
        )}
      </HStack>
    </VStack>
  );
}

export default SendMessage;
