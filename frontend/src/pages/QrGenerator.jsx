import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, QrCode } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function QrGenerator() {
    const [text, setText] = useState("");
    const svgRef = useRef(null);

    const handleDownload = () => {
        const svg = svgRef.current;
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "qrcode.png";
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-transparent px-4 transition-colors duration-300">
            <Navbar />

            <div className="w-full max-w-md space-y-8 mt-20">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] text-zinc-800 dark:text-zinc-200 transition-transform hover:scale-105">
                        <QrCode className="h-7 w-7" />
                    </div>
                    <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        QR Code Generator
                    </h1>
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                        Enter text or URL to generate a QR code
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-3xl bg-white/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/40 transition-all">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                placeholder="https://example.com or UPI ID"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="h-12 rounded-xl bg-white/50 dark:bg-black/20 border-white/40 dark:border-zinc-800/50 focus:border-zinc-500 focus:bg-white/80 dark:focus:bg-black/40 px-4 text-base transition-all dark:text-zinc-100 dark:placeholder:text-zinc-500"
                            />
                        </div>

                        {/* QR Display */}
                        <div className="flex justify-center rounded-xl bg-white p-4 ring-1 ring-zinc-100 dark:bg-white dark:ring-zinc-800">
                            {text ? (
                                <QRCode
                                    ref={svgRef}
                                    value={text}
                                    size={200}
                                    viewBox={`0 0 256 256`}
                                    className="h-auto w-full max-w-[200px]"
                                />
                            ) : (
                                <div className="flex h-[200px] w-[200px] items-center justify-center text-zinc-300">
                                    <QrCode className="h-16 w-16 opacity-20" />
                                </div>
                            )}
                        </div>

                        <Button
                            onClick={handleDownload}
                            disabled={!text}
                            className="h-12 w-full rounded-xl bg-zinc-900 text-base font-semibold text-white shadow-md transition-all hover:bg-zinc-800 disabled:opacity-70 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            <Download className="mr-2 h-5 w-5" />
                            Download QR Code
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
