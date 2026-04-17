"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export type NavData = {
  mainLinks: Array<{ label: string; href: string }>;
  signInLabel: string;
  signInHref: string;
  ctaLabel: string;
  ctaHref: string;
};

const FALLBACK: NavData = {
  mainLinks: [
    { label: "Products", href: "/products" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  signInLabel: "Sign In",
  signInHref: "/blog",
  ctaLabel: "Get Started",
  ctaHref: "/products",
};

function navLinkClass(pathname: string, href: string) {
  const isActive = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  if (isActive) return "text-[#14213d] font-semibold border-b-2 border-[#fca311] pb-0.5";
  return "text-[#14213d] font-medium hover:text-[#fca311] transition-colors duration-200";
}

export function StitchTopNav({ data }: { data?: NavData | null }) {
  const pathname = usePathname() || "/";
  const d = data ?? FALLBACK;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 w-full z-50 bg-white border-b border-[#14213d]/8 shadow-[0_1px_3px_rgba(20,33,61,0.06)]"
    >
      <nav className="grid grid-cols-3 items-center px-4 sm:px-6 md:px-10 h-[64px] md:h-[72px] w-full text-sm tracking-normal">
        <div className="flex items-center gap-2">
          <Link className="flex items-center shrink-0" href="/">
            <span className="flex flex-col items-center text-[#14213d] leading-[1.1] tracking-[-0.03em]" style={{ fontFamily: '"Saira Stencil", ui-sans-serif, system-ui, sans-serif' }}>
              <span className="text-[18px] sm:text-[20px] md:text-[22px]">Intelligence</span>
              <span className="text-[18px] sm:text-[20px] md:text-[22px]">Tech</span>
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-center gap-8">
          {d.mainLinks.map((link) => (
            <Link key={link.href} className={navLinkClass(pathname, link.href)} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-end gap-5">
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#14213d]/10 text-[#14213d] hover:bg-[#f5f5f5] transition"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>

          <Link className="hidden md:inline-flex text-[#14213d] font-medium hover:text-[#fca311] px-4 py-2 transition-colors duration-200" href={d.signInHref}>
            {d.signInLabel}
          </Link>
          <Link className="hidden md:inline-flex bg-linear-to-br from-[#14213d] to-[#fca311] text-white px-7 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300" href={d.ctaHref}>
            {d.ctaLabel}
          </Link>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#14213d]/8 bg-white">
          <div className="px-4 py-4 space-y-2">
            {d.mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-[#14213d] font-medium hover:bg-[#f5f5f5] transition"
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined text-[18px] text-[#14213d]/50">chevron_right</span>
              </Link>
            ))}
            <div className="pt-2 grid grid-cols-1 gap-2">
              <Link className="rounded-lg px-3 py-3 text-center border border-[#14213d]/10 text-[#14213d] font-semibold hover:bg-[#f5f5f5] transition" href={d.signInHref}>
                {d.signInLabel}
              </Link>
              <Link className="rounded-lg px-3 py-3 text-center bg-linear-to-br from-[#14213d] to-[#fca311] text-white font-semibold shadow-md" href={d.ctaHref}>
                {d.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
