
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Loader2, ArrowLeft, MonitorSmartphone, Globe, Cpu, Link2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

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
                <Link to="/profile" className="flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Link>

                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Analytics</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                    Stats for <span className="font-mono text-zinc-900 dark:text-white font-bold">{data.shortId}</span> &rarr; {data.longUrl}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/40 dark:bg-zinc-900/40 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50">
                        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Clicks</h3>
                        <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">{data.clicks}</p>
                    </div>
                    <div className="bg-white/40 dark:bg-zinc-900/40 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            <Globe className="h-4 w-4" /> Top Browser
                        </div>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2 truncate">{data.analytics?.byBrowser?.[0]?._id || "N/A"}</p>
                    </div>
                    <div className="bg-white/40 dark:bg-zinc-900/40 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            <Cpu className="h-4 w-4" /> Top OS
                        </div>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2 truncate">{data.analytics?.byOS?.[0]?._id || "N/A"}</p>
                    </div>
                    <div className="bg-white/40 dark:bg-zinc-900/40 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            <MonitorSmartphone className="h-4 w-4" /> Top Device
                        </div>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2 truncate">{data.analytics?.byDevice?.[0]?._id || "N/A"}</p>
                    </div>
                </div>

                {/* Level 2 Visuals */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Timeline Chart */}
                    <div className="lg:col-span-2 bg-white/40 dark:bg-zinc-900/40 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Click Trends</h3>
                        <div className="h-64 w-full">
                            {data.analytics?.clicksByDate && data.analytics.clicksByDate.length > 0 ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={data.analytics.clicksByDate}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.2} vertical={false} />
                                        <XAxis dataKey="_id" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                        <RechartsTooltip 
                                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                                            itemStyle={{ color: '#f4f4f5' }}
                                        />
                                        <Line type="monotone" dataKey="count" name="Clicks" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-zinc-500">
                                    No timeline data available.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Traffic Sources */}
                    <div className="bg-white/40 dark:bg-zinc-900/40 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 flex flex-col">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
                            <Link2 className="h-4 w-4" /> Traffic Sources
                        </h3>
                        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                            {data.analytics?.byReferrer && data.analytics.byReferrer.length > 0 ? (
                                data.analytics.byReferrer.map((ref, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-600 dark:text-zinc-300 truncate max-w-[150px]" title={ref._id}>
                                            {ref._id}
                                        </span>
                                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                                            {ref.count}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-zinc-500 text-center py-4">No sources yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Device & OS Breakdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Device Pie Chart */}
                    <div className="bg-white/40 dark:bg-zinc-900/40 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 flex flex-col">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
                            <MonitorSmartphone className="h-4 w-4" /> Device Breakdown
                        </h3>
                        <div className="flex-1 h-64">
                            {data.analytics?.byDevice && data.analytics.byDevice.length > 0 ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={data.analytics.byDevice}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="count"
                                            nameKey="_id"
                                        >
                                            {data.analytics.byDevice.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'][index % 4]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip 
                                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                                            itemStyle={{ color: '#f4f4f5' }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-zinc-500">
                                    No device data.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Browser Pie Chart */}
                    <div className="bg-white/40 dark:bg-zinc-900/40 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 flex flex-col">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-2">
                            <Globe className="h-4 w-4" /> Browser Breakdown
                        </h3>
                        <div className="flex-1 h-64">
                            {data.analytics?.byBrowser && data.analytics.byBrowser.length > 0 ? (
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={data.analytics.byBrowser}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="count"
                                            nameKey="_id"
                                        >
                                            {data.analytics.byBrowser.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={['#3b82f6', '#f59e0b', '#10b981', '#ef4444'][index % 4]} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip 
                                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                                            itemStyle={{ color: '#f4f4f5' }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-zinc-500">
                                    No browser data.
                                </div>
                            )}
                        </div>
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
                                    <th className="px-6 py-3 font-medium scroll-w-20">Browser / OS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                                {data.analytics && data.analytics.recentActivity && data.analytics.recentActivity.map((entry, i) => (
                                    <tr key={i} className="hover:bg-white/50 dark:hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4 text-zinc-900 dark:text-zinc-100">
                                            {new Date(entry.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 font-mono text-xs">
                                            {entry.ip || "Unknown"}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400 max-w-xs truncate" title={entry.userAgent}>
                                            {entry.browser ? `${entry.browser} on ${entry.os}` : (entry.userAgent || "Unknown")}
                                        </td>
                                    </tr>
                                ))}
                                {(!data.analytics || !data.analytics.recentActivity || data.analytics.recentActivity.length === 0) && (
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
