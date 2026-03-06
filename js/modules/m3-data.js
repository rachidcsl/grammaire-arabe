/**
 * Données d'exercices - Module 3 : Phrase Nominale & Intensification
 * 20 Exercices répartis en 4 catégories :
 * 1) simple (2 blocs)
 * 2) innama (3 blocs)
 * 3) inna (3 blocs)
 * 4) inna_la (4 blocs)
 */
window.m3Data = [
    // --- 1) SIMPLE : مُبْتَدَأٌ / خَبَرٌ (5 exercices) ---
    {
        texte: "الْوَلَدُ صَالِحٌ",
        traduction: "Le garçon est pieux",
        parts: ["الْوَلَدُ", "صَالِحٌ"],
        type: "simple"
    },
    {
        texte: "الْعِلْمُ نُورٌ",
        traduction: "La science est une lumière",
        parts: ["الْعِلْمُ", "نُورٌ"],
        type: "simple"
    },
    {
        texte: "الْبَيْتُ كَبِيرٌ",
        traduction: "La maison est grande",
        parts: ["الْبَيْتُ", "كَبِيرٌ"],
        type: "simple"
    },
    {
        texte: "الْحَقُّ مَبِينٌ",
        traduction: "La vérité est évidente",
        parts: ["الْحَقُّ", "مَبِينٌ"],
        type: "simple"
    },
    {
        texte: "الصَّبْرُ جَمِيلٌ",
        traduction: "La patience est belle",
        parts: ["الصَّبْرُ", "جَمِيلٌ"],
        type: "simple"
    },

    // --- 2) INNAMA : حَرْفُ تَأْكِيدٍ / اِسْمُ إِنَّ / خَبَرُ إِنَّ (5 exercices) ---
    {
        texte: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
        traduction: "Les croyants ne sont que des frères",
        parts: ["إِنَّمَا", "الْمُؤْمِنُونَ", "إِخْوَةٌ"],
        type: "innama"
    },
    {
        texte: "إِنَّمَا الْحَيَاةُ دُنْيَا",
        traduction: "La vie n'est que passagère",
        parts: ["إِنَّمَا", "الْحَيَاةُ", "دُنْيَا"],
        type: "innama"
    },
    {
        texte: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
        traduction: "Les actes ne valent que par les intentions",
        parts: ["إِنَّمَا", "الْأَعْمَالُ", "بِالنِّيَّاتِ"],
        type: "innama"
    },
    {
        texte: "إِنَّمَا اللَّهُ إِلَهٌ",
        traduction: "Allah n'est qu'une divinité",
        parts: ["إِنَّمَا", "اللَّهُ", "إِلَهٌ"],
        type: "innama"
    },
    {
        texte: "إِنَّمَا الْبَيَانُ سِحْرٌ",
        traduction: "L'éloquence est comme de la magie",
        parts: ["إِنَّمَا", "الْبَيَانُ", "سِحْرٌ"],
        type: "innama"
    },

    // --- 3) INNA : حَرْفُ إِنَّ / اِسْمُ إِنَّ / خَبَرُ إِنَّ (5 exercices) ---
    {
        texte: "إِنَّ اللَّهَ غَفُورٌ",
        traduction: "Certes, Allah est Pardonneur",
        parts: ["إِنَّ", "اللَّهَ", "غَفُورٌ"],
        type: "inna"
    },
    {
        texte: "إِنَّ السَّاعَةَ آتِيَةٌ",
        traduction: "Certes, l'Heure arrive",
        parts: ["إِنَّ", "السَّاعَةَ", "آتِيَةٌ"],
        type: "inna"
    },
    {
        texte: "إِنَّ الدِّينَ يُسْرٌ",
        traduction: "Certes, la religion est facilité",
        parts: ["إِنَّ", "الدِّينَ", "يُسْرٌ"],
        type: "inna"
    },
    {
        texte: "إِنَّ النَّصْرَ قَرِيبٌ",
        traduction: "Certes, le secours est proche",
        parts: ["إِنَّ", "النَّصْرَ", "قَرِيبٌ"],
        type: "inna"
    },
    {
        texte: "إِنَّ الْإِنْسَانَ ظَلُومٌ",
        traduction: "Certes, l'homme est très injuste",
        parts: ["إِنَّ", "الْإِنْسَانَ", "ظَلُومٌ"],
        type: "inna"
    },

    // --- 4) INNA_LA : حَرْفُ إِنَّ / اِسْمُ إِنَّ / اللَّامُ الْمُزَحْلَقَةُ / خَبَرُ إِنَّ (5 exercices) ---
    {
        texte: "إِنَّ رَبَّكَ لَغَفُورٌ",
        traduction: "Très certainement, ton Seigneur est bien Pardonneur",
        parts: ["إِنَّ", "رَبَّكَ", "لَـ", "غَفُورٌ"],
        type: "inna_la"
    },
    {
        texte: "إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ",
        traduction: "Très certainement, l'homme est bien en perdition",
        parts: ["إِنَّ", "الْإِنْسَانَ", "لَفِي", "خُسْرٍ"],
        type: "inna_la"
    },
    {
        texte: "إِنَّ السَّاعَةَ لَآتِيَةٌ",
        traduction: "Très certainement, l'Heure va bien arriver",
        parts: ["إِنَّ", "السَّاعَةَ", "لَـ", "آتِيَةٌ"],
        type: "inna_la"
    },
    {
        texte: "إِنَّ رَبِّي لَسَمِيعُ الدُّعَاءِ",
        traduction: "Très certainement, mon Seigneur entend bien l'invocation",
        parts: ["إِنَّ", "رَبِّي", "لَـ", "سَمِيعُ الدُّعَاءِ"],
        type: "inna_la"
    },
    {
        texte: "إِنَّ هَذَا لَهُوَ الْفَوْزُ",
        traduction: "Très certainement, ceci est bien le succès",
        parts: ["إِنَّ", "هَذَا", "لَـ", "هُوَ الْفَوْزُ"],
        type: "inna_la"
    }
];