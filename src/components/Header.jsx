import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Dienstleistungen" },
  { href: "#works", label: "Flachdachlösungen" },
  { href: "#before-after-card", label: "Vorher / Nachher" },
];


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    if (!showBurger && menuOpen) setMenuOpen(false);
  }, [showBurger, menuOpen]);

  const toggleMenu = () => setMenuOpen((v) => !v);

  const scrollToCostCalculator = () => {
    document.getElementById("cost-calculator")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-2xl bg-gray-400 backdrop-blur-xl transition-all duration-500 ${
        scrolled ? "bg-opacity-20" : "bg-opacity-10"
      }`}
      style={{ height: "96px" }} 
    >
      <div
        className="container mx-auto h-full flex items-center"
        ref={containerRef}
      >
        
        <div className="flex items-center flex-shrink-0" ref={brandRef}>
          <img
            src="/images/Logo.png"
            alt="Olidort Bedachungen"
            className="w-16 h-10 mr-2 mt-1 sm:w-12 sm:h-8 sm:mr-4 md:w-24 md:h-16"
          />
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl text-teal-600 font-bold">
              Olidort Bedachungen
            </h1>
            <p className="text-xs sm:text-sm italic text-yellow-400">
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
                  className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
                >
                  {label}
                </a>
              ))}

              <button
                onClick={scrollToCostCalculator}
                className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
              >
                Kostenberechnung
              </button>

              <a
                href="#contact"
                className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
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
              className="bg-yellow-400 text-dark px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition hidden lg:flex shimmer-button"
            >
              Anruf
            </a>
          )}

         
          {showBurger && (
            <button
              onClick={toggleMenu}
              className="focus:outline-none text-yellow-500 hover:text-teal-600 transition-all"
              aria-label="Menü öffnen/schließen"
              aria-expanded={menuOpen}
            >
              <svg
                className="w-8 h-8"
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

    
      {menuOpen && showBurger && (
        <div
          className="fixed inset-0 z-40 mt-20 md:mt-24 bg-black/50"
          onClick={toggleMenu}
        >
          <nav
            className="bg-teal-900 bg-opacity-95 p-6 flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-white hover:text-secondary border-b border-teal-700 py-3"
                onClick={toggleMenu}
              >
                {label}
              </a>
            ))}

            <button
              onClick={() => {
                toggleMenu();
                scrollToCostCalculator();
              }}
              className="text-white hover:text-secondary border-b border-teal-700 py-3 text-left"
            >
              Kostenberechnung
            </button>

            <a
              href="#contact"
              className="text-white hover:text-secondary py-3"
              onClick={toggleMenu}
            >
              Kontakt
            </a>

            <a
              href="tel:+4915730050570"
              className="bg-yellow-400 text-gray-900 px-4 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition text-center mt-4"
              onClick={toggleMenu}
            >
              Anruf: +49 157 300 505 70
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}