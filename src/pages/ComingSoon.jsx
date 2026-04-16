import { Helmet } from "react-helmet-async";

const UnderConstruction = () => {
  return (
    <>
      <Helmet>
        <title>Seite im Aufbau – Olidort Bedachungen</title>
        <meta
          name="description"
          content="Diese Seite befindet sich im Aufbau. Besuchen Sie unsere Hauptseite für alle Informationen zu unseren Dachdeckerleistungen."
        />
        <meta name="robots" content="noindex, follow" />
        <link
          rel="canonical"
          href="https://bedachungen.olidort.de/coming-soon"
        />
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">
          Diese Seite befindet sich im Aufbau
        </h1>
        <p className="mt-4 text-xl">
          Wir arbeiten gerade daran, diese Seite zu verbessern.
        </p>
      </div>
    </>
  );
};

export default UnderConstruction;
