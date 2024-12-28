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
      id="parallax"
      className="relative bg-fixed bg-center bg-cover flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/parallax.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      {...swipeHandlers} // Добавляем обработчики свайпа
    >
      <div className="bg-black bg-opacity-80 w-full py-16">
        <div className="relative z-10 text-center text-white mx-auto px-6 lg:px-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-wider text-teal-400 mb-12 border-b-2 border-teal-400 inline-block pb-1">
            Kundenfeedback
          </h2>
          <div className="flex flex-col items-center max-w-5xl mx-auto space-y-8 text-center">
            {/* Изображение клиента */}
            <div className="w-24 h-24 relative mx-auto md:mx-0">
                <img
                  src={testimonialsData[currentIndex].image}
                  alt={testimonialsData[currentIndex].name}
                  className="w-full h-full object-contain rounded-full border-2 border-teal-400 shadow-lg"
                />
              </div>
            <div className="relative flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              
              {/* Отзыв */}
              <div className="max-w-lg text-center  break-words tracking-wider leading-loose">
                <p className="text-lg sm:text-xl text-gray-300 mb-4">
                  {testimonialsData[currentIndex].feedback}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-teal-400">
                  {testimonialsData[currentIndex].name}
                </h3>
                <p className="text-yellow-400 text-lg sm:text-xl">
                  {testimonialsData[currentIndex].title}
                </p>
              </div>
            </div>

            {/* Индикаторы слайдов */}
            <div className="flex space-x-2 mt-6">
              {testimonialsData.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`cursor-pointer w-4 h-4 rounded-full transition ${
                    idx === currentIndex
                      ? "bg-teal-400 transform scale-125"
                      : "bg-gray-600"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
