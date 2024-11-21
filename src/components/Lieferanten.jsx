const sliderImages = [
    { id: 1, src: '/images/bauspezilogo.png', alt: 'BauSpezi Logo' },
    { id: 2, src: '/images/holzgross.svg', alt: 'Holzgross Logo' },
    { id: 3, src: '/images/mapei.png', alt: 'Mapei Logo' },
    { id: 4, src: '/images/bauder.svg', alt: 'Bauder Logo' },
    { id: 5, src: '/images/rockwool.png', alt: 'Rockwool Logo' },
    { id: 6, src: '/images/cemex.png', alt: 'CEMEX Logo' },
];

const Lieferanten = () => {
    return (
        <section id="works" className="py-8 bg-white">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-6xl my-8 font-heading font-bold text-gray-500 uppercase border-b-2 border-gray-300 pb-4">Uns vertrauen</h2>
                <div className="flex justify-center my-20 gap-6">
                    {sliderImages.map((image) => (
                        <div key={image.id} className="flex-shrink-0 w-[16.66%] p-2 flex items-center justify-center">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="max-h-16 h-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Lieferanten;
