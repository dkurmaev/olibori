const AboutUs = () => {
  const fadeInStyle = {
    animation: "fadeIn 1s ease-out",
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto my-16 px-6 md:px-10">
      {/* Левый блок с описанием */}
      <div
        className="md:w-1/2 text-center md:text-left md:pr-10 space-y-6"
        style={fadeInStyle}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 uppercase tracking-wider mb-8 border-b-2 border-teal-400 inline-block pb-1">
          Über uns
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Wir sind eine zertifizierte Dachdeckerfirma mit über fünf Jahren Erfahrung auf dem Markt.
          Unser Unternehmen bietet Dacharbeiten jeder Komplexität und arbeitet mit einer Vielzahl
          von zuverlässigen Lieferanten zusammen. Wir garantieren höchste Qualität und
          Erschwinglichkeit unserer Leistungen.
        </p>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Unser Team besteht aus erfahrenen Fachkräften, die für die Sicherheit und Langlebigkeit
          jedes Projekts sorgen. Egal ob Neubau, Reparatur oder Instandhaltung – wir bieten Ihnen
          die besten Lösungen für Ihr Dach.
        </p>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Vertrauen Sie auf unsere Kompetenz und unser Engagement für Qualität und Kundenzufriedenheit.
        </p>
      </div>

      {/* Правый блок с изображением */}
      <div
        className="md:w-1/2 mt-8 md:mt-0 shadow-xl transform transition-all hover:scale-105"
        style={fadeInStyle}
      >
        <img
          src="/images/output.jpg"
          alt="Unsere Firma"
          className="w-full h-auto rounded-2xl shadow-2xl shadow-teal-900"
        />
      </div>
    </section>
  );
};

export default AboutUs;
