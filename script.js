let title = document.querySelector(".typing");
let words = ["food", "ambience", "service"];
let currentWordIndex = 0;
let index = 0;

const typeWriter = () => {
    let currentWord = words[currentWordIndex];
    let newTitle = currentWord.slice(0, index);
    title.innerText = newTitle;
    index++;

    if (index > currentWord.length) {
        index = 0;
        currentWordIndex++;
        if (currentWordIndex >= words.length) {
            currentWordIndex = 0;
        }
    }

    setTimeout(typeWriter, 300);
};

typeWriter();
