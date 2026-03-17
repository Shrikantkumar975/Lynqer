import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, QrCode, KeyRound, BarChart2, ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-transparent transition-colors duration-300 relative">
            <Navbar />

            <main className="container mx-auto max-w-6xl px-8 pt-32 pb-16 relative z-10">
                {/* Hero Section */}
                <div className="text-center py-20 space-y-6 mb-20 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-zinc-800 dark:text-zinc-200 text-sm font-medium mb-4">
                        <span>New: Password Generator Added</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white pb-2 drop-shadow-sm">
                        Lynqer
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Your all-in-one toolkit for productivity. Shorten links, generate QR codes, create secure passwords, and track analytics.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link to="/shortener">
                            <Button size="lg" className="rounded-full bg-white/30 hover:bg-white/40 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-white/40 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-zinc-900 dark:text-white h-12 px-8 text-base transition-all">
                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="/profile">
                            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base bg-white/10 hover:bg-white/20 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 transition-all">
                                My Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
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
            </main>
        </div>
    );
}
