import { useState, useEffect } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Обработчик прокрутки для изменения стиля при скролле
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={`fixed top-0 left-0 w-full p-4 z-20 py-4 shadow-lg backdrop-blur-md transition-all duration-500 ${scrolled ? 'bg-opacity-100' : 'bg-opacity-10'}`}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Логотип */}
                <div className="flex items-center">
                    <img src="/images/Logo.png" alt="Olidort Bedachungen" className="w-24 h-16 mr-4" />
                    <div>
                        <h1 className="text-2xl text-teal-600 font-bold">Olidort Bedachungen</h1>
                        <p className="text-sm italic text-yellow-400">&quot;Ihr Dach in sicheren Händen&quot;</p>
                    </div>
                </div>

                {/* Меню для десктопа */}
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#home" className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all">
                        Home
                    </a>
                    <a href="#services" className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all">
                        Dienstleistungen
                    </a>
                    <a href="#contact" className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all">
                        Kontakt
                    </a>

                    <div className="flex items-center space-x-4">
                        <a href="tel:+49123456789" className="bg-yellow-400 text-dark px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition hidden lg:flex">
                            Anruf
                        </a>
                        <div className="text-left hidden lg:block">
                            <p className="text-sm font-light text-right text-gray-400">Rufen Sie uns an:</p>
                            <p className="text-sm font-bold text-gray-900">+49 157 300 505 70</p>
                        </div>
                    </div>
                </nav>

                {/* Бургер-меню для мобильной версии */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none text-teal-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                {/* Мобильное меню */}
                {menuOpen && (
                    <nav className="absolute top-16 left-0 w-full bg-teal-900 bg-opacity-90 p-6 flex flex-col space-y-4 md:hidden z-20">
                        <a href="#home" className="text-white hover:text-secondary border-b border-gray-200 py-2" onClick={toggleMenu}>Home</a>
                        <a href="#services" className="text-white hover:text-secondary border-b border-gray-200 py-2" onClick={toggleMenu}>Dienstleistungen</a>
                        <a href="#contact" className="text-white hover:text-secondary py-2" onClick={toggleMenu}>Kontakt</a>
                        <a href="tel:+49123456789" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                            Anruf: +49 157 300 505 70
                        </a>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
