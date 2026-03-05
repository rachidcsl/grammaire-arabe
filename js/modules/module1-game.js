/**
 * Logique du Jeu - Module 1 : L'Ism
 */

const module1Data = [
    {
        texte: "الْعَالَمِينَ",
        reponse: { etat: "nasb_jarr", genre: "masculin", nombre: "pluriel", definition: "defini" }
    },
    {
        texte: "بَحْرٌ",
        reponse: { etat: "raf", genre: "masculin", nombre: "singulier", definition: "indefini" }
    },
    {
        texte: "جَنَّاتٌ",
        reponse: { etat: "raf", genre: "feminin", nombre: "pluriel", definition: "indefini" }
    }
];

class GrammarGame {
    constructor(data) {
        this.data = data;
        this.index = 0;
        this.currentChoices = {};
    }

    init() {
        this.renderSlicer();
    }

    renderSlicer() {
        const container = document.getElementById('game-container');
        const mot = this.data[this.index].texte;
        
        container.innerHTML = `
            <div class="game-card animate__animated animate__fadeIn">
                <div class="step-indicator">Étape 1 : Découpage tactile</div>
                <div class="slicing-zone">
                    ${[...mot].map((char, i) => `
                        <span class="arabic-char">${char}</span>
                        ${i < mot.length - 1 ? `<div class="gap" onclick="this.classList.toggle('active')" data-idx="${i}"></div>` : ''}
                    `).join('')}
                </div>
                <button class="btn-action" onclick="window.game.startAnalysis()">Valider le découpage</button>
            </div>
        `;
    }

    startAnalysis() {
        const mot = this.data[this.index].texte;
        this.renderAnalysis(mot);
    }

    renderAnalysis(bloc) {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div class="game-card animate__animated animate__fadeIn">
                <div class="step-indicator">Étape 2 : Analyse de <span class="hl">${bloc}</span></div>
                <div class="property-grid">
                    <div class="prop-group">
                        <label>État</label>
                        <div class="btns">
                            <button class="btn-choice" onclick="game.setProp(this, 'etat', 'raf')">Raf'</button>
                            <button class="btn-choice" onclick="game.setProp(this, 'etat', 'nasb_jarr')">Nasb/Jarr</button>
                        </div>
                    </div>
                    <div class="prop-group">
                        <label>Genre</label>
                        <div class="btns">
                            <button class="btn-choice" onclick="game.setProp(this, 'genre', 'masculin')">Masc.</button>
                            <button class="btn-choice" onclick="game.setProp(this, 'genre', 'feminin')">Fém.</button>
                        </div>
                    </div>
                </div>
                <button class="btn-action primary" onclick="game.checkAnswer()">Vérifier</button>
            </div>
        `;
    }

    setProp(btn, key, value) {
        const parent = btn.parentElement;
        parent.querySelectorAll('.btn-choice').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.currentChoices[key] = value;
    }

    checkAnswer() {
        const correct = this.data[this.index].reponse;
        let isCorrect = true;
        
        for (let prop in correct) {
            if (this.currentChoices[prop] !== correct[prop]) isCorrect = false;
        }

        if (isCorrect) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            this.index = (this.index + 1) % this.data.length;
            setTimeout(() => this.init(), 1500);
        } else {
            alert("Vérifiez bien les terminaisons ou la présence de la Ta Marbouta !");
        }
    }
}

// Rendre l'instance accessible globalement
window.launchModule1 = () => {
    window.game = new GrammarGame(module1Data);
    window.game.init();
};
