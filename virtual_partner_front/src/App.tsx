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
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import { Footer } from "./features/Nuvigation/Footer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Pomodoro } from "./pages/Pomodoro";
import { LoginPage } from "./pages/LoginPage";
import { useAtom } from "jotai";
import { userAtom } from "./atoms/userAtom";

const AppContent = () => {
  const location = useLocation();
  const [user] = useAtom(userAtom);

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <Routes location={location}>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
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
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  // ローディング状態の管理
  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div
      className={`transition-opacity duration-1000 ${
        loading ? "opacity-0" : "opacity-100"
      }`}
    >
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <div className="relative min-h-screen">
            <AppContent />
            {location.pathname !== "/login" && (
              <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-8 w-full max-w-md z-40">
                <Footer />
              </div>
            )}
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
