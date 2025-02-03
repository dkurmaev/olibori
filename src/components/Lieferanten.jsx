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
        <h2 className="text-xl md:text-5xl font-bold uppercase text-gray-800 mb-12">
          Unser Partner
        </h2>
        <div ref={sliderRef} className="keen-slider my-16">
          {sliderImages.map((image) => (
            <div key={image.id} className="keen-slider__slide">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lieferanten;