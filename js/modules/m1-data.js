window.m1Data = [
    {
        texte: "الْعَالَمِينَ",
        // Ici, la terminaison "ina" ne permet pas de trancher
        reponse: { etat: ["nasb", "jarr"], genre: "masculin", nombre: "pluriel", definition: "defini" }
    },
    {
        texte: "بَحْرٌ",
        reponse: { etat: "raf", genre: "masculin", nombre: "singulier", definition: "indefini" }
    },
    {
        texte: "جَنَّاتٌ",
        reponse: { etat: "raf", genre: "feminin", nombre: "pluriel", definition: "indefini" }
    },
    {
        texte: "شَفَتَيْنِ",
        // Duel en "ayni" : ambigu entre Nasb et Jarr
        reponse: { etat: ["nasb", "jarr"], genre: "feminin", nombre: "duel", definition: "indefini" }
    },
    {
        texte: "الْقِيَامَةِ",
        // Terminaison en "i" : Jarr pur
        reponse: { etat: "jarr", genre: "feminin", nombre: "singulier", definition: "defini" }
    }
];