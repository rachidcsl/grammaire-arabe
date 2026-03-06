/**
 * Moteur de Jeu - Module 3 : Les 4 Types de Phrases Nominales
 */
window.launchModule3 = function() {
    const container = document.getElementById('grammar-container');
    const shuffledData = [...window.m3Data].sort(() => Math.random() - 0.5);
    
    let currentIdx = 0;
    let wordsWithErrors = 0;
    let currentWordHasError = false;
    let userSelection = null;

    // Les 4 types de rôles définis par l'utilisateur
    const rolesPairs = [
        { id: "simple", label: "مُبْتَدَأٌ / خَبَرٌ" },
        { id: "innama", label: "حَرْفُ تَأْكِيدٍ / اِسْمُ إِنَّ / خَبَرُ إِنَّ" },
        { id: "inna", label: "حَرْفُ إِنَّ / اِسْمُ إِنَّ / خَبَرُ إِنَّ" },
        { id: "inna_la", label: "حَرْفُ إِنَّ / اِسْمُ إِنَّ / اللَّامُ الْمُزَحْلَقَةُ / خَبَرُ إِنَّ" }
    ];

    function renderExercise() {
        const item = shuffledData[currentIdx];
        userSelection = null;
        currentWordHasError = false;

        container.innerHTML = `
            <div class="animate__animated animate__fadeIn flex flex-col gap-6 text-right" dir="rtl">
                <div class="flex justify-between items-center px-2" dir="ltr">
                    <span class="text-[10px] font-black text-blue-500 uppercase tracking-widest">${currentIdx + 1} / ${shuffledData.length}</span>
                </div>

                <div class="text-center py-2">
                    <p class="text-lg italic opacity-70" dir="ltr" style="color: var(--text-muted);">${item.traduction}</p>
                </div>

                <div class="flex justify-center gap-2 mb-2" dir="rtl">
                    ${item.parts.map((p) => `
                        <div class="flex-1">
                            <div class="text-2xl md:text-3xl text-center p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm border-2 border-transparent" style="font-family: 'Lateef'; color: var(--text-main);">
                                ${p}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="flex flex-col gap-2 mt-4">
                    <label class="prop-label">أَسْلُوبُ الْجُمْلَةِ (Style de la phrase)</label>
                    ${rolesPairs.map(pair => `
                        <button class="btn-choice-ar w-full py-3 text-lg border-2 border-gray-100 dark:border-gray-700 rounded-xl transition-all" 
                                style="font-family: 'Lateef'; background: var(--bg-card); color: var(--text-main); min-height: 55px;"
                                onclick="window.selectM3Pair('${pair.id}', this)">
                            ${pair.label}
                        </button>
                    `).join('')}
                </div>

                <button id="btn-verify-m3" onclick="window.checkM3Final()" class="w-full py-4 mt-4 bg-blue-900 text-white rounded-[1.5rem] font-bold shadow-xl text-xl" style="font-family: 'Lateef';">
                    تَحَقَّقْ مِنَ الإِجَابَةِ
                </button>
            </div>
        `;
    }

    window.selectM3Pair = function(id, btn) {
        userSelection = id;
        btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('selected', 'bg-blue-100', 'dark:bg-blue-800', 'border-blue-500'));
        btn.classList.add('selected', 'bg-blue-100', 'dark:bg-blue-800', 'border-blue-500');
    };

    window.checkM3Final = function() {
        const item = shuffledData[currentIdx];
        const btnVerify = document.getElementById('btn-verify-m3');
        if (!userSelection) return;

        if (userSelection === item.type) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
            currentIdx++;
            if (currentIdx >= shuffledData.length) {
                const finalScore = shuffledData.length - wordsWithErrors;
                saveScoreToHistory("Module 3 – Phrase Nominale", finalScore, shuffledData.length);
                setTimeout(renderEnd, 800);
            } else {
                setTimeout(renderExercise, 1200);
            }
        } else {
            if (!currentWordHasError) { wordsWithErrors++; currentWordHasError = true; }
            btnVerify.classList.add('animate__animated', 'animate__headShake', 'bg-red-600');
            btnVerify.innerText = "حَاوِلْ مَرَّةً أُخْرَى";
            setTimeout(() => {
                btnVerify.classList.remove('animate__animated', 'animate__headShake', 'bg-red-600');
                btnVerify.innerText = "تَحَقَّقْ مِنَ الإِجَابَةِ";
            }, 1000);
        }
    };

    function renderEnd() {
        const finalScore = shuffledData.length - wordsWithErrors;
        container.innerHTML = `
            <div class="text-center p-6 animate__animated animate__bounceIn">
                <div class="text-6xl mb-4">🏆</div>
                <h2 class="text-3xl font-bold mb-4" style="font-family: 'Lateef'; color: var(--text-main);">تَمَّ الإِنْجَازُ !</h2>
                <p class="text-4xl font-black text-blue-600 mb-8">${finalScore} / ${shuffledData.length}</p>
                <button onclick="location.reload()" class="w-full py-4 bg-blue-900 text-white rounded-2xl font-bold">RETOUR</button>
            </div>
        `;
    }

    renderExercise();
};