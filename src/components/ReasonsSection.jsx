import { useEffect, useRef, useState } from 'react';
import { FaHandshake, FaShieldAlt, FaTools } from 'react-icons/fa';

const ReasonsSection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentSectionRef = sectionRef.current;

        const handleScroll = () => {
            if (currentSectionRef) {
                const rect = currentSectionRef.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section ref={sectionRef}>
            <div className="flex flex-wrap">
                {/* Причина 1: выезжает слева */}
                <div className={`mb-8 md:mb-0 md:w-1/3 px-4 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                    <div className="shadow-lg p-6 rounded-lg hover:scale-105 transition-transform">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-teal-900 text-yellow-400 rounded-lg flex items-center justify-center mr-2">
                                <FaTools className="w-6 h-6" /> {/* Иконка инструментов */}
                            </div>
                            <h3 className="text-2xl font-bold">Erfahrung</h3>
                        </div>
                        <p className="text-gray-600">
                            Wir verfügen über ein tiefes Verständnis für moderne Dachtechnologien und setzen es in unseren Projekten um.
                            Unsere Fachkenntnisse ermöglichen es uns, innovative Lösungen zu finden.
                        </p>
                    </div>
                </div>

                {/* Причина 2: плавное проявление */}
                <div className={`mb-8 md:mb-0 md:w-1/3 px-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="shadow-lg p-6 rounded-lg hover:scale-105 transition-transform">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-teal-900 text-yellow-400 rounded-lg flex items-center justify-center mr-2">
                                <FaHandshake className="w-6 h-6" /> {/* Иконка рукопожатия */}
                            </div>
                            <h3 className="text-2xl font-bold">Zuverlässigkeit</h3>
                        </div>
                        <p className="text-gray-600">
                            Wir garantieren termingerechte Fertigstellung jedes Projekts. Unsere Kunden schätzen uns für unsere Zuverlässigkeit
                            und klare Kommunikation während des gesamten Bauprozesses.
                        </p>
                    </div>
                </div>

                {/* Причина 3: выезжает справа */}
                <div className={`md:w-1/3 px-4 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                    <div className="shadow-lg p-6 rounded-lg hover:scale-105 transition-transform">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-teal-900 text-yellow-400 rounded-lg flex items-center justify-center mr-2">
                                <FaShieldAlt className="w-6 h-6" /> {/* Иконка щита для гарантии */}
                            </div>
                            <h3 className="text-2xl font-bold">Garantie</h3>
                        </div>
                        <p className="text-gray-600">
                            Wir bieten umfassende Garantien auf unsere Arbeiten. Ihre Zufriedenheit steht für uns an erster Stelle,
                            und wir verpflichten uns zu höchster Qualität und langlebigen Lösungen.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReasonsSection;