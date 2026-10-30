console.log("Hello from script.js!");

const verses = [
    {ref: "1 Corinthians 10:13", text: "No temptation has overtaken you that is not common to man. God is faithful and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape, that you may be able to endure it.", level: 1},
    {ref: "1 John 2:4-6", text: "Whoever says 'I know him' but does not keep his commandments is a liar, and the truth is not in him, but whoever keeps his word, in him truly the love of God is perfected. By this we may know that we are in him: whoever says he abides in him ought to walk in the same way in which he walked.", level: 1},
    {ref: "James 1:2-4", text: "Count it all joy, my brothers, when you meet trials of various kinds, for you know that the testing of your faith produces steadfastness. And let steadfastness have its full effects, that you may be perfect and complete, lacking in nothing.", level: 1},
    {ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.", level: 1},
    {ref: "Romans 12:2", text: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect.", level: 1},
    {ref: "1 Peter 1:6-7", text: "In this you rejoice, though now for a little while, if necessary, you have been grieved by various trials, so that the tested genuineness of your faith—more precious than gold that perishes though it is tested by fire—may be found to result in praise and glory and honor at the revelation of Jesus Christ.", level: 1},
    {ref: "1 Peter 3:10-12", text: "For whoever desires to love life and see good days, let him keep his tongue from evil and his lips from speaking deceit; let him turn away from evil and do good; let him seek peace and pursue it. For the eyes of the Lord are on the righteous, and his ears are open to their prayer. But the face of the Lord is against those who do evil.", level: 1},
    {ref: "1 John 4:7-8", text: "Beloved, let us love one another, for love is from God, and whoever loves has been born of God and knows God. Anyone who does not love does not know God, because God is love.", level: 1},
    {ref: "2 Peter 1:5-8", text: "For this very reason, make every effort to supplement your faith with virtue, and virtue with knowledge, and knowledge with self-control, and self-control with steadfastness, and steadfastness with godliness, and godliness with brotherly affection, and brotherly affection with love. For if these qualities are yours and are increasing, they keep you from being ineffective or unfruitful in the knowledge of our Lord Jesus Christ.", level: 1}
];


const verseE1 = document.getElementById("verse");       //document represents whole web page. get element by id is a method that searches the document for element with id = verse. It returns the first element with that id. If no element is found, it returns null.
const messageEl = document.getElementById("message");
const statsEl = document.getElementById("stats");
const referenceE1 = document.getElementById("reference");
const verseSelect = document.getElementById("verse-select");
const restartButton = document.getElementById("restart-button");
const randomButton = document.getElementById("random-button");
const levelEl = document.getElementById("level");
const memoryButton = document.getElementById("memory-button");

let verseText = "";          //textcontents give text inside div as a string. This strong gets stored in verseText variable.

let charSpans = [];
let startTime = null;
let memoryOn = false;



function loadVerse(index) {
    verseText = verses[index].text;        //set the verseText variable to the text of the selected verse object.
    referenceE1.textContent = verses[index].ref;        //set the text content of the reference element to the reference of the selected verse object.
    levelEl.textContent = "Level " + verses[index].level + " / 10";

    verseE1.innerHTML = "";        //clear the inner HTML of the verse element.

    charSpans = [];        //clear the charSpans array to prepare for the new verse.
    

    const hideChance = memoryOn ? (verses[index].level - 1) / 9: 0;
    let hideWord = Math.random() < hideChance;

    for (const letter of verseText) {        //for of loop iterates over each character in the string verseText. Each character is stored in letter variable.
        const span = document.createElement("span");      //createElement creates a new span element. This span will be used to wrap each letter of the verse.
        span.textContent = letter;      //set the text content of the span to the current letter.
        verseE1.appendChild(span);      //appendChild adds the span element as a child of the verseE1 element. This means that each letter will be wrapped in a span and added to the div with id = verse.
        span.className = "char";    //set class name to span and scans all char
        charSpans.push(span);      //add the span element to the charSpans array. This array will be used later to access each character span for animation or other purposes.
    
        if (letter === " "){
            hideWord = Math.random() < hideChance;
        }
        else if (hideWord){
            span.classList.add("hidden");
        }
    
    }

    charSpans[0].classList.add("current");
    input.maxLength = verseText.length;

    mistakes = 0;      //reset the mistakes variable to 0 for the new verse.
    keystrokes = 0;      //reset the keystrokes variable to 0 for the new verse.
    lastLength = 0;      //reset the lastLength variable to 0 for the new verse.
    startTime = null;      //reset the startTime variable to null for the new verse.
    input.value = "";      //clear the input field for the new verse.
    input.disabled = false;      //enable the input field for the new verse.
    messageEl.textContent = "";      //clear the message element for the new verse.
    statsEl.textContent = "Mistakes: 0 | Accuracy: 100% | WPM: 0";      //reset the stats element for the new verse.
}


function saveLevels() {
    const levels = {};
    
    for (const verse of verses){
        levels[verse.ref] = verse.level;
    }
    localStorage.setItem("verseLevels", JSON.stringify(levels));
}



for (let i = 0; i < verses.length; i++) {
    const option = document.createElement("option");      //create a new option element for the select dropdown.
    option.value = i;
    option.textContent = verses[i].ref;      //set the text content of the option to the reference of the verse.
    verseSelect.appendChild(option);

}

const input = document.getElementById("typing-input");



let mistakes = 0;      //initialize a variable to keep track of the number of mistakes made by the user while typing the verse.
let keystrokes = 0;
let lastLength = 0;


verseSelect.addEventListener("change", function() {
        loadVerse(Number(verseSelect.value));
        input.focus();

});

verseE1.addEventListener("click", function() {
    input.focus();
});


restartButton.addEventListener("click", function() {
    loadVerse(Number(verseSelect.value));
    input.focus();
});


randomButton.addEventListener("click", function() {
    const current = Number(verseSelect.value);       // 1. remember where you are
    let randomIndex = Math.floor(Math.random() * verses.length);   // 2. first pick

    while (randomIndex === current) {                // 3. same one? try again
        randomIndex = Math.floor(Math.random() * verses.length);   //    no const/let: reuse it
    }

    verseSelect.value = randomIndex;                 // 4. now load it, once
    loadVerse(randomIndex);
    input.focus();
});


memoryButton.addEventListener("click", function(){
    memoryOn = !memoryOn;
    if (memoryOn){
        memoryButton.textContent = "Memory: ON";
    }
    else{
        memoryButton.textContent = "Memory: OFF";
    }
    
    memoryButton.classList.toggle("active");
    loadVerse(Number(verseSelect.value));
    input.focus();

});


input.addEventListener("input", function() {
    const typed = input.value;
    if (startTime === null){
        startTime = Date.now();
    }


    if (typed.length > lastLength){
        const position = typed.length - 1;
        keystrokes++;
        if (typed[position] !== verseText[position]){
            mistakes++;
        }
    }
    lastLength = typed.length;
    console.log("Typed:", typed);


    let correctCount = 0;

    for (let i = 0; i < charSpans.length; i++){

        const span = charSpans[i];
        span.classList.remove("correct", "wrong", "current");      //remove correct and incorrect classes from the span element. This is done to reset the styling of the span before checking the typed input.
        if (i < typed.length){
            if (typed[i] === verseText[i]){
                span.classList.add("correct");
                correctCount++;
            }
            else{
                span.classList.add("wrong");
            }
        }
        else if (i === typed.length){
            span.classList.add("current");
        }
    
    }
    
    const minutes = (Date.now() - startTime) / 60000;      // exact, no rounding
    let wpm = (correctCount / 5) / minutes;

    if (minutes < 0.05) {      // less than 3 seconds in: too early to measure
        wpm = 0;
    }


    const accuracy = ((keystrokes - mistakes) / keystrokes) * 100;
    statsEl.textContent = "Mistakes: " + mistakes + " | Accuracy: " + accuracy.toFixed(1) + "%" + " | WPM: " + Math.round(wpm);

if (typed === verseText){
    const seconds = Math.round((Date.now() - startTime) / 1000);
    const wholeMinutes = Math.floor(seconds / 60);

    const minuteWords = wholeMinutes === 1 ? "minute" : "minutes";
    const secondWords = (seconds % 60) === 1 ? "second" : "seconds";
    const mistakeWord = mistakes === 1 ? "mistake" : "mistakes";

    let timeText;

    if (seconds < 60) {
        timeText = seconds + " seconds";
    }
    else{
        timeText = wholeMinutes + " " + minuteWords + " and " + (seconds % 60) + " " + secondWords;
    }
    
        
    messageEl.textContent = "Congratulations! You typed the verse in " + timeText + " with " + mistakes + " " + mistakeWord + ".";
    input.disabled = true;
    
    if (memoryOn){
        const current = Number(verseSelect.value);
        const oldLevel = verses[current].level;
        let newLevel = oldLevel;

        if (accuracy >= 98 && wpm >= 40){
            newLevel = oldLevel + 2;
        }
        else if (accuracy >= 95){
            newLevel = oldLevel + 1;
        }
        else if (accuracy < 85){
            newLevel = oldLevel - 1;
        }
        

        newLevel = Math.min(10, Math.max(1, newLevel));
        verses[current].level = newLevel;
        saveLevels();
        levelEl.textContent = "Level " + newLevel + " / 10";
        messageEl.textContent += " Level " + oldLevel + " → " + newLevel + ".";


    }
}

else {
    messageEl.textContent = " ";
}
});

const saved = localStorage.getItem("verseLevels");

if (saved != null){
    const levels = JSON.parse(saved);

    for (const verse of verses) {
        if (levels[verse.ref] !== undefined) {
            verse.level = levels[verse.ref];
        }
    }
}

loadVerse(0);

input.focus();


