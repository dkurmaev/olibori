import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';  // Импортируем ReactDOM для создания порталов

const ImpressumModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(   // Используем портал для рендеринга модалки
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-md">
            <div className="bg-white p-6 rounded-xl shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    {/* Используем GIF как иконку закрытия */}
                    <img
                        src="/images/close-icon.gif" // Путь к вашему GIF-файлу
                        alt="close"
                        className="w-8 h-8 relative" // Размеры GIF, можно изменить
                    />
                </button>
                <p className='text-black'>
                    Verantwortlich für den Inhalt dieser Website: <br />
                    Olidort Bedachungen GmbH<br />
                    Musterstraße 12<br />
                    12345 Musterstadt<br />
                    Telefon: +49 123 456789<br />
                    E-Mail: info@olidort-bedachungen.de
                </p>
                <p className="mt-4">
                    USt-IdNr.: DE123456789<br />
                    Registergericht: Amtsgericht Musterstadt<br />
                    Registernummer: HRB 12345
                </p>
                <p className="mt-4">
                    Inhaltlich Verantwortlicher gemäß § 55 Abs. 2 RStV: Max Mustermann<br />
                    Hinweis gemäß §36 VSBG: Wir nehmen nicht an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil.
                </p>
            </div>
        </div>,
        document.body // Рендерим модалку в <body>
    );
};

ImpressumModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImpressumModal;
