import { useEffect, useState } from "react"

export const useAudioAnalyzer = (audioUrl: string) => {
  const [audioContext] = useState(() =>new (window.AudioContext || window.AudioContext)());
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    const analyzerNode = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    analyzerNode.fftSize = 2048;
    source.connect(analyzerNode);
    analyzerNode.connect(audioContext.destination);

    setAnalyzer(analyzerNode);
    setAudioElement(audio);

    return() => {
      source.disconnect();
      analyzerNode.disconnect();
      audio.pause();
    };
  }, [audioUrl, audioContext]);

  const playAudio = () => {
    if (audioElement &&  audioContext.state === "suspended") {
      audioContext.resume();
    }
    audioElement?.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioElement?.pause();
    setIsPlaying(false);
  };

  return { analyzer, playAudio, pauseAudio, isPlaying };
}