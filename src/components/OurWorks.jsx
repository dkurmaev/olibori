import { useState, useEffect } from "react";

const sliderImages = [
  { id: 1, src: "/images/Slide1.jpg", alt: "Arbeit 1" },
  { id: 2, src: "/images/Slide2.jpg", alt: "Arbeit 2" },
  { id: 3, src: "/images/Slide3.jpg", alt: "Arbeit 3" },
  { id: 4, src: "/images/Slide4.jpg", alt: "Arbeit 4" },
  { id: 5, src: "/images/Slide5.jpg", alt: "Arbeit 5" },
  { id: 6, src: "/images/Slide6.jpg", alt: "Arbeit 6" },
  { id: 7, src: "/images/Slide7.jpg", alt: "Arbeit 7" },
  { id: 8, src: "/images/Slide8.jpg", alt: "Arbeit 8" },
  { id: 9, src: "/images/Slide9.jpg", alt: "Arbeit 9" },
  { id: 10, src: "/images/Slide10.jpg", alt: "Arbeit 10" },
  { id: 11, src: "/images/Slide11.jpg", alt: "Arbeit 11" },
  { id: 12, src: "/images/Slide12.jpg", alt: "Arbeit 12" },
  { id: 13, src: "/images/Slide13.jpg", alt: "Arbeit 13" },
  { id: 14, src: "/images/Slide14.jpg", alt: "Arbeit 14" },
  { id: 15, src: "/images/Slide15.jpg", alt: "Arbeit 15" },
];

const OurWorks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Закрытие модального окна по клавише Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Автопереключение слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(sliderImages.length / 3)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.ceil(sliderImages.length / 3) - 1 : prevIndex - 1
    );
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    } else if (touchEnd - touchStart > 50) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const slidesToShow = window.innerWidth < 768 ? 1 : 3;

  return (
    <section id="works" className="py-16 bg-gray-400 inset-0  bg-opacity-100">
      <div className="container mx-auto my-4  py-8 text-center">
        <h2 className="text-xl md:text-5xl sm:text-2xl font-bold uppercase text-gray-800 tracking-wider mb-12 border-b-2 border-yellow-400 inline-block pb-1">
          Unsere Flachdachlösungen
        </h2>
        <div
          className="relative mt-10 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            }}
          >
            {sliderImages.map((image) => (
              <div
                key={image.id}
                className={`min-w-full snap-start md:min-w-[33.33%] p-2`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer"
                  onClick={() => openModal(image)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({
              length: Math.ceil(sliderImages.length / slidesToShow),
            }).map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`cursor-pointer w-3 h-3 rounded-full ${
                  idx === currentIndex ? "bg-teal-500" : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {isModalOpen && selectedImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg max-w-5xl w-full relative">
              <button className="absolute top-2 right-3" onClick={closeModal}>
                <img
                  src="/images/close-icon.gif"
                  alt="close"
                  className="w-16 h-16"
                />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurWorks;
