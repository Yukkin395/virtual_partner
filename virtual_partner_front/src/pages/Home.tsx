import { TextField } from "../components/TextField"
import Live2DModelComponent from "../features/Live2D/components/Live2DModelComponent"
import { mockComments } from "../features/NicoNico/const"
import { NicoNicoView } from "../features/NicoNico/NicoNicoView"
// import { NuvMenuView } from "../features/Nuvigation/NuvMenu/NuvMenuView"
// import { TalkBoxView } from "../features/TalkBox/TalkBoxView"

export const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* <div className="absolute top-0 right-20 m-4 z-50">
        <NuvMenuView />
      </div> */}
      <Live2DModelComponent audioUrl="/hello.wav" />
      {/* <div className="absolute top-0 left-0 m-4">
        <TalkBoxView />
      </div> */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 mb-8 w-full max-w-md z-40">
        <TextField placeholder="テキストを入力してください" />
      </div>
      <div className="absolute inset-0">
        <NicoNicoView Comments={mockComments} />
      </div>
    </div>
  )
}