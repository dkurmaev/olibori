

const AboutUs = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto my-16 px-4 md:px-8">
      {/* Левый блок с описанием */}
      <div className="md:w-1/2 text-center md:text-left md:pr-8 space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-6xl my-8 font-heading font-bold text-gray-500 uppercase border-b-2 border-gray-300 pb-4">Über uns</h2>
        <p className="text-lg text-gray-700 text-justify py-4 pr-4">
          Wir sind eine zertifizierte Dachdeckerfirma mit über fünf Jahren Erfahrung auf dem Markt.
          Unser Unternehmen bietet Dacharbeiten jeder Komplexität und arbeitet mit einer Vielzahl
          von zuverlässigen Lieferanten zusammen. Wir garantieren höchste Qualität und
          Erschwinglichkeit unserer Leistungen.
        </p>
        <p className="text-lg text-gray-700 text-justify py-2 pr-4">
          Unser Team besteht aus erfahrenen Fachkräften, die für die Sicherheit und Langlebigkeit
          jedes Projekts sorgen. Egal ob Neubau, Reparatur oder Instandhaltung – wir bieten Ihnen
          die besten Lösungen für Ihr Dach.
        </p>
        <p className="text-lg text-gray-700 text-justify py-2 pr-4">
          Vertrauen Sie auf unsere Kompetenz und unser Engagement für Qualität und Kundenzufriedenheit.
        </p>
      </div>

      {/* Правый блок с изображением */}
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img
          src="/images/output.jpg"
          alt="Unsere Firma"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default AboutUs;
