import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme";

function getInitialIsDark() {
    if (typeof window === "undefined") return false;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

function ThemeToggle() {
    const [isDark, setIsDark] = useState(getInitialIsDark);

    useEffect(() => {
        // Apply the theme class once on mount.
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    const label = useMemo(() => (isDark ? "☀️ Light" : "🌙 Dark"), [isDark]);

    return (
        <button
            type="button"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => {
                const next = !isDark;
                setIsDark(next);
                window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
                document.documentElement.classList.toggle("dark", next);
            }}
            className="fixed top-4 right-4 z-10 rounded-full bg-card text-text-primary px-4 py-2 text-sm font-medium hover:bg-btn-secondary-hover transition-colors duration-200"
            aria-pressed={isDark}
        >
            {label}
        </button>
    );
}

export default ThemeToggle;

