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

    const fieldErrors = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    if (name === "name") {
      if (!/^[a-zA-ZäöüÄÖÜß\s]+$/.test(value)) {
        errors.name = "Der Name darf nur Buchstaben enthalten.";
      }
    }

    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      } else {
        const [localPart, domain] = value.split("@");

        if (localPart.startsWith(".")) {
          errors.email = "Der lokale Teil darf nicht mit einem Punkt beginnen.";
        }

        if (/[^a-zA-Z0-9.-]/.test(domain)) {
          errors.email = "Der Domain-Teil enthält ungültige Zeichen.";
        }

        if (domain.endsWith(".")) {
          errors.email = "Der Domain-Teil darf nicht mit einem Punkt enden.";
        }

        if (domain.startsWith(".")) {
          errors.email = "Der Domain-Teil darf nicht mit einem Punkt beginnen.";
        }

        const domainParts = domain.split(".");
        if (domainParts.some((part) => part.length === 1)) {
          errors.email = "Jede Domain-Stufe muss mehr als einen Buchstaben enthalten.";
        }
      }
    }

    if (name === "phone") {
      if (value && !/^\+49\s?\d{3}(\s?\d{2}){4}$/.test(value)) {
        errors.phone =
          "Bitte geben Sie eine gültige Telefonnummer im Format +49 XXX XX XX XX XX ein.";
      }
    }

    return errors;
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      !Object.values(formErrors).some((error) => error !== undefined)
    );
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
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-900">Kontaktformular</h2>

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
            <label htmlFor="name" className="block text-gray-700 text-left">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-teal-800 focus:ring ${
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
            <label htmlFor="email" className="block text-gray-700  text-left">
              E-Mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-teal-800 focus:ring ${
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
            <label htmlFor="phone" className="block text-gray-700  text-left">
              Telefonnummer (optional)
            </label>
            <InputMask
              mask="+49 999 99 99 99 99"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-teal-800 focus:ring ${
                formErrors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-teal-500"
              }`}
              placeholder="+49 XXX XX XX XX XX"
            />
            {formErrors.phone && (
              <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-left">
              Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md text-teal-800 focus:ring ${
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
            className={`w-full py-2 font-bold rounded-md transition ${
              isLoading || !isFormValid()
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-teal-900 text-white hover:bg-teal-700"
            }`}
            disabled={isLoading || !isFormValid()}
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
