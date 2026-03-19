import { Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 border-t-8 border-foreground">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 border-2 border-white safety-orange flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <span className="font-display text-3xl font-black uppercase tracking-tighter">
                NAMMA SPACE
              </span>
            </a>
            <p className="text-white/60 font-bold max-w-md uppercase tracking-tight leading-tight">
              A community platform dedicated to digital safety and awareness. 
              Report online harassment, collect evidence, and protect the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl font-black mb-6 uppercase tracking-tight text-white border-b-2 border-white pb-2 inline-block">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#workflow" className="text-white/60 hover:text-white font-bold uppercase tracking-tight transition-colors">
                  HOW IT WORKS
                </a>
              </li>
              <li>
                <a href="#report-form" className="text-white/60 hover:text-white font-bold uppercase tracking-tight transition-colors">
                  SUBMIT REPORT
                </a>
              </li>
              <li>
                <a href="#resources" className="text-white/60 hover:text-white font-bold uppercase tracking-tight transition-colors">
                  RESOURCES
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-xl font-black mb-6 uppercase tracking-tight text-white border-b-2 border-white pb-2 inline-block">
              LEGAL
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-white/60 hover:text-white font-bold uppercase tracking-tight transition-colors">
                  PRIVACY POLICY
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/60 hover:text-white font-bold uppercase tracking-tight transition-colors">
                  TERMS OF USE
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-white/60 hover:text-white font-bold uppercase tracking-tight transition-colors">
                  DISCLAIMER
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-white/20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2026 NAMMA SPACE | DEFENDING THE DIGITAL FRONTIER
          </p>
          <p className="text-white/40 text-xs font-black uppercase tracking-widest flex items-center gap-2">
            MADE WITH <Heart className="w-4 h-4 text-destructive fill-current" /> FOR A SAFER INTERNET
          </p>
        </div>

        <div className="mt-12 p-6 border-2 border-white/20 bg-white/5">
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed text-center">
            <strong className="text-white/60">DISCLAIMER:</strong> NAMMA SPACE IS A COMMUNITY REPORTING PORTAL 
            AND DOES NOT REPLACE LAW ENFORCEMENT AGENCIES. USERS ARE ENCOURAGED TO FOLLOW OFFICIAL 
            LEGAL PROCEDURES FOR SERIOUS CYBER INCIDENTS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
