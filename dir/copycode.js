const copyCodeButtons = document.querySelectorAll('.copy-code-button');

copyCodeButtons.forEach((copyCodeButton, index) => {
  const codeBlock = copyCodeButton.closest('.code-header').nextElementSibling;
  const textarea = codeBlock.querySelector('textarea');
  const mathBlock = codeBlock.querySelector('math'); // Find the equation next to the button

  copyCodeButton.addEventListener('click', () => {
    let codeToCopy;

    if (textarea) {
      // If a textarea exists, copy its value (MathML raw code)
      codeToCopy = textarea.value;
    } else if (mathBlock) {
      // If there's a rendered MathML equation, copy its HTML
      codeToCopy = mathBlock.outerHTML;
    } else {
      // Otherwise, copy the text content from the code block
      codeToCopy = codeBlock.innerText;
    }

    // Copy to clipboard
    window.navigator.clipboard.writeText(codeToCopy);

    // Update button text visually
    const originalText = copyCodeButton.innerText;
    copyCodeButton.innerText = '✔️Copied!';
    copyCodeButton.classList.add('copied');

    // Reset button after 2 seconds
    setTimeout(() => {
      copyCodeButton.innerText = originalText;
      copyCodeButton.classList.remove('copied');
    }, 1000);
  });
});
