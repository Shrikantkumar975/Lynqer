import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link as LinkIcon, QrCode, KeyRound, BarChart2, ArrowRight, Shield, Zap, Globe, MousePointer2 } from "lucide-react";

export default function Home() {
    const [heroUrl, setHeroUrl] = useState("");
    const navigate = useNavigate();

    const handleHeroSubmit = (e) => {
        e.preventDefault();
        if (heroUrl) {
            navigate(`/shortener?url=${encodeURIComponent(heroUrl)}`);
        }
    };
    return (
        <div className="min-h-screen bg-transparent transition-colors duration-300 relative">
            <Navbar />

            <main className="container mx-auto max-w-6xl px-8 pt-32 pb-16 relative z-10">
                {/* Hero Section */}
                <div className="relative text-center py-20 mb-20">
                    {/* Floating Decorative Elements */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-40 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
                    
                    <div className="relative z-10 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-zinc-800 dark:text-zinc-200 text-sm font-medium mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <Zap className="h-3.5 w-3.5 text-amber-500" />
                            <span>New: Advanced Analytics Dashboard</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                            Shorten. Secure. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Analyze.</span>
                        </h1>
                        
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            The all-in-one productivity toolkit. Shorten links, generate QR codes, and secure your digital life with a powerful dashboard.
                        </p>

                        {/* Interactive Hero Input */}
                        <form 
                            onSubmit={handleHeroSubmit}
                            className="max-w-2xl mx-auto p-2 rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row gap-2 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500"
                        >
                            <div className="flex-1 relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                                <Input 
                                    placeholder="Paste your long link here..."
                                    value={heroUrl}
                                    onChange={(e) => setHeroUrl(e.target.value)}
                                    className="h-12 pl-12 bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-zinc-400"
                                />
                            </div>
                            <Button type="submit" size="lg" className="h-12 px-8 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 font-bold transition-all shrink-0">
                                Shorten Now
                            </Button>
                        </form>

                        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <Shield className="h-4 w-4 text-emerald-500" />
                                Secure & Encrypted
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <BarChart2 className="h-4 w-4 text-blue-500" />
                                Real-time Analytics
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <Globe className="h-4 w-4 text-purple-500" />
                                Global Reach
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="py-20 border-y border-zinc-200/50 dark:border-zinc-800/50 mb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">How it works</h2>
                        <p className="mt-4 text-zinc-500 dark:text-zinc-400">Simplify your digital workflow in three easy steps.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center space-y-4">
                            <div className="mx-auto h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 font-bold text-xl shadow-inner">
                                1
                            </div>
                            <h4 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Create & Secure</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Shorten long links or generate unhackable passwords in seconds.</p>
                        </div>
                        
                        <div className="text-center space-y-4">
                            <div className="mx-auto h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 font-bold text-xl shadow-inner">
                                2
                            </div>
                            <h4 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Manage in Vault</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Save your links and passwords securely in your personalized vault.</p>
                        </div>
                        
                        <div className="text-center space-y-4">
                            <div className="mx-auto h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100 font-bold text-xl shadow-inner">
                                3
                            </div>
                            <h4 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Analyze & Scale</h4>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Track real-time performance with detailed analytics dashboards.</p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Explore Features</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
                    {/* URL Shortener */}
                    <div className="group relative p-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-zinc-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                        <div className="h-12 w-12 rounded-2xl bg-white/50 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-zinc-700 dark:text-zinc-300 flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
                            <LinkIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">URL Shortener</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                            Turn long, ugly text into short, memorable links. Track clicks and analytics in real-time.
                        </p>
                        <Link to="/shortener">
                            <Button variant="ghost" className="group/btn p-0 hover:bg-transparent text-zinc-800 dark:text-zinc-200">
                                Shorten Link <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                        </Link>
                    </div>

                    {/* QR Generator */}
                    <div className="group relative p-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-zinc-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-100/50 dark:bg-emerald-900/20 backdrop-blur-md border border-emerald-200/50 dark:border-emerald-800/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-6 transition-transform group-hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                            <QrCode className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">QR Generator</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                            Create customizable QR codes for links, text, WiFi, and contacts instantly.
                        </p>
                        <Link to="/qr">
                            <Button variant="ghost" className="group/btn p-0 hover:bg-transparent text-emerald-700 dark:text-emerald-400">
                                Generate QR <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                        </Link>
                    </div>

                    {/* Password Generator */}
                    <div className="group relative p-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-zinc-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                        <div className="h-12 w-12 rounded-2xl bg-orange-100/50 dark:bg-orange-900/20 backdrop-blur-md border border-orange-200/50 dark:border-orange-800/30 text-orange-700 dark:text-orange-400 flex items-center justify-center mb-6 transition-transform group-hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                            <KeyRound className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">Password Generator</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                            Generate strong, secure passwords with custom requirements to stay safe online.
                        </p>
                        <Link to="/password">
                            <Button variant="ghost" className="group/btn p-0 hover:bg-transparent text-orange-700 dark:text-orange-400">
                                Create Password <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                        </Link>
                    </div>

                    {/* Analytics */}
                    <div className="group relative p-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-zinc-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                        <div className="h-12 w-12 rounded-2xl bg-blue-100/50 dark:bg-blue-900/20 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/30 text-blue-700 dark:text-blue-400 flex items-center justify-center mb-6 transition-transform group-hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                            <BarChart2 className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">Analytics Dashboard</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                            Monitor the performance of your links. See total clicks, visitor data, and trends.
                        </p>
                        <Link to="/profile">
                            <Button variant="ghost" className="group/btn p-0 hover:bg-transparent text-blue-700 dark:text-blue-400">
                                View Dashboard <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Final CTA Banner */}
                <div className="mt-20 p-8 md:p-16 rounded-[2.5rem] relative overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl">
                    {/* Vibrant Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700" />
                    
                    {/* Animated Glow Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/40 rounded-full mix-blend-overlay blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/40 rounded-full mix-blend-overlay blur-3xl animate-pulse delay-1000" />
                    
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                    
                    <div className="relative z-10 space-y-8 text-center">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-sm">
                            Ready to supercharge <br className="hidden md:block" /> your productivity?
                        </h2>
                        <p className="text-blue-100/90 max-w-xl mx-auto text-lg md:text-xl font-medium">
                            Join thousands of users who trust Lynqer for their link management and security needs.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                            <Link to="/auth">
                                <Button size="lg" className="h-14 px-8 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 hover:scale-105 font-bold transition-all text-base shadow-[0_0_20px_rgba(255,255,255,0.3)] border-none">
                                    Get Started Free
                                </Button>
                            </Link>
                            <Link to="/shortener">
                                <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 font-bold transition-all text-base backdrop-blur-md">
                                    Try Shortener
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
