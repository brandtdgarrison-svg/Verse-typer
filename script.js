console.log("Hello from script.js!");

const verseE1 = document.getElementById("verse");       //document represents whole web page. get element by id is a method that searches the document for element with id = verse. It returns the first element with that id. If no element is found, it returns null.
const verseText = verseE1.textContent;          //textcontents give text inside div as a string. This strong gets stored in verseText variable.
console.log("Verse text:", verseText);      //prints to browser console the text inside the div with id = verse. It will print the whole text inside the div as a string.
console.log("Verse length:", verseText.length);

verseE1.innerHTML = "";        //clear the inner HTML of the verse element.
const messageEl = document.getElementById("message");
const statsEl = document.getElementById("stats");

const charSpans = [];        //create an empty array to store the span elements for each character in the verse.


for (const letter of verseText) {        //for of loop iterates over each character in the string verseText. Each character is stored in letter variable.
    const span = document.createElement("span");      //createElement creates a new span element. This span will be used to wrap each letter of the verse.
    span.textContent = letter;      //set the text content of the span to the current letter.
    verseE1.appendChild(span);      //appendChild adds the span element as a child of the verseE1 element. This means that each letter will be wrapped in a span and added to the div with id = verse.
    span.className = "char";    //set class name to span and scans all char
    charSpans.push(span);      //add the span element to the charSpans array. This array will be used later to access each character span for animation or other purposes.
}

charSpans[0].classList.add("current");

console.log("Span Count:", charSpans.length);      //prints the array of span elements to the console. Each span corresponds to a character in the verse.

const input = document.getElementById("typing-input");


let mistakes = 0;      //initialize a variable to keep track of the number of mistakes made by the user while typing the verse.
let keystrokes = 0;
let lastLength = 0;


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

input.focus();



