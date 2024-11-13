import { useState } from "react";
import CostCalculatorModal from "./CostCalculatorModal"; // Подключаем компонент калькулятора

const mainCategory = {
  title: "Phasen der Dacharbeiten",
  description: (
    <>
      <h3 className="text-xl font-semibold mt-6"></h3>
      {/* {/* <ul className="list-disc  text-left ml-6 space-y-2 text-gray-700">
        <li>
          <span className="font-semibold">Planung des Dachsystems:</span> Entwicklung eines individuellen Projekts unter Berücksichtigung der Gebäudebesonderheiten und Kundenanforderungen.
        </li>
        <li>
          <span className="font-semibold">Demontage des alten Dachs:</span> Abbau und Entfernung der bestehenden Dachabdeckung zur Vorbereitung auf die Installation eines neuen Dachs.
        </li>
        <li>
          <span className="font-semibold">Durchführung von Instandhaltungs- und Hauptreparaturen des Hausdachs:</span> Ausführung von Reparaturarbeiten zur Wiederherstellung und Stärkung der Dachstruktur.
        </li>
        <li>
          <span className="font-semibold">Austausch oder Errichtung neuer tragender Konstruktionen:</span> Installation neuer tragender Elemente oder Verstärkung bestehender Elemente zur Sicherstellung der Dachstabilität.
        </li>
        <li>
          <span className="font-semibold">Wiederherstellung und Montage von Wärmedämmung und Feuchtigkeitsbarriere:</span> Isolierung und Schutz des Dachs vor Temperaturschwankungen und Feuchtigkeit.
        </li>
        <li>
          <span className="font-semibold">Montage verschiedener Arten von Dachabdeckungen:</span> Installation unterschiedlicher Materialien wie Metallziegel, Bitumenschindeln, Naturziegel und andere.
        </li>
        <li>
          <span className="font-semibold">Installation und Reparatur des Entwässerungssystems:</span> Einbau von Regenrinnen zur Ableitung von Regenwasser vom Dach sowie deren Reparatur bei Bedarf.
        </li>
      </ul> */}
      {/* <p className="mt-6 text-left text-gray-700">
        Die Firma übernimmt die volle Verantwortung und Gewährleistung für die ausgeführten Dacharbeiten. Für jeden Auftrag wird eine individuelle Liste der erforderlichen Dacharbeiten erstellt und ein Kostenvoranschlag formuliert. Unsere Preise für die Dachmontage werden Sie angenehm überraschen!
      </p>  */}
      <h3 className="text-xl font-semibold mt-6"></h3>
      <ol className="list-decimal text-left mt-4 ml-6 space-y-2 text-gray-700">
        <li>Nach Eingang der Anfrage erfolgt die Anfahrt des Dachmeisters zur Baustelle. Es werden alle notwendigen Messungen, Analysen und Beratungen mit dem Kunden durchgeführt.</li>
        <li>Erstellung eines Kostenvoranschlags mit detaillierter Auflistung aller angebotenen Arbeiten und Materialien.</li>
        <li>Nach der Abstimmung aller Details und der endgültigen Kosten für die Dachmontage (Rekonstruktion, Reparatur) mit dem Kunden wird ein Dienstleistungsvertrag mit allen Fristen abgeschlossen.</li>
        <li>Einkauf und Lieferung aller erforderlichen Dachmaterialien zur Baustelle gemäß Kostenvoranschlag.</li>
        <li>Durchführung der Dacharbeiten durch professionelle Meister, Abnahme des Objekts durch den Kunden.</li>
      </ol>
    </>
  ),
  options: [
    {
      name: "Neubau",
      description: "Neubau option description",
      image: "path_to_image_neubau.jpg",
    },
    {
      name: "Sanierung",
      description: "Sanierung option description",
      image: "path_to_image_sanierung.jpg",
    },
  ],
  subCategories: [
    {
      name: "Unterkonstruktion",
      options: [
        { name: "Beton", price: 100, description: "Beton description", image: "path_to_image_beton.jpg" },
        { name: "Trapezblech", price: 120, description: "Trapezblech description", image: "path_to_image_trapezblech.jpg" },
      ],
    },
    {
      name: "Dämmung",
      options: [
        { name: "EPS", price: 50, description: "EPS description", image: "path_to_image_eps.jpg" },
        { name: "PIR", price: 70, description: "PIR description", image: "path_to_image_pir.jpg" },
        { name: "A1", price: 90, description: "A1 description", image: "path_to_image_a1.jpg" },
      ],
    },
    {
      name: "Abdichtung",
      options: [
        { name: "PVC", price: 80, description: "PVC description", image: "path_to_image_pvc.jpg" },
        { name: "FPO", price: 100, description: "FPO description", image: "path_to_image_fpo.jpg" },
        { name: "Bitumenbahn", price: 110, description: "Bitumenbahn description", image: "path_to_image_bitumenbahn.jpg" },
      ],
    },
  ],
};

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCalculator = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="flachdachabdichtung" className="py-8 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{mainCategory.title}</h2>
        <div className="text-lg text-center mb-8">
          {mainCategory.description}
        </div>
        <div className="flex justify-center">
        <button
          onClick={openCalculator}
          className="bg-teal-900 text-white text-center py-2 mx-auto px-6 rounded-lg hover:bg-teal-700 transition"
        >
          Kosten Berechnen
        </button>
        </div>
      </div>
      {isModalOpen && <CostCalculatorModal closeModal={closeModal} />}
    </section>
  );
};

export default Services;
