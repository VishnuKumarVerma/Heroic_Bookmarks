import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CharacterPage from "./components/CharacterPage";
import NotFound from "./pages/NotFound";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AuthProvider from "./context/AuthContext";
import CardRevealAnimation from "./components/CardRevealAnimation";
import Profile from "./components/Profile";
import GamePage from "./pages/GamePage";
import Collections from "./pages/Collections";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:code" element={<CharacterPage />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/character" element={<CharacterPage />} />
        <Route path="/reveal" element={<CardRevealAnimation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/game/:code" element={<GamePage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
