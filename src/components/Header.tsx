import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Namma Space
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#workflow" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#safety-tips" className="text-muted-foreground hover:text-foreground transition-colors">
              Safety Guides
            </a>
            <a href="#report-form" className="text-muted-foreground hover:text-foreground transition-colors">
              Report
            </a>
            <a href="#resources" className="text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </a>
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button 
              className="accent-gradient text-accent-foreground"
              onClick={() => document.getElementById("report-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Report Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
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
            className="md:hidden py-4 border-t border-border"
          >
            <nav className="flex flex-col gap-4">
              <a href="#workflow" className="text-foreground py-2" onClick={() => setIsMenuOpen(false)}>How It Works</a>
              <a href="#safety-tips" className="text-foreground py-2" onClick={() => setIsMenuOpen(false)}>Safety Guides</a>
              <a href="#report-form" className="text-foreground py-2" onClick={() => setIsMenuOpen(false)}>Report</a>
              <a href="#resources" className="text-foreground py-2" onClick={() => setIsMenuOpen(false)}>Resources</a>
              <Button className="accent-gradient text-accent-foreground mt-2" onClick={() => {
                setIsMenuOpen(false);
                document.getElementById("report-form")?.scrollIntoView({ behavior: "smooth" });
              }}>
                Report Now
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
