let suggestion = null;
let ignoreNextBlur = false;
hideSuggestion()

/**
 * Show the suggestion, only if the entry is empty and there is a suggestion to show
 */
function showSuggestion() {
    const input = document.getElementById('address');
    if (input.value == "" && suggestion) {
        const bubble = document.getElementById('suggestionBubble');
        const suggestionText = document.getElementById('suggestionText');
        bubble.style.display = "block";
        suggestionText.textContent = "Laatst gebruikt: " +  suggestion;
    }

}

/**
 * The suggestion bubble is hidden
 */
function hideSuggestion() {
    const bubble = document.getElementById('suggestionBubble')
    bubble.style.display = 'none'
}

/**
 * The suggestion is clicked and is added to the address entry
 */
function acceptSuggestion() {
    const input = document.getElementById('address');
    input.value = suggestion
    hideSuggestion()
    input.focus()
}

/**
 * Handle the event that the address entry loses focus
 * If the suggestion is clicked, the ignoreNextBlur flag is set to true and the bubble isnt hidden
 */
function handleBlur() {
    if (ignoreNextBlur) {
        ignoreNextBlur = false;
    } else {
    hideSuggestion()
    }
}

/**
 * Get the current address, extract the street name and add as a suggestion
 */
function saveSuggestion() {
    const input = document.getElementById('address')
    const regex = /^([a-zA-Z\s]+)(?=\d)/;
    const match = input.value.match(regex)
    suggestion = match ? match[0] : null;
}