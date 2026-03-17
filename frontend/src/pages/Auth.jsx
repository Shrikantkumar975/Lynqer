import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [captchaRequired, setCaptchaRequired] = useState(false);
    const [captchaToken, setCaptchaToken] = useState("");

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        let result;
        if (isLogin) {
            result = await login(email, password, captchaToken);
        } else {
            result = await register(name, email, password);
        }

        setLoading(false);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.error);
            if (result.captchaRequired) {
                setCaptchaRequired(true);
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-transparent px-4 transition-colors duration-300">
            <div className="w-full max-w-md space-y-8 rounded-3xl bg-white/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/40">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {isLogin ? "Welcome back" : "Create an account"}
                    </h2>
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                        {isLogin
                            ? "Enter your details to sign in"
                            : "Enter your details to get started"}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {!isLogin && (
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="h-12 rounded-xl bg-white/50 dark:bg-black/20 border-white/40 dark:border-zinc-800/50 focus:border-zinc-500"
                            />
                        )}
                        <Input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 rounded-xl bg-white/50 dark:bg-black/20 border-white/40 dark:border-zinc-800/50 focus:border-zinc-500"
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12 rounded-xl bg-white/50 dark:bg-black/20 border-white/40 dark:border-zinc-800/50 focus:border-zinc-500"
                        />
                        {isLogin && captchaRequired && (
                            <div className="space-y-2 mt-4 transition-all duration-300">
                                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                    Please verify you are human
                                </label>
                                <Input
                                    type="text"
                                    placeholder='Type "valid_dummy_captcha"'
                                    value={captchaToken}
                                    onChange={(e) => setCaptchaToken(e.target.value)}
                                    required
                                    className="h-12 rounded-xl bg-white/50 dark:bg-black/20 border-white/40 dark:border-zinc-800/50 focus:border-zinc-500"
                                />
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    This is a simulated CAPTCHA for testing.
                                </p>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="h-12 w-full rounded-xl bg-zinc-900 text-base font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-70 transition-all shadow-md"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : isLogin ? (
                            "Sign in"
                        ) : (
                            "Sign up"
                        )}
                    </Button>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm font-medium text-zinc-900 hover:text-zinc-700 hover:underline dark:text-zinc-100 dark:hover:text-zinc-300"
                    >
                        {isLogin
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
