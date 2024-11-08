

const AboutUs = () => {
    return (
        <section id="about" className="p-8 bg-light">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-primary mb-4">Über Uns</h2>
                <p className="text-dark">
                    Wir sind ein spezialisiertes Unternehmen für Flachdachabdichtungen und Bedachungen.
                </p>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-2xl font-semibold">Erfahrung</h3>
                        <p>Mit über 20 Jahren Erfahrung bieten wir qualitativ hochwertige Lösungen für Dachabdichtungen und Renovierungen.</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold">Unsere Mission</h3>
                        <p>Unsere Mission ist es, Ihnen die besten Dachlösungen zu bieten, die den neuesten Standards entsprechen.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
