"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Hero from "./Hero";

export default function HomeClient({
    children,
}: {
    children: React.ReactNode;
}) {
    // Skip loader if we've already shown it this session
    const [loading, setLoading] = useState(() => {
        if (typeof window === "undefined") return false;
        return !sessionStorage.getItem("nextgen_loader_done");
    });

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
