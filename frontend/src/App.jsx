import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import AuthPage from "@/pages/Auth";
import QrGenerator from "@/pages/QrGenerator";
import PasswordGenerator from "@/pages/PasswordGenerator";
import Profile from "@/pages/Profile";
import Analytics from "@/pages/Analytics";
import Home from "@/pages/Home";
import UrlShortener from "@/pages/UrlShortener";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shortener" element={<UrlShortener />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/qr" element={<QrGenerator />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<PasswordGenerator />} />
          <Route path="/analytics/:shortId" element={<Analytics />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;