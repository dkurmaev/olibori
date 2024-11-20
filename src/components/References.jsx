const References = () => {
    const references = [
        {
            companyName: 'Müller Bau GmbH',
            description: 'Unsere Zusammenarbeit mit Olidort Bedachungen war hervorragend. Die Arbeiten wurden termingerecht und professionell ausgeführt.',
            logoUrl: '/images/muller-bau-logo.png',
        },
        {
            companyName: 'Schmidt & Partner AG',
            description: 'Olidort Bedachungen hat unser Flachdach perfekt isoliert und die Qualität der Materialien ist erstklassig. Sehr empfehlenswert!',
            logoUrl: '/images/schmidt-partner-logo.png',
        },
        {
            companyName: 'Baumeister AG',
            description: 'Die Dachsanierung unseres Bürogebäudes wurde schnell und effizient abgeschlossen. Wir sind sehr zufrieden.',
            logoUrl: '/images/baumeister-ag-logo.png',
        },
    ];

    return (
        <section className="py-8 bg-teal-900">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-6xl my-8 font-heading font-bold text-gray-500 uppercase border-b-2 border-gray-300 pb-4">Referenzen</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {references.map((ref, index) => (
                        <div key={index} className="bg-transparent p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
                            <img src={ref.logoUrl} alt={`${ref.companyName} logo`} className="w-32 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-center mb-2">{ref.companyName}</h3>
                            <p className="text-gray-200 text-center">{ref.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default References;
