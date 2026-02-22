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
  sizes = "(max-width: 768px) 100vw, 50vw", // 2 карточки на десктопе
  ...imgProps
}) {
  // ждём, что src вида /images/projekte/NAME.jpg
  const m = src.match(/^\/images\/([^/]+)\/([^/.]+)\.(jpe?g|png|webp|avif)$/i);
  const subdir = m ? m[1] : "";
  const name = m ? m[2] : "";

  // куда скрипт кладёт webp:
  // /public/webp/projekte/{480,800,1200}/NAME.webp
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

  // если webp есть — отдаём <picture/>, иначе <img/>
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

/* ===== ДАННЫЕ (пример; можно хранить где угодно) ===== */
const items = [
  {
    id: 1,
    before: "/images/projekte/project1-before.jpg",
    after: "/images/projekte/project1-after.jpg",
    title: "Neubau",
    location: "Feuerwehr Niederfischbach",
    year: "2025",
  },
  {
    id: 2,
    before: "/images/projekte/project2-before.jpg",
    after: "/images/projekte/project2-after.jpg",
    title: "Sanierung",
    location: "Rewe Siegen",
    year: "2025",
  },
  {
    id: 3,
    before: "/images/projekte/project3-before.jpg",
    after: "/images/projekte/project3-after.jpg",
    title: "⁠Neubau",
    location: "B&B Hotel Lippstadt",
    year: "2025",
  },
  {
    id: 4,
    before: "/images/projekte/project4-before.jpg",
    after: "/images/projekte/project4-after.jpg",
    title: "Neubau",
    location: "Uni Campus",
    year: "2025",
  },

  {
    id: 5,
    before: "/images/projekte/project5-before.jpg",
    after: "/images/projekte/project5-after.jpg",
    title: "Sanierung",
    location: "Bergisch Gladbach",
    year: "2025",
  },

  {
    id: 6,
    before: "/images/projekte/project6-before.jpg",
    after: "/images/projekte/project6-after.jpg",
    title: "Neubau",
    location: "Uni Campus",
    year: "2025",
  },

  {
    id: 7,
    before: "/images/projekte/project7-before.jpg",
    after: "/images/projekte/project7-after.jpg",
    title: "neue Dachabdichtung",
    location: "Iserhagen",
    year: "2025",
  },

  {
    id: 8,
    before: "/images/projekte/project8-before.jpg",
    after: "/images/projekte/project8-after.jpg",
    title: "Flachdachabdichtung",
    location: "Jülich",
    description: "Neubau einer Flachdachabdichtung im Gewerbebau",
    year: "2025",
  },
];

/* ===== Скелетон ===== */
function CardSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-100" />
  );
}

/* ===== Карточка: десктоп hover, мобилка press&hold + tap ===== */
function BeforeAfterCard({ item, isMobile, onOpen }) {
  const [loadedBefore, setLoadedBefore] = useState(false);
  const [loadedAfter, setLoadedAfter] = useState(false);
  const [errorBefore, setErrorBefore] = useState(false);
  const [errorAfter, setErrorAfter] = useState(false);

  const [hovered, setHovered] = useState(false); // десктоп
  const [pressing, setPressing] = useState(false); // мобилка: пока палец держим
  const touchStartRef = useRef({ t: 0, x: 0, y: 0, moved: false });

  const showAfter = isMobile ? pressing : hovered;

  // прелоад "after" при первом наведении (десктоп)
  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  // Мобильный UX:
  // - touchstart: сразу показать Nachher
  // - touchmove: если ушли >8px — считаем скроллом
  // - touchend: если коротко (<200ms) и без движений — открыть модалку, иначе просто отпустить
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
      e.preventDefault(); // чтобы не прилетел "лишний" click
      const s = touchStartRef.current;
      const dt = performance.now() - s.t;
      const isTap = dt < 200 && !s.moved;
      setPressing(false);
      if (isTap) onOpen?.();
    },
    [onOpen],
  );

  return (
    <div
      className="relative group rounded-lg border border-gray-200 shadow-lg overflow-hidden cursor-pointer bg-white content-auto"
      style={{ aspectRatio: "4 / 3" }}
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      onClick={!isMobile ? onOpen : undefined}
      onTouchStart={isMobile ? onTouchStart : undefined}
      onTouchMove={isMobile ? onTouchMove : undefined}
      onTouchEnd={isMobile ? onTouchEnd : undefined}
      role="button"
      aria-label={`Vorher/Nachher: ${item.title}`}
      title={!isMobile ? "Klicken für Vollbild" : "Tippen für Vollbild"}
    >
      {/* BEFORE */}
      {(!loadedBefore || errorBefore) && <CardSkeleton />}
      <ImageSmart
        src={errorBefore ? "/images/placeholder.jpg" : item.before}
        alt={`Vorher: ${item.title}`}
        onLoad={() => setLoadedBefore(true)}
        onError={() => setErrorBefore(true)}
        className={`absolute inset-0 w-full h-full transition-all duration-400 pointer-events-none ${
          showAfter ? "opacity-0" : "opacity-100 group-hover:scale-105"
        }`}
        w={800}
        h={600}
        mode="cover"
      />

      {/* AFTER */}
      {(!loadedAfter || errorAfter) && showAfter && <CardSkeleton />}
      {(!errorAfter || errorBefore) && (
        <ImageSmart
          src={errorAfter ? "/images/placeholder.jpg" : item.after}
          alt={`Nachher: ${item.title}`}
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

      {/* Бейджи */}
      <div
        className={`absolute top-2 left-2 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur
        ${
          showAfter
            ? "bg-slate-900/30 text-white/50"
            : "bg-slate-900/80 text-white"
        }`}
      >
        VORHER
      </div>
      <div
        className={`absolute top-2 right-2 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur
        ${
          showAfter
            ? "bg-emerald-600/90 text-white"
            : "bg-emerald-600/30 text-white/60"
        }`}
      >
        NACHHER
      </div>

      {/* Подсказка */}
      <div className="absolute bottom-10 right-2 bg-white/85 text-[11px] px-2 py-[3px] rounded shadow text-gray-800 font-medium pointer-events-none">
        {isMobile ? "👆 Tippen: Vollbild" : "🖱️ Hover • Klicken: Vollbild"}
      </div>

      {/* Подпись */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2 text-center">
        {item.title} – {item.location}, {item.year}
      </div>
    </div>
  );
}

/* ===== Слайдер: 2 карточки на десктопе, листаем страницами по 2 ===== */
function SimpleSlider({ children, slidesPerViewDesktop = 2 }) {
  const rawSlides = useMemo(() => React.Children.toArray(children), [children]);

  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(0);

  const checkMobile = useCallback(
    () => setIsMobile(window.innerWidth < 768),
    [],
  );
  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  const k = isMobile ? 1 : slidesPerViewDesktop;

  const pages = Math.max(1, Math.ceil(rawSlides.length / k));
  const maxPage = pages - 1;

  // ✅ дополняем пустыми, чтобы последняя страница была полной
  const paddedSlides = useMemo(() => {
    const needed = pages * k - rawSlides.length;
    if (needed <= 0) return rawSlides;

    return [
      ...rawSlides,
      ...Array.from({ length: needed }, (_, i) => (
        <div
          key={`pad-${i}`}
          className="invisible pointer-events-none"
          aria-hidden="true"
        />
      )),
    ];
  }, [rawSlides, pages, k]);

  // если после добавления карточек текущая страница стала > maxPage
  useEffect(() => {
    setPage((p) => Math.min(p, maxPage));
  }, [maxPage]);

  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  const goNext = useCallback(
    () => setPage((p) => Math.min(maxPage, p + 1)),
    [maxPage],
  );
  const goTo = useCallback((p) => setPage(p), []);

  const slideBasis = `${100 / k}%`;

  return (
    <div className="relative" role="region" aria-label="Galerie Vorher/Nachher">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${page * 100}%)`, // ✅ всегда ровно по странице
          }}
          aria-live="polite"
        >
          {paddedSlides.map((child, i) => (
            <div
              key={i}
              className="px-2 md:px-3"
              style={{ flex: `0 0 ${slideBasis}` }} // ✅ ширина одной карточки
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
                className={`w-2 h-2 rounded-full ${i === page ? "bg-yellow-400" : "bg-gray-300 hover:bg-gray-400"}`}
                aria-label={`Seite ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Анимированные подсказки для модального окна
function AnimatedModalHints() {
  return (
    <div className="text-sm text-gray-600 hidden md:block">
      <div className="flex items-center gap-2">
        <span>💡</span>
        <span>Ziehen Sie den weißen Regler</span>
      </div>
    </div>
  );
}

function BeforeAfterModal({ projects, startIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [divider, setDivider] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showHintToast, setShowHintToast] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const hintTimeoutRef = useRef();

  useEffect(() => {
    if (mounted) {
      document.body.style.position = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  const currentProject = projects[currentIndex];

  const checkMobile = useCallback(
    () => setIsMobile(window.innerWidth < 768),
    [],
  );

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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

  const handleMouseDown = useCallback((e) => {
    if (!containerRef.current) return;
    setIsDragging(true);

    const rect = containerRef.current.getBoundingClientRect();
    const newPos = ((e.clientX - rect.left) / rect.width) * 100;
    setDivider(Math.max(0, Math.min(100, newPos)));
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newPos = ((e.clientX - rect.left) / rect.width) * 100;
      setDivider(Math.max(0, Math.min(100, newPos)));
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e) => {
    if (!containerRef.current) return;
    setIsDragging(true);

    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const newPos = ((touch.clientX - rect.left) / rect.width) * 100;
    setDivider(Math.max(0, Math.min(100, newPos)));
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();

      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const newPos = ((touch.clientX - rect.left) / rect.width) * 100;
      setDivider(Math.max(0, Math.min(100, newPos)));
    },
    [isDragging],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
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
          setDivider((prev) => Math.min(100, prev + 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setDivider((prev) => Math.max(0, prev - 1));
          break;
      }
    },
    [onClose, prev, next],
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  ]);

  useEffect(() => {
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
        style={{
          height: isMobile ? "auto" : "90vh",
          maxHeight: isMobile ? "75vh" : "85vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок модалки */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-400 bg-gray-400 flex-shrink-0">
          <div className="flex items-center gap-2">
            <AnimatedModalHints />
            <span className="text-sm text-gray-400 md:hidden">
              {currentIndex + 1} / {projects.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Schließen"
            type="button"
          >
            <img src="/images/close-icon.gif" alt="close" className="w-8 h-8" />
          </button>
        </div>

        <div
          ref={containerRef}
          className="relative bg-gray-400 cursor-col-resize select-none flex-1 min-h-0 touch-none"
          style={{
            minHeight: isMobile ? "45vh" : "200px",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <ImageSmart
            src={currentProject.after}
            alt={`Nachher: ${currentProject.title}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            mode={isMobile ? "cover" : "contain"}
          />

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - divider}% 0 0)` }}
          >
            <ImageSmart
              src={currentProject.before}
              alt={`Vorher: ${currentProject.title}`}
              className="w-full h-full pointer-events-none"
              mode={isMobile ? "cover" : "contain"}
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

          {showHintToast && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-xl animate-fade-in pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">💡</span>
                <div>
                  <div className="font-medium">Tipp:</div>
                  <div className="text-xs">
                    {isMobile
                      ? "Ziehen Sie den Regler"
                      : "Verwenden Sie die Pfeiltasten"}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg pointer-events-none hidden md:block">
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
        </div>

        <div className="p-3 sm:p-4 text-center border-t border-gray-400 bg-gray-400 flex-shrink-0">
          <h3
            id="modal-title"
            className="text-base sm:text-lg font-semibold text-gray-800"
          >
            {currentProject.title}
          </h3>
          <p className="text-sm text-gray-600">
            {currentProject.location}, {currentProject.year}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterSlider() {
  const [isMobile, setIsMobile] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  const checkMobile = useCallback(
    () => setIsMobile(window.innerWidth < 768),
    [],
  );
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
            {items.map((it, i) => (
              <BeforeAfterCard
                key={it.id}
                item={it}
                isMobile={isMobile}
                onOpen={() => openModal(i)}
              />
            ))}
          </SimpleSlider>
        </div>
      </div>

      {modalIndex !== null && (
        <BeforeAfterModal
          projects={items}
          startIndex={modalIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

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
  item: PropTypes.shape({
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
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      before: PropTypes.string.isRequired,
      after: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    }),
  ).isRequired,
  startIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
