const AboutUs = () => {
  const fadeInStyle = {
    animation: "fadeIn 1s ease-out",
  };

  return (
    <section className="flex flex-col gap-16 md:flex-row  justify-between w-full max-w-7xl mx-auto my-16 px-6 md:px-10">
      {/* Левый блок с изображением */}
      <div
        className="md:w-1/2 mt-8 md:mt-0 shadow-xl transform transition-all hover:scale-105"
        style={fadeInStyle}
      >
        <img
          src="/images/Slide9.jpg"
          alt="Unsere Firma"
          className="w-full h-auto rounded-2xl shadow-2xl shadow-teal-900"
        />
      </div>

      {/* Правый блок с описанием */}
      <div className="md:w-1/2 text-center md:text-left md:pr-10 space-y-6 max-w-prose">
      
        <h2 className="text-3xl sm:text-5xl font-bold uppercase text-gray-500 tracking-wider my-6 border-b-2 border-teal-400 inline-block pb-1">
          Über uns
        </h2>        
       
        <p className="text-lg  sm:text-xl text-gray-600 text-justify leading-relaxed">
          Unser Unternehmen bietet Flachdachabdichtung jeder Komplexität und
          arbeitet mit einer Vielzahl von zuverlässigen Lieferanten zusammen.
        </p>
        <p className="text-lg sm:text-xl text-gray-600 text-justify leading-relaxed">
          Wir garantieren höchste Qualität und die Erschwinglichkeit unserer
          Leistungen. Ob Neubau, Reparatur oder Instandhaltung – wir bieten
          Ihnen die besten Lösungen für Ihr Dach.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
