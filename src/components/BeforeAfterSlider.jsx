import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";

/* ===== ImageSmart — использует WebP (если есть), иначе оригинал ===== */
function ImageSmart({
  src,
  alt,
  className = "",
  mode = "cover",
  w = 800,
  h = 600,
  sizes = "(max-width: 768px) 100vw, 50vw",
  ...imgProps
}) {
  const m = src.match(/^\/images\/([^/]+)\/([^/.]+)\.(jpe?g|png|webp|avif)$/i);
  const subdir = m ? m[1] : "";
  const name = m ? m[2] : "";

  const webpBase = `/webp/${subdir}`;
  const webp480 = `${webpBase}/480/${name}.webp`;
  const webp800 = `${webpBase}/800/${name}.webp`;
  const webp1200 = `${webpBase}/1200/${name}.webp`;

  const [hasWebp, setHasWebp] = useState(true);
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.src = webp800;
    img.onload = () => alive && setHasWebp(true);
    img.onerror = () => alive && setHasWebp(false);
    return () => {
      alive = false;
    };
  }, [webp800]);

  const objectClass = mode === "cover" ? "object-cover" : "object-contain";
  const classes = `${className} ${objectClass}`.trim();

  const commonProps = {
    width: w,
    height: h,
    loading: "lazy",
    decoding: "async",
    alt,
    className: classes,
    ...imgProps,
    onError: (e) => {
      imgProps.onError?.(e);
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/images/placeholder.jpg";
    },
  };

  return hasWebp ? (
    <picture>
      <source
        type="image/webp"
        srcSet={`${webp480} 480w, ${webp800} 800w, ${webp1200} 1200w`}
        sizes={sizes}
      />
      <img src={src} {...commonProps} />
    </picture>
  ) : (
    <img src={src} {...commonProps} />
  );
}

/* ===== ДАННЫЕ ===== */
const projects = [
  {
    id: 1,
    before: "/images/projekte/project1-before.jpg",
    after: "/images/projekte/project1-after.jpg",
    title: "Flachdach-Sanierung",
    location: "Düsseldorf",
    year: "2024",
  },
  {
    id: 2,
    before: "/images/projekte/project2-before.jpg",
    after: "/images/projekte/project2-after.jpg",
    title: "Komplettumbau",
    location: "Köln",
    year: "2023",
  },
  {
    id: 3,
    before: "/images/projekte/project3-before.jpg",
    after: "/images/projekte/project3-after.jpg",
    title: "Dachsanierung",
    location: "Essen",
    year: "2024",
  },
  {
    id: 4,
    before: "/images/projekte/project4-before.jpg",
    after: "/images/projekte/project4-after.jpg",
    title: "Fassadenrenovierung",
    location: "Berlin",
    year: "2023",
  },
];

/* ===== Скелетон ===== */
function CardSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-100" />
  );
}

/* ===== Карточка ===== */
function BeforeAfterCard({ project, isMobile, onOpen }) {
  const [loadedBefore, setLoadedBefore] = useState(false);
  const [loadedAfter, setLoadedAfter] = useState(false);
  const [errorBefore, setErrorBefore] = useState(false);
  const [errorAfter, setErrorAfter] = useState(false);

  const [hovered, setHovered] = useState(false);
  const [pressing, setPressing] = useState(false);
  const touchStartRef = useRef({ t: 0, x: 0, y: 0, moved: false });

  const showAfter = isMobile ? pressing : hovered;

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    touchStartRef.current = {
      t: performance.now(),
      x: t.clientX,
      y: t.clientY,
      moved: false,
    };
    setPressing(true);
  }, []);

  const onTouchMove = useCallback((e) => {
    const t = e.touches[0];
    const s = touchStartRef.current;
    if (Math.hypot(t.clientX - s.x, t.clientY - s.y) > 8) {
      touchStartRef.current.moved = true;
    }
  }, []);

  const onTouchEnd = useCallback(
    (e) => {
      e.preventDefault();
      const s = touchStartRef.current;
      const dt = performance.now() - s.t;
      const isTap = dt < 200 && !s.moved;
      setPressing(false);
      if (isTap) onOpen?.();
    },
    [onOpen]
  );

  return (
    <div
      className="relative group rounded-lg border border-gray-200 shadow-lg overflow-hidden cursor-pointer bg-white"
      style={{ aspectRatio: "4 / 3" }}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onDoubleClick={!isMobile ? onOpen : undefined}
      onTouchStart={isMobile ? onTouchStart : undefined}
      onTouchMove={isMobile ? onTouchMove : undefined}
      onTouchEnd={isMobile ? onTouchEnd : undefined}
      role="button"
      aria-label={`Vorher/Nachher: ${project.title}`}
    >
      {(!loadedBefore || errorBefore) && <CardSkeleton />}
      <ImageSmart
        src={errorBefore ? "/images/placeholder.jpg" : project.before}
        alt={`Vorher: ${project.title}`}
        onLoad={() => setLoadedBefore(true)}
        onError={() => setErrorBefore(true)}
        className={`absolute inset-0 w-full h-full transition-all duration-400 pointer-events-none ${
          showAfter ? "opacity-0" : "opacity-100 group-hover:scale-105"
        }`}
        w={800}
        h={600}
        mode="cover"
      />

      {(!loadedAfter || errorAfter) && showAfter && <CardSkeleton />}
      {(!errorAfter || errorBefore) && (
        <ImageSmart
          src={errorAfter ? "/images/placeholder.jpg" : project.after}
          alt={`Nachher: ${project.title}`}
          onLoad={() => setLoadedAfter(true)}
          onError={() => setErrorAfter(true)}
          className={`absolute inset-0 w-full h-full transition-all duration-400 pointer-events-none ${
            showAfter ? "opacity-100 scale-105" : "opacity-0"
          }`}
          w={800}
          h={600}
          mode="cover"
        />
      )}

      <div
        className={`absolute top-2 left-2 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur ${
          showAfter ? "bg-slate-900/30 text-white/50" : "bg-slate-900/80 text-white"
        }`}
      >
        VORHER
      </div>
      <div
        className={`absolute top-2 right-2 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur ${
          showAfter ? "bg-emerald-600/90 text-white" : "bg-emerald-600/30 text-white/60"
        }`}
      >
        NACHHER
      </div>

      <div className="absolute bottom-10 right-2 bg-white/85 text-[11px] px-2 py-[3px] rounded shadow text-gray-800 font-medium pointer-events-none">
        {isMobile
          ? "👆 Удерживайте — Nachher • Тап — Vollbild"
          : "🖱️ Hover • Двойной клик — Vollbild"}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2 text-center">
        {project.title} – {project.location}, {project.year}
      </div>
    </div>
  );
}

/* ===== Слайдер ===== */
function SimpleSlider({ children, slidesPerViewDesktop = 2 }) {
  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(0);

  const checkMobile = useCallback(() => setIsMobile(window.innerWidth < 768), []);
  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  const k = isMobile ? 1 : slidesPerViewDesktop;
  const total = slides.length;
  const pages = Math.max(1, Math.ceil(total / k));
  const maxPage = pages - 1;

  const trackWidthPct = (total * 100) / k;
  const itemWidthPct = (100 / total) * k;
  const translatePct = (100 / pages) * page;

  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const goNext = useCallback(() => setPage((p) => Math.min(maxPage, p + 1)), [maxPage]);
  const goTo = useCallback((p) => setPage(p), []);

  return (
    <div className="relative" role="region" aria-label="Galerie Vorher/Nachher">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            width: `${trackWidthPct}%`,
            transform: `translateX(-${translatePct}%)`,
          }}
          aria-live="polite"
        >
          {slides.map((child, i) => (
            <div
              key={i}
              className="px-2 md:px-3"
              style={{ width: `${itemWidthPct}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {pages > 1 && (
        <>
          <button
            onClick={goPrev}
            disabled={page === 0}
            className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50"
            aria-label="Vorherige Seite"
          >
            <svg
              className="w-5 h-5 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            disabled={page === maxPage}
            className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50"
            aria-label="Nächste Seite"
          >
            <svg
              className="w-5 h-5 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full ${
                  i === page ? "bg-yellow-400" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Seite ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ===== Модалка ===== */
function BeforeAfterModal({ projects, startIndex, onClose, isMobile }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [divider, setDivider] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showHintToast, setShowHintToast] = useState(true);
  const containerRef = useRef(null);
  const hintTimeoutRef = useRef();

  const currentProject = projects[currentIndex];

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
    setDivider(50);
    showTemporaryHint();
  }, [projects.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % projects.length);
    setDivider(50);
    showTemporaryHint();
  }, [projects.length]);

  const showTemporaryHint = useCallback(() => {
    setShowHintToast(true);
    clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = setTimeout(() => {
      setShowHintToast(false);
    }, 3000);
  }, []);

  const getLabelOpacity = useCallback((position, dividerPos) => {
    const distance = Math.abs(position - dividerPos);
    if (distance < 10) return 1;
    if (distance < 30) return 0.7;
    if (distance < 50) return 0.4;
    return 0.2;
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setDivider((x / rect.width) * 100);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setDivider((x / rect.width) * 100);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setDivider((x / rect.width) * 100);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
        case "ArrowUp":
          e.preventDefault();
          setDivider((d) => Math.min(100, d + 5));
          break;
        case "ArrowDown":
          e.preventDefault();
          setDivider((d) => Math.max(0, d - 5));
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd, next, onClose, prev]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowHintToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 bg-black/90 transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`relative bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] flex flex-col transition-transform duration-300 ${
          mounted ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 md:hidden">
              {currentIndex + 1} / {projects.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Schließen"
            type="button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <div
          ref={containerRef}
          className="relative bg-gray-100 cursor-col-resize select-none flex-1 min-h-0 touch-none"
          style={{ minHeight: "300px" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <ImageSmart
            src={currentProject.after}
            alt={`Nachher: ${currentProject.title}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            mode="contain"
          />

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - divider}% 0 0)` }}
          >
            <ImageSmart
              src={currentProject.before}
              alt={`Vorher: ${currentProject.title}`}
              className="w-full h-full pointer-events-none"
              mode="contain"
            />
          </div>

          <div
            className={`absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 ${
              isDragging ? "cursor-grabbing" : "cursor-col-resize"
            }`}
            style={{ left: `${divider}%` }}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(divider)}
            aria-label="Vergleichsregler"
            tabIndex={0}
          >
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 12l4-4 4 4-4 4-4-4z" />
              </svg>
            </div>
          </div>

          <div
            className={`absolute top-4 left-4 px-3 py-1.5 rounded-md text-sm font-semibold shadow-lg transition-all duration-300 ${
              divider < 20
                ? "bg-red-600/90 text-white"
                : divider < 40
                ? "bg-red-600/70 text-white/90"
                : "bg-red-600/50 text-white/80"
            }`}
            style={{
              opacity: getLabelOpacity(10, divider),
              transform: `translateX(${Math.min(0, 50 - divider)}px)`,
            }}
          >
            VORHER
          </div>

          <div
            className={`absolute top-4 right-4 px-3 py-1.5 rounded-md text-sm font-semibold shadow-lg transition-all duration-300 ${
              divider > 80
                ? "bg-green-600/90 text-white"
                : divider > 60
                ? "bg-green-600/70 text-white/90"
                : "bg-green-600/50 text-white/80"
            }`}
            style={{
              opacity: getLabelOpacity(90, divider),
              transform: `translateX(${Math.max(0, 50 - (100 - divider))}px)`,
            }}
          >
            NACHHER
          </div>

          {showHintToast && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/90 text-white text-sm px-4 py-2 rounded-lg shadow-xl animate-fade-in pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">💡</span>
                <div>
                  <div className="font-medium">Tipp:</div>
                  <div className="text-xs">
                    {isMobile
                      ? "Ziehen Sie den Regler zum Vergleichen"
                      : "Verwenden Sie die Pfeiltasten für präzise Steuerung"}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-lg pointer-events-none hidden md:block">
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">
                ← →
              </kbd>
              <span>Wechseln</span>
              <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">
                ESC
              </kbd>
              <span>Schließen</span>
            </div>
          </div>

          <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2">
            <button
              onClick={prev}
              className="w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center"
              aria-label="Vorheriges"
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2">
            <button
              onClick={next}
              className="w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center"
              aria-label="Nächstes"
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 text-center border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-800">
            {currentProject.title}
          </h3>
          <p className="text-sm text-gray-600">
            {currentProject.location}, {currentProject.year}
          </p>
          <p className="text-xs text-gray-500 mt-1 hidden md:block">
            Projekt {currentIndex + 1} von {projects.length}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===== Главный блок ===== */
export default function BeforeAfterSlider() {
  const [isMobile, setIsMobile] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  const checkMobile = useCallback(() => setIsMobile(window.innerWidth < 768), []);
  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  const openModal = useCallback((index) => setModalIndex(index), []);
  const closeModal = useCallback(() => setModalIndex(null), []);

  return (
    <section
      id="before-after-card"
      className="py-16 bg-white"
      style={{ scrollMarginBlockStart: "88px" }}
    >
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-bold uppercase text-gray-800 tracking-wider inline-block border-b-4 border-yellow-400 pb-2">
            Vorher / Nachher
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Hier sehen Sie einige unserer erfolgreich umgesetzten Projekte.
            Durch unsere Expertise in der Dachsanierung und dem kompletten Umbau
            verwandeln wir jedes Gebäude in ein Schmuckstück.
          </p>
        </div>

        <div className="mt-12">
          <SimpleSlider slidesPerViewDesktop={2}>
            {projects.map((project, i) => (
              <BeforeAfterCard
                key={project.id}
                project={project}
                isMobile={isMobile}
                onOpen={() => openModal(i)}
              />
            ))}
          </SimpleSlider>
        </div>
      </div>

      {modalIndex !== null && (
        <BeforeAfterModal
          projects={projects}
          startIndex={modalIndex}
          onClose={closeModal}
          isMobile={isMobile}
        />
      )}
    </section>
  );
}

/* ===== PropTypes ===== */
ImageSmart.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  mode: PropTypes.oneOf(["cover", "contain"]),
  w: PropTypes.number,
  h: PropTypes.number,
  sizes: PropTypes.string,
};

BeforeAfterCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    before: PropTypes.string.isRequired,
    after: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
};

SimpleSlider.propTypes = {
  children: PropTypes.node.isRequired,
  slidesPerViewDesktop: PropTypes.number,
};

BeforeAfterModal.propTypes = {
  projects: PropTypes.arrayOf(BeforeAfterCard.propTypes.project).isRequired,
  startIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};