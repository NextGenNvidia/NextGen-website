"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Hero from "./Hero";

export default function HomeClient({
    children,
}: {
    children: React.ReactNode;
}) {
    // Start with false on both server and client to avoid hydration mismatch
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // After mount, check sessionStorage to decide whether to show loader
        const alreadyDone = sessionStorage.getItem("nextgen_loader_done");
        if (!alreadyDone) {
            setLoading(true);
        }
        setMounted(true);
    }, []);

    // Before mount, render the main content (matches SSR output exactly)
    if (!mounted) {
        return (
            <main className="flex min-h-screen flex-col">
                <Navbar ready={true} />
                <Hero ready={true} />
                {children}
            </main>
        );
    }

    return (
        <>
            {loading && <LoadingScreen onComplete={() => { sessionStorage.setItem("nextgen_loader_done", "1"); setLoading(false); }} />}
            {!loading && (
                <main className="flex min-h-screen flex-col">
                    <Navbar ready={true} />
                    <Hero ready={true} />
                    {children}
                </main>
            )}
        </>
    );
}
