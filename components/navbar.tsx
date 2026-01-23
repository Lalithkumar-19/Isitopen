import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="flex items-center justify-between py-6 px-8 border-b border-emerald-900/10 bg-[#eefbf3]">
            <div className="flex items-center gap-2">
                <div className="flex flex-col leading-none">
                    <span className="text-xl font-bold text-emerald-950 tracking-tight">OpenOrClosed</span>
                    <span className="text-[10px] font-semibold text-emerald-600 tracking-widest uppercase">SHOP STATUS</span>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                <a href="#" className="text-slate-900">Home</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Key Features</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Pricing</a>
                <a href="#" className="hover:text-slate-900 transition-colors">Testimonials</a>
                <a href="#" className="hover:text-slate-900 transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
                <Button variant="ghost" className="font-semibold text-slate-700 hover:bg-white/50">
                    Sign in
                </Button>
                <Button className="bg-[#1a3c28] hover:bg-[#1a3c28]/90 text-white font-semibold rounded-none px-6">
                    Sign up
                </Button>
            </div>
        </nav>
    );
}
