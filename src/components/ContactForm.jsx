import { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_USER_ID;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setIsError(false);

    emailjs.send(serviceId, templateId, formData, userId).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      },
      (err) => {
        console.log("FAILED...", err);
        setIsError(true);
      }
    );
  };

  return (
    <section
      id="contact"
      className="relative bg-cover bg-center bg-fixed sm:bg-fixed sm:bg-none"
      style={{
        backgroundImage: "url('/images/parallax.jpg')", // Указываем картинку для фона
        backgroundAttachment: "fixed", // Закрепляем картинку для параллакса
        backgroundSize: "cover", // Картинка должна покрывать весь экран
        backgroundPosition: "center", // Центрируем картинку на фоне
      }}
    >
      <div className="bg-black bg-opacity-80 w-full py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Информация о компании */}
          <div className="p-6 bg-opacity-70 shadow-xl rounded-lg transition-transform hover:scale-105">
            <h3 className="text-3xl sm:text-5xl font-bold uppercase text-teal-200 tracking-wider mb-12 border-b-2 border-teal-400 inline-block pb-1">
              Unser Standort
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              <strong>Olidort Bedachungen GmbH</strong> <br />
              Sellwigsweg 1, <br />
              56470 Bad Marienberg, <br />
              Deutschland
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Telefon:</strong> +49 157 300 50 570
            </p>
            <p className="text-gray-600 mb-4">
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

          {/* Форма контакта */}
          <div className="p-6 bg-opacity-10 text-gray-400 shadow-xl rounded-lg transition-transform hover:scale-105">
            <h3 className="text-3xl sm:text-5xl font-bold uppercase text-teal-200 tracking-wider mb-12 border-b-2 border-teal-400 inline-block pb-1">
              Kontaktieren Sie uns
            </h3>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg animate-pulse">
                <p>
                  Vielen Dank! Wir werden uns in Kürze mit Ihnen in Verbindung
                  setzen.
                </p>
              </div>
            )}

            {isError && (
              <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                <p>
                  Fehler beim Senden der Nachricht. Bitte versuchen Sie es
                  erneut.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-gray-600 font-semibold"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 bg-gray-100 border border-transparent focus:border-teal-500 focus:bg-white rounded-md shadow-sm transition-all"
                  required
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-semibold"
                >
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 bg-gray-100 border border-transparent focus:border-teal-500 focus:bg-white rounded-md shadow-sm transition-all"
                  required
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="message"
                  className="block text-gray-600 font-semibold"
                >
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 bg-gray-100 border border-transparent focus:border-teal-500 focus:bg-white rounded-md shadow-sm transition-all"
                  rows="4"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-900 text-white py-3 font-semibold rounded-md shadow-lg hover:bg-teal-600 hover:shadow-xl transition-all"
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
