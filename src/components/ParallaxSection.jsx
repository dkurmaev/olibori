const ParallaxSection = () => {
    // Функция прокрутки к секции "services"
    const scrollToServices = () => {
        const serviceSection = document.getElementById("services"); // Убедитесь, что ID совпадает
        if (serviceSection) {
            serviceSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative bg-fixed bg-center bg-cover h-screen flex flex-col items-center justify-center"
            style={{
                backgroundImage: "url('/images/parallax.jpg')"
            }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-center text-white">
                {/* Заголовок */}
                <h1 className="text-2xl md:text-3xl lg:text-8xl font-bold ">
                    Was können wir für Sie tun?
                </h1>
                {/* Описание */}
                <p className="text-xl md:text-xl text-yellow-400 italic mb-6">
                    Unsere Mission ist es, Ihnen die besten Dachlösungen zu bieten, die den neuesten Standards entsprechen.
                </p>

                {/* Стрелки - здесь добавляем onClick на весь div */}
                <div 
                    onClick={scrollToServices} // добавляем обработчик клика на весь блок
                    className="flex gap-64 justify-center space-x-24 mt-12 md:space-x-32 lg:space-x-48 cursor-pointer"
                >
                    {/* Стрелка 1 */}
                    <svg className="w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23.148,11.973l-9.38,9.295c-.944,.945-2.589,.947-3.537-.002L.852,11.973c-.196-.194-.513-.192-.707,.004-.194,.195-.193,.513,.003,.707l9.377,9.291c.661,.661,1.54,1.025,2.475,1.025s1.814-.364,2.473-1.023l9.379-9.293c.196-.194,.197-.512,.003-.707-.194-.196-.51-.198-.707-.004Z" />
                        <path d="M23.149,1.644L13.06,11.561c-.565,.566-1.551,.569-2.124-.003L.851,1.644c-.198-.194-.514-.192-.707,.006-.194,.197-.191,.514,.006,.707L10.232,12.268c.472,.473,1.1,.732,1.768,.732s1.296-.26,1.765-.729L23.851,2.356c.197-.193,.2-.51,.006-.707-.193-.198-.51-.2-.707-.006Z"></path>
                    </svg>

                    {/* Стрелка 2 с задержкой */}
                    <svg className="w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24 animate-bounce delay-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23.148,11.973l-9.38,9.295c-.944,.945-2.589,.947-3.537-.002L.852,11.973c-.196-.194-.513-.192-.707,.004-.194,.195-.193,.513,.003,.707l9.377,9.291c.661,.661,1.54,1.025,2.475,1.025s1.814-.364,2.473-1.023l9.379-9.293c.196-.194,.197-.512,.003-.707-.194-.196-.51-.198-.707-.004Z" />
                        <path d="M23.149,1.644L13.06,11.561c-.565,.566-1.551,.569-2.124-.003L.851,1.644c-.198-.194-.514-.192-.707,.006-.194,.197-.191,.514,.006,.707L10.232,12.268c.472,.473,1.1,.732,1.768,.732s1.296-.26,1.765-.729L23.851,2.356c.197-.193,.2-.51,.006-.707-.193-.198-.51-.2-.707-.006Z"></path>
                    </svg>

                    {/* Стрелка 3 с задержкой */}
                    <svg className="w-8 h-8 md:w-16 md:h-16 lg:w-24 lg:h-24 animate-bounce delay-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M23.148,11.973l-9.38,9.295c-.944,.945-2.589,.947-3.537-.002L.852,11.973c-.196-.194-.513-.192-.707,.004-.194,.195-.193,.513,.003,.707l9.377,9.291c.661,.661,1.54,1.025,2.475,1.025s1.814-.364,2.473-1.023l9.379-9.293c.196-.194,.197-.512,.003-.707-.194-.196-.51-.198-.707-.004Z" />
                        <path d="M23.149,1.644L13.06,11.561c-.565,.566-1.551,.569-2.124-.003L.851,1.644c-.198-.194-.514-.192-.707,.006-.194,.197-.191,.514,.006,.707L10.232,12.268c.472,.473,1.1,.732,1.768,.732s1.296-.26,1.765-.729L23.851,2.356c.197-.193,.2-.51,.006-.707-.193-.198-.51-.2-.707-.006Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ParallaxSection;
