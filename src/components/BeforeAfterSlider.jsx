import React, { useEffect, useMemo, useState, useRef } from "react";

import PropTypes from "prop-types";

/** ДАННЫЕ — подставь свои кейсы */
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
];

/* ===== Карточка на странице (hover/tap) ===== */

function BeforeAfterCard({ item, isMobile, onOpen }) {
  const [tapped, setTapped] = useState(false);
  const [afterPreloaded, setAfterPreloaded] = useState(false);
  const [loadedBefore, setLoadedBefore] = useState(false);
  const [loadedAfter, setLoadedAfter] = useState(false);

  const showAfter = isMobile ? tapped : false;
  const toggle = () => isMobile && setTapped((v) => !v);

  // Прелоад "после" при первом наведении
  const handleMouseEnter = () => {
    if (!afterPreloaded) {
      const img = new Image();
      img.src = item.after;
      img.onload = () => setAfterPreloaded(true);
    }
  };
  BeforeAfterCard.propTypes = {
    item: PropTypes.shape({
      before: PropTypes.string.isRequired,
      after: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    }).isRequired,
    isMobile: PropTypes.bool.isRequired,
    onOpen: PropTypes.func,
  };
  return (
    <div
      className="relative group rounded-lg border border-gray-200 shadow-lg overflow-hidden cursor-pointer bg-white"
      style={{ aspectRatio: "4 / 3" }}
      onMouseEnter={handleMouseEnter}
      onClick={toggle}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen?.();
      }}
      title="Doppelklick für Vollbild"
    >
      {/* BEFORE */}
      {!loadedBefore && <CardSkeleton />}
      <img
        src={item.before}
        alt="Vorher"
        onLoad={() => setLoadedBefore(true)}
        className={
          "absolute inset-0 w-full h-full object-cover transition-all duration-500 " +
          (showAfter
            ? "opacity-0 scale-100"
            : "opacity-100 group-hover:opacity-0 group-hover:scale-105")
        }
        loading="lazy"
        decoding="async"
      />

      {/* AFTER */}
      {!loadedAfter && showAfter && <CardSkeleton />}
      <img
        src={item.after}
        alt="Nachher"
        onLoad={() => setLoadedAfter(true)}
        className={
          "absolute inset-0 w-full h-full object-cover transition-all duration-500 " +
          (showAfter
            ? "opacity-100 scale-105"
            : "opacity-0 group-hover:opacity-100 group-hover:scale-105")
        }
        loading="lazy"
        decoding="async"
      />

      {/* Бейджи */}
      <div
        className={
          "absolute top-2 left-2 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur " +
          (isMobile
            ? tapped
              ? "bg-slate-900/30 text-white/50"
              : "bg-slate-900/80 text-white"
            : "bg-slate-900/80 text-white group-hover:bg-slate-900/30 group-hover:text-white/50")
        }
      >
        VORHER
      </div>
      <div
        className={
          "absolute top-2 right-2 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur " +
          (isMobile
            ? tapped
              ? "bg-emerald-600/90 text-white"
              : "bg-emerald-600/30 text-white/60"
            : "bg-emerald-600/30 text-white/60 group-hover:bg-emerald-600/90 group-hover:text-white")
        }
      >
        NACHHER
      </div>

      {/* Хинт */}
      <div className="absolute bottom-10 right-2 bg-white/85 text-[11px] px-2 py-[3px] rounded shadow text-gray-800 font-medium pointer-events-none">
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
          onClick={(e) => {
            e.stopPropagation();
            onOpen?.();
          }}
          className="absolute left-2 bottom-2 text-xs bg-white/90 text-gray-800 px-2 py-1 rounded shadow"
        >
          Vollbild
        </button>
      )}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-100" />
  );
}

/* ===== Свой слайдер (без зависимостей) ===== */
function SimpleSlider({
  children,
  slidesPerViewDesktop = 3,
  auto = true,
  intervalMs = 10555,
}) {
  SimpleSlider.propTypes = {
    children: PropTypes.node.isRequired,
    slidesPerViewDesktop: PropTypes.number,
    auto: PropTypes.bool,
    intervalMs: PropTypes.number,
  };
  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);

  const k = isMobile ? 1 : slidesPerViewDesktop;
  const total = slides.length;
  const maxIndex = Math.max(0, total - k);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!auto || total <= k) return;
    const t = setInterval(
      () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
      intervalMs
    );
    return () => clearInterval(t);
  }, [auto, intervalMs, total, k, maxIndex]);

  const trackWidthPct = (total * 100) / k;
  const oneSlidePct = (100 / total) * k;
  const translatePct = (index * 100) / total;

  return (
    <div className="relative" role="region" aria-label="Galerie Vorher/Nachher">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${trackWidthPct}%`,
            transform: `translateX(-${translatePct}%)`,
          }}
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
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Zurück"
            title="Zurück"
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
            onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
            disabled={index === maxIndex}
            className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Weiter"
            title="Weiter"
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
        <div
          className="flex justify-center mt-6 space-x-2"
          aria-label="Pagination"
        >
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === index
                  ? "bg-yellow-400 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Gehe zu Slide ${i + 1}`}
              title={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ===== Модалка с ползунком (Before/After Divider) ===== */
function BeforeAfterModal({ items, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const [divider, setDivider] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Prop Types
  BeforeAfterModal.propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
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

  // Навигация
  const prev = () => {
    setIdx((i) => (i - 1 + items.length) % items.length);
    setDivider(50);
  };

  const next = () => {
    setIdx((i) => (i + 1) % items.length);
    setDivider(50);
  };

  // Обновление позиции ползунка
  const updateDivider = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setDivider((x / rect.width) * 100);
  };

  // Обработчики событий
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateDivider(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) updateDivider(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateDivider(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) updateDivider(e.touches[0].clientX);
  };

  const handleTouchEnd = () => setIsDragging(false);

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
      };
    }
  }, [isDragging]);

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
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Анимация появления
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const item = items[idx];

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vorher-Nachher Vergleich"
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
              <img
                src="/images/close-icon.gif"
                alt="close"
                className="w-8 h-8"
              />
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
          <img
            src={item.after}
            alt="Nachher"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            draggable="false"
          />

          {/* Изображение "До" с маской */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - divider}% 0 0)` }}
          >
            <img
              src={item.before}
              alt="Vorher"
              className="w-full h-full object-contain pointer-events-none"
              draggable="false"
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
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24">
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
          <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
          <p className="text-sm text-gray-600">
            {item.location}, {item.year}
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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
                key={i}
                item={item}
                isMobile={isMobile}
                onOpen={() => setModalIndex(i)}
              />
            ))}
          </SimpleSlider>
        </div>
      </div>

      {modalIndex !== null && (
        <BeforeAfterModal
          items={items}
          startIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </section>
  );
}
