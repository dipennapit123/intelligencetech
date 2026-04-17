import Link from "next/link";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.FC<{ className?: string }>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
};

const SOCIAL_HOVER_COLORS: Record<string, string> = {
  facebook: "hover:text-[#1877F2]",
  instagram: "hover:text-[#E4405F]",
  linkedin: "hover:text-[#0A66C2]",
};

export type FooterData = {
  tagline: string;
  socialLinks: Array<{ platform: string; url: string }>;
  columns: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
  copyright: string;
};

const FALLBACK: FooterData = {
  tagline: "Building the software layer for the next generation of digital enterprise.",
  socialLinks: [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
  ],
  columns: [
    { title: "Products", links: [{ label: "Product Tour", href: "/products" }, { label: "API Documentation", href: "/api/products" }, { label: "Ecosystem Hub", href: "/ecosystem" }] },
    { title: "Company", links: [{ label: "Release Notes", href: "/updates" }, { label: "Blog", href: "/blog" }, { label: "Privacy Policy", href: "/legal/privacy" }] },
    { title: "Contact", links: [{ label: "support@intelligencetech.com", href: "mailto:support@intelligencetech.com" }, { label: "HQ: 500 Silicon Way, CA", href: "#" }] },
  ],
  copyright: "Intelligence Tech Editorial",
};

export function StitchFooter({ data }: { data?: FooterData | null }) {
  const d = data ?? FALLBACK;

  return (
    <footer className="w-full bg-[#f5f5f5] border-t border-[#14213d]/8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 px-8 md:px-12 py-16 max-w-screen-2xl mx-auto leading-relaxed text-sm tracking-normal">
        <div className="col-span-2 md:col-span-1 space-y-6 flex flex-col items-center">
          <Link href="/" className="flex items-center justify-center w-full">
            <span className="flex flex-col items-center text-[#14213d] leading-[1.1] tracking-[-0.03em]" style={{ fontFamily: '"Saira Stencil", ui-sans-serif, system-ui, sans-serif' }}>
              <span className="text-xl">Intelligence</span>
              <span className="text-xl">Tech</span>
            </span>
          </Link>
          <p className="text-[#475569] max-w-xs text-center">{d.tagline}</p>
          <div className="flex items-center gap-5 justify-center w-full">
            {d.socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.platform];
              if (!Icon) return null;
              return (
                <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className={`text-[#14213d]/40 ${SOCIAL_HOVER_COLORS[social.platform] ?? ""} transition-colors`} aria-label={social.platform}>
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
        {d.columns.map((col) => (
          <div key={col.title} className="space-y-4">
            <h5 className="text-[#14213d] uppercase tracking-[0.15em] text-[11px] font-semibold">{col.title}</h5>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("mailto:") || link.href === "#" ? (
                    <span className="text-[#14213d]">{link.label}</span>
                  ) : (
                    <Link className="text-[#14213d] hover:text-[#fca311] transition-colors font-medium" href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[#14213d]/8 py-8 px-12 text-center text-[#14213d]/50 text-xs">
        © {new Date().getFullYear()} {d.copyright}. All rights reserved.
      </div>
    </footer>
  );
}
