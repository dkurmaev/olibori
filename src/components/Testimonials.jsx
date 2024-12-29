import { useState } from "react";
import { useSwipeable } from "react-swipeable";

const testimonialsData = [
  {
    name: "Katrin Schneider",
    title: "Hausbesitzerin",
    feedback:
      "Nach einem Sturmschaden benötigten wir dringend eine Reparatur unseres Dachs. Olidort Bedachungen war sofort zur Stelle und hat die Arbeiten schnell und sauber erledigt. ",
    image: "/images/rezension2.png",
  },
  {
    name: "Michael Fischer",
    title: "Architekt",
    feedback:
      "Als Architekt arbeite ich regelmäßig mit Dachdeckerfirmen zusammen, aber Olidort Bedachungen hebt sich durch ihre Zuverlässigkeit und Präzision ab. ",
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
    className="relative h-[120vh] flex items-center justify-center bg-fixed bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/parallax.jpg')",
    }}
    {...swipeHandlers}
  >
    {/* Фон с затемнением */}
    <div className="absolute inset-0 bg-black bg-opacity-80  "></div>
  
    {/* Контент блока */}
    <div className="relative bg-teal-900 bg-opacity-30 backdrop-blur-lg p-4 sm:p-8 rounded-xl shadow-lg max-w-4xl w-full mx-auto text-white">
      {/* Заголовок */}
      <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-center my-8 tracking-wider font-heading font-bold text-gray-200 uppercase border-b-2 border-teal-400 pb-1">
        Rezensionen 
      </h2>
  
      {/* Отзыв */}
      <div className="flex flex-col md:flex-row items-center gap-24">
        {/* Изображение пользователя */}
        <div className="flex-shrink-0 ml-10">
          <img
            src={testimonialsData[currentIndex].image}
            alt={testimonialsData[currentIndex].name}
            className="w-auto h-auto sm:w-8 sm:h-8 md:w-36 md:h-64 rounded-full object-cover "
          />
        </div>
  
        {/* Текст отзыва */}
        <div className="text-center md:text-left flex-1">
          <p className="text-base sm:text-lg md:text-xl italic text-gray-300 mb-2">
            {testimonialsData[currentIndex].feedback}
          </p>
          <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-teal-400">
            {testimonialsData[currentIndex].name}
          </h3>
          <p className="text-yellow-400 text-sm sm:text-lg">
            {testimonialsData[currentIndex].title}
          </p>
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
  
      {/* Кнопки навигации */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer text-teal-400 hover:text-teal-300 text-xl sm:text-2xl">
        <button onClick={prevSlide}>&#8249;</button>
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-teal-400 hover:text-teal-300 text-xl sm:text-2xl">
        <button onClick={nextSlide}>&#8250;</button>
      </div>
    </div>
  </section>
  

  );
};

export default Testimonials;
