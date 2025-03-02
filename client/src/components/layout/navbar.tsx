import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const NavItem = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <motion.a 
      href={href}
      className="text-muted-foreground hover:text-primary transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

export function Navbar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const navItems = (
    <>
      <NavItem href="#services">Services</NavItem>
      <NavItem href="#pricing">Pricing</NavItem>
      <NavItem href="#contact">Contact</NavItem>
    </>
  );

  return (
    <nav className="fixed w-full backdrop-blur-lg bg-background/80 z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold"
        >
          Lab49 AI
        </motion.div>

        {isMobile ? (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navItems}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-8">
            {navItems}
          </div>
        )}
      </div>
    </nav>
  );
}