import { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import PropTypes from 'prop-types';

const CostCalculatorModal = ({ isOpen, onClose, selectedService }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [size, setSize] = useState(1);
    const [calculationMessage, setCalculationMessage] = useState('');
    const [sendingStatus, setSendingStatus] = useState(''); // статус отправки письма

    useEffect(() => {
        // Инициализация выбранной опции, если данные услуги изменились
        if (selectedService && selectedService.options) {
            setSelectedOption(selectedService.options[0]);
        }
    }, [selectedService]);

    if (!isOpen || !selectedService) return null;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    const handleOptionChange = (event) => {
        const optionName = event.target.value;
        const newOption = selectedService.options.find((option) => option.name === optionName);
        setSelectedOption(newOption);
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const calculatePrice = () => {
        return selectedOption ? selectedOption.price * size : 0;
    };

    const handleCalculation = () => {
        const price = calculatePrice();
        setCalculationMessage(`Geschätzte Kosten: €${price}. Für eine genauere Berechnung werden wir uns mit Ihnen in Verbindung setzen.`);
    };

    const handleSendEmail = () => {
        if (!serviceId || !templateId || !userId) {
            console.error("EmailJS configuration missing in environment variables");
            return;
        }
        
        setSendingStatus('sending'); // Установка статуса на "отправка"

        const templateParams = {
            name: "Имя пользователя",
            email: "user@example.com",
            message: "Запрос на расчет стоимости",
            calculated_cost: calculatePrice(),
        };

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setSendingStatus('success');
                setTimeout(onClose, 3000);
            })
            .catch((error) => {
                console.error('FAILED...', error);
                setSendingStatus('error');
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    <img
                      src="/images/close-icon.gif"
                      alt="close"
                      className="w-6 h-6"
                    />
                </button>
                <h3 className="text-xl font-bold mb-4">{selectedService.title}</h3>

                {/* Опции подуслуг */}
                <label htmlFor="option" className="block text-sm font-medium mb-2">Wählen Sie eine Option:</label>
                <select
                    id="option"
                    value={selectedOption ? selectedOption.name : ''}
                    onChange={handleOptionChange}
                    className="mb-4 w-full p-2 border border-gray-300 rounded-md"
                >
                    {selectedService.options.map((option, index) => (
                        <option key={index} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>

                {/* Описание и цена выбранной опции */}
                {selectedOption && (
                    <>
                        <div
                            className="text-gray-700 mb-4"
                            dangerouslySetInnerHTML={{ __html: selectedOption.description }}
                        />
                        <p className="text-lg font-semibold">Preis pro Quadratmeter (m²): {selectedOption.price},-EUR</p>
                    </>
                )}

                {/* Поле для ввода размера */}
                <label htmlFor="size" className="block text-sm font-medium mt-4">Geben Sie Ihre Fläche in Quadratmetern (m²) an:</label>
                <input
                    type="number"
                    id="size"
                    value={size}
                    onChange={handleSizeChange}
                    min="1"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                />

                <div className="mt-6 flex flex-col space-y-4">
                    {/* Кнопка для расчета и сообщение о расчетной стоимости */}
                    <button
                        onClick={handleCalculation}
                        className="bg-teal-900 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition"
                    >
                        Berechnen
                    </button>
                    {calculationMessage && (
                        <p className="text-center text-lg font-semibold text-teal-900 mt-4">{calculationMessage}</p>
                    )}

                    {/* Кнопка для отправки запроса */}
                    <button
                        onClick={handleSendEmail}
                        className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition"
                    >
                        Anfrage senden
                    </button>

                    {/* Сообщения о статусе отправки */}
                    {sendingStatus === 'sending' && (
                        <p className="text-center text-lg font-semibold text-gray-700 mt-4">Nachricht wird gesendet...</p>
                    )}
                    {sendingStatus === 'success' && (
                        <p className="text-center text-lg font-semibold text-green-600 mt-4">Nachricht erfolgreich gesendet! Wir werden uns bald mit Ihnen in Verbindung setzen.</p>
                    )}
                    {sendingStatus === 'error' && (
                        <p className="text-center text-lg font-semibold text-red-600 mt-4">Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

CostCalculatorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedService: PropTypes.shape({
        title: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                description: PropTypes.string,
                imageUrl: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};

export default CostCalculatorModal;
