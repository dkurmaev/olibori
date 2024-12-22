import { useState, useEffect } from "react";
import { CogIcon } from "@heroicons/react/solid";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedPreferences = JSON.parse(
      localStorage.getItem("cookiePreferences")
    );
    if (savedPreferences) {
      setPreferences(savedPreferences);
      setIsVisible(false); // Пользователь уже согласился, баннер не показываем
    } else {
      setIsVisible(true); // Показываем баннер, если нет сохраненных предпочтений
    }
  }, []);

  const savePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences));
  };

  const handleAcceptAll = () => {
    const allAcceptedPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAcceptedPreferences);
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const declinedPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(declinedPreferences);
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
    setIsVisible(false);
    setIsSettingsOpen(false);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <>
      <div className="fixed bottom-5 left-5 z-50">
        <button
          onClick={toggleSettings}
          title="Cookies Einstellungen"
          className="bg-teal-900 text-white text-right p-4 rounded-full shadow-lg h-16 w-24 transform transition-all duration-300 ease-in-out hover:translate-x-8 hover:scale-125"
          style={{ marginLeft: "-70px" }}
        >
          <CogIcon className="h-6 w-6 ml-10" />
        </button>
      </div>

      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-transform transform animate-slide-up backdrop-blur-sm bg-black bg-opacity-30">
          <div className="bg-gray-400 p-6 shadow-lg max-w-lg w-full mx-4 sm:mx-0">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Wir nutzen Cookies
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Diese Website nutzt Cookies zur Verbesserung des Service. Bitte
              wählen Sie Ihre Präferenzen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleDeclineAll}
                className="bg-gray-200 hover:bg-gray-500 text-teal-900 py-2 px-4 rounded"
              >
                Ablehnen
              </button>
              <button
                onClick={toggleSettings}
                className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded"
              >
                Einstellungen
              </button>
              <button
                onClick={handleAcceptAll}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно настроек */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cookie-Einstellungen</h2>
              <button
                onClick={toggleSettings}
                className="text-gray-500 hover:text-gray-700"
              >
                <img
                  src="/images/close-icon.gif"
                  alt="close"
                  className="w-6 h-6"
                />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-700">
                  Technisch notwendige Cookies (immer aktiv)
                </label>
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="cursor-not-allowed"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700">Analytische Cookies</label>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      analytics: e.target.checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700">Marketing Cookies</label>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      marketing: e.target.checked,
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition-all"
              >
                Einstellungen speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Блокирует взаимодействие с основной страницей, пока баннер виден */}
      {isVisible && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 backdrop-blur-sm"></div>
      )}
    </>
  );
};

export default CookieConsent;
