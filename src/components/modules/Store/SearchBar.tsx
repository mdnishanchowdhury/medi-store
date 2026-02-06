"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Pill, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchSearch = async () => {
            if (query.length < 2) {
                setResults([]);
                setIsOpen(false);
                return;
            }

            setIsLoading(true);
            setIsOpen(true);

            try {
                const res = await fetch(`/api/medicines/search?q=${query}`);
                const data = await res.json();
                setResults(data.data || []);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSearch, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    return (
        <div className="relative w-full max-w-sm" ref={searchRef}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search medicines..."
                    className="w-full pl-10 pr-10 py-2 text-sm border rounded-full outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {isLoading && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 animate-spin text-blue-500" />}
            </div>

            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 w-full bg-white border rounded-xl shadow-2xl z-[999] overflow-hidden">
                    <div className="p-2 max-h-[300px] overflow-y-auto">
                        {results.length > 0 ? (
                            results.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/medicine/${item.id}`}
                                    onClick={() => { setIsOpen(false); setQuery(""); }}
                                    className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded-lg group"
                                >
                                    <Pill className="size-4 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium group-hover:text-blue-600">{item.productName || item.name}</p>
                                        <p className="text-[11px] text-muted-foreground">৳ {item.price}</p>
                                    </div>
                                </Link>
                            ))
                        ) : !isLoading ? (
                            <p className="p-4 text-center text-sm text-muted-foreground italic">No medicine found for "{query}"</p>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}