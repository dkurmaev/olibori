const Error404 = () => {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-400">
        <img
          src="/images/Logo.png" // Замените на путь к вашему изображению 404
          alt="404 Not Found"
          className="mb-6 w-64 h-48"
        />
        <h1 className="text-4xl font-bold text-teal-600 ">Diese Seite befindet sich im Aufbau</h1>
        <p className="text-lg text-gray-500 mt-2">
        Wir arbeiten gerade daran, diese Seite zu verbessern.
        </p>
        <div className="mt-6">
          <a href="/" className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition">
            Zurück zur Startseite
          </a>
        </div>
      </div>
    );
  };
  
  export default Error404;
  