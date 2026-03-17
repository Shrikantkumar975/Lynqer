import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Copy, BarChart2, Calendar, MousePointer2, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

export default function Profile() {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { token, user } = useAuth();
    const [selectedUrl, setSelectedUrl] = useState(null);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);

    useEffect(() => {
        fetchUrls();
    }, [token]);

    const fetchUrls = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/urls`, config);
            setUrls(response.data);
        } catch (err) {
            setError("Failed to fetch URLs");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAnalytics = async (shortId) => {
        setAnalyticsLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/urls/analytics/${shortId}`, config);
            setAnalyticsData(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setAnalyticsLoading(false);
        }
    };

    const copyToClipboard = (shortId) => {
        const url = `${import.meta.env.VITE_API_URL}/${shortId}`;
        navigator.clipboard.writeText(url);
        // Could add toast here
        alert("Copied!");
    };

    const openAnalytics = (url) => {
        setSelectedUrl(url);
        fetchAnalytics(url.shortId);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this link?")) return;

        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/urls/${id}`, config);
            setUrls(urls.filter((url) => url._id !== id));
        } catch (err) {
            console.error("Failed to delete URL", err);
            alert("Failed to delete URL");
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-transparent transition-colors duration-300">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-900 dark:border-white border-t-transparent dark:border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto max-w-5xl px-8 py-8 pt-24">

                {/* Profile Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">My URLs</h1>
                        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                            Manage your links and view their performance
                        </p>
                    </div>
                    <div className="rounded-xl bg-white/40 px-4 py-2 text-zinc-900 dark:bg-white/10 dark:text-zinc-100 backdrop-blur-md border border-white/50 dark:border-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                        <span className="font-semibold">{urls.length}</span> Links Created
                    </div>
                </div>

                {/* URL Grid */}
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {urls.map((url) => (
                        <div
                            key={url._id}
                            className="group relative flex flex-col justify-between rounded-2xl bg-white/40 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/40 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        {url.ogImage ? <img src={url.ogImage} className="h-8 w-8 rounded object-cover" /> : <div className="h-8 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />}
                                        <a
                                            href={`${import.meta.env.VITE_API_URL}/${url.shortId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-lg font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
                                        >
                                            /{url.shortId}
                                        </a>
                                    </div>

                                    <span className="text-xs text-zinc-400">
                                        {new Date(url.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="mt-3 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400" title={url.longUrl}>
                                    {url.longUrl}
                                </p>
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                                <div className="flex items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                                    <div className="flex items-center gap-1.5">
                                        <MousePointer2 className="h-4 w-4" />
                                        {url.clicks}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(url.shortId)}
                                        className="h-8 px-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDelete(url._id)}
                                        className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                className="h-8 bg-zinc-900 text-xs text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                                                onClick={() => openAnalytics(url)}
                                            >
                                                <BarChart2 className="mr-1.5 h-3.5 w-3.5" />
                                                Analytics
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Link Analytics</DialogTitle>
                                                <DialogDescription>
                                                    View detailed performance metrics for your short link.
                                                </DialogDescription>
                                            </DialogHeader>
                                            {analyticsLoading ? (
                                                <div className="flex justify-center p-8">
                                                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-900 dark:border-white border-t-transparent dark:border-t-transparent" />
                                                </div>
                                            ) : analyticsData ? (
                                                <div className="space-y-6">
                                                    <div className="rounded-xl bg-zinc-100/50 p-4 dark:bg-zinc-800/50 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-700/50">
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                                                                {analyticsData.clicks}
                                                            </span>
                                                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                                                Total Clicks
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Recent Activity</h4>
                                                        <div className="max-h-[200px] overflow-y-auto space-y-3 pr-2">
                                                            {analyticsData.analytics && analyticsData.analytics.length > 0 ? (
                                                                analyticsData.analytics.slice().reverse().map((entry, i) => (
                                                                    <div key={i} className="flex items-center justify-between text-sm">
                                                                        <span className="text-zinc-600 dark:text-zinc-400">
                                                                            {new Date(entry.timestamp).toLocaleString()}
                                                                        </span>
                                                                        {/* <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                                                            {entry.ip || 'Unknown IP'}
                                                                        </span> */}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p className="text-sm text-zinc-500">No recent activity</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p>Failed to load data</p>
                                            )}
                                        </DialogContent>
                                    </Dialog>

                                </div>
                            </div>
                        </div>
                    ))}

                    {urls.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                                <LinkIcon className="h-8 w-8 text-zinc-400" />
                            </div>
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">No links yet</h3>
                            <p className="mt-1 text-zinc-500 dark:text-zinc-400">Create your first short link to get started</p>
                            <Button className="mt-6" onClick={() => window.location.href = '/'}>
                                Create Link
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function LinkIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    )
}
