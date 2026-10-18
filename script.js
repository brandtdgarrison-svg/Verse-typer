console.log("Hello from script.js!");

const verses = [
    {ref: "1 Corinthians 10:13", text: "No temptation has overtaken you that is not common to man. God is faithful and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape, that you may be able to endure it."},
    {ref: "1 John 2:4-6", text: "Whoever says 'I know him' but does not keep his commandments is a liar, and the truth is not in him, but whoever keeps his word, in him truly the love of God is perfected. By this we may know that we are in him: whoever says he abides in him ought to walk in the same way in which he walked."},
    {ref: "2 Peter 1:5-8", text: "For this very reason, make every effort to supplement your faith with virtue, and virtue with knowledge, and knowledge with self-control, and self-control with steadfastness, and steadfastness with godliness, and godliness with brotherly affection, and brotherly affection with love. For if these qualities are yours and are increasing, they keep you from being ineffective or unfruitful in the knowledge of our Lord Jesus Christ."}
];


const verseE1 = document.getElementById("verse");       //document represents whole web page. get element by id is a method that searches the document for element with id = verse. It returns the first element with that id. If no element is found, it returns null.
const messageEl = document.getElementById("message");
const statsEl = document.getElementById("stats");
const referenceE1 = document.getElementById("reference");
const verseSelect = document.getElementById("verse-select");

let verseText = "";          //textcontents give text inside div as a string. This strong gets stored in verseText variable.

let charSpans = [];

function loadVerse(index) {
    verseText = verses[index].text;        //set the verseText variable to the text of the selected verse object.
    referenceE1.textContent = verses[index].ref;        //set the text content of the reference element to the reference of the selected verse object.
    
    verseE1.innerHTML = "";        //clear the inner HTML of the verse element.

    charSpans = [];        //clear the charSpans array to prepare for the new verse.

    for (const letter of verseText) {        //for of loop iterates over each character in the string verseText. Each character is stored in letter variable.
        const span = document.createElement("span");      //createElement creates a new span element. This span will be used to wrap each letter of the verse.
        span.textContent = letter;      //set the text content of the span to the current letter.
        verseE1.appendChild(span);      //appendChild adds the span element as a child of the verseE1 element. This means that each letter will be wrapped in a span and added to the div with id = verse.
        span.className = "char";    //set class name to span and scans all char
        charSpans.push(span);      //add the span element to the charSpans array. This array will be used later to access each character span for animation or other purposes.
    }

    charSpans[0].classList.add("current");
    input.maxLength = verseText.length;

    mistakes = 0;      //reset the mistakes variable to 0 for the new verse.
    keystrokes = 0;      //reset the keystrokes variable to 0 for the new verse.
    lastLength = 0;      //reset the lastLength variable to 0 for the new verse.
    input.value = "";      //clear the input field for the new verse.
    input.disabled = false;      //enable the input field for the new verse.
    messageEl.textContent = "";      //clear the message element for the new verse.
    statsEl.textContent = "Mistakes: 0 | Accuracy: 100%";      //reset the stats element for the new verse.
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

input.addEventListener("input", function() {
    const typed = input.value;
    if (typed.length > lastLength){
        const position = typed.length - 1;
        keystrokes++;
        if (typed[position] !== verseText[position]){
            mistakes++;
        }
    }
    lastLength = typed.length;
    console.log("Typed:", typed);
    for (let i = 0; i < charSpans.length; i++){

        const span = charSpans[i];
        span.classList.remove("correct", "wrong", "current");      //remove correct and incorrect classes from the span element. This is done to reset the styling of the span before checking the typed input.
        if (i < typed.length){
            if (typed[i] === verseText[i]){
                span.classList.add("correct");
            }
            else{
                span.classList.add("wrong");
            }
        }
        else if (i === typed.length){
            span.classList.add("current");
        }
    
    }
    

    const accuracy = ((keystrokes - mistakes) / keystrokes) * 100;
    statsEl.textContent = "Mistakes: " + mistakes + " | Accuracy: " + accuracy.toFixed(1) + "%";

    if (typed === verseText){
    messageEl.textContent = "Congratulations! You typed the verse correctly.";
}
else {
    messageEl.textContent = " ";
}
});

loadVerse(0);

input.focus();



