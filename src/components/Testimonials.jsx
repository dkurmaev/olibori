import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

const testimonialsData = [
  {
    name: "HOLZ-GROSS GmbH",
    title: "Import & Export",
    feedback:
      "Die Flachdachsanierung wurde fachgerecht, pünktlich und mit höchster Sorgfalt durchgeführt. Ein Meisterbetrieb, den wir uneingeschränkt weiterempfehlen können!",
    image: "/images/rezension2.png",
  },
  {
    name: "bauSpezi",
    title: "Baumarkt-Systems",
    feedback:
      "Die Arbeit wurde schnell, sauber und äußerst präzise erledigt. Ein vertrauenswürdiger Dachdecker-Meisterbetrieb, den wir jederzeit wieder beauftragen würden.",
    image: "/images/rezension3.png",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <section
      className="relative h-[80vh] flex items-center justify-center bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/parallax.jpg')",
      }}
    >
      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-black bg-opacity-80"></div>

      {/* Контейнер с отзывом */}
      <div className="relative bg-teal-900 bg-opacity-30 backdrop-blur-lg p-4 sm:p-8 rounded-xl shadow-lg max-w-3xl w-full mx-auto text-white">
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-center my-8 tracking-wider font-heading font-bold text-gray-200 uppercase border-b-2 border-teal-400 pb-1">
          Rezensionen
        </h2>

        {/* Отзыв с анимацией */}
        <div {...swipeHandlers}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="text-center mx-auto md:text-center"
            >
              <p className="text-base my-4 sm:text-lg md:text-xl italic text-gray-300 mb-4">
                {testimonialsData[currentIndex].feedback}
              </p>
              <h3 className="text-lg mt-8 text-right sm:text-2xl md:text-3xl font-bold text-teal-400">
                {testimonialsData[currentIndex].name}
              </h3>
              <p className="text-yellow-400 text-right text-sm sm:text-lg">
                {testimonialsData[currentIndex].title}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-4 mt-16">
          <button
            onClick={prevSlide}
            className="absolute left-8 sm:left-8 md:left-8 lg:left-8  transform -translate-y-1/2 "
          >
            <img
              src="/images/left-arrow.gif"
              alt="left"
              className="w-12 h-12"
            />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 sm:right-8 md:right-8 lg:right-8 transform -translate-y-1/2 "
          >
            <img
              src="/images/right-arrow.gif"
              alt="right"
              className="w-12 h-12"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
