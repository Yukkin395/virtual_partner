import { TextField } from "../components/TextField"
import Live2DModelComponent from "../features/Live2D/components/Live2DModelComponent"
import { NiconicoView } from "../features/Niconico/NiconicoView"
import { TalkBoxView } from "../features/TalkBox/TalkBoxView"

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <Live2DModelComponent audioUrl="/hello.wav" />
      <div className="absolute top-0 left-0 m-4">
        <TalkBoxView />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 w-full max-w-md">
        <TextField placeholder="テキストを入力してください" />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <NiconicoView />
      </div>
    </div>
  )
}

export default Home