import { TextField } from "../components/TextField";
import { BackgroundSelector } from "../features/BackgroundSelector";
import { Live2DModelComponent } from "../features/Live2D/components/Live2DModelComponent";
import { ModelSelector } from "../features/Live2D/components/ModelSelector";
import { mockComments } from "../features/NicoNico/const";
import { NicoNicoView } from "../features/NicoNico/NicoNicoView";
import { useAtom } from "jotai";
import { live2dModelAtom } from "../atoms/modelAtom";
// import { NuvMenuView } from "../features/Nuvigation/NuvMenu/NuvMenuView"
// import { TalkBoxView } from "../features/TalkBox/TalkBoxView"

export const Home = () => {
  const [modelPath] = useAtom(live2dModelAtom);

  return (
    <div className="relative min-h-screen">
      {/* <div className="absolute top-0 right-20 m-4 z-50">
        <NuvMenuView />
      </div> */}
      <Live2DModelComponent modelPath={modelPath} />
      {/* <div className="absolute top-0 left-0 m-4">
        <TalkBoxView />
      </div> */}

      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-full max-w-md z-40 flex items-center space-x-12">
        <BackgroundSelector />
        <ModelSelector />
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-8 w-full max-w-md z-40">
        <TextField placeholder="テキストを入力してください" />
      </div>
      <div className="absolute inset-0">
        <NicoNicoView Comments={mockComments} />
      </div>
    </div>
  );
};
