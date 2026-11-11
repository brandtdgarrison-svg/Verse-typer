# Verse Typer

A browser-based typing game for memorizing Bible verses. Pick a verse, type it
out, and each letter turns green if it's right or red if it's wrong. Turn on
Memory mode and words start disappearing as you get better at a verse.

**Play it:** https://brandtdgarrison-svg.github.io/Verse-typer/

## Features

### Typing practice
- Real-time, letter-by-letter feedback with a blinking cursor
- Live stats: mistakes, accuracy, and words per minute
- Finish message with your total time and mistake count
- Personal bests (WPM and accuracy) saved for each verse

### Memory mode
- Each verse has its own level from 1 to 10
- Higher levels hide more words, chosen at random each time
- Your level goes up or down automatically based on your accuracy and speed
- Reset a single verse's level at any time

### Your verses
- Pick from built-in verses, or jump to a random one
- Add your own verses (pasted text is cleaned up automatically)
- Duplicate references are blocked, and added verses can be deleted
- Levels show in the verse menu while Memory mode is on

### Saving and backup
- Progress, personal bests, and your added verses are saved between visits
- Export your progress to a file and import it on another browser or computer

## Built with
HTML, CSS, and vanilla JavaScript (no frameworks or libraries).
Data is stored in the browser with localStorage.

## What I learned
- Manipulating the DOM and handling events (input, click, change, submit)
- Managing app state and saving it with localStorage and JSON
- Reading and writing files in the browser (Blob downloads, file uploads)
- Validating data and handling errors with try/catch
- Debugging with browser DevTools
- Refactoring code into clear sections and reusable functions

## Roadmap
- Spaced repetition: show which verses are due for review each day
- Look up verses automatically from a Bible API
- First-letter hint mode

## Scripture
Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard
Version®), copyright © 2001 by Crossway. Used by permission. All rights reserved.