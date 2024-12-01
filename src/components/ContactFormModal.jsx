import { useState } from "react";
import emailjs from "emailjs-com";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

const ContactFormModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Валидация поля
    const fieldErrors = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка полей
    const errors = {
      ...validateField("name", formData.name),
      ...validateField("email", formData.email),
      ...validateField("phone", formData.phone),
      ...validateField("message", formData.message),
    };

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      setIsSubmitted(false);
      setIsError(false);

      try {
        await emailjs.send(serviceId, templateId, formData, userId);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } catch (error) {
        console.error("Ошибка отправки формы: ", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const validateField = (name, value) => {
    const errors = {};
    if (name === "name" && !/^[a-zA-ZäöüÄÖÜß\s]+$/.test(value)) {
      errors.name = "Der Name darf nur Buchstaben enthalten.";
    }
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }
    if (
      name === "phone" &&
      value &&
      !/^\+49\(0\)\d{3}(\s\d{2}){4}$/.test(value)
    ) {
      errors.phone =
        "Bitte geben Sie eine gültige Telefonnummer im Format +49(0)xxx xx xx xx xx ein.";
    }
    return errors;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"></div>
      <div className="relative bg-white bg-opacity-90 p-6 rounded-lg w-11/12 max-w-lg z-50">
        <button
          className="absolute top-2 right-2 text-teal-900 hover:text-teal-200"
          onClick={closeModal}
        >
          <img src="/images/close-icon.gif" alt="close" className="w-16 h-16" />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center">Kontaktformular</h2>

        {isSubmitted && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
            Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
          </div>
        )}

        {isError && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
            Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.
          </div>
        )}

        {isLoading && (
          <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg flex items-center gap-2">
            <div className="w-6 h-6 border-4 border-t-teal-500 border-yellow-400 rounded-full animate-spin"></div>
            Senden... Bitte warten.
          </div>
        )}

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
              className={`w-full px-4 py-2 border rounded-md focus:ring ${
                formErrors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-teal-500"
              }`}
              required
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
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
              className={`w-full px-4 py-2 border rounded-md focus:ring ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-teal-500"
              }`}
              required
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Telefonnummer (optional)
            </label>
            <InputMask
              mask="+49(0)999 99 99 99 99"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring ${
                formErrors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-teal-500"
              }`}
              placeholder="+49(0)XXX XX XX XX XX"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
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
              className={`w-full px-4 py-2 border rounded-md focus:ring ${
                formErrors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-teal-500"
              }`}
              rows="4"
            ></textarea>
            {formErrors.message && (
              <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-900 text-white py-2 font-bold rounded-md hover:bg-teal-700 transition"
            disabled={isLoading}
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
