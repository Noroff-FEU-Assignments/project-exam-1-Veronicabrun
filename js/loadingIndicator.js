// Funksjon for å vise ladeindikatoren
export function showLoadingIndicator() {
    // Legg til logikk for å vise ladeindikatoren på ønsket sted på siden
    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');
    document.body.appendChild(loadingIndicator);
}

// Funksjon for å skjule ladeindikatoren
export function hideLoadingIndicator() {
    // Legg til logikk for å skjule ladeindikatoren
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

