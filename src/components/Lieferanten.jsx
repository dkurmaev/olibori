import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import { useRef, useEffect } from "react";

const sliderImages = [
  { id: 1, src: "/images/mapei.png", alt: "Mapei Logo" },
  { id: 2, src: "/images/bst.svg", alt: "bst Logo" },
  { id: 3, src: "/images/bauder.svg", alt: "Bauder Logo" },
  { id: 4, src: "/images/rockwool.png", alt: "Rockwool Logo" },
];

const Lieferanten = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      new KeenSlider(sliderRef.current, {
        loop: true,
        mode: "free",
        slides: { perView: 1, spacing: 10 },
        breakpoints: {
          "(min-width: 640px)": { slides: { perView: 2, spacing: 40 } },
          "(min-width: 1024px)": { slides: { perView: 4, spacing: 80 } },
        },
      });
    }
  }, []);

  return (
    <section className="py-16 bg-gray-400">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-xl md:text-5xl sm:text-2xl font-bold uppercase text-gray-800 tracking-wider mb-12 border-b-2 border-yellow-400 inline-block pb-1">
          Unsere Partner
        </h2>

        <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-6xl my-8 font-heading font-bold text-gray-500 uppercase border-b-2 border-teal-400 pb-1"></h2>

        <div ref={sliderRef} className="keen-slider my-16">
          {sliderImages.map((image) => (
            <div 
            key={image.id} 
            className="keen-slider__slide flex justify-center items-center"
            >
              <img 
              src={image.src} 
              alt={image.alt}
              className="h-20 sm:h-24 md:h-28 lg:h-32 object-contain"
               />
            </div>
          ))}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-6xl my-8 font-heading font-bold text-gray-500 uppercase border-b-2 border-teal-400 pb-1"></h2>
      </div>
    </section>
  );
};

export default Lieferanten;
