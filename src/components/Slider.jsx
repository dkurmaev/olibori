const servicesLinks = [
    { title: 'Flachdach Neubau', id: 'flachdach-neubau', top: '20%', left: '10%', image: '/images/Neubau.jpg', size: 'large' },
    { title: 'Flachdach PE Folie', id: 'flachdach-sanierung', top: '30%', left: '50%', image: '/images/Pe Folie.jpg', size: 'medium' },
    { title: 'Flachdach PIR', id: 'flachdach-wartung', top: '55%', left: '15%', image: '/images/PIR.jpg', size: 'small' },
    { title: 'Flachdach Flussigkunstoff', id: 'flachdach-reparatur', top: '60%', left: '60%', image: '/images/Flussigkunstoff.jpg', size: 'medium' },
    { title: 'Flachdach Unterkonstruktion', id: 'flachdach-beton', top: '70%', left: '30%', image: '/images/Beton.jpg', size: 'large' },
    { title: 'Flachdach Dampfsperre', id: 'flachdach-dampfsperre', top: '15%', left: '40%', image: '/images/Dampfsperre.jpg', size: 'medium' },
    { title: 'Flachdach Trapezblech', id: 'flachdach-waermedaemmung', top: '80%', left: '50%', image: '/images/Trapezblech.jpg', size: 'large' },
    { title: 'Flachdach mit Steinwolle', id: 'flachdach-steinwolle', top: '90%', left: '65%', image: '/images/steinwolle.png', size: 'small' },
    { title: 'Flachdach mit EPS', id: 'flachdach-eps', top: '88%', left: '5%', image: '/images/EPS.jpg', size: 'medium' },
    { title: 'Flachdach PVC ', id: 'flachdach-pvc', top: '40%', left: '35%', image: '/images/PVC.jpg', size: 'small' },
    { title: 'Flachdach FPO ', id: 'flachdach-fpo', top: '25%', left: '70%', image: '/images/FPO.jpg', size: 'medium' },
];

const Slider = () => {
    return (
        <div id="home" className="hidden md:block relative w-full h-screen bg-gray-100">
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/main_banner.png')",
                }}
            >
                <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center relative">
                    <div className="text-center">
                        {/* Приветствие с эффектом постепенного появления */}
                        {/* <h1 className="text-teal-100 text-6xl font-bold mb-4 opacity-1 animate-fade-in-up">
                            Willkommen bei <span className="text-yellow-400">Olidort Bedachungen</span>
                        </h1> */}

                        {/* Слоган с анимацией увеличения */}
                        {/* <p className="text-teal-300 text-2xl font-light opacity-0 animate-fade-in-up delay-500">
                            <span className="text-yellow-400">Zuverlässigkeit</span>, <span className="text-yellow-400">Qualität</span> und <span className="text-yellow-400">Kompetenz</span> für Ihr Dach
                        </p> */}
                    </div>
                </div>

                {/* Разбросанные ссылки */}
                <div className="absolute top-0 left-0 w-full h-full">
                    {servicesLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className="absolute flex items-center space-x-2 group"
                            style={{
                                top: link.top,
                                left: link.left,
                            }}
                        >
                            {/* Картинка услуги */}
                            <div className="relative w-12 h-12 group-hover:w-64 group-hover:h-64 transition-all duration-300">
                                <img
                                    src={link.image}
                                    alt={link.title}
                                    className="w-full h-full object-cover rounded-full border-2 border-teal-100 group-hover:border-yellow-500"
                                />
                            </div>

                            {/* Текст ссылки */}
                            <span className="text-teal-100 text-3xl font-bold group-hover:text-yellow-500 transition-all duration-300">
                                {link.title}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Slider;
