import { useEffect, useRef, useState } from 'react';
import { FaHandshake, FaShieldAlt, FaTools } from 'react-icons/fa';

const ReasonsSection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentSectionRef = sectionRef.current;

        const handleScroll = () => {
            if (!isVisible && currentSectionRef) {
                const rect = currentSectionRef.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.75) {
                    setIsVisible(true); // Анимация сработает только один раз
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="flex justify-center items-center py-12">
            <div className="flex flex-col sm:flex-row md:flex-row flex-wrap justify-center items-center text-center">
                {/* Причина 1: выезжает слева */}
                <div className={`mb-8 sm:mb-0 w-full sm:w-1/3 px-4 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                    <div className="shadow-lg p-6 rounded-lg hover:scale-105 transition-transform">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-teal-900 text-yellow-400 rounded-lg flex items-center justify-center mr-2">
                                <FaTools className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Erfahrung</h3>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Wir verfügen über ein tiefes Verständnis für moderne Dachtechnologien und setzen es in unseren Projekten um.
                            Unsere Fachkenntnisse ermöglichen es uns, innovative Lösungen zu finden.
                        </p>
                    </div>
                </div>

                {/* Причина 2: плавное проявление */}
                <div className={`mb-8 sm:mb-0 w-full sm:w-1/3 px-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="shadow-lg p-6 rounded-lg hover:scale-105 transition-transform">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-teal-900 text-yellow-400 rounded-lg flex items-center justify-center mr-2">
                                <FaHandshake className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Zuverlässigkeit</h3>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Wir garantieren termingerechte Fertigstellung jedes Projekts. Unsere Kunden schätzen uns для unsere Zuverlässigkeit
                            и klare Kommunikation während des gesamten Bauprozesses.
                        </p>
                    </div>
                </div>

                {/* Причина 3: выезжает справа */}
                <div className={`w-full sm:w-1/3 px-4 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                    <div className="shadow-lg p-6 rounded-lg hover:scale-105 transition-transform">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-teal-900 text-yellow-400 rounded-lg flex items-center justify-center mr-2">
                                <FaShieldAlt className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Garantie</h3>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Wir bieten umfassende Garantien auf unsere Arbeiten. Ihre Zufriedenheit steht для uns an erster Stelle,
                            und wir verpflichten uns zu höchster Qualität und langlebigen Lösungen.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReasonsSection;
