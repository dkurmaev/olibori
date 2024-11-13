import { useState } from 'react';
import emailjs from 'emailjs-com';
import PropTypes from 'prop-types';

const ContactFormModal = ({ closeModal }) => {
    // Состояние для данных формы и статуса отправки
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);

    // Получение данных из .env файла
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    // Обработчик изменений в полях формы
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(false);
        setIsError(false);

        // Отправка через EmailJS
        emailjs.send(serviceId, templateId, formData, userId)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsSubmitted(true);
                setFormData({ name: '', email: '', message: '' }); // Очистка формы
            }, (err) => {
                console.log('FAILED...', err);
                setIsError(true);
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"></div>
            <div className="relative bg-white bg-opacity-90 p-6 rounded-lg w-11/12 max-w-lg z-50">
                {/* Кнопка закрытия */}
                <button
                    className="absolute top-2 right-2 text-teal-900 hover:text-teal-200"
                    onClick={closeModal}
                >
                    <img src="/images/close-icon.gif" alt="close" className="w-16 h-16 relative" />
                </button>

                {/* Заголовок модалки */}
                <h2 className="text-3xl font-bold mb-6 text-center">Kontaktformular</h2>

                {/* Сообщение об успешной отправке */}
                {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                        Vielen Dank! Wir werden uns in Kürze mit Ihnen in Verbindung setzen.
                    </div>
                )}

                {/* Сообщение об ошибке */}
                {isError && (
                    <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                        Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.
                    </div>
                )}

                {/* Форма для ввода данных */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            E-Mail <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700">
                            Nachricht
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-teal-500"
                            rows="4"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-900 text-white py-2 font-bold rounded-md hover:bg-teal-700 transition"
                    >
                        Absenden
                    </button>
                </form>
            </div>
        </div>
    );
};
ContactFormModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default ContactFormModal;

