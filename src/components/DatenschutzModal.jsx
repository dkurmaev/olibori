import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';  // Импортируем ReactDOM для создания порталов

const DatenschutzModal = ({ isOpen, onClose, onAccept }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(   // Используем портал для рендеринга модалки
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <div className="relative bg-gray-300 p-8 rounded-xl shadow-3xl shadow-orange-700 max-w-3xl w-full max-h-[80vh] overflow-y-auto text-justify leading-relaxed">
                <h2 className="text-2xl font-bold mb-4">Datenschutzerklärung</h2>
                <div className="mb-6">
                    <h3 className="font-bold mb-2">1. Datenschutz auf einen Blick</h3>
                    <p className="mb-4">
                        <strong>Allgemeine Hinweise</strong><br />
                        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                    </p>
                    <p className="mb-4">
                        <strong>Datenerfassung auf dieser Website</strong><br />
                        <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
                    </p>
                    <p className="mb-4">
                        <strong>Wie erfassen wir Ihre Daten?</strong><br />
                        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                    </p>
                    <p className="mb-4">
                        <strong>Wofür nutzen wir Ihre Daten?</strong><br />
                        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.
                    </p>
                    <p className="mb-4">
                        <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
                        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                    </p>
                </div>

                <h3 className="font-bold mb-2">2. Hosting</h3>
                <p className="mb-4">
                    Wir hosten die Inhalte unserer Website bei folgendem Anbieter:<br />
                    <strong>Externes Hosting</strong><br />
                    Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
                </p>

                <h3 className="font-bold mb-2">3. Allgemeine Hinweise und Pflichtinformationen</h3>
                <p className="mb-4">
                    <strong>Datenschutz</strong><br />
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p className="mb-4">
                    <strong>Hinweis zur verantwortlichen Stelle</strong><br />
                    Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
                    Oildort Bedachungen<br />
                    Seltwigsweg 1<br />
                    56470 Bad Marienberg<br />
                    Telefon: +49157/30050570<br />
                    E-Mail: info@bedachungen.olidort.de
                </p>
                <p className="mb-4">
                    <strong>Speicherdauer</strong><br />
                    Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
                </p>
                <p className="mb-4">
                    <strong>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</strong><br />
                    Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
                </p>
                <p className="mb-4">
                    <strong>Empfänger von personenbezogenen Daten</strong><br />
                    Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt.
                </p>
                <p className="mb-4">
                    <strong>Widerruf Ihrer Einwilligung zur Datenverarbeitung</strong><br />
                    Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                </p>
                <p className="mb-4">
                    <strong>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</strong><br />
                    Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
                </p>
                <p className="mb-4">
                    <strong>Beschwerderecht bei der zuständigen Aufsichtsbehörde</strong><br />
                    Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
                </p>
                <p className="mb-4">
                    <strong>Recht auf Datenübertragbarkeit</strong><br />
                    Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
                </p>
                <p className="mb-4">
                    <strong>Auskunft, Berichtigung und Löschung</strong><br />
                    Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
                </p>
                <p className="mb-4">
                    <strong>Recht auf Einschränkung der Verarbeitung</strong><br />
                    Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
                    <ul className="list-disc pl-6">
                        <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                        <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
                        <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                        <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                    </ul>
                </p>
                <p className="mb-4">
                    Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
                </p>
                <h3 className="font-bold mb-2">4. Datenerfassung auf dieser Website</h3>
                <p className="mb-4">
                    <strong>Cookies</strong><br />
                    Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
                </p>
                <p className="mb-4">
                    <strong>Kontaktformular</strong><br />
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p className="mb-4">
                    <strong>Anfrage per E-Mail, Telefon oder Telefax</strong><br />
                    Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <h3 className="font-bold mb-2">5. Soziale Medien</h3>
                <p className="mb-4">
                    <strong>Facebook</strong><br />
                    Auf dieser Website sind Elemente des sozialen Netzwerks Facebook integriert. Anbieter dieses Dienstes ist die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, DO4 X2K5, Irland. Die erfassten Daten werden nach Aussage von Facebook jedoch auch in die USA und in andere Drittländer übertragen.
                </p>
                <p className="mb-4">
                    <strong>Instagram</strong><br />
                    Auf dieser Website sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten durch die Meta Platforms Ireland Limited, Merrion Road, Dublin 4, DO4 X2K5, Irland.
                </p>
                <p className="mb-4">
                    Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram: 
                    <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                        https://privacycenter.instagram.com/policy/
                    </a>
                </p>
                <p className="mb-4">
                    Quelle:
                    <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                        https://www.e-recht24.de
                    </a>
                </p>

                <button
                    onClick={onAccept}
                    className="w-full bg-teal-900 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-all"
                >
                    Ich akzeptiere
                </button>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    {/* Используем GIF как иконку закрытия */}
                    <img
                        src="/images/close-icon.gif" // Путь к вашему GIF-файлу
                        alt="close"
                        className="w-8 h-8 " // Размеры GIF, можно изменить
                    />
                </button>
            </div>
        </div>,
        document.body // Рендерим модалку в <body>
    );
};

DatenschutzModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
};

export default DatenschutzModal;
