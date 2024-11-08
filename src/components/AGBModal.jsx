import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';  // Импортируем ReactDOM для создания порталов

const AGBModal = ({ isOpen, onClose }) => {
    const [isScrollEnd, setIsScrollEnd] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isOpen && contentRef.current) {
            const handleScroll = () => {
                const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 10) {
                    setIsScrollEnd(true);
                }
            };

            const contentElement = contentRef.current;
            contentElement.addEventListener('scroll', handleScroll);

            return () => contentElement.removeEventListener('scroll', handleScroll);
        }
    }, [isOpen]);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(   // Используем портал для рендеринга модалки
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <div className="relative bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
                <h2 className="text-2xl font-bold mb-4">AGB - Allgemeine Geschäftsbedingungen</h2>

                <div ref={contentRef} className="max-h-64 overflow-y-scroll mb-4 border border-gray-300 p-4 rounded-lg">
                    <p>
                        Hier sind die allgemeinen Geschäftsbedingungen (AGB) für unser Unternehmen...
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ut justo nec luctus.
                        Nullam ac malesuada sapien. Nulla facilisi. Vivamus vulputate libero sit amet nulla accumsan,
                        sit amet efficitur velit fermentum. Vestibulum vitae metus vel turpis lacinia pellentesque.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit quia facilis dolore dolorem voluptatem ut velit, libero, cupiditate iure nemo aut molestias explicabo dolores! Omnis voluptates repellat aperiam ex neque.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ut justo nec luctus.
                        Nullam ac malesuada sapien. Nulla facilisi. Vivamus vulputate libero sit amet nulla accumsan,
                        sit amet efficitur velit fermentum. Vestibulum vitae metus vel turpis lacinia pellentesque. 
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit quia facilis dolore dolorem voluptatem ut velit, libero, cupiditate iure nemo aut molestias explicabo dolores! Omnis voluptates repellat aperiam ex neque.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum ut justo nec luctus.
                    </p>
                </div>

                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="agree"
                        className="mr-2"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        disabled={!isScrollEnd}
                    />
                    <label htmlFor="agree" className="text-gray-700">
                        Ich habe die AGB gelesen und stimme zu.
                    </label>
                </div>

                <button
                    onClick={onClose}
                    className={`w-full bg-teal-900 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-all ${isChecked ? '' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!isChecked}
                >
                    Schließen
                </button>

                <button
                    onClick={onClose}
                    className={`absolute top-2 right-2 text-gray-500 hover:text-gray-700 ${isChecked ? '' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!isChecked}
                >
                    {/* Используем GIF как иконку закрытия */}
                    <img
                        src="/images/close-icon.gif" // Путь к вашему GIF-файлу
                        alt="close"
                        className="w-8 h-8" // Размеры GIF, можно изменить
                    />
                </button>
            </div>
        </div>,
        document.body // Рендерим модалку в <body>, а не внутри футера
    );
};

AGBModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AGBModal;
