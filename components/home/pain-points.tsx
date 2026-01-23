import { MapPin, PhoneMissed, Clock } from "lucide-react";

export function PainPoints() {
    const points = [
        {
            icon: MapPin,
            title: "Wasted Travel",
            description: "People travel long distances only to return disappointed.",
            color: "bg-orange-100 text-orange-600",
        },
        {
            icon: PhoneMissed,
            title: "Frustration",
            description: "Asking nearby people, calling numbers that don’t respond.",
            color: "bg-red-100 text-red-600",
        },
        {
            icon: Clock,
            title: "Lost Time",
            description: "Especially harmful during emergencies or urgent needs.",
            color: "bg-blue-100 text-blue-600",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl lg:text-5xl font-bold text-[#1a2c42] mb-6 tracking-tight">
                        Why This Problem Matters
                    </h2>
                    <p className="text-xl text-slate-600 font-medium">
                        Closed doors cause more than inconvenience
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {points.map((point, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Decoration blob */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-transparent to-slate-100 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150 group-hover:to-slate-50 opacity-50" />

                            <div className={`w-16 h-16 ${point.color} rounded-2xl flex items-center justify-center mb-6 text-3xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                <point.icon className="w-8 h-8" />
                            </div>

                            <h3 className="text-xl font-bold text-[#1a2c42] mb-3 relative z-10">
                                {point.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed relative z-10">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom Text */}
                <div className="text-center relative">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 -mt-10 mb-10 w-24 h-1 bg-linear-to-r from-transparent via-slate-200 to-transparent"></div>
                    <p className="text-2xl lg:text-3xl font-medium text-[#1a2c42] max-w-4xl mx-auto leading-relaxed">
                        In most cases, people don’t need exact timings — <br className="hidden md:block" />
                        they only want to know <span className="px-2 py-0.5 bg-[#eefbf3] text-[#1a3c28]">“Is it open right now?”</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
