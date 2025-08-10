import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import PropTypes from "prop-types";

// Улучшенный компонент ImageSmart с PropTypes и используемый в коде
function ImageSmart({
  src,
  alt,
  className = "",
  mode = "cover",
  w = 800,
  h = 600,
}) {
  const base = `${src}${src.includes("?") ? "&" : "?"}auto=format&fit=crop`;
  const classes = `${className} ${
    mode === "cover" ? "object-cover" : "object-contain"
  }`.trim();

  return (
    <img
      src={`${base}&w=${w}&q=70`}
      srcSet={`
        ${base}&w=480&q=60 480w,
        ${base}&w=800&q=70 800w,
        ${base}&w=1200&q=70 1200w
      `}
      sizes="(max-width: 768px) 100vw, 33vw"
      width={w}
      height={h}
      loading="lazy"
      decoding="async"
      alt={alt}
      className={classes}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/images/placeholder.jpg";
      }}
    />
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

// Уникальные данные без дублирования
const items = [
  {
    before: "/images/projekte/project1-before.jpg",
    after: "/images/projekte/project1-after.jpg",
    title: "Flachdach-Sanierung",
    location: "Düsseldorf",
    year: "2024",
  },
  {
    before: "/images/projekte/project2-before.jpg",
    after: "/images/projekte/project2-after.jpg",
    title: "Komplettumbau",
    location: "Köln",
    year: "2023",
  },
  {
    before: "/images/projekte/project3-before.jpg",
    after: "/images/projekte/project3-after.jpg",
    title: "Dachsanierung",
    location: "Essen",
    year: "2024",
  },
  {
    before: "/images/projekte/project4-before.jpg",
    after: "/images/projekte/project4-after.jpg",
    title: "Fassadenrenovierung",
    location: "Berlin",
    year: "2023",
  },
  {
    before: "/images/projekte/project5-before.jpg",
    after: "/images/projekte/project5-after.jpg",
    title: "Dachstuhlsanierung",
    location: "Hamburg",
    year: "2024",
  },
  {
    before: "/images/projekte/project6-before.jpg",
    after: "/images/projekte/project6-after.jpg",
    title: "Komplettsanierung",
    location: "München",
    year: "2023",
  },
];

function CardSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-100" />
  );
}

function BeforeAfterCard({ item, isMobile, onOpen }) {
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

  // Прелоад "после" при первом наведении
  const handleMouseEnter = useCallback(() => {
    if (!afterPreloaded && !errorAfter) {
      const img = new Image();
      img.src = item.after;
      img.onload = () => setAfterPreloaded(true);
      img.onerror = () => setErrorAfter(true);
    }
  }, [afterPreloaded, errorAfter, item.after]);

  return (
    <div
      className="relative group rounded-lg border border-gray-200 shadow-lg overflow-hidden cursor-pointer bg-white"
      style={{ aspectRatio: "4 / 3" }}
      onMouseEnter={handleMouseEnter}
      onClick={toggle}
      onDoubleClick={handleOpen}
      aria-label={`Vorher/Nachher Vergleich: ${item.title}`}
      role="button"
      tabIndex={0}
      title="Doppelklick für Vollbild"
    >
      {/* BEFORE */}
      {(!loadedBefore || errorBefore) && <CardSkeleton />}
      <ImageSmart
        src={errorBefore ? "/images/placeholder.jpg" : item.before}
        alt={`Vorher: ${item.title}`}
        onLoad={() => setLoadedBefore(true)}
        onError={() => setErrorBefore(true)}
        className={`absolute inset-0 w-full h-full transition-all duration-500 ${
          showAfter
            ? "opacity-0 scale-100"
            : "opacity-100 group-hover:opacity-0 group-hover:scale-105"
        }`}
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
          className={`absolute inset-0 w-full h-full transition-all duration-500 ${
            showAfter
              ? "opacity-100 scale-105"
              : "opacity-0 group-hover:opacity-100 group-hover:scale-105"
          }`}
          mode="cover"
        />
      )}

      {/* Бейджи */}
      <div
        className={`absolute top-2 left-2 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur transition-colors ${
          isMobile
            ? tapped
              ? "bg-slate-900/30 text-white/50"
              : "bg-slate-900/80 text-white"
            : "bg-slate-900/80 text-white group-hover:bg-slate-900/30 group-hover:text-white/50"
        }`}
        aria-hidden="true"
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
        aria-hidden="true"
      >
        NACHHER
      </div>

      {/* Хинт */}
      <div
        className="absolute bottom-10 right-2 bg-white/85 text-[11px] px-2 py-[3px] rounded shadow text-gray-800 font-medium pointer-events-none"
        aria-hidden="true"
      >
        {isMobile
          ? "👆 Tippen (Doppeltipp: Vollbild)"
          : "🖱️ Hover • Doppelklick: Vollbild"}
      </div>

      {/* Подпись */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2 text-center">
        {item.title} – {item.location}, {item.year}
      </div>

      {/* Кнопка Vollbild на мобиле */}
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

function SimpleSlider({ children, slidesPerViewDesktop = 3 }) {
  // Убраны параметры auto и intervalMs
  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);

  // Убрана логика авто-прокрутки
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  const k = isMobile ? 1 : slidesPerViewDesktop;
  const total = slides.length;
  const maxIndex = Math.max(0, total - k);

  const trackWidthPct = (total * 100) / k;
  const oneSlidePct = (100 / total) * k;
  const translatePct = (index * 100) / total;

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(maxIndex, i + 1));
  }, [maxIndex]);

  const goToSlide = useCallback((i) => {
    setIndex(i);
  }, []);

  return (
    <div className="relative" role="region" aria-label="Galerie Vorher/Nachher">
      <div className="overflow-hidden">
        <div
          className="flex"
          style={{
            width: `${trackWidthPct}%`,
            transform: `translateX(-${translatePct}%)`,
            transition: "none", // Отключаем анимацию
          }}
          aria-live="polite"
        >
          {slides.map((child, i) => (
            <div
              key={i}
              className="px-2 md:px-3"
              style={{ width: `${oneSlidePct}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Стрелки */}
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

      {/* Точки */}
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

function BeforeAfterModal({ items, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const [divider, setDivider] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef();

  const item = items[idx];

  // Навигация
  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + items.length) % items.length);
    setDivider(50);
  }, [items.length]);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % items.length);
    setDivider(50);
  }, [items.length]);

  // Обновление позиции ползунка
  const updateDivider = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setDivider((x / rect.width) * 100);
  }, []);

  // Обработчики событий
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

  // Глобальные обработчики
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

  // Обработка клавиш
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

  // Анимация появления
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`relative bg-white rounded-lg shadow-2xl overflow-hidden max-w-6xl w-full transition-transform duration-300 ${
          mounted ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{idx + 1}</span> von {items.length}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500 hidden sm:block">
              ESC zum Schließen • ← → zum Wechseln
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Schließen"
              title="Schließen"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Область сравнения */}
        <div
          ref={containerRef}
          className="relative bg-gray-100 cursor-col-resize select-none"
          style={{ aspectRatio: "16 / 9", minHeight: "300px" }}
        >
          {/* Изображение "После" (полное) */}
          <ImageSmart
            src={item.after}
            alt={`Nachher: ${item.title}`}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            mode="contain"
          />

          {/* Изображение "До" с маской */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - divider}% 0 0)` }}
          >
            <ImageSmart
              src={item.before}
              alt={`Vorher: ${item.title}`}
              className="w-full h-full object-contain pointer-events-none"
              mode="contain"
            />
          </div>

          {/* Ползунок */}
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
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 12l4-4 4 4-4 4-4-4z" />
                <path d="M16 12l-4 4-4-4 4-4 4 4z" />
              </svg>
            </div>
          </div>

          {/* Улучшенные бейджи с плавными переходами */}
          <div
            className={`absolute top-4 left-4 px-3 py-1.5 rounded-md text-sm font-semibold shadow-lg transition-opacity duration-300 ${
              divider < 20
                ? "bg-red-600/20 text-white/50"
                : divider < 40
                ? "bg-red-600/50 text-white/70"
                : "bg-red-600/90 text-white"
            }`}
            aria-hidden="true"
          >
            VORHER
          </div>
          <div
            className={`absolute top-4 right-4 px-3 py-1.5 rounded-md text-sm font-semibold shadow-lg transition-opacity duration-300 ${
              divider > 80
                ? "bg-green-600/20 text-white/50"
                : divider > 60
                ? "bg-green-600/50 text-white/70"
                : "bg-green-600/90 text-white"
            }`}
            aria-hidden="true"
          >
            NACHHER
          </div>

          {/* Подсказка */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg pointer-events-none">
            <div className="text-center">
              <div>Ziehen zum Vergleichen</div>
              <div className="text-white/70">← → wechseln • ESC schließen</div>
            </div>
          </div>
        </div>

        {/* Подпись */}
        <div className="p-4 text-center border-t border-gray-200 bg-gray-50">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-800">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600">
            {item.location}, {item.year}
          </p>
        </div>
      </div>
    </div>
  );
}

BeforeAfterModal.propTypes = {
  items: PropTypes.arrayOf(
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

  const openModal = useCallback((index) => {
    setModalIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setModalIndex(null);
  }, []);

  return (
    <section
      id="before-after-card"
      className="py-16 bg-white"
      style={{ scrollMarginBlockStart: "88px" }}
    >
      <div className="container mx-auto px-4 py-8 text-center">
        {/* Заголовок */}
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
            {items.map((item, i) => (
              <BeforeAfterCard
                key={item.id}
                item={item}
                isMobile={isMobile}
                onOpen={() => openModal(i)}
              />
            ))}
          </SimpleSlider>
        </div>
      </div>

      {modalIndex !== null && (
        <BeforeAfterModal
          items={items}
          startIndex={modalIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
