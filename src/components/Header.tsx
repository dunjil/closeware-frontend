import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: "rgba(250,249,246,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid #E8E6E0" }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-[26px] font-light tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          Close<span style={{ color: "#D4A017" }} className="font-medium">ware</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/#how-it-works"
            className="text-sm hidden lg:inline"
            style={{ color: "#4A4A45" }}
          >
            How it works
          </Link>
          <Link
            href="/pricing"
            className="text-sm"
            style={{
              color: isActive('/pricing') ? "#D4A017" : "#4A4A45",
              fontWeight: isActive('/pricing') ? 500 : 400
            }}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="text-sm hidden md:inline"
            style={{
              color: isActive('/contact') ? "#D4A017" : "#4A4A45",
              fontWeight: isActive('/contact') ? 500 : 400
            }}
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="text-sm px-2 sm:px-3 py-2 hidden sm:inline"
            style={{ color: "#4A4A45" }}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-3 sm:px-4 py-2 text-sm rounded-lg font-medium"
            style={{ background: "#1A1A18", color: "#fff" }}
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
