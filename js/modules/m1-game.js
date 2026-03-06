/**
 * Moteur de Jeu - Module 1 : Propriétés de l'Ism
 * Gère le cycle de vie de l'exercice : Découpage -> Analyse -> Validation
 */

window.launchModule1 = function() {
    const container = document.getElementById('grammar-container');
    let currentIdx = 0;
    let userSelections = {};

    /**
     * ÉTAPE 1 : LE DÉCOUPAGE (SLICING)
     * Affiche le mot attaché avec des zones de coupe superposées
     */
    function renderStep1() {
        const item = window.m1Data[currentIdx];
        const blocks = window.getArabicBlocks(item.texte);
        userSelections = {}; // Réinitialise les choix

        container.innerHTML = `
            <div class="animate__animated animate__fadeIn" style="background=(--bg-card)">
                <p class="text-[10px] font-black text-blue-500 uppercase text-center mb-1 tracking-widest">Étape 1 : Découpage</p>
                <h2 class="text-lg font-bold text-center mb-6" style="color: var(--text-main)">Isolez les segments si nécessaire</h2>
                
                <div class="flex justify-center">
                    <div class="slicer-wrapper">
                        <div class="arabic-word-base">${item.texte}</div>
                        
                        <div class="slicer-overlay">
                            ${blocks.map((b, i) => `
                                <div class="block-zone">
                                    <div class="flex-1"></div>
                                    ${i < blocks.length - 1 ? `
                                        <div class="cutter-zone" onclick="this.classList.toggle('is-active')">
                                            <div class="cutter-line"></div>
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="mt-8 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs text-center">
                    Touchez entre les lettres pour marquer une séparation (ex: particules).
                </div>

                <button onclick="window.renderStep2()" class="w-full py-5 mt-6 bg-blue-900 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                    VALIDER LE DÉCOUPAGE
                </button>
            </div>
        `;
    }

    /**
     * ÉTAPE 2 : L'ANALYSE (TAGGING)
     * Propose les 4 propriétés de l'Ism avec gestion de l'ambiguïté Nasb/Jarr
     */
    window.renderStep2 = function() {
        const item = window.m1Data[currentIdx];
        container.innerHTML = `
            <div class="animate__animated animate__fadeIn text-right" dir="rtl">
                <p class="text-[10px] font-black text-blue-500 uppercase text-center mb-1 tracking-widest" dir="ltr">Étape 2 : Analyse des propriétés</p>
                <div class="text-5xl text-center py-8" style="font-family: 'Lateef'; color: var(--text-main)">${item.texte}</div>
                
                <div class="space-y-6">
                    <div>
                        <label class="prop-label">État (الإعراب)</label>
                        <div class="grid grid-cols-3 gap-2">
                            <button class="btn-choice" data-key="etat" data-val="raf" onclick="window.selectM1Prop(this)">Raf'</button>
                            <button class="btn-choice" data-key="etat" data-val="nasb" onclick="window.selectM1Prop(this)">Nasb</button>
                            <button class="btn-choice" data-key="etat" data-val="jarr" onclick="window.selectM1Prop(this)">Jarr</button>
                        </div>
                    </div>

                    ${renderPropGroup('Genre (الجنس)', 'genre', [['Masculin', 'masculin'], ['Féminin', 'feminin']])}
                    
                    ${renderPropGroup('Nombre (العدد)', 'nombre', [['Singulier', 'singulier'], ['Duel', 'duel'], ['Pluriel', 'pluriel']])}
                    
                    ${renderPropGroup('Type (التعريف)', 'definition', [['Défini', 'defini'], ['Indéfini', 'indefini']])}
                </div>

                <button onclick="window.checkM1Answer()" class="w-full py-5 mt-8 bg-green-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                    VÉRIFIER LES RÉPONSES
                </button>
            </div>
        `;
    }

    /**
     * Génère dynamiquement les groupes de boutons de propriétés
     */
    function renderPropGroup(label, key, options) {
        return `
            <div>
                <label class="prop-label">${label}</label>
                <div class="grid grid-cols-${options.length} gap-2">
                    ${options.map(opt => `
                        <button class="btn-choice" data-key="${key}" data-val="${opt[1]}" onclick="window.selectM1Prop(this)">
                            ${opt[0]}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Gère la sélection visuelle des boutons
     */
    window.selectM1Prop = function(btn) {
        const key = btn.dataset.key;
        // On déselectionne les autres boutons du même groupe
        btn.parentElement.querySelectorAll('.btn-choice').forEach(b => b.classList.remove('selected'));
        // On sélectionne le bouton cliqué
        btn.classList.add('selected');
        // On enregistre le choix
        userSelections[key] = btn.dataset.val;
    };

    /**
     * LOGIQUE DE VALIDATION
     * Vérifie les réponses avec support de l'ambiguïté (Nasb/Jarr)
     */
    window.checkM1Answer = function() {
        const item = window.m1Data[currentIdx];
        const correct = item.reponse;
        let errors = 0;

        // On vérifie chaque propriété définie dans les données
        Object.keys(correct).forEach(key => {
            const userVal = userSelections[key];
            const correctVal = correct[key];

            if (Array.isArray(correctVal)) {
                // Cas d'ambiguïté (ex: ["nasb", "jarr"]) : on vérifie si le choix est dans la liste
                if (!userVal || !correctVal.includes(userVal)) {
                    errors++;
                }
            } else {
                // Cas simple
                if (userVal !== correctVal) {
                    errors++;
                }
            }
        });

        if (errors === 0) {
            // Succès : Célébration
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#10b981', '#fbbf24']
            });

            currentIdx++;
            
            // Si on a fini tous les mots, on boucle ou on affiche un message
            if (currentIdx >= window.m1Data.length) {
                setTimeout(() => {
                    container.innerHTML = `
                        <div class="text-center p-8 animate__animated animate__bounceIn">
                            <div class="text-6xl mb-4">🏆</div>
                            <h2 class="text-2xl font-bold mb-2" style="color: var(--text-main)">Bravo !</h2>
                            <p class="text-sm opacity-70 mb-6">Vous avez complété tous les exercices du Module 1.</p>
                            <button onclick="location.reload()" class="w-full py-4 bg-blue-900 text-white rounded-2xl font-bold">
                                RECOMMENCER
                            </button>
                        </div>
                    `;
                }, 1000);
            } else {
                setTimeout(renderStep1, 1500);
            }
        } else {
            // Échec : Feedback
            const feedbackMsg = errors === 1 ? "Il reste une erreur." : `Il y a ${errors} erreurs.`;
            alert(feedbackMsg + " Analysez bien la terminaison du mot.");
        }
    };

    // Lancement du jeu
    renderStep1();
};
