/**
 * Utilitaires globaux pour la langue Arabe
 */

// Regroupe chaque lettre arabe avec ses accents (harakaat)
window.getArabicBlocks = function(text) {
    // Cette regex capture une lettre de base et tous les modificateurs qui suivent
    const regex = /[\u0600-\u06FF][\u0610-\u061A\u064B-\u065F]*/g;
    return text.match(regex) || [];
};