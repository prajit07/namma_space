import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 border-2 border-foreground bg-primary flex items-center justify-center transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              NAMMA COMMUNITY
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#workflow" className="font-bold uppercase tracking-tight hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#safety-tips" className="font-bold uppercase tracking-tight hover:text-secondary transition-colors">
              Safety Guides
            </a>
            <Link to="/report" className="font-bold uppercase tracking-tight hover:text-destructive transition-colors">
              Report
            </Link>
            <a href="#resources" className="font-bold uppercase tracking-tight hover:text-accent transition-colors">
              Resources
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link to="/report">
              <Button className="brutalist-button safety-orange">
                REPORT NOW
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-2 border-foreground bg-secondary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-6 border-t-2 border-foreground bg-background"
          >
            <nav className="flex flex-col gap-4">
              <a href="#workflow" className="font-bold uppercase py-2 border-b-2 border-muted" onClick={() => setIsMenuOpen(false)}>How It Works</a>
              <a href="#safety-tips" className="font-bold uppercase py-2 border-b-2 border-muted" onClick={() => setIsMenuOpen(false)}>Safety Guides</a>
              <Link to="/report" className="font-bold uppercase py-2 border-b-2 border-muted" onClick={() => setIsMenuOpen(false)}>Report</Link>
              <a href="#resources" className="font-bold uppercase py-2 border-b-2 border-muted" onClick={() => setIsMenuOpen(false)}>Resources</a>
              <Link to="/report" onClick={() => setIsMenuOpen(false)}>
                <Button className="brutalist-button safety-orange mt-4">
                  REPORT NOW
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
