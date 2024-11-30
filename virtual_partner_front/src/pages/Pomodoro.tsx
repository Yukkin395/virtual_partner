
import { useAtom } from "jotai";
import { Live2DModelComponent } from "../features/Live2D/components/Live2DModelComponent"
import PomodoroTimer from "../features/Pomodoro/components/PomodoroTimer"
import { live2dModelAtom } from "../atoms/modelAtom";

export const Pomodoro = () => {
  const [modelPath] = useAtom(live2dModelAtom);

  return (
    <div className="relative min-h-screen">
      <Live2DModelComponent modelPath={modelPath} />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-40 flex items-center space-x-12">
        <PomodoroTimer />
      </div>
    </div>
  )
}