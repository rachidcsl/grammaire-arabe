// js/modules/m1-game.js

const m1Data = [
    { texte: "الْعَالَمِينَ", reponse: { etat: "nasb_jarr", genre: "masculin", nombre: "pluriel", definition: "defini" } },
    { texte: "بَحْرٌ", reponse: { etat: "raf", genre: "masculin", nombre: "singulier", definition: "indefini" } }
    // Ajoute les autres exercices ici...
];

window.launchModule1 = function() {
    const container = document.getElementById('grammar-container');
    let currentIdx = 0;

    function renderSlicing() {
        const item = m1Data[currentIdx];
        container.innerHTML = `
            <p class="text-[10px] font-black text-blue-600 uppercase tracking-tighter mb-2 text-center">Étape 1 : Découpage</p>
            <h2 class="text-xl font-bold text-center mb-8">Séparez les particules</h2>
            <div class="flex flex-row-reverse justify-center gap-1 mb-10" style="font-family: 'Lateef'; font-size: 4rem;">
                ${[...item.texte].map((char, i) => `
                    <span>${char}</span>
                    ${i < item.texte.length - 1 ? `<div class="w-4 h-12 bg-gray-100 rounded-full cursor-pointer hover:bg-blue-100 transition-all" onclick="this.classList.toggle('bg-red-500')"></div>` : ''}
                `).join('')}
            </div>
            <button onclick="renderAnalysis()" class="w-full py-5 bg-blue-900 text-white rounded-[1.5rem] font-bold shadow-lg active:scale-95 transition-all">VALIDER</button>
        `;
    }

    // On rend la fonction accessible pour le bouton
    window.renderAnalysis = function() {
        const item = m1Data[currentIdx];
        container.innerHTML = `
            <p class="text-[10px] font-black text-blue-600 uppercase tracking-tighter mb-2 text-center">Étape 2 : Les 4 Propriétés</p>
            <div class="text-4xl text-center mb-8" style="font-family: 'Lateef'">${item.texte}</div>
            
            <div class="space-y-4">
                <div>
                    <span class="text-[10px] font-bold text-gray-400 uppercase">État (الإعراب)</span>
                    <div class="grid grid-cols-2 gap-2 mt-1">
                        <button class="py-3 border-2 rounded-xl text-xs font-bold active:bg-blue-900 active:text-white" onclick="save('etat', 'raf')">Raf'</button>
                        <button class="py-3 border-2 rounded-xl text-xs font-bold active:bg-blue-900 active:text-white" onclick="save('etat', 'nasb_jarr')">Nasb/Jarr</button>
                    </div>
                </div>
                </div>
            
            <button onclick="finish()" class="mt-8 w-full py-5 bg-green-600 text-white rounded-[1.5rem] font-bold shadow-lg">VÉRIFIER</button>
        `;
    }

    function finish() {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        currentIdx++;
        if(currentIdx < m1Data.length) setTimeout(renderSlicing, 1500);
    }

    renderSlicing();
};
