import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Dienstleistungen" },
  { href: "#works", label: "Flachdachlösungen" },
  { href: "#before-after-card", label: "Vorher / Nachher" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // Добавлено
  const [scrolled, setScrolled] = useState(false);

  const [isSmall, setIsSmall] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
 
  const [showBurger, setShowBurger] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  const containerRef = useRef(null);
  const brandRef = useRef(null);
  const actionsRef = useRef(null);
  const measureNavRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsSmall(e.matches);
    setIsSmall(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const GAP = 32;
    const checkOverflow = () => {
      const container = containerRef.current;
      const brand = brandRef.current;
      const actions = actionsRef.current;
      const measureNav = measureNavRef.current;
      if (!container || !brand || !actions || !measureNav) {
        setShowBurger(isSmall);
        return;
      }

      if (isSmall) {
        setShowBurger(true);
        return;
      }

      const containerW = container.clientWidth;
      const brandW = brand.offsetWidth || 0;
      const actionsW = actions.offsetWidth || 0;
      
      const free = containerW - brandW - actionsW - GAP;
      const need = measureNav.scrollWidth;

      setShowBurger(need > free);
    };

    checkOverflow();

    const ro = new ResizeObserver(checkOverflow);
    [containerRef, brandRef, actionsRef, measureNavRef]
      .map((r) => r.current)
      .filter(Boolean)
      .forEach((el) => ro.observe(el));

    window.addEventListener("resize", checkOverflow);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(checkOverflow).catch(() => {});
    } else {
      const t = setInterval(checkOverflow, 300);
      setTimeout(() => clearInterval(t), 2500);
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [isSmall]);

  useEffect(() => {
    if (!showBurger && menuOpen) {
      setMenuOpen(false);
      setMenuVisible(false);
    }
  }, [showBurger, menuOpen]);

  // Исправленная функция toggleMenu
  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuVisible(true);
      setTimeout(() => setMenuOpen(true), 10);
    } else {
      setMenuOpen(false);
      setTimeout(() => setMenuVisible(false), 300);
    }
  };

  const scrollToCostCalculator = () => {
    const element = document.getElementById("cost-calculator");
    if (element) {
      const headerHeight = 82; // исправленная высота header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/20 backdrop-blur-xl border-b border-white/20 shadow-lg" 
            : "bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-2xl"
        }`}
        style={{ height: "100px" }}
      >
        <div
          className="container mx-auto h-full flex items-center px-6 max-w-7xl"
          ref={containerRef}
        >
          <div className="flex items-center flex-shrink-0" ref={brandRef}>
            <img
              src="/images/Logo.png"
              alt="Olidort Bedachungen"
              className="w-20 h-14 mr-4 sm:w-16 sm:h-12 md:w-28 md:h-20"
            />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl text-teal-600 font-bold drop-shadow-lg">
                Olidort Bedachungen
              </h1>
              <p className="text-sm sm:text-base italic text-yellow-400 drop-shadow-md">
                &quot;Dicht ist unsere Pflicht&quot;
              </p>
            </div>
          </div>

          <div className="flex-1">
            {!showBurger && (
              <nav className="flex items-center justify-center gap-6">
                {LINKS.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="relative group bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg"
                  >
                    {label}
                  </a>
                ))}

                <button
                  onClick={scrollToCostCalculator}
                  className="relative group bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg"
                >
                  Kostenberechnung
                </button>

                <a
                  href="#contact"
                  className="relative group bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg"
                >
                  Kontakt
                </a>
              </nav>
            )}

            <nav
              ref={measureNavRef}
              aria-hidden="true"
              className="absolute -left-[99999px] top-0 flex items-center gap-6"
            >
              {LINKS.map(({ href, label }) => (
                <a key={href} href={href} className="px-4 py-2 rounded-lg">
                  {label}
                </a>
              ))}
              <button className="px-4 py-2 rounded-lg">Kostenberechnung</button>
              <a href="#contact" className="px-4 py-2 rounded-lg">
                Kontakt
              </a>
            </nav>
          </div>

          <div
            className="flex items-center gap-3 flex-shrink-0"
            ref={actionsRef}
          >
            {!showBurger && (
              <a
                href="tel:+4915730050570"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hidden lg:flex shimmer-button shadow-lg border border-yellow-300/50"
              >
                Anruf
              </a>
            )}

            {showBurger && (
              <button
                onClick={toggleMenu}
                className="focus:outline-none text-yellow-400 hover:text-yellow-300 transition-all duration-300 bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/20 hover:border-white/40"
                aria-label="Menü öffnen/schließen"
                aria-expanded={menuOpen}
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Мобильное меню с анимацией - справа */}
      {menuVisible && showBurger && (
        <div
          className={`fixed inset-0 z-40 transition-all duration-300 ${
            menuOpen ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
          }`}
          style={{ top: '100px' }}
          onClick={toggleMenu}
        >
          <nav
            className={`absolute top-0 right-0 h-full bg-white/20 backdrop-blur-xl border-l border-white/20 shadow-2xl transition-transform duration-300 ease-out ${
              menuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
            }`}
            style={{ width: '320px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 flex flex-col space-y-6">
              {LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-white hover:text-yellow-400 border-b border-white/20 py-4 transition-all duration-300 transform hover:translate-x-2 text-lg font-medium"
                  onClick={toggleMenu}
                >
                  {label}
                </a>
              ))}

              <button
                onClick={() => {
                  toggleMenu();
                  setTimeout(() => scrollToCostCalculator(), 300);
                }}
                className="text-white hover:text-yellow-400 border-b border-white/20 py-4 text-left transition-all duration-300 transform hover:translate-x-2 text-lg font-medium"
              >
                Kostenberechnung
              </button>

              <a
                href="#contact"
                className="text-white hover:text-yellow-400 py-4 transition-all duration-300 transform hover:translate-x-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                Kontakt
              </a>

              <a
                href="tel:+4915730050570"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-4 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 text-center mt-6 transform hover:scale-105 shadow-lg border border-yellow-300/50"
                onClick={toggleMenu}
              >
                Anruf: +49 157 300 505 70
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Отступ для контента */}
      <div style={{ height: '100px' }}></div>
    </>
  );
}