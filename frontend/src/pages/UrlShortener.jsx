import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Link as LinkIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";

export default function UrlShortener() {
    const [longUrl, setLongUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [expiresAt, setExpiresAt] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        // Adjust for local timezone to match datetime-local input requirement
        return new Date(tomorrow.getTime() - (tomorrow.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    });
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const { token } = useAuth();

    const handleShorten = async (e) => {
        e.preventDefault();
        setError("");
        setShortUrl("");

        if (!longUrl) return;

        setLoading(true);
        try {
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/urls/shorten`, {
                longUrl,
                customAlias: customAlias.trim() || undefined,
                expiresAt: expiresAt || undefined,
            }, config);
            setShortUrl(response.data.shortUrl);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
        alert("Copied to clipboard!");
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-8 transition-colors duration-300">
            <Navbar />

            <div className="w-full max-w-md space-y-8 mt-20">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-zinc-800 dark:text-zinc-200 transition-transform hover:scale-105">
                        <LinkIcon className="h-7 w-7" />
                    </div>
                    <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Shorten Link
                    </h1>
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                        Paste your URL to create a short link
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl bg-white/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/40 transition-all">
                    <form className="space-y-5" onSubmit={handleShorten}>
                        <div className="space-y-2">
                            <Input
                                type="url"
                                placeholder="https://example.com"
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                required
                                className="h-12 rounded-xl bg-white/50 dark:bg-black/20 border-white/40 dark:border-zinc-800/50 focus:border-zinc-500 focus:bg-white/80 dark:focus:bg-black/40 px-4 text-base transition-all dark:text-zinc-100 dark:placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Input
                                type="text"
                                placeholder={token ? "Custom Alias (Optional)" : "Login to use Custom Alias"}
                                value={customAlias}
                                onChange={(e) => setCustomAlias(e.target.value)}
                                disabled={!token}
                                className="h-12 rounded-xl bg-white/50 dark:bg-black/20 border-white/40 dark:border-zinc-800/50 focus:border-zinc-500 focus:bg-white/80 dark:focus:bg-black/40 px-4 text-base transition-all dark:text-zinc-100 dark:placeholder:text-zinc-500 disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                                Expiration Date {token ? "(Optional)" : "(Login required)"}
                            </label>
                            <Input
                                type="datetime-local"
                                value={expiresAt}
                                onChange={(e) => setExpiresAt(e.target.value)}
                                disabled={!token}
                                style={(theme === "dark") ? { colorScheme: "dark" } : { colorScheme: "light" }}
                                className="h-12 rounded-xl bg-white/50 dark:bg-black/20 border-white/40 dark:border-zinc-800/50 focus:border-zinc-500 focus:bg-white/80 dark:focus:bg-black/40 px-4 text-base transition-all dark:text-zinc-100 dark:placeholder:text-zinc-500 disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                            {!token && (
                                <p className="text-xs text-zinc-500 ml-1">Guest links expire in 10 days.</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-zinc-900 text-base font-semibold text-white shadow-md transition-all hover:bg-zinc-800 disabled:opacity-70 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Processing
                                </>
                            ) : (
                                "Shorten URL"
                            )}
                        </Button>
                    </form>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Result */}
                    {shortUrl && (
                        <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="group relative flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-1 pr-1 dark:border-zinc-800 dark:bg-zinc-950">
                                <a
                                    href={shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate px-4 text-base font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                                >
                                    {shortUrl}
                                </a>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={copyToClipboard}
                                    className="h-10 w-10 rounded-lg text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                                >
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </div>
                            <p className="mt-2 text-center text-xs font-medium text-zinc-400 dark:text-zinc-500">
                                Click to copy
                            </p>

                            {token && (
                                <div className="mt-4 text-center">
                                    <Link to={`/analytics/${shortUrl.split('/').pop()}`} className="text-sm font-medium text-zinc-800 hover:underline dark:text-zinc-300">
                                        View Analytics
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
