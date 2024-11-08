import { useState, useEffect } from 'react';

const sliderImages = [
    { id: 1, src: '/images/iko.svg', alt: 'IKO Logo' },
    { id: 2, src: '/images/soprema.svg', alt: 'Soprema Logo' },
    { id: 3, src: '/images/velux.svg', alt: 'VELUX Logo' },
    { id: 4, src: '/images/zambelli.svg', alt: 'Zambelli Logo' },
    { id: 5, src: '/images/lindner.svg', alt: 'Lindner Logo' },
    { id: 6, src: '/images/cemex.png', alt: 'CEMEX Logo' },
];

const Lieferanten = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Устанавливаем интервал для автоматической прокрутки
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Поменять слайд каждые 3 секунды

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(sliderImages.length / 3));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.ceil(sliderImages.length / 3) - 1 : prevIndex - 1));
    };

    return (
        <section id="works" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className=" font-bold text-center"></h2>
                <div className="relative mt-10 overflow-hidden">
                    {/* Слайды */}
                    <div
                        className="flex transition-transform duration-300"
                        style={{ transform: `translateX(-${currentIndex * (100 / 6)}%)` }} // Каждый слайд занимает 33.33%
                    >
                        {sliderImages.map((image) => (
                            <div key={image.id} className="min-w-[33.3%] p-2 flex items-center ">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="max-h-16 h-auto object-contain"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Кнопки для навигации внутри слайдов */}
                    <button
                        onClick={prevSlide}
                        className=""
                    >
                         {/* Стрелка влево */}
                    </button>
                    <button
                        onClick={nextSlide}
                        className=""
                    >
                        {/* Стрелка вправо */}
                    </button>

                    {/* Индикаторы */}
                    {/* <div className="flex justify-center space-x-2 mt-6">
                        {Array.from({ length: Math.ceil(sliderImages.length / 3) }).map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`cursor-pointer w-3 h-3 rounded-full ${idx === currentIndex ? "bg-teal-500" : "bg-gray-200"}`}
                            ></div>
                        ))}
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default Lieferanten;
