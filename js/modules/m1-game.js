// Dans js/modules/m1-game.js
window.launchModule1 = function() {
    const container = document.getElementById('grammar-container');
    const motSacre = m1Data[0].texte; // Exemple : "الْعَالَمِينَ"

    // On utilise la fonction globale ici
    const blocs = window.getArabicBlocks(motSacre);

    container.innerHTML = `
        <div class="flex flex-row-reverse justify-center">
            ${blocs.map((b, i) => `
                <span class="arabic-letter">${b}</span>
                ${i < blocs.length - 1 ? `<div class="cut-gap" onclick="split(this)"></div>` : ''}
            `).join('')}
        </div>
    `;
};
