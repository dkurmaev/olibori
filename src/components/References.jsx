const References = () => {
    const references = [
      {
        companyName: "NBB Bau- und Heimwerkermärkte GmbH",
        description:
          "Unsere Zusammenarbeit mit Olidort Bedachungen war hervorragend. Die Arbeiten wurden termingerecht und professionell ausgeführt.",
        logoUrl: "/images/bauspezilogo.png",
      },
      {
        companyName: "HOLZ-GROSS GmbH",
        description:
          "Olidort Bedachungen hat unser Flachdach perfekt isoliert und die Qualität der Materialien ist erstklassig. Sehr empfehlenswert!",
        logoUrl: "/images/holzgross.png",
      },
    ];
  
    return (
      <section
        className="relative bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/images/parallax.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="bg-black bg-opacity-80 py-16">
          <div className="container mx-auto text-center">
            {/* Заголовок */}
            <h2 className="text-3xl sm:text-5xl font-bold uppercase text-teal-200 tracking-wider mb-12 border-b-2 border-teal-400 inline-block pb-1">
              Referenzen
            </h2>
  
            {/* Карточки */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 px-4">
              {references.map((ref, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg p-8 flex flex-col items-center hover:scale-105 transform transition-all"
                >
                  <img
                    src={ref.logoUrl}
                    alt={`${ref.companyName} logo`}
                    className="w-32 h-32 mb-6 object-contain"
                  />
                  <h3 className="text-2xl font-bold text-teal-400 mb-4 text-center">
                    {ref.companyName}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-center">
                    {ref.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default References;
  