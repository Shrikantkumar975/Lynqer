import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, KeyRound, Check } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function PasswordGenerator() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        let charset = "";
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) charset += "0123456789";
        if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (charset === "") {
            setPassword("");
            return;
        }

        let newPassword = "";
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
        setCopied(false);
    };

    useEffect(() => {
        generatePassword();
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    const copyToClipboard = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4 transition-colors duration-300">
            <Navbar />

            <div className="w-full max-w-md space-y-8 mt-20">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-zinc-800 dark:text-zinc-200 transition-transform hover:scale-105">
                        <KeyRound className="h-7 w-7" />
                    </div>
                    <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Password Generator
                    </h1>
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                        Create secure, random passwords instantly
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl bg-white/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/40 transition-all">
                    <div className="space-y-6">

                        {/* Password Display */}
                        <div className="relative">
                            <div className="flex h-14 w-full items-center justify-between rounded-xl bg-white/50 dark:bg-black/20 border border-white/40 dark:border-zinc-800/50 px-4 text-lg font-mono font-medium text-zinc-900 dark:text-zinc-100 backdrop-blur-sm">
                                <span className="truncate mr-2">{password || "Select options"}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={generatePassword}
                                        className="p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                                        title="Regenerate"
                                    >
                                        <RefreshCw className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={copyToClipboard}
                                        className={`p-2 transition-colors ${copied ? "text-green-500" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"}`}
                                        title="Copy"
                                    >
                                        {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="space-y-4">
                            {/* Length Slider */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    <label>Password Length</label>
                                    <span className="text-zinc-900 font-bold dark:text-zinc-100">{length}</span>
                                </div>
                                <input
                                    type="range"
                                    min="4"
                                    max="32"
                                    value={length}
                                    onChange={(e) => setLength(parseInt(e.target.value))}
                                    className="w-full h-2 bg-white/60 rounded-lg appearance-none cursor-pointer dark:bg-zinc-800 accent-zinc-900 dark:accent-white backdrop-blur-sm"
                                />
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeUppercase}
                                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                                        className="w-5 h-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-white dark:text-white"
                                    />
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Uppercase</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeLowercase}
                                        onChange={(e) => setIncludeLowercase(e.target.checked)}
                                        className="w-5 h-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-white dark:text-white"
                                    />
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Lowercase</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeNumbers}
                                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                                        className="w-5 h-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-white dark:text-white"
                                    />
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Numbers</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={includeSymbols}
                                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                                        className="w-5 h-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-white dark:text-white"
                                    />
                                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Symbols</span>
                                </label>
                            </div>
                        </div>

                        <Button
                            onClick={copyToClipboard}
                            className="h-12 w-full rounded-xl bg-zinc-900 text-base font-semibold text-white shadow-md transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            {copied ? "Copied!" : "Copy Password"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
