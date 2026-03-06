/**
 * Moteur de Jeu - Module 1 : Étude du Ism
 * Mise à jour : Tirage aléatoire des exercices à chaque lancement.
 */

window.launchModule1 = function() {
    const container = document.getElementById('grammar-container');
    
    // 1. Mélange des données pour rendre l'ordre aléatoire
    const shuffledData = [...window.m1Data].sort(() => Math.random() - 0.5);
    
    let currentIdx = 0;
    let wordsWithErrors = 0; // Compte les mots ratés (au moins une erreur)
    let currentWordHasError = false; // Flag pour le mot en cours
    let userSelections = {};

    const labels = {
        etat: "الإِعْرَابُ",
        raf: "رَفْعٌ", nasb: "نَصْبٌ", jarr: "جَرٌّ",
        genre: "الجِنْسُ",
        masculin: "مُذَكَّرٌ", feminin: "مُؤَنَّثٌ",
        nombre: "العَدَدُ",
        singulier: "مُفْرَدٌ", duel: "مُثَنَّى", pluriel: "جَمْعٌ",
        definition: "التَّعْرِيفُ",
        defini: "مَعْرِفَةٌ", indefini: "نَكِرَةٌ",
        verifier: "تَحَقَّقْ مِنَ الإِجَابَةِ",
        bravo: "أَحْسَنْتَ !", erreur: "خَطَأٌ"
    };

    function renderAnalysis() {
        const item = shuffledData[currentIdx];
        userSelections = {}; 
        currentWordHasError = false;

        // Affichage du pluriel brisé si présent (ex: ج : بِحَارٌ)
        const pluralText = item.pluriel ? `<span class="text-2xl opacity-50" style="font-family: 'Lateef';"> (ج : ${item.pluriel})</span>` : '';

        container.innerHTML = `
            <div class="animate__animated animate__fadeIn flex flex-col gap-4" dir="rtl">
                <div class="flex justify-between items-center px-2" dir="ltr">
                    <span class="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                        Mot : ${currentIdx + 1} / ${shuffledData.length}
                    </span>
                    <div class="h-1.5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500 transition-all duration-500" style="width: ${(currentIdx / shuffledData.length) * 100}%"></div>
                    </div>
                </div>
                
                <div class="text-center">
                    <div class="text-7xl" style="font-family: 'Lateef'; color: var(--text-main); line-height: 1.2;">
                        ${item.texte}${pluralText}
                    </div>
                    <p class="text-lg italic opacity-70 mt-2" style="font-family: 'Inter'; color: var(--text-muted);" dir="ltr">
                        ${item.traduction}
                    </p>
                </div>
                
                <div class="flex flex-col gap-5 mt-4">
                    <div>
                        <label class="prop-label">${labels.etat}</label>
                        <div class="grid grid-cols-3 gap-2">
                            <button class="btn-choice-ar" onclick="window.selectM1(this, 'etat', 'raf')">${labels.raf}</button>
                            <button class="btn-choice-ar" onclick="window.selectM1(this, 'etat', 'nasb')">${labels.nasb}</button>
                            <button class="btn-choice-ar" onclick="window.selectM1(this, 'etat', 'jarr')">${labels.jarr}</button>
                        </div>
                    </div>

                    ${renderGroup(labels.genre, 'genre', [[labels.masculin, 'masculin'], [labels.feminin, 'feminin']])}
                    ${renderGroup(labels.nombre, 'nombre', [[labels.singulier, 'singulier'], [labels.duel, 'duel'], [labels.pluriel, 'pluriel']])}
                    ${renderGroup(labels.definition, 'definition', [[labels.defini, 'defini'], [labels.indefini, 'indefini']])}
                </div>

                <button id="btn-verify" onclick="window.checkM1()" class="w-full py-4 mt-4 bg-blue-900 text-white rounded-[1.5rem] font-bold shadow-xl transition-all text-2xl" style="font-family: 'Lateef';">
                    ${labels.verifier}
                </button>
            </div>
        `;
    }

    function renderGroup(label, key, options) {
        return `<div>
            <label class="prop-label">${label}</label>
            <div class="grid grid-cols-${options.length} gap-2">
                ${options.map(o => `<button class="btn-choice-ar" onclick="window.selectM1(this, '${key}', '${o[1]}')">${o[0]}</button>`).join('')}
            </div>
        </div>`;
    }

    window.selectM1 = function(btn, key, val) {
        btn.parentElement.querySelectorAll('.btn-choice-ar').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        userSelections[key] = val;
    };

    window.checkM1 = function() {
        const item = shuffledData[currentIdx];
        const correct = item.reponse;
        let errorsInThisTry = 0;

        ['etat', 'genre', 'nombre', 'definition'].forEach(k => {
            const userVal = userSelections[k];
            const correctVal = correct[k];
            if (Array.isArray(correctVal)) {
                if (!userVal || !correctVal.includes(userVal)) errorsInThisTry++;
            } else if (userVal !== correctVal) {
                errorsInThisTry++;
            }
        });

        const btn = document.getElementById('btn-verify');

        if (errorsInThisTry === 0) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
            currentIdx++;

            if (currentIdx >= shuffledData.length) {
                const finalScore = shuffledData.length - wordsWithErrors;
                if (typeof saveScoreToHistory === 'function') {
                    saveScoreToHistory("Module 1 – Étude du Ism", finalScore, shuffledData.length);
                }
                setTimeout(renderEnd, 800);
            } else {
                setTimeout(renderAnalysis, 1200);
            }
        } else {
            if (!currentWordHasError) {
                wordsWithErrors++; 
                currentWordHasError = true;
            }
            btn.classList.add('animate__animated', 'animate__headShake', 'bg-red-600');
            btn.innerText = `${labels.erreur} (${errorsInThisTry})`;
            setTimeout(() => {
                btn.classList.remove('animate__animated', 'animate__headShake', 'bg-red-600');
                btn.innerText = labels.verifier;
            }, 1000);
        }
    };

    function renderEnd() {
        const finalScore = shuffledData.length - wordsWithErrors;
        container.innerHTML = `
            <div class="text-center p-6 animate__animated animate__bounceIn">
                <div class="text-6xl mb-4">🏆</div>
                <h2 class="text-3xl font-bold mb-4" style="color: var(--text-main); font-family: 'Lateef'; text-transform: uppercase;">أَحْسَنْتَ !</h2>
                <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl mb-8">
                    <p class="text-sm opacity-70 mb-1">Score final (Module 1) :</p>
                    <p class="text-5xl font-black text-blue-600">${finalScore} / ${shuffledData.length}</p>
                </div>
                <button onclick="location.reload()" class="w-full py-4 bg-blue-900 text-white rounded-2xl font-bold">RETOUR AU MENU</button>
            </div>
        `;
    }

    renderAnalysis();
};