import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-it-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="font-semibold">Products</div>
          <ul className="mt-3 space-y-2 text-sm text-it-text/80">
            <li>
              <Link className="hover:text-it-text" href="/products">
                All products
              </Link>
            </li>
            <li>
              <Link className="hover:text-it-text" href="/ecosystem">
                Ecosystem
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-it-text/80">
            <li>
              <Link className="hover:text-it-text" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-it-text" href="/updates">
                Updates
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Legal</div>
          <ul className="mt-3 space-y-2 text-sm text-it-text/80">
            <li>
              <Link className="hover:text-it-text" href="/legal/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="hover:text-it-text" href="/legal/terms">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Social</div>
          <ul className="mt-3 space-y-2 text-sm text-it-text/80">
            <li>
              <a className="hover:text-it-text" href="#" aria-label="Twitter">
                Twitter
              </a>
            </li>
            <li>
              <a className="hover:text-it-text" href="#" aria-label="LinkedIn">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-sm text-it-text/70">
          <div>© {new Date().getFullYear()} Intelligence Tech</div>
          <div className="hidden md:block">Build an ecosystem of products.</div>
        </div>
      </div>
    </footer>
  );
}

