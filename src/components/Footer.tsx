import { Shield, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-primary-foreground">
                Namma Space
              </span>
            </a>
            <p className="text-primary-foreground/60 max-w-md">
              A community platform dedicated to digital safety and awareness. 
              Report online harassment, collect evidence, and protect the community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#workflow" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#report-form" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Submit Report
                </a>
              </li>
              <li>
                <a href="#resources" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © 2025 Namma Space | Digital Safety for All
          </p>
          <p className="text-primary-foreground/40 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent" /> for a safer internet
          </p>
        </div>

        <div className="mt-8 p-4 bg-primary-foreground/5 rounded-lg border border-primary-foreground/10">
          <p className="text-xs text-primary-foreground/50 text-center">
            <strong className="text-primary-foreground/70">Disclaimer:</strong> Namma Space is a community reporting portal 
            and does not replace law enforcement agencies. Users are encouraged to follow official 
            legal procedures for serious cyber incidents.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
