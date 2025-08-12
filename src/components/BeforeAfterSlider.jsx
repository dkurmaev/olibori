import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import PropTypes from "prop-types";

// Оптимизированный ImageSmart компонент с правильными путями к WebP
function ImageSmart({
  src,
  alt,
  className = "",
  mode = "cover",
  w = 800,
  h = 600,
  ...imgProps
}) {
  // Извлекаем путь после /images/
  const imagePath = src.startsWith("/images/")
    ? src.slice("/images/".length)
    : src.replace(/^\//, "");

  // Имя файла без расширения
  const baseNoExt = imagePath.replace(/\.(jpe?g|png|webp|avif)$/i, "");

  // Генерируем пути к WebP в /webp/projekte/
  const webpBase = `/webp/projekte/`;
  const webp480 = `${webpBase}480/${baseNoExt.replace("projekte/", "")}.webp`;
  const webp800 = `${webpBase}800/${baseNoExt.replace("projekte/", "")}.webp`;
  const webp1200 = `${webpBase}1200/${baseNoExt.replace("projekte/", "")}.webp`;

  const objectClass = mode === "cover" ? "object-cover" : "object-contain";
  const classes = `${className} ${objectClass}`.trim();

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${webp480} 480w, ${webp800} 800w, ${webp1200} 1200w`}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <img
        src={src}
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
        alt={alt}
        className={classes}
        {...imgProps}
        onError={(e) => {
          if (imgProps.onError) imgProps.onError(e);
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/images/placeholder.jpg";
        }}
      />
    </picture>
  );
}

ImageSmart.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  mode: PropTypes.oneOf(["cover", "contain"]),
  w: PropTypes.number,
  h: PropTypes.number,
};

// Данные проектов
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
];

function CardSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-100" />
  );
}

// Оптимизированная карточка "до/после"
function BeforeAfterCard({ project, isMobile, onOpen }) {
  const [tapped, setTapped] = useState(false);
  const [afterPreloaded, setAfterPreloaded] = useState(false);
  const [loadedBefore, setLoadedBefore] = useState(false);
  const [loadedAfter, setLoadedAfter] = useState(false);
  const [errorBefore, setErrorBefore] = useState(false);
  const [errorAfter, setErrorAfter] = useState(false);

  const showAfter = isMobile ? tapped : false;

  const toggle = useCallback(
    () => isMobile && setTapped((v) => !v),
    [isMobile]
  );
  const handleOpen = useCallback(
    (e) => {
      e?.stopPropagation();
      onOpen?.();
    },
    [onOpen]
  );

  // Прелоад изображения "после" при наведении
  const handleMouseEnter = useCallback(() => {
    if (!afterPreloaded && !errorAfter) {
      const img = new Image();
      img.src = project.after;
      img.onload = () => setAfterPreloaded(true);
      img.onerror = () => setErrorAfter(true);
    }
  }, [afterPreloaded, errorAfter, project.after]);

  return (
    <div
      className="relative group rounded-lg border border-gray-200 shadow-lg overflow-hidden cursor-pointer bg-white content-auto"
      style={{ aspectRatio: "4 / 3" }}
      onMouseEnter={handleMouseEnter}
      onClick={toggle}
      onDoubleClick={handleOpen}
      aria-label={`Vorher/Nachher Vergleich: ${project.title}`}
      role="button"
      tabIndex={0}
    >
      {(!loadedBefore || errorBefore) && <CardSkeleton />}

      <ImageSmart
        src={errorBefore ? "/images/placeholder.jpg" : project.before}
        alt={`Vorher: ${project.title}`}
        onLoad={() => setLoadedBefore(true)}
        onError={() => setErrorBefore(true)}
        className={`absolute inset-0 w-full h-full transition-all duration-500 ${
          showAfter
            ? "opacity-0 scale-100"
            : "opacity-100 group-hover:opacity-0 group-hover:scale-105"
        }`}
        mode="cover"
      />

      {(!loadedAfter || errorAfter) && showAfter && <CardSkeleton />}
      {(!errorAfter || errorBefore) && (
        <ImageSmart
          src={errorAfter ? "/images/placeholder.jpg" : project.after}
          alt={`Nachher: ${project.title}`}
          onLoad={() => setLoadedAfter(true)}
          onError={() => setErrorAfter(true)}
          className={`absolute inset-0 w-full h-full transition-all duration-500 ${
            showAfter
              ? "opacity-100 scale-105"
              : "opacity-0 group-hover:opacity-100 group-hover:scale-105"
          }`}
          mode="cover"
        />
      )}

      <div
        className={`absolute top-2 left-2 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur transition-colors ${
          isMobile
            ? tapped
              ? "bg-slate-900/30 text-white/50"
              : "bg-slate-900/80 text-white"
            : "bg-slate-900/80 text-white group-hover:bg-slate-900/30 group-hover:text-white/50"
        }`}
      >
        VORHER
      </div>

      <div
        className={`absolute top-2 right-2 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur transition-colors ${
          isMobile
            ? tapped
              ? "bg-emerald-600/90 text-white"
              : "bg-emerald-600/30 text-white/60"
            : "bg-emerald-600/30 text-white/60 group-hover:bg-emerald-600/90 group-hover:text-white"
        }`}
      >
        NACHHER
      </div>

      <div className="absolute bottom-10 right-2 bg-white/85 text-[11px] px-2 py-[3px] rounded shadow text-gray-800 font-medium pointer-events-none">
        {isMobile
          ? "👆 Tippen (Doppeltipp: Vollbild)"
          : "🖱️ Hover • Doppelklick: Vollbild"}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2 text-center">
        {project.title} – {project.location}, {project.year}
      </div>

      {isMobile && (
        <button
          type="button"
          onClick={handleOpen}
          className="absolute left-2 bottom-2 text-xs bg-white/90 text-gray-800 px-2 py-1 rounded shadow"
          aria-label="Vollbildmodus öffnen"
        >
          Vollbild
        </button>
      )}
    </div>
  );
}

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

// Оптимизированный слайдер
function SimpleSlider({ children, slidesPerViewDesktop = 3 }) {
  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  const slidesToShow = isMobile ? 1 : slidesPerViewDesktop;
  const totalSlides = slides.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  const trackWidth = (totalSlides * 100) / slidesToShow;
  const slideWidth = (100 / totalSlides) * slidesToShow;
  const translateX = (index * 100) / totalSlides;

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex]
  );
  const goToSlide = useCallback((i) => setIndex(i), []);

  return (
    <div className="relative" role="region" aria-label="Galerie Vorher/Nachher">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            width: `${trackWidth}%`,
            transform: `translateX(-${translateX}%)`,
          }}
        >
          {slides.map((child, i) => (
            <div
              key={i}
              className="px-2 md:px-3"
              style={{ width: `${slideWidth}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <>
          <button
            onClick={goPrev}
            disabled={index === 0}
            className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Vorheriges Bild"
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
            disabled={index === maxIndex}
            className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Nächstes Bild"
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
        </>
      )}

      {maxIndex > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-yellow-400" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Gehe zu Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

SimpleSlider.propTypes = {
  children: PropTypes.node.isRequired,
  slidesPerViewDesktop: PropTypes.number,
};
// Добавь этот компонент перед BeforeAfterModal
const AnimatedModalHints = () => {
  const [currentHint, setCurrentHint] = useState(0);

  const hints = [
    {
      text: "ESC zum Schließen",
      key: "ESC",
      icon: "×",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      text: "← → zum Wechseln",
      key: "← →",
      icon: "⟷",
      color: "text-teal-500",
      bgColor: "bg-teal-50",
    },
    {
      text: "↑ ↓ zum Vergleichen",
      key: "↑ ↓",
      icon: "⟷",
      color: "text-teal-500",
      bgColor: "bg-teal-50",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHint((prev) => (prev + 1) % hints.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentHintData = hints[currentHint];

  return (
    <div className="text-xs hidden md:block">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-500 ${currentHintData.bgColor} border hover:scale-105`}
      >
        <span
          className={`text-sm font-bold ${currentHintData.color} animate-pulse`}
        >
          {currentHintData.icon}
        </span>
        <span className={`font-medium ${currentHintData.color}`}>
          {currentHintData.text}
        </span>
        <kbd
          className={`px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/70 ${currentHintData.color}`}
        >
          {currentHintData.key}
        </kbd>
      </div>
    </div>
  );
};

function BeforeAfterModal({ projects, startIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [divider, setDivider] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef();

  const currentProject = projects[currentIndex];

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
    setDivider(50);
  }, [projects.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % projects.length);
    setDivider(50);
  }, [projects.length]);

  const updateDivider = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setDivider((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      updateDivider(e.clientX);
    },
    [updateDivider]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(() => {
          updateDivider(e.clientX);
        });
      }
    },
    [isDragging, updateDivider]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    cancelAnimationFrame(animationRef.current);
  }, []);

  const handleTouchStart = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      updateDivider(e.touches[0].clientX);
    },
    [updateDivider]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (isDragging) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(() => {
          updateDivider(e.touches[0].clientX);
        });
      }
    },
    [isDragging, updateDivider]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    cancelAnimationFrame(animationRef.current);
  }, []);

  // Эффекты для обработки событий
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        cancelAnimationFrame(animationRef.current);
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

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
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      cancelAnimationFrame(animationRef.current);
    };
  }, [onClose, prev, next]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 bg-black/80 transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`relative bg-black/5 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] flex flex-col transition-transform duration-300 border border-white/20 ${
          mounted ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <AnimatedModalHints />
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Schließen"
            >
              <img
                src="/images/close-icon.gif"
                alt="close"
                className="w-8 h-8"
              />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative bg-gray-100 cursor-col-resize select-none flex-1 min-h-0 aspect-[16/9] sm:aspect-[16/9] xs:aspect-[4/3]"
          style={{ minHeight: "280px" }}
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
            className={`absolute top-0 bottom-0 w-1 bg-white/80 shadow-lg z-20 ${
              isDragging ? "cursor-grabbing" : "cursor-col-resize"
            }`}
            style={{ left: `${divider}%` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(divider)}
            aria-label="Vergleichsregler"
            tabIndex={0}
          >
            <div className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-md flex items-center justify-center">
              <svg
                className="w-3 h-3 sm:w-5 sm:h-5 text-gray-600"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 12l4-4 4 4-4 4-4-4z" />
                <path d="M16 12l-4 4-4-4 4-4 4 4z" />
              </svg>
            </div>
          </div>

          <div
            className={`absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-semibold shadow-lg transition-opacity duration-300 ${
              divider < 20
                ? "bg-red-600/20 text-white/50"
                : divider < 40
                ? "bg-red-600/50 text-white/70"
                : "bg-red-600/90 text-white"
            }`}
          >
            VORHER
          </div>

          <div
            className={`absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-semibold shadow-lg transition-opacity duration-300 ${
              divider > 80
                ? "bg-green-600/20 text-white/50"
                : divider > 60
                ? "bg-green-600/50 text-white/70"
                : "bg-green-600/90 text-white"
            }`}
          >
            NACHHER
          </div>

          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 sm:px-3 py-1 sm:py-2 rounded-lg pointer-events-none">
            <div className="text-center">
              <div>Ziehen zum Vergleichen</div>
              <div className="text-white/70 hidden sm:block">
                ← → wechseln • ESC schließen
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4 text-center border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <h3
            id="modal-title"
            className="text-base sm:text-lg font-semibold text-gray-800"
          >
            {currentProject.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            {currentProject.location}, {currentProject.year}
          </p>
        </div>
      </div>
    </div>
  );
}

BeforeAfterModal.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      before: PropTypes.string.isRequired,
      after: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    })
  ).isRequired,
  startIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

// Основной компонент
export default function BeforeAfterSlider() {
  const [isMobile, setIsMobile] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

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
          <SimpleSlider slidesPerViewDesktop={3}>
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
        />
      )}
    </section>
  );
}
