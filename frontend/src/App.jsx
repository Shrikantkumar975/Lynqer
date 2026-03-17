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
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 relative overflow-hidden">
        {/* Background animated blobs for glassmorphism effect */}
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-400 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-400 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-400 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
        
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
      </div>
    </AuthProvider>
  );
}

export default App;