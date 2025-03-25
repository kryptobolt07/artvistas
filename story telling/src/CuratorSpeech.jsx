import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const CuratorSpeech = ({ text }) => {
  const { speak, voices } = useSpeechSynthesis();

  const handleSpeak = () => {
    // Check if voices are available
    if (voices.length > 0) {
      speak({ text: text, voice: voices[0] });
    } else {
      alert("No available voices on your device.");
    }
  };

  return (
    <div>
      <img
        src="public/AI.png"
        alt="Virtual Curator"
        style={{ width: "200px", height: "auto" }}
      />
      <button
        onClick={handleSpeak}
        className="p-2 bg-blue-500 text-white rounded mt-2"
      >
        Speak
      </button>
    </div>
  );
};

export default CuratorSpeech;
