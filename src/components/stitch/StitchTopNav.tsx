"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 w-full z-50 bg-white border-b border-[#14213d]/8 shadow-[0_1px_3px_rgba(20,33,61,0.06)]"
    >
      <nav className="grid grid-cols-3 items-center px-6 md:px-10 h-[72px] w-full text-sm tracking-normal">
        <div className="flex items-center">
          <Link className="flex items-center shrink-0" href="/">
            <span className="flex flex-col items-center text-[#14213d] leading-[1.1] tracking-[-0.03em]" style={{ fontFamily: '"Saira Stencil", ui-sans-serif, system-ui, sans-serif' }}>
              <span className="text-[22px]">Intelligence</span>
              <span className="text-[22px]">Tech</span>
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
          <Link className="text-[#14213d] font-medium hover:text-[#fca311] px-4 py-2 transition-colors duration-200" href={d.signInHref}>
            {d.signInLabel}
          </Link>
          <Link className="bg-gradient-to-br from-[#14213d] to-[#fca311] text-white px-7 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300" href={d.ctaHref}>
            {d.ctaLabel}
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
