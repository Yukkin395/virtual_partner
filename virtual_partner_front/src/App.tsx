import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "regenerator-runtime";
import "./App.css";
import { Home } from "./pages/Home";
import { Memory } from "./pages/Memory";
import { Profile } from "./pages/Profile";
import { Development } from "./pages/Development";
import { Loading } from "./components/Loading";
import { Footer } from "./features/Nuvigation/Footer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Pomodoro } from "./pages/Pomodoro";
import { LoginPage } from "./pages/LoginPage";
import { useAtom } from "jotai";
import { userAtom } from "./atoms/userAtom";
import { useFirebase } from "./hooks/useFirebase";
import { useEffect, useState } from "react";
import { CreateProfile } from "./pages/CreateProfile";

const AppContent = () => {
  const location = useLocation();
  const [user] = useAtom(userAtom);
  const { isLoading, checkUserProfile } = useFirebase();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        try {
          const exists = await checkUserProfile(user.uid);
          setHasProfile(exists);
        } catch (error) {
          console.error("プロフィールチェックエラー:", error);
          setHasProfile(false);
        }
      } else {
        setHasProfile(null);
      }
    };

    // クエリパラメータでプロフィール作成完了を検知
    if (location.search.includes("profile=created")) {
      setHasProfile(true);
    } else {
      checkProfile();
    }
  }, [user, checkUserProfile, location.search]);

  // プロフィール作成ページへのアクセス制御
  if (user && hasProfile && location.pathname === "/create-profile") {
    return <Navigate to="/" replace />;
  }

  // ログイン状態とプロフィールのチェック中
  if (isLoading || (user && hasProfile === null)) {
    return <Loading />;
  }

  // プロフィール作成ページへのリダイレクト
  if (user && hasProfile === false && location.pathname !== "/create-profile") {
    return <Navigate to="/create-profile" replace />;
  }

  // ログインページでは Footer を表示しない
  const showFooter = user && location.pathname !== "/login";

  return (
    <>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          <Routes location={location}>
            <Route
              path="/"
              element={
                user ? <Home /> : <Navigate to="/login" replace={true} />
              }
            />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route
              path="/memory"
              element={user ? <Memory /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/pomodoro"
              element={user ? <Pomodoro /> : <Navigate to="/login" />}
            />
            <Route
              path="/development"
              element={user ? <Development /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      {showFooter && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-8 w-full max-w-md z-40">
          <Footer />
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

export default App;
