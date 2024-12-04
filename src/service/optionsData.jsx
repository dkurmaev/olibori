export const neubauOptions = [
    {
      name: "Unterkonstruktion:",
      options: [
        {
          name: "Beton",
          cost: 50,
          description: "Robuste Grundlage für Dachaufbauten.",
        },
        {
          name: "Trapezblech",
          cost: 30,
          description: "Leicht, stabil und wirtschaftlich.",
        },
      ],
    },
    {
      name: "Dampfsperre",
      options: [
        {
          name: "S4 + Alu",
          cost: 10,
          description:
            "Aluminium-beschichtete Dampfsperre mit hoher Dichtigkeit.",
        },
        {
          name: "RE-Folie",
          cost: 5,
          description:
            "Wirtschaftliche Lösung, geeignet für einfache Anwendungen.",
        },
      ],
    },
    {
      name: "Dämmung:",
      options: [
        {
          name: "EPS",
          cost: 30,
          description: "Günstige und effektive Dämmung.",
        },
        {
          name: "PIR",
          cost: 40,
          description: "Sehr gute Wärmedämmeigenschaften, leicht und langlebig.",
        },
        {
          name: "Steinwolle",
          cost: 20,
          description: "Günstig und effektiv.",
        },
        
      ],
    },
   
    {
      name: "Abdichtung:",
      options: [
        {
          name: "PVC",
          cost: 30,
          description: "Flexibel, langlebig und für viele Dacharten geeignet.",
        },
        {
          name: "TPO",
          cost: 40,
          description: "Umweltfreundlicher und UV-beständiger als PVC.",
        },
        { name: "Flüssigabdichtung", 
          cost: 30, 
          description: "Für präzise und dauerhafte Versiegelung." 
        },     
        { name: "Bitumenbahn (2 lägig)",
          cost: 10,
          description: "Klassische Wahl für Flachdächer.",
        },
        
      ],
    },
  ];
  
  export const sanierungOptions = [
    {
      name: "Dachreparatur:",
      options: [
        {
          name: "Dachziegel",
          cost: 5,
          description: "Austausch einzelner beschädigter Ziegel.",
        },
        {
          name: "Bitumenbahnen",
          cost: 10,
          description:
            "Für die Abdichtung kleiner Schäden, vor allem bei Flachdächern.",
        },
        {
          name: "Metallbleche (z. B. Zink oder Aluminium)",
          cost: 30,
          description: "Reparatur oder Ersatz von Metalldachelementen.",
        },
        
      ],
    },
  
    {
      name: "Neudeckung:",
      description: "Komplette Neueindeckung mit Materialien Ihrer Wahl.",
      options: [
        {
          name: "Tondachziegel",
          cost: 50,
          description: "Klassisch und langlebig.",
        },
        {
          name: "Betondachsteine",
          cost: 25,
          description: "Günstiger als Ton, ähnliche Optik.",
        },
        {
          name: "Metallpaneele (z. B. Aluminium, Zink, Kupfer)",
          cost: 130,
          description: "Moderne Optik, besonders langlebig.",
        },
        {
          name: "Schieferplatten",
          cost: 170,
          description: "Hochwertig und elegant, für historische Gebäude beliebt.",
        },
        {
          name: "Bitumenschindeln",
          cost: 15,
          description: "Leicht, günstig und vielseitig.",
        },
        {
          name: "Reetdach (für traditionelle Gebäude)",
          cost: 135,
          description: "Selten, aber ästhetisch.",
        },
      ],
    },
    {
      name: "Energetische Wärmedämmung:",
      description: "Aufbringung von Dämmmaterial unter, zwischen oder über der Dachkonstruktion. Reduktion von Wärmeverlusten und Einhaltung der EnEV (Energieeinsparverordnung)",
      options: [
        {
          name: "Mineralwolle (Glaswolle, Steinwolle)",
          cost: 20,
          description: "Günstig und effektiv.",
        },
        {
          name: "Polyurethanplatten (PU-Platten)",
          cost: 40,
          description: "Höhere Dämmwerte für weniger Platzbedarf.",
        },
        {
          name: "Holzfaserplatten",
          cost: 60,
          description: "Ökologisch und nachhaltig.",
        },
        {
          name: "Zellulose",
          cost: 40,
          description: "Für schwer zugängliche Bereiche.",
        },
      ],
    },
    {
      name: "Komplettsanierung des Daches:",
      description: "Komplettaustausch der Dachkonstruktion und der Eindeckung. Neuaufbau der Dämmung und Abdichtung",
      options: [
        {
          name: "Kombiniert die Materialien aus den Bereichen Neueindeckung und Wärmedämmung",
          cost: 300,
          description: "Optionale Materialien.",
        },
        {
          name: "Dachfenster",
          cost: 700,
          description: "pro Stück.",
        },
        {
          name: "Unterspannbahnen",
          cost: 5,
          description: "pro m².",
        },
      ],
    },
    {
      name: "Flachdach-Sanierung:",
      description: "Abdichtung des Daches mit Bitumenbahnen, EPDM-Folie oder Flüssigkunststoff. Ergänzung oder Austausch der Wärmedämmung",
      options: [
        {
          name: "Bitumenbahnen",
          cost: 10,
          description: "Für Abdichtung.",
        },
        {
          name: "EPDM-Folie",
          cost: 20,
          description: "Hochwertige Alternative zu Bitumen, langlebig und flexibel.",
        },
        {
          name: "Flüssigkunststoff",
          cost: 40,
          description: "Für kleinere Reparaturen oder Details.",
        },
      ],
    },
    {
      name: "Dachbegrünung (Gründach):",
      description: "Installation einer Substratschicht und Vegetation auf Flachdächern oder leicht geneigten Dächern.",
      options: [
        {
          name: "Dachabdichtung (z. B. EPDM-Folie)",
          cost: 20,
          description: "Schutz vor Feuchtigkeit.",
        },
        {
          name: "Drainageschicht",
          cost: 10,
          description: "Verhindert Staunässe.",
        },
        {
          name: "Substratschicht",
          cost: 15,
          description: "Spezielle Erde für Pflanzen.",
        },
        {
            name: "Pflanzen",
            cost: 30,
            description: "Sukkulenten, Moose oder Gräser.",
          },    
      ],
    },
     
  ];
  