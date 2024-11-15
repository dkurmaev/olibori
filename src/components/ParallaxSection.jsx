const ParallaxSection = () => {
  

  return (
    <div
    id="parallax"
      className="relative bg-fixed bg-center bg-cover h-fit flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/parallax.jpg')",
        backgroundAttachment: "fixed", // Параллакс эффект
        backgroundSize: "cover", // Это обеспечит правильное масштабирование изображения
        backgroundPosition: "center", // Это поможет разместить изображение по центру
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white my-16">
        <h1 className="text-xl sm:text-xl md:text-2xl lg:text-7xl font-heading font-bold text-white uppercase animate__animated animate__fadeIn animate__delay-1s">
          Wir führen einzelne Arten von Dacharbeiten durch:
        </h1>
        <div className="grid grid-cols-1 gap-2 my-10 mx-6 items-center lg:px-80  text-gray-300  lg:grid-cols-3">
          {/* Первый блок с 3 элементами */}
          <div className="flex flex-col">
            <p className="text-md font-sans  text-left mt-4 block lg:hidden">
              &#9745; Montage des Entwässerungssystems
            </p>
            <p className="text-md font-sans  text-left mt-4 hidden lg:block">
              &#9745; Montage des Entwässerungssystems
            </p>
            <p className="text-md font-sans  text-left mt-4 hidden lg:block">
              &#9745; Errichtung der Dachkonstruktion
            </p>
            <p className="text-md font-sans  text-left mt-4 hidden lg:block">
              &#9745; Abdichtungs- und Dampfsperrschichten
            </p>
          </div>

          {/* Второй блок с 3 элементами */}
          <div className="flex flex-col text-gray-300">
            <p className="text-md font-sans  text-left mt-4 block lg:hidden">
              &#9745; Verlegung von Dämmmaterial
            </p>
            <p className="text-md font-sans  text-left mt-4 hidden lg:block">
              &#9745; Verlegung von Dämmmaterial
            </p>
            <p className="text-md font-sans  text-left mt-4 hidden lg:block">
              &#9745; Installation von Belüftungselementen
            </p>
            <p className="text-md font-sans  text-left mt-4 hidden lg:block">
              &#9745; Verlegung von Bahnenabdichtungen
            </p>
          </div>

          {/* Третий блок с 3 элементами */}
          <div className="flex flex-col text-gray-300">
            <p className="text-md font-sans  text-left mt-4 block lg:hidden">
              &#9745; Montage von Dachlösungen
            </p>
            <p className="text-md font-sans  text-left mt-4 hidden lg:block">
              &#9745; Montage von Dachlösungen
            </p>
            <p className="text-md font-sans  text-left mt-4 hidden lg:block">
              &#9745; Montage von Dachboden
            </p>
            <p className="text-md font-sans  text-left mt-4 hidden lg:block">
              &#9745; Demontage des Dachs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxSection;
