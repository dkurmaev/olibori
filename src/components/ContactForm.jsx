import { useState } from "react";
import emailjs from "emailjs-com";
import LeafletMap from "./LeafletMap";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [messageType, setMessageType] = useState("");

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Проверка поля на валидность при изменении
    const errors = validateField(name, value, formErrors);
    setFormErrors(errors);
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      // Все валидно, отправляем данные
      console.log("Form submitted:", formData);
      setIsLoading(true);
      setShowMessage(false);

      emailjs.send(serviceId, templateId, formData, userId).then(
        () => {
          setIsLoading(false);
          setShowMessage(true);
          setMessageType("success");
          setMessageContent(
            "Vielen Dank! Wir werden uns in Kürze mit Ihnen in Verbindung setzen."
          );
          setFormData({ name: "", email: "", message: "" });
          setIsAgreed(false);
          setFormErrors({}); // Сброс ошибок после успешной отправки
        },
        () => {
          setIsLoading(false);
          setShowMessage(true);
          setMessageType("error");
          setMessageContent(
            "Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut."
          );
        }
      );
    } else {
      // Устанавливаем ошибки для отображения
      setFormErrors(errors);
    }
  };

  const validateField = (name, value, currentErrors) => {
    const errors = { ...currentErrors }; // Копируем текущие ошибки

    // Проверка для поля "name"
    if (name === "name") {
      if (value.trim() === "") {
        errors.name = "Name ist erforderlich.";
      } else if (!/^[a-zA-ZäöüÄÖÜß\s]+$/.test(value)) {
        errors.name = "Der Name darf nur Buchstaben enthalten.";
      } else {
        delete errors.name; // Убираем ошибку, если данные валидны
      }
    }

    // Проверка для поля "email"
    if (name === "email") {
      if (value.trim() === "") {
        errors.email = "E-Mail ist erforderlich.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      } else {
        delete errors.email; // Убираем ошибку, если данные валидны
      }
    }

    // Проверка для поля "message"
    if (name === "message") {
      if (value.trim() === "") {
        errors.message = "Nachricht ist erforderlich.";
      } else {
        delete errors.message; // Убираем ошибку, если данные валидны
      }
    }

    return errors;
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.name || formData.name.trim() === "") {
      errors.name = "Name ist erforderlich.";
    }
    if (!formData.email || formData.email.trim() === "") {
      errors.email = "E-Mail ist erforderlich.";
    }
    if (!formData.message || formData.message.trim() === "") {
      errors.message = "Nachricht ist erforderlich.";
    }
    return errors;
  };

  return (
    <section
      id="contact"
      className="relative bg-cover bg-center bg-fixed sm:bg-fixed sm:bg-none"
      style={{
        backgroundImage: "url('/images/parallax.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        scrollMarginTop: "80px",
      }}
    >
      <div className="bg-black bg-opacity-80 w-full py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-6 bg-opacity-70 shadow-xl rounded-lg transition-transform hover:scale-105">
            <h3 className="text-3xl sm:text-5xl font-bold uppercase text-teal-200 tracking-wider mb-12 border-b-2 border-teal-400 inline-block pb-1">
              Unser Standort
            </h3>
            <p className="mb-4 leading-relaxed text-teal-200">
              <strong>Olidort Bedachungen</strong> <br />
              Sellwigsweg 1 <br />
              56470 Bad Marienberg <br />
              Deutschland
            </p>
            <p className="mb-4 text-teal-200">
              <strong>Telefon:</strong> +49 157 300 50 570
            </p>
            <p className="mb-4 text-teal-200">
              <strong>E-Mail:</strong> olidort.b@gmail.com
            </p>
            {/* Карта с использованием Leaflet */}
            <LeafletMap />
          </div>

          <div className="p-6 bg-opacity-10 text-gray-400 shadow-xl rounded-lg transition-transform hover:scale-105">
            <h3 className="text-3xl sm:text-5xl font-bold uppercase text-teal-200 tracking-wider mb-12 border-b-2 border-teal-400 inline-block pb-1">
              Kontaktieren Sie uns
            </h3>

            {showMessage && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  messageType === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p>{messageContent}</p>
                  <button
                    onClick={() => setShowMessage(false)}
                    className="text-lg font-bold text-gray-600 hover:text-gray-800"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="mb-6 flex items-center gap-2">
                <div className="w-6 h-6 border-4 border-t-teal-500 border-yellow-400 rounded-full animate-spin"></div>
                Senden... Bitte warten.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label htmlFor="name" className="block text-teal-200">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md ${
                    formErrors.name ? "border-red-500" : "border-transparent"
                  }`}
                  required
                />
                {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-teal-200">
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-md ${
                    formErrors.email ? "border-red-500" : "border-transparent"
                  }`}
                  required
                />
                {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-teal-200">
                  Nachricht <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-8 rounded-md ${
                    formErrors.message ? "border-red-500" : "border-transparent"
                  }`}
                  rows="4"
                  required
                ></textarea>
                {formErrors.message && <p className="text-red-500">{formErrors.message}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="datenschutz"
                  checked={isAgreed}
                  onChange={handleCheckboxChange}
                  className={`inline-block w-6 h-6 mr-2 border-2 border-teal-200 rounded ${
                    isAgreed ? "bg-yellow-400" : "bg-white"
                  } flex items-center justify-center cursor-pointer`}
                  required
                />
                <label htmlFor="datenschutz" className="text-teal-200">
                  <p className="text-teal-300">
                    Ich stimme den Datenschutz zu
                  </p>
                </label>
              </div>

              <button
                type="submit"
                className={`w-full bg-teal-900 text-white py-3 mt-10 rounded-md shimmer-button ${
                  !isAgreed ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isAgreed}
              >
                Senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
