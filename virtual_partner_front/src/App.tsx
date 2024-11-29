import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
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

const AppContent = () => {
  const location = useLocation();
  const [user] = useAtom(userAtom);
  const { isLoading } = useFirebase();

  if (isLoading) {
    return <Loading />;
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
