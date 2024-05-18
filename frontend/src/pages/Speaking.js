import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export const SpeakingPage = () => {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.ondataavailable = (e) => {
      setAudioChunks([...audioChunks, e.data]);
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const saveAudio = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
    const formData = new FormData();
    formData.append('audio', audioBlob);

    // Отправить formData на сервер, используя fetch или другие методы

    // Пример с использованием fetch:
    // fetch('URL_сервера', {
    //   method: 'POST',
    //   body: formData,
    // });
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={saveAudio} disabled={!audioChunks.length}>
        Save Audio
      </button>
      <ReactAudioPlayer
      src={URL.createObjectURL(new Blob(audioChunks, { type: 'audio/mp3' }))}
      controls
      /> 
      {/*  {audioChunks.length > 0 && <AudioPlayer audioUrl={URL.createObjectURL(new Blob(audioChunks, { type: 'audio/mp3' }))} />} */}
    </div>
  );
};