import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import Logo from "../ui/Logo";

const quickLinks = [
  {
    link: "/movies?movies-tag=popular&page=1",
    label: "Movies",
  },
  {
    link: "/tv-shows?tv-tag=popular&page=1",
    label: "TV Shows",
  },
  {
    link: "/movies?movies-tag=now_playing&page=1",
    label: "Playing Now",
  },
  {
    link: "/tv-shows?tv-tag=on_the_air&page=1",
    label: "On the Air",
  },
  {
    link: "/#search",
    label: "Advanced Search",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-32">
      <div className="max-w-7xl  2xl:px-40 xl:px-32 lg:px-20 md:px-12 sm:px-8 px-2 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_0.5fr_0.5fr] gap-20 gap-y-10">
          <div className="space-y-4">
            <div className="inline-block">
              <Logo />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your ultimate platform for discovering and exploring the latest
              movies and TV shows from around the world. We provide an enjoyable
              and seamless experience for cinema and television enthusiasts.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((q) => (
                <li key={q.link}>
                  <a
                    href={q.link}
                    className="text-slate-300 hover:text-white  transition-colors duration-200"
                  >
                    {q.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact US</h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <IoMailOutline />
                <span className="text-slate-300">support@wanji.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <IoLocationOutline />
                <span className="text-slate-300">Casablanca, Morocco</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="text-xs text-slate-400 md:text-start text-center">
                <p>
                  This product uses the TMDB API but is not endorsed or
                  certified by TMDB.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/tmdb-logo.svg" alt="TMDB Logo" className="h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} Wanji. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
