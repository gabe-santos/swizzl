import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h2 className="text-2xl font-bold mb-2">swizzl🍹</h2>
            <p className="text-sm">Discover, mix, sip, repeat.</p>
          </div>
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/in/gabesantoscodes/"
                className="hover:text-gray-300"
              >
                <Linkedin size={24} />
              </Link>
              <Link
                href="https://github.com/gabe-santos"
                className="hover:text-gray-300"
              >
                <Github size={24} />
              </Link>
              <Link
                href="https://www.instagram.com/gabe.santos/"
                className="hover:text-gray-300"
              >
                <Instagram size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          © {new Date().getFullYear()} swizzl. Made with 🫶 by
          <Link href="https://gabesantos.dev"> Gabe Santos</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
