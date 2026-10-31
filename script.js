// ======== Verse Data =============
const verses = [
    { ref: "1 Corinthians 10:13", text: "No temptation has overtaken you that is not common to man. God is faithful and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape, that you may be able to endure it.", level: 1 },
    { ref: "1 John 2:4-6", text: "Whoever says 'I know him' but does not keep his commandments is a liar, and the truth is not in him, but whoever keeps his word, in him truly the love of God is perfected. By this we may know that we are in him: whoever says he abides in him ought to walk in the same way in which he walked.", level: 1 },
    { ref: "James 1:2-4", text: "Count it all joy, my brothers, when you meet trials of various kinds, for you know that the testing of your faith produces steadfastness. And let steadfastness have its full effects, that you may be perfect and complete, lacking in nothing.", level: 1 },
    { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.", level: 1 },
    { ref: "Romans 12:2", text: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect.", level: 1 },
    { ref: "1 Peter 1:6-7", text: "In this you rejoice, though now for a little while, if necessary, you have been grieved by various trials, so that the tested genuineness of your faith—more precious than gold that perishes though it is tested by fire—may be found to result in praise and glory and honor at the revelation of Jesus Christ.", level: 1 },
    { ref: "1 Peter 3:10-12", text: "For whoever desires to love life and see good days, let him keep his tongue from evil and his lips from speaking deceit; let him turn away from evil and do good; let him seek peace and pursue it. For the eyes of the Lord are on the righteous, and his ears are open to their prayer. But the face of the Lord is against those who do evil.", level: 1 },
    { ref: "1 John 4:7-8", text: "Beloved, let us love one another, for love is from God, and whoever loves has been born of God and knows God. Anyone who does not love does not know God, because God is love.", level: 1 },
    { ref: "2 Peter 1:5-8", text: "For this very reason, make every effort to supplement your faith with virtue, and virtue with knowledge, and knowledge with self-control, and self-control with steadfastness, and steadfastness with godliness, and godliness with brotherly affection, and brotherly affection with love. For if these qualities are yours and are increasing, they keep you from being ineffective or unfruitful in the knowledge of our Lord Jesus Christ.", level: 1 }
];

const builtInCount = verses.length;

const savedCustom = localStorage.getItem("customVerses");
let customVerses = savedCustom !== null ? JSON.parse(savedCustom) : [];

for (const verse of customVerses) {
    verses.push({ ref: verse.ref, text: verse.text, level: 1 });
}


// =========== Page elements ==============
const verseEl = document.getElementById("verse");
const messageEl = document.getElementById("message");
const statsEl = document.getElementById("stats");
const referenceEl = document.getElementById("reference");
const verseSelect = document.getElementById("verse-select");
const restartButton = document.getElementById("restart-button");
const randomButton = document.getElementById("random-button");
const levelEl = document.getElementById("level");
const memoryButton = document.getElementById("memory-button");
const resetButton = document.getElementById("reset-button");
const addToggle = document.getElementById("add-toggle");
const addForm = document.getElementById("add-form");
const newRef = document.getElementById("new-ref");
const newText = document.getElementById("new-text");
const deleteButton = document.getElementById("delete-button");
const input = document.getElementById("typing-input");
const exportButton = document.getElementById("export-button");
const importButton = document.getElementById("import-button");
const importFile = document.getElementById("import-file");



// ============ Game state ============
let verseText = "";
let charSpans = [];
let startTime = null;
let memoryOn = false;
let mistakes = 0;
let keystrokes = 0;
let lastLength = 0;


// ============== Functions ===================
function loadVerse(index) {
    verseText = verses[index].text;
    referenceEl.textContent = verses[index].ref;
    deleteButton.hidden = index < builtInCount;
    levelEl.textContent = memoryOn ? "Level " + verses[index].level + " / 10" : "";

    verseEl.innerHTML = "";

    charSpans = [];


    const hideChance = memoryOn ? (verses[index].level - 1) / 9 : 0;
    let hideWord = Math.random() < hideChance;


    for (const letter of verseText) {
        const span = document.createElement("span");
        span.textContent = letter;
        verseEl.appendChild(span);
        span.className = "char";
        charSpans.push(span);

        if (letter === " ") {
            hideWord = Math.random() < hideChance;
        }
        else if (hideWord) {
            span.classList.add("hidden");
        }

    }

    charSpans[0].classList.add("current");
    input.maxLength = verseText.length;

    mistakes = 0;
    keystrokes = 0;
    lastLength = 0;
    startTime = null;
    input.value = "";
    input.disabled = false;
    messageEl.textContent = "";
    statsEl.textContent = "Mistakes: 0 | Accuracy: 100% | WPM: 0";
}


function getLevels() {
    const levels = {};

    for (const verse of verses) {
        levels[verse.ref] = verse.level;
    }
    return levels;
}

function saveLevels() {
    localStorage.setItem("verseLevels", JSON.stringify(getLevels()));
}


function updateDropdown() {
    for (let i = 0; i < verses.length; i++) {
        verseSelect.options[i].textContent = memoryOn ? verses[i].ref + " - Lv " + verses[i].level : verses[i].ref;
    }
}



function buildDropdown() {
    verseSelect.innerHTML = "";

    for (let i = 0; i < verses.length; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = verses[i].ref;
        verseSelect.appendChild(option);
    }
}



//============= Event Listeners ====================
verseSelect.addEventListener("change", function () {
    loadVerse(Number(verseSelect.value));
    input.focus();
});

verseEl.addEventListener("click", function () {
    input.focus();
});


restartButton.addEventListener("click", function () {
    loadVerse(Number(verseSelect.value));
    input.focus();
});


randomButton.addEventListener("click", function () {
    const current = Number(verseSelect.value);
    let randomIndex = Math.floor(Math.random() * verses.length);

    while (randomIndex === current) {
        randomIndex = Math.floor(Math.random() * verses.length);
    }

    verseSelect.value = randomIndex;
    loadVerse(randomIndex);
    input.focus();
});


memoryButton.addEventListener("click", function () {
    memoryOn = !memoryOn;
    if (memoryOn) {
        memoryButton.textContent = "Memory: ON";
    }
    else {
        memoryButton.textContent = "Memory: OFF";
    }

    memoryButton.classList.toggle("active");
    updateDropdown();
    loadVerse(Number(verseSelect.value));
    input.focus();

});

resetButton.addEventListener("click", function () {
    const current = Number(verseSelect.value);

    if (confirm("Reset " + verses[current].ref + " back to level 1?")) {
        verses[current].level = 1;
        saveLevels();
        updateDropdown();
        loadVerse(current);
        input.focus();
    }
});

addToggle.addEventListener("click", function () {
    addForm.hidden = !addForm.hidden;
    if (!addForm.hidden) {
        newRef.focus();
    }
});

addForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const ref = newRef.value.trim();
    let text = newText.value.trim();

    if (ref === "" || text === "") {
        return;
    }

    for (const verse of verses) {
        if (verse.ref.toLowerCase() === ref.toLowerCase()) {
            messageEl.textContent = "That verse is already in your list.";
            return;
        }
    }

    text = text.replace(/\s+/g, " ").replace(/[‘’]/g, "'").replace(/[“”]/g, '"');

    verses.push({ ref: ref, text: text, level: 1 });
    customVerses.push({ ref: ref, text: text });
    localStorage.setItem("customVerses", JSON.stringify(customVerses));

    buildDropdown();
    updateDropdown();

    verseSelect.value = verses.length - 1;
    loadVerse(verses.length - 1);

    addForm.reset();
    addForm.hidden = true;
    input.focus();
});


deleteButton.addEventListener("click", function () {
    const current = Number(verseSelect.value);

    if (current < builtInCount) {
        return;
    }

    if (confirm("Delete " + verses[current].ref + "?")) {
        verses.splice(current, 1);
        customVerses.splice(current - builtInCount, 1);
        localStorage.setItem("customVerses", JSON.stringify(customVerses));
        saveLevels();
        buildDropdown();
        updateDropdown();
        verseSelect.value = 0;
        loadVerse(0);
        input.focus();
    }
});

exportButton.addEventListener("click", function(){
    const data = {
        customVerses: customVerses,
        levels: getLevels()
    };

    const text = JSON.stringify(data, null, 2);
    const file = new Blob([text], {type: "application/json"});

    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "verse-typer-progress.json";
    link.click();

    setTimeout(function () {
        URL.revokeObjectURL(link.href);
    }, 1000);
});




input.addEventListener("input", function () {
    const typed = input.value;
    if (startTime === null) {
        startTime = Date.now();
    }


    if (typed.length > lastLength) {
        const position = typed.length - 1;
        keystrokes++;
        if (typed[position] !== verseText[position]) {
            mistakes++;
        }
    }
    lastLength = typed.length;


    let correctCount = 0;

    for (let i = 0; i < charSpans.length; i++) {

        const span = charSpans[i];
        span.classList.remove("correct", "wrong", "current");
        if (i < typed.length) {
            if (typed[i] === verseText[i]) {
                span.classList.add("correct");
                correctCount++;
            }
            else {
                span.classList.add("wrong");
            }
        }
        else if (i === typed.length) {
            span.classList.add("current");
        }

    }

    const minutes = (Date.now() - startTime) / 60000;
    let wpm = (correctCount / 5) / minutes;

    if (minutes < 0.05) {
        wpm = 0;
    }


    const accuracy = ((keystrokes - mistakes) / keystrokes) * 100;
    statsEl.textContent = "Mistakes: " + mistakes + " | Accuracy: " + accuracy.toFixed(1) + "%" + " | WPM: " + Math.round(wpm);

    if (typed === verseText) {
        const seconds = Math.round((Date.now() - startTime) / 1000);
        const wholeMinutes = Math.floor(seconds / 60);

        const minuteWords = wholeMinutes === 1 ? "minute" : "minutes";
        const secondWords = (seconds % 60) === 1 ? "second" : "seconds";
        const mistakeWord = mistakes === 1 ? "mistake" : "mistakes";

        let timeText;

        if (seconds < 60) {
            timeText = seconds + " seconds";
        }
        else {
            timeText = wholeMinutes + " " + minuteWords + " and " + (seconds % 60) + " " + secondWords;
        }


        messageEl.textContent = "Congratulations! You typed the verse in " + timeText + " with " + mistakes + " " + mistakeWord + ".";
        input.disabled = true;

        if (memoryOn) {
            const current = Number(verseSelect.value);
            const oldLevel = verses[current].level;
            let newLevel = oldLevel;

            if (accuracy === 100 && wpm >= 50) {
                newLevel = oldLevel + 3;
            }
            else if (accuracy >= 98 && wpm >= 40) {
                newLevel = oldLevel + 2;
            }
            else if (accuracy >= 93) {
                newLevel = oldLevel + 1;
            }
            else if (accuracy < 85) {
                newLevel = oldLevel - 1;
            }


            newLevel = Math.min(10, Math.max(1, newLevel));
            verses[current].level = newLevel;
            saveLevels();
            updateDropdown();
            levelEl.textContent = "Level " + newLevel + " / 10";
            messageEl.textContent += " Level " + oldLevel + " → " + newLevel + ".";


        }
        else {
            messageEl.textContent += " Turn on Memory mode to level up.";
        }
    }

    else {
        messageEl.textContent = " ";
    }
});

// ========== Start-up ===========
const saved = localStorage.getItem("verseLevels");

if (saved !== null) {
    const levels = JSON.parse(saved);

    for (const verse of verses) {
        if (levels[verse.ref] !== undefined) {
            verse.level = levels[verse.ref];
        }
    }
}

buildDropdown();
updateDropdown();
loadVerse(0);
input.focus();


