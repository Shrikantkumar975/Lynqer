
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Loader2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

function Analytics() {
    const { shortId } = useParams();
    const { token } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/urls/analytics/${shortId}`, config);
                setData(response.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to load analytics");
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [shortId, token]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-transparent transition-colors duration-300">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-900 dark:text-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-transparent transition-colors duration-300">
                <p className="text-red-600">{error}</p>
                <Link to="/" className="mt-4 text-zinc-900 hover:underline dark:text-white">Go Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto px-4 py-8 mt-16">
                <Link to="/" className="flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Link>

                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Analytics</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                    Stats for <span className="font-mono text-zinc-900 dark:text-white font-bold">{data.shortId}</span> &rarr; {data.longUrl}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/40 dark:bg-zinc-900/40 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50">
                        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Clicks</h3>
                        <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">{data.clicks}</p>
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white/40 dark:bg-zinc-900/40 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Recent Activity</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-white/50 dark:bg-black/20 text-zinc-600 dark:text-zinc-400 border-b border-zinc-200/50 dark:border-zinc-800/50">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Time</th>
                                    <th className="px-6 py-3 font-medium">IP Address</th>
                                    <th className="px-6 py-3 font-medium">User Agent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                                {data.analytics && data.analytics.slice().reverse().map((entry, i) => (
                                    <tr key={i} className="hover:bg-white/50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4 text-zinc-900 dark:text-zinc-100">
                                            {new Date(entry.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 font-mono text-xs">
                                            {entry.ip || "Unknown"}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 max-w-xs truncate" title={entry.userAgent}>
                                            {entry.userAgent || "Unknown"}
                                        </td>
                                    </tr>
                                ))}
                                {(!data.analytics || data.analytics.length === 0) && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-8 text-center text-zinc-500">
                                            No clicks yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
