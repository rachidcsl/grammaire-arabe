/**
 * Données d'exercices pour le Module 1 (L'Ism)
 * Extraites du Module 1 - Propriétés de l'Ism
 */

const m1Data = [
    {
        texte: "الْعَالَمِينَ",
        reponse: {
            etat: "nasb_jarr",   // Car finit par "ina" (Pluriel masculin)
            genre: "masculin",
            nombre: "pluriel",
            definition: "defini" // Présence de "Al"
        }
    },
    {
        texte: "بَحْرٌ",
        reponse: {
            etat: "raf",         // Car finit par double damma
            genre: "masculin",
            nombre: "singulier",
            definition: "indefini" // Présence du Tanwin
        }
    },
    {
        texte: "جَبَلٍ",
        reponse: {
            etat: "jarr",        // Car finit par double kasra
            genre: "masculin",
            nombre: "singulier",
            definition: "indefini"
        }
    },
    {
        texte: "جَنَّاتٌ",
        reponse: {
            etat: "raf",         // Terminaison "atun"
            genre: "feminin",
            nombre: "pluriel",
            definition: "indefini"
        }
    },
    {
        texte: "شَفَتَيْنِ",
        reponse: {
            etat: "nasb_jarr",   // Terminaison "ayni" (Duel)
            genre: "feminin",
            nombre: "duel",
            definition: "indefini"
        }
    },
    {
        texte: "الْقِيَامَةِ",
        reponse: {
            etat: "jarr",        // Finit par kasra
            genre: "feminin",    // Ta marbouta
            nombre: "singulier",
            definition: "defini"
        }
    },
    {
        texte: "السَّاعَةُ",
        reponse: {
            etat: "raf",         // Finit par damma
            genre: "feminin",
            nombre: "singulier",
            definition: "defini"
        }
    },
    {
        texte: "الْمُتَّقِينَ",
        reponse: {
            etat: "nasb_jarr",   // Terminaison "ina"
            genre: "masculin",
            nombre: "pluriel",
            definition: "defini"
        }
    }
];

// On rend les données accessibles globalement pour le moteur de jeu
window.m1Data = m1Data;
