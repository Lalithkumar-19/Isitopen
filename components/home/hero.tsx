import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export function Hero() {
    return (
        <main className="flex-1 w-full max-w-[1920px] mx-auto grid lg:grid-cols-2 min-h-[calc(100vh-88px)]">
            {/* Left Column: Text & CTA */}
            <div className="relative flex flex-col border-r border-emerald-900/5">
                {/* Top Section */}
                <div className="flex-1 p-12 lg:p-20 flex flex-col justify-center max-w-2xl">
                    <h1 className="text-5xl lg:text-7xl font-bold text-[#0f172a] leading-[1.1] mb-8 tracking-tight">
                        Stop Wasting<br />
                        Time on <span className="text-[#1a2c42]">Closed</span><br />
                        <span className="text-[#1a2c42]">Shops.</span>
                    </h1>

                    <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-md">
                        Check real-time availability of local businesses, government offices, and services before you step out.
                    </p>

                    <div>
                        <Button className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-none shadow-lg shadow-indigo-500/20 group cursor-pointer">
                            Check Status
                            <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>

                {/* Bottom Left: Quote/Newsletter */}
                <div className="border-t border-emerald-900/5 p-12 lg:p-20 bg-[#eefbf3]">
                    <p className="text-slate-600 mb-6 font-medium">
                        Save time, fuel, and frustration by checking real-time status updates.
                    </p>
                    <div className="flex w-full max-w-md bg-white p-1 shadow-sm">
                        <input
                            type="text"
                            placeholder="Search for a place..."
                            className="flex-1 px-4 py-3 bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                        />
                        <button className="bg-[#1a3c28] hover:bg-[#1a3c28]/90 text-white p-3 transition-colors cursor-pointer">
                            <ChevronRight className="size-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column: Visuals & Stats */}
            <div className="flex flex-col">
                {/* Top Right: Images */}
                <div className="flex-1 grid grid-cols-2 gap-8 p-12 lg:p-16 items-center relative overflow-hidden bg-white/30">
                    {/* Background Gradient Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-100/50 rounded-full blur-3xl -z-10"></div>

                    <div className="relative aspect-[3/5] mt-12 shadow-2xl shadow-slate-200">
                        <Image
                            fill
                            src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202101/Republic-Labour-_-Employment-1_1200x768.jpeg?size=690%3A388"
                            alt="Open Shop"
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-emerald-800 rounded shadow-sm">
                            OPEN NOW
                        </div>
                    </div>

                    <div className="relative aspect-[3/5] mb-12 shadow-2xl shadow-slate-200 bg-gray-100">
                        <Image
                            fill
                            src="https://i.guim.co.uk/img/media/4b1ea5d6577ef7a4640cc54cc0f770c059fa8e95/0_305_5616_3370/master/5616.jpg?crop=none&dpr=1&s=none&width=465"
                            alt="Closed Shop"
                            className="object-cover grayscale"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-red-800 rounded shadow-sm">
                            CLOSED
                        </div>
                    </div>
                </div>

                {/* Bottom Right: Stats Bar */}
                <div className="border-t border-emerald-900/5 flex">
                    <div className="bg-[#1a3c28] text-white p-10 flex flex-col justify-center text-center min-w-[200px]">
                        <span className="text-3xl font-bold mb-1">10k+</span>
                        <span className="text-xs uppercase tracking-wider opacity-80">Active Places</span>
                    </div>
                    <div className="flex-1 bg-white grid grid-cols-3 divide-x divide-slate-100">
                        {[
                            { num: "24/7", label: "Updates" },
                            { num: "50+", label: "Cities" },
                            { num: "1M+", label: "Users" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col justify-center items-center p-8">
                                <span className="text-3xl font-bold text-[#1a2c42] mb-1">{stat.num}</span>
                                <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
