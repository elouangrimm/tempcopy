document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.getElementById('main-text');
    const copyButton = document.getElementById('copy-button');

    // 1. Get text from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const textFromUrl = urlParams.get('text');

    if (textFromUrl) {
        textArea.value = decodeURIComponent(textFromUrl); // Decode URL-encoded characters
    }

    // 2. Copy functionality
    copyButton.addEventListener('click', () => {
        if (textArea.value.trim() === "") {
            // Don't try to copy empty string, could clear clipboard
            textArea.placeholder = "Nothing to copy!";
            setTimeout(() => { textArea.placeholder = ""; }, 1500);
            return;
        }
        
        textArea.select(); // Select the text
        textArea.setSelectionRange(0, 99999); // For mobile devices

        navigator.clipboard.writeText(textArea.value)
            .then(() => {
                const originalButtonText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = originalButtonText;
                }, 1500); // Revert button text after 1.5 seconds
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy. Your browser might not support this feature or permissions are denied.');
            });
    });

    // Optional: Focus the textarea on load if no text is pre-filled
    // (autofocus attribute in HTML usually handles this, but this is a fallback)
    if (!textFromUrl) {
        textArea.focus();
    }
});
