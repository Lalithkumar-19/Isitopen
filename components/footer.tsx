"use client";

import Link from "next/link";
import { Store, Github, Twitter, Heart, LinkedinIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function Footer() {
    const links = [
        { href: "/", label: "Home", isHome: true },
        { href: "/search", label: "Browse Places", isHome: false },
        { href: "/#how-it-works", label: "How it Works", isHome: true },
        { href: "/#logic-behind", label: "Logic Behind", isHome: true },
        { href: "/#faq", label: "FAQ", isHome: true },
    ];

    const navigate = useRouter();
    const navigateTo = (path: string) => {
        if (path.startsWith("/#")) {
            navigate.push("/");
            setTimeout(() => {
                document.querySelector(path)?.scrollIntoView({ behavior: "smooth" });
            }, 1000);
        } else {
            navigate.push(path);
        }
    }

    return (
        <footer className="bg-[#eefbf3] border-t border-emerald-900/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                                <Store className="size-5" />
                            </div>
                            <span className="text-xl font-bold text-emerald-950 tracking-tight">Isitopen</span>
                        </Link>
                        <p className="text-slate-600 max-w-sm mb-6">
                            Crowd-sourced real-time status for local shops and services.
                            Save time by checking before you step out.
                        </p>
                        <div className="flex gap-4">
                            {/* <Link href="#" className="p-2 bg-white rounded-full text-slate-500 hover:text-emerald-600 hover:shadow-md transition-all">
                                <LinkedinIcon className="w-5 h-5" />
                            </Link> */}
                            <Link href="https://github.com/Lalithkumar-19/Isitopen" className="p-2 bg-white rounded-full text-slate-500 hover:text-emerald-600 hover:shadow-md transition-all">
                                <Github className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-emerald-950 mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li className="text-slate-600 cursor-pointer hover:text-emerald-700 hover:underline" key={link.href}>
                                    <button onClick={() => navigateTo(link.href)} className="text-slate-600 cursor-pointer hover:text-emerald-700 hover:underline text-left">{link.label}</button>
                                </li>
                            ))}

                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold text-emerald-950 mb-4">Legal</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-slate-600 hover:text-emerald-700 hover:underline">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-slate-600 hover:text-emerald-700 hover:underline">Terms of Service</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-slate-600 hover:text-emerald-700 hover:underline">Cookie Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-emerald-900/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} Isitope , Open Source Project
                    </p>
                    <p className="text-slate-500 text-sm flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for the community by <Link href="https://www.lalithkumar.me" target="_blank" className="text-emerald-700 hover:text-emerald-600 hover:underline"> Lalith Kumar</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
