import { useState } from 'react';
import ImpressumModal from './ImpressumModal';
import AGBModal from './AGBModal';
import DatenschutzModal from './DatenschutzModal';

const Footer = () => {
    const [isImpressumOpen, setIsImpressumOpen] = useState(false);
    const [isAGBOpen, setIsAGBOpen] = useState(false);
    const [isDatenschutzOpen, setIsDatenschutzOpen] = useState(false);

    return (
        <footer className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 shadow-lg border-t border-gray-200">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center py-4 space-y-2 md:space-y-0">
                <p className="text-gray-800 text-center md:text-left">&copy; 2024 Olidort Bedachungen</p>
                <div className="flex flex-wrap justify-center md:justify-end space-x-4">
                    <button onClick={() => setIsImpressumOpen(true)} className="hover:text-secondary">Impressum</button>
                    <button onClick={() => setIsAGBOpen(true)} className="hover:text-secondary">AGB</button>
                    <button onClick={() => setIsDatenschutzOpen(true)} className="hover:text-secondary">Datenschutz</button>
                    <a href="https://facebook.com" className="hover:text-secondary">Facebook</a>
                    <a href="https://instagram.com" className="hover:text-secondary">Instagram</a>
                </div>
            </div>

            {/* Модальные окна */}
            <ImpressumModal isOpen={isImpressumOpen} onClose={() => setIsImpressumOpen(false)} />
            <AGBModal             
                isOpen={isAGBOpen} 
                onClose={() => setIsAGBOpen(false)} 
            />
            <DatenschutzModal 
                isOpen={isDatenschutzOpen} 
                onClose={() => setIsDatenschutzOpen(false)} 
                onAccept={() => setIsDatenschutzOpen(false)} 
            />
        </footer>
    );
};

export default Footer;
