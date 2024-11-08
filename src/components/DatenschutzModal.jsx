import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';  // Импортируем ReactDOM для создания порталов

const DatenschutzModal = ({ isOpen, onClose, onAccept }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(   // Используем портал для рендеринга модалки
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <div className="relative bg-white p-8 rounded-xl shadow-3xl shadow-orange-700  max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">Datenschutz</h2>
                <p className="mb-6">
                    Hier ist der Datenschutztext, der erklärt, wie wir Ihre persönlichen Daten schützen.
                </p>

                <button
                    onClick={onAccept}
                    className="w-full bg-teal-900 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-all"
                >
                    Ich akzeptiere
                </button>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    {/* Используем GIF как иконку закрытия */}
                    <img
                        src="/images/close-icon.gif" // Путь к вашему GIF-файлу
                        alt="close"
                        className="w-8 h-8 " // Размеры GIF, можно изменить
                    />
                </button>
            </div>
        </div>,
        document.body // Рендерим модалку в <body>
    );
};

DatenschutzModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
};

export default DatenschutzModal;
