import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const testimonialsData = [
  {
    name: "Katrin Schneider",
    title: "Hausbesitzerin",
    feedback:
      "Nach einem Sturmschaden benötigten wir dringend eine Reparatur unseres Dachs. Olidort Bedachungen war sofort zur Stelle und hat die Arbeiten schnell und sauber erledigt. Der Kundenservice war ausgezeichnet, und das Team war sehr freundlich und kompetent.",
    image: "/images/rezension2.png",
  },
  {
    name: "Michael Fischer",
    title: "Architekt",
    feedback:
      "Als Architekt arbeite ich regelmäßig mit Dachdeckerfirmen zusammen, aber Olidort Bedachungen hebt sich durch ihre Zuverlässigkeit und Präzision ab. Die Zusammenarbeit war reibungslos und das Team hat alle unsere Erwartungen übertroffen.",
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
  className="relative h-[100vh] flex items-center justify-center bg-fixed bg-cover bg-center "
  style={{
    backgroundImage: "url('/images/parallax.jpg')",
  }}
  {...swipeHandlers}
>
  {/* Добавляем дополнительный слой размытия */}
  <div className="absolute inset-0 bg-black bg-opacity-80 filter blur-lg"></div>

  {/* Полупрозрачный блок отзывов */}
  <div className="relative bg-teal-900 bg-opacity-70 backdrop-blur-lg p-8 sm:p-12 rounded-xl shadow-lg max-w-4xl mx-auto text-gray-400">
    <h2 className="text-3xl sm:text-4xl font-bold text-center uppercase mb-8">
      Rezensionen Über Uns
    </h2>

    {/* Слайд с отзывом */}
    <div className="flex flex-col md:flex-row items-center gap-8">
      {/* Изображение пользователя */}
      <img
        src={testimonialsData[currentIndex].image}
        alt={testimonialsData[currentIndex].name}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover  "
      />

      {/* Текст отзыва */}
      <div className="text-center md:text-left">
        <p className="text-lg sm:text-xl italic text-gray-300 mb-4">
          {testimonialsData[currentIndex].feedback}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-teal-400">
          {testimonialsData[currentIndex].name}
        </h3>
        <p className="text-yellow-400 text-lg">{testimonialsData[currentIndex].title}</p>
      </div>
    </div>

    {/* Индикаторы */}
    <div className="flex justify-center items-center gap-2 mt-6">
      {testimonialsData.map((_, idx) => (
        <div
          key={idx}
          onClick={() => setCurrentIndex(idx)}
          className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full cursor-pointer transition ${
            idx === currentIndex
              ? "bg-teal-400 transform scale-125"
              : "bg-gray-500"
          }`}
        ></div>
      ))}
    </div>

    {/* Стрелки переключения */}
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-teal-400 hover:text-teal-300 text-2xl sm:text-4xl">
      <button onClick={prevSlide}>&#8249;</button>
    </div>
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-teal-400 hover:text-teal-300 text-2xl sm:text-4xl">
      <button onClick={nextSlide}>&#8250;</button>
    </div>
  </div>
</section>

  );
};

export default Testimonials;
