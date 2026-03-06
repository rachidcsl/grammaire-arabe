window.launchModule1 = function() {
    const container = document.getElementById('grammar-container');
    let currentIdx = 0;
    let userSelections = {};

    function renderStep1() {
        const item = window.m1Data[currentIdx];
        const blocks = window.getArabicBlocks(item.texte);
        userSelections = {};

        container.innerHTML = `
            <div class="animate__animated animate__fadeIn">
                <p class="text-[10px] font-black text-blue-600 uppercase text-center mb-1">Étape 1 : Découpage</p>
                <h2 class="text-lg font-bold text-center mb-6" style="color: var(--text-main)">Identifiez les segments</h2>
                
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

                <button onclick="window.renderStep2()" class="w-full py-5 mt-8 bg-blue-900 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                    VALIDER LE DÉCOUPAGE
                </button>
            </div>
        `;
    }

    window.renderStep2 = function() {
        const item = window.m1Data[currentIdx];
        container.innerHTML = `
            <div class="animate__animated animate__fadeIn text-right" dir="rtl">
                <p class="text-[10px] font-black text-blue-600 uppercase text-center mb-1" dir="ltr">Étape 2 : Analyse</p>
                <div class="text-5xl text-center py-6" style="font-family: 'Lateef'; color: var(--text-main)">${item.texte}</div>
                
                <div class="space-y-6">
                    ${renderPropGroup('État', 'etat', [['Raf\'', 'raf'], ['Nasb/Jarr', 'nasb_jarr']])}
                    ${renderPropGroup('Genre', 'genre', [['Masc.', 'masculin'], ['Fém.', 'feminin']])}
                    ${renderPropGroup('Nombre', 'nombre', [['Singulier', 'singulier'], ['Duel', 'duel'], ['Pluriel', 'pluriel']])}
                    ${renderPropGroup('Type', 'definition', [['Défini', 'defini'], ['Indéfini', 'indefini']])}
                </div>

                <button onclick="window.checkM1Answer()" class="w-full py-5 mt-8 bg-green-600 text-white rounded-2xl font-bold shadow-lg">
                    VÉRIFIER
                </button>
            </div>
        `;
    }

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

    window.selectM1Prop = function(btn) {
        const key = btn.dataset.key;
        btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        userSelections[key] = btn.dataset.val;
    };

    window.checkM1Answer = function() {
        const correct = window.m1Data[currentIdx].reponse;
        let errors = 0;
        Object.keys(correct).forEach(k => { if (userSelections[k] !== correct[k]) errors++; });

        if (errors === 0) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            currentIdx = (currentIdx + 1) % window.m1Data.length;
            setTimeout(renderStep1, 1500);
        } else {
            alert("Il y a des erreurs dans l'analyse. Vérifiez bien les terminaisons !");
        }
    };

    renderStep1();
};
