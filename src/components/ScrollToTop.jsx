import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-5 right-1 z-50 ">
      {isVisible && (
        <button
          onClick={scrollToTop}
          title="Nach oben scrollen"
          className="bg-teal-900 text-white p-4 rounded-full shadow-lg h-16 w-20 transform transition-all duration-300 ease-in-out -translate-x-8 hover:scale-125 z-50"
          style={{ marginRight: '-70px' }} // Initially, only part of the button is visible
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
