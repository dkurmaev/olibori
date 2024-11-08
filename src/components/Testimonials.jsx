import { useState } from "react";

const testimonialsData = [
    {
        name: "Katrin Schneider",
        title: "Hausbesitzerin",
        feedback:
            "Nach einem Sturmschaden benötigten wir dringend eine Reparatur unseres Dachs. Olidort Bedachungen war sofort zur Stelle und hat die Arbeiten schnell und sauber erledigt. Der Kundenservice war ausgezeichnet, und das Team war sehr freundlich und kompetent. Vielen Dank für die tolle Arbeit!",
        image: "/images/rezension2.png",
    },
    {
        name: "Michael Fischer",
        title: "Architekt",
        feedback:
            "Als Architekt arbeite ich regelmäßig mit Dachdeckerfirmen zusammen, aber Olidort Bedachungen hebt sich durch ihre Zuverlässigkeit und Präzision ab. Die Zusammenarbeit war reibungslos und das Team hat alle unsere Erwartungen übertroffen. Wir freuen uns schon auf zukünftige Projekte mit ihnen.",
        image: "/images/rezension3.png",
    },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? testimonialsData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === testimonialsData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <section className="bg-gray-900 py-20">
            <div className="container mx-auto px-6">
                <div className="relative flex justify-center items-center">
                    {/* Стрелка ВЛЕВО */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 text-teal-500 text-2xl bg-gray-800 p-3 rounded-full hover:bg-teal-500 hover:text-white transition"
                    >
                        &#10094; {/* Символ стрелки влево */}
                    </button>

                    {/* Текущий отзыв */}
                    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 max-w-4xl mx-auto">
                        {/* Изображение клиента */}
                        <div className="w-48 h-48 relative mx-auto md:mx-0">
                            <img
                                src={testimonialsData[currentIndex].image}
                                alt={testimonialsData[currentIndex].name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        {/* Отзыв */}
                        <div className="text-white text-center md:text-left md:max-w-md">
                            <p className="text-lg italic mb-4">{testimonialsData[currentIndex].feedback}</p>
                            <h3 className="text-2xl font-bold">{testimonialsData[currentIndex].name}</h3>
                            <p className="text-yellow-500">{testimonialsData[currentIndex].title}</p>
                        </div>
                    </div>

                    {/* Стрелка ВПРАВО */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 text-teal-500 text-2xl bg-gray-800 p-3 rounded-full hover:bg-teal-500 hover:text-white transition"
                    >
                        &#10095; {/* Символ стрелки вправо */}
                    </button>
                </div>

                {/* Индикаторы слайдов */}
                <div className="flex justify-center space-x-2 mt-6">
                    {testimonialsData.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`cursor-pointer w-3 h-3 rounded-full ${idx === currentIndex ? "bg-teal-500" : "bg-gray-200"}`}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
