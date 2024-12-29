import { useState } from "react";
import emailjs from "emailjs-com";

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
  const [messageType, setMessageType] = useState("");

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Проверка ошибок в процессе ввода
    const errors = validateField(name, value);
    setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      setShowMessage(false); // Скрываем предыдущее сообщение

      emailjs.send(serviceId, templateId, formData, userId).then(
        () => {
          setIsLoading(false);
          setShowMessage(true);
          setMessageType("success");
          setMessageContent(
            "Vielen Dank! Wir werden uns in Kürze mit Ihnen in Verbindung setzen."
          );
          setFormData({ name: "", email: "", message: "" });
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
    }
  };

  const validateField = (name, value) => {
    const errors = {};
    if (name === "name" && !/^[a-zA-ZäöüÄÖÜß\s]+$/.test(value)) {
      errors.name = "Der Name darf nur Buchstaben enthalten.";
    }
    if (
      name === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }
    return errors;
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name ist erforderlich.";
    }
    if (!formData.email) {
      errors.email = "E-Mail ist erforderlich.";
    }
    if (!/^[^\s@]+@[^\s@]+$/.test(formData.email)) {
      errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
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
          <p className=" mb-4 leading-relaxed text-teal-200">
            <strong>Olidort Bedachungen</strong> <br />
            Sellwigsweg 1 <br />
            56470 Bad Marienberg <br />
            Deutschland
          </p>
          <p className=" mb-4 text-teal-200">
            <strong>Telefon:</strong> +49 157 300 50 570
          </p>
          <p className=" mb-4 text-teal-200">
            <strong>E-Mail:</strong> olidort.b@gmail.com
          </p>

          <div className="mt-6 overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2529.3663954056888!2d7.9638465771101234!3d50.65745737163248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bc214d4f89fb9b%3A0x5f585dd931148d6d!2sSellwigsweg%201%2C%2056470%20Bad%20Marienberg%20(Westerwald)!5e0!3m2!1sen!2sde!4v1729112679493!5m2!1sen!2sde"
              width="100%"
              height="250"
              className="rounded-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
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
                {formErrors.name && (
                  <p className="text-red-500 text-sm">{formErrors.name}</p>
                )}
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
                {formErrors.email && (
                  <p className="text-red-500 text-sm">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-teal-200">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-8 rounded-md"
                  rows="4"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-900 text-white py-3 mt-10 rounded-md shimmer-button"
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
