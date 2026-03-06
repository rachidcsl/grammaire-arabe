/**
 * Moteur de Jeu - Module 2 : Identification Directe des Fragments
 * Mise à jour : Tirage aléatoire des exercices à chaque lancement.
 */
window.launchModule2 = function() {
    const container = document.getElementById('grammar-container');
    
    // 1. Mélange des données pour rendre l'ordre aléatoire
    const shuffledData = [...window.m2Data].sort(() => Math.random() - 0.5);
    
    let currentIdx = 0;
    let wordsWithErrors = 0;
    let currentWordHasError = false;
    let userSelections = { rolesPairId: null };

    // Liste des couples de rôles
    const rolesPairsData = [
        { id: "sifa", label: "مَوْصُوفٌ / صِفَةٌ" },
        { id: "ishara", label: "اِسْمُ إِشَارَةٍ / مُشَارٌ إِلَيْهِ" },
        { id: "jarr", label: "حَرْفُ جَرٍّ / اِسْمٌ مَجْرُورٌ" },
        { id: "idafa", label: "مُضَافٌ / مُضَافٌ إِلَيْهِ" },
        { id: "zarf", label: "ظَرْفٌ مُضَافٌ / مُضَافٌ إِلَيْهِ" }
    ];

    function renderExercise() {
        const item = shuffledData[currentIdx];
        userSelections = { rolesPairId: null };
        currentWordHasError = false;

        container.innerHTML = `
            <div class="animate__animated animate__fadeIn flex flex-col gap-6 text-right" dir="rtl">
                <div class="flex justify-between items-center px-2" dir="ltr">
                    <span class="text-[10px] font-black text-blue-500 uppercase tracking-widest">${currentIdx + 1} / ${shuffledData.length}</span>
                    <div class="h-1.5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500 transition-all duration-500" style="width: ${(currentIdx / shuffledData.length) * 100}%"></div>
                    </div>
                </div>

                <div class="text-center py-4">
                    <p class="text-lg italic opacity-70" dir="ltr" style="color: var(--text-muted);">${item.traduction}</p>
                </div>

                <div class="flex justify-around gap-4 mb-2">
                    ${item.parts.map((p, i) => `
                        <div class="flex-1">
                            <div class="text-5xl text-center p-4 rounded-3xl bg-white dark:bg-gray-800 shadow-md border-2 border-transparent" style="font-family: 'Lateef'; color: var(--text-main);">
                                ${p}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="flex flex-col gap-3">
                    <label class="prop-label">نَوْعُ المُرَكَّبِ (Couple de rôles)</label>
                    <div class="grid grid-cols-1 gap-2">
                        ${rolesPairsData.map(pair => `
                            <button class="btn-choice-ar w-full py-4 text-2xl border-2 border-gray-100 dark:border-gray-700 rounded-xl transition-all" 
                                    style="font-family: 'Lateef'; background: var(--bg-card); color: var(--text-main); min-height: 60px;"
                                    onclick="window.selectM2RolesPair('${pair.id}', this)">
                                ${pair.label}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <button id="btn-verify-m2" onclick="window.checkM2Final()" class="w-full py-4 mt-6 bg-blue-900 text-white rounded-[1.5rem] font-bold shadow-xl text-2xl" style="font-family: 'Lateef';">
                    تَحَقَّقْ مِنَ الإِجَابَةِ
                </button>
            </div>
        `;
    }

    window.selectM2RolesPair = function(pairId, btn) {
        userSelections.rolesPairId = pairId;
        btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('selected', 'bg-blue-100', 'dark:bg-blue-800'));
        btn.classList.add('selected', 'bg-blue-100', 'dark:bg-blue-800');
    };

    window.checkM2Final = function() {
        const item = shuffledData[currentIdx];
        const btnVerify = document.getElementById('btn-verify-m2');
        
        if (!userSelections.rolesPairId) {
            animateError(btnVerify);
            return;
        }

        if (userSelections.rolesPairId === item.type) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
            currentIdx++;

            if (currentIdx >= shuffledData.length) {
                const finalScore = Math.max(0, shuffledData.length - wordsWithErrors);
                if (typeof saveScoreToHistory === 'function') {
                    saveScoreToHistory("Module 2 – Les Fragments", finalScore, shuffledData.length);
                }
                setTimeout(renderEnd, 800);
            } else {
                setTimeout(renderExercise, 1200);
            }
        } else {
            if (!currentWordHasError) {
                wordsWithErrors++;
                currentWordHasError = true;
            }
            animateError(btnVerify, "حَاوِلْ مَرَّةً أُخْرَى");
        }
    };

    function animateError(btn, text = "تَحَقَّقْ") {
        btn.classList.add('animate__animated', 'animate__headShake', 'bg-red-600');
        const originalText = btn.innerText;
        btn.innerText = text;
        setTimeout(() => {
            btn.classList.remove('animate__animated', 'animate__headShake', 'bg-red-600');
            btn.innerText = "تَحَقَّقْ مِنَ الإِجَابَةِ";
        }, 1000);
    }

    function renderEnd() {
        const finalScore = Math.max(0, shuffledData.length - wordsWithErrors);
        container.innerHTML = `
            <div class="text-center p-6 animate__animated animate__bounceIn">
                <div class="text-6xl mb-4">🏆</div>
                <h2 class="text-3xl font-bold mb-4" style="font-family: 'Lateef'; color: var(--text-main);">أَحْسَنْتَ !</h2>
                <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl mb-8">
                    <p class="text-sm opacity-70 mb-1">Score final (Module 2) :</p>
                    <p class="text-5xl font-black text-blue-600">${finalScore} / ${shuffledData.length}</p>
                </div>
                <button onclick="location.reload()" class="w-full py-4 bg-blue-900 text-white rounded-2xl font-bold">RETOUR</button>
            </div>
        `;
    }

    renderExercise();
};