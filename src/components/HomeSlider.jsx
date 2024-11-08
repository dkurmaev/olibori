import { useState } from 'react';
import 'animate.css';

const HomeSlider = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <section
            id="home"
            className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: "url('/images/main_page.jpg')", // Укажите путь к вашему баннеру
            }}
        >
            {/* Темный фильтр поверх баннера */}
            <div className={`absolute inset-0 bg-black bg-opacity-50 transition-all duration-500 ${isModalOpen ? 'backdrop-blur-sm' : ''}`}></div>

            {/* Текст с анимацией */}
            <div className={`relative z-10 text-center transition-all duration-500 ${isModalOpen ? 'blur-sm' : ''}`}>
                <h1 className="text-5xl font-heading  md:text-9xl flex font-bold text-white uppercase tracking-widest animate__animated animate__fadeIn animate__delay-1s">
                    Qualität! Garantie! Schnelligkeit!
                </h1>
                <p className="text-lg font-sans md:text-4xl text-yellow-400 italic mt-6 animate__animated animate__fadeIn animate__delay-3s">
                    Wir bieten die besten Lösungen für Ihr Dach!
                </p>

                {/* Кнопка "Anfrage stellen" */}
                <button
                    onClick={handleModalToggle}
                    className="mt-8 px-6 py-3 bg-teal-900 text-white text-xl font-bold uppercase rounded-full hover:bg-teal-700 transition animate__animated animate__fadeIn animate__delay-5s"
                >
                    Anfrage stellen
                </button>
            </div>

            {/* Модальное окно с контактной формой */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"></div>
                    <div className="relative bg-white bg-opacity-90 p-6 rounded-lg w-11/12 max-w-lg z-50">
                        <button
                            className="absolute top-2 right-2 text-teal-900 hover:text-teal-200"
                            onClick={handleModalToggle}
                        >
                            {/* Используем GIF как иконку закрытия */}
                            <img
                                src="/images/close-icon.gif" // Путь к вашему GIF-файлу
                                alt="close"
                                className="w-16 h-16 relative" // Размеры GIF, можно изменить
                            />
                        </button>

                        <h2 className="text-3xl font-bold mb-6 text-center">Kontaktformular</h2>

                        <form>
                            {/* Поле для имени */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-teal-500"
                                    required
                                />
                            </div>

                            {/* Поле для email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">
                                    E-Mail <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-teal-500"
                                    required
                                />
                            </div>

                            {/* Поле для телефона (необязательно) */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700">
                                    Telefon (optional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-teal-500"
                                />
                            </div>

                            {/* Кнопка отправки формы */}
                            <button
                                type="submit"
                                className="w-full bg-teal-900 text-white font-bold py-2 rounded-md hover:bg-teal-700 transition"
                            >
                                Absenden
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HomeSlider;
