export const neubauOptions = [
    {
      name: "Unterkonstruktion",
      description: "Dient als Basis für alle nachfolgenden Schichten des Daches. Gewährleistet Stabilität und gleichmäßige Lastverteilung.",
      options: [
        {
          name: "Beton",
          cost: 50,
          description: "Robuste und stabile Grundlage für schwere Konstruktionen.",
        },
        {
          name: "Trapezblech",
          cost: 30,
          description: "Leicht und wirtschaftlich, ideal für moderne Bauten.",
        },
      ],
    },
    {
      name: "Dampfsperre",
      description: "Wird installiert, um das Eindringen von Feuchtigkeit aus Innenräumen in die Dämmschichten zu verhindern.",
      options: [
        {
          name: "S4 + Alu",
          cost: 10,
          description:
            "Effektive Dampfsperre mit Aluminium-Beschichtung, die hohe Dichtigkeit gewährleistet.",
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
      name: "Dämmung",
      description: "Schicht von Dämmmaterial, die Wärmeverluste verhindert und die Energieeffizienz des Gebäudes sicherstellt.",
      options: [
        {
          name: "EPS",
          cost: 30,
          description: "Günstige und effektive Dämmung mit guten Wärmedämmeigenschaften.",
        },
        {
          name: "PIR",
          cost: 40,
          description: "Hohe Dämmwerte bei geringem Platzbedarf.",
        },
        {
          name: "Steinwolle",
          cost: 20,
          description: "Robustes und nicht brennbares Material, kostengünstig.",
        },
        
      ],
    },
   
    {
      name: "Abdichtung",
      description: "Verantwortlich für die Abdichtung des Daches und verhindert das Eindringen von Feuchtigkeit und Wasser in die Konstruktion.",
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
          description: "Ideal für die präzise Abdichtung schwer zugänglicher Stellen." 
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
      name: "Dachreparatur",
      description: "Beinhaltet den Austausch oder die Reparatur beschädigter Dachelemente.",
      options: [
        {
          name: "Dachziegel",
          cost: 5,
          description: "Schneller Austausch von gebrochenen oder beschädigten Ziegeln.",
        },
        {
          name: "Bitumenbahnen",
          cost: 10,
          description: "Eignen sich zur Abdichtung kleiner Schäden, insbesondere bei Flachdächern.",
        },
        {
          name: "Metallbleche (z. B. Zink oder Aluminium)",
          cost: 30,
          description: "Reparatur oder Ersatz von Metalldachelementen.",
        },
        
      ],
    },
  
    {
      name: "Neudeckung",
      description: "Komplette Neueindeckung mit Materialien Ihrer Wahl.",
      options: [
        {
          name: "Tondachziegel",
          cost: 50,
          description: "Klassischer und langlebiger Werkstoff.",
        },
        {
          name: "Betondachsteine",
          cost: 25,
          description: "Günstiger als Ton, ähnliche Optik.",
        },
        {
          name: "Metallpaneele (z. B. Aluminium, Zink, Kupfer)",
          cost: 130,
          description: "Modernes Material mit Langlebigkeit und Ästhetik.",
        },
        {
          name: "Schieferplatten",
          cost: 170,
          description: "Hochwertig und elegant, für historische Gebäude beliebt.",
        },
        {
          name: "Bitumenschindeln",
          cost: 15,
          description: "Leichtes, günstiges und vielseitiges Dachmaterial.",
        },
        {
          name: "Reetdach (für traditionelle Gebäude)",
          cost: 135,
          description: "Selten, aber ästhetisch.",
        },
      ],
    },
    {
      name: "Energetische Wärmedämmung",
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
      name: "Komplettsanierung des Daches",
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
      name: "Flachdach-Sanierung",
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
      name: "Dachbegrünung (Gründach)",
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
  