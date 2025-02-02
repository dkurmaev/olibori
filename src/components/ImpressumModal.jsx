import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const ImpressumModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-md">
            <div className="relative bg-gray-300 p-8 rounded-xl shadow-3xl shadow-orange-700 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <img
                        src="/images/close-icon.gif"
                        alt="close"
                        className="w-8 h-8"
                    />
                </button>
                <p className='text-black text-justify leading-relaxed'>
                    <strong className='text-2xl'>Impressum:</strong><br /><br />
                    <strong>Betreiber:</strong><br />
                    Borys Olidort<br />
                    Olidort Bedachungen<br />
                    Sellwigsweg 1<br />
                    56470 Bad Marienberg<br />
                    <br />
                    <strong>Kontakt:</strong><br />
                    Telefon: +49 1573 0050570<br />
                    E-Mail: <a href="mailto:info@bedachungen.olidort.de" className="text-blue-500 hover:underline">info@bedachungen.olidort.de</a><br />
                    <br />
                    <strong>Registereintrag:</strong><br />
                    Eintragung im Gewerberegister.<br />
                    Registergericht: Bad Marienberg<br />
                    Registernummer: 07143206<br />
                    <br />
                    <strong>Umsatzsteuer:</strong><br />
                    Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                    DE368915906<br />
                    <br />
                    <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />
                    Borys Olidort<br />
                    Sellwigsweg 1<br />
                    56470 Bad Marienberg<br />
                    <br />
                    <strong>Streitschlichtung</strong><br />
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
                    <a href="https://ec.europa.eu/consumers/odr" className="text-blue-500 hover:underline">https://ec.europa.eu/consumers/odr</a><br />
                    Unsere E-Mail-Adresse finden Sie oben im Impressum.<br />
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.<br />
                    <br />
                    <strong>Haftung für Inhalte</strong><br />
                    Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.<br />
                    <br />
                    <strong>Haftung für Links</strong><br />
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.<br />
                    <br />
                    <strong>Urheberrecht</strong><br />
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.<br />
                    <br />
                    <small className="text-gray-500">Quelle: <a href="https://www.e-recht24.de/impressum-generator.html" className="text-blue-500 hover:underline">e-recht24.de</a></small>
                </p>
                <div className="mt-4 text-right"> {/* Добавьте этот блок для кнопки внизу */}
                    <button
                        className="relative group bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
                        onClick={onClose}
                    >
                        Schließen
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

ImpressumModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImpressumModal;
