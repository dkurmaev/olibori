const sliderImages = [
  // { id: 1, src: '/images/bauspezilogo.png', alt: 'BauSpezi Logo' },
  // { id: 2, src: '/images/holzgross.svg', alt: 'Holzgross Logo' },
  { id: 3, src: "/images/mapei.png", alt: "Mapei Logo" },
  { id: 4, src: "/images/bauder.svg", alt: "Bauder Logo" },
  { id: 5, src: "/images/rockwool.png", alt: "Rockwool Logo" },
  { id: 6, src: "/images/cemex.png", alt: "CEMEX Logo" },
];

const Lieferanten = () => {
  return (
    <section id="works" className="py-8 bg-white">
      <div className="container mx-auto text-center px-6 mx-4">
        <h2 className="text-3xl sm:text-5xl font-bold uppercase text-gray-500 tracking-wider">
          Unser Partner
        </h2>
        <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-6xl my-8 font-heading font-bold tracking-wider text-gray-500 uppercase border-b-2 border-teal-400 pb-1"></h2>

        {/* Обёртка для горизонтальной прокрутки */}
        <div className="overflow-x-auto my-24 scrollbar-hide">
          <div className="flex gap-24 flex-nowrap">
            {sliderImages.map((image) => (
              <div
                key={image.id}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-2 flex items-center justify-center"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="max-h-24 sm:max-h-32 h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-6xl my-8 font-heading font-bold text-gray-500 uppercase border-b-2 border-teal-400 pb-1"></h2>
      </div>
    </section>
  );
};

export default Lieferanten;
