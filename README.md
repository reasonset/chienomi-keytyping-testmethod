# chienomi-keytyping-testmethod

A smart, stable typing test with high validity as a benchmark. Primarily designed to measure keyboard performance.

## Screenshots

![Complete](doc/img/ss1.webp)

![Wrong](doc/img/ss2.webp)

## Type-A

### Description

This software is a typing test tool designed for local measurement.

The test is provided as an HTML file and runs as a local web application.

Each test uses a fixed text. The software measures the time required to type the entire passage and calculates KPM (keystrokes per minute) based on the elapsed time. Mistypes are counted by the index at which the incorrect character occurs, and the result displays the total number of mistyped characters.  
For example, if the target string is `typing` and the user types `typooooing`, the number of mistakes is counted as **1**.

There is no need to correct mistakes manually. The index simply does not advance until the correct character is entered. If you notice a mistake, just type the correct character and continue.

This software was developed primarily for keyboard performance testing. For this reason, the rules are designed to ensure high reproducibility and stable results. Mistypes are displayed clearly for easy understanding.

You can attempt the test as many times as you like, and the best, worst, and mean results are shown.

The software does not save or transmit any data. All records are cleared when the page is reloaded.

Although the actual test uses the `"chienomi"` text, many additional passages are included so you can enjoy a variety of challenges. There are problem sets featuring programming language keywords as well as intentionally frustrating passages full of awkward words. Have fun exploring them.

### Install

Copy `settings.example.js` to `settings.js`, and edit it if you want it.

### Usage

Open `index.html`.

### Test text status

|Title|Status|Description|
|-------|-----------|-----------------|
|develop|Change at any time|For development|
|prog0|Fixed|Programming basic|
|unix|Fixed|Unix basic commands|
|ruby|In development|Ruby basic|
|zsh|In development|Zsh basic|
|js|Maybe fixed|JavaScript basic|
|html|Maybe fixed|HTML elements and attributes|
|css|In development|CSS basic|
|css2|Fixed|Abrasive CSS statement|
|css3|Maybe fixed|Magic spell like CSS words|
|elixir|In development|Elixir basic|
|chienomi|Fixed|Main test for Chienomi|
|harukamy|Fixed|Fit to Harukamy's typing style|
|hellkamy|Fixed|Hell for Harukamy's typing style|
|en words|Maybe fixed|English words|
|en words long|Fixed|English words (competitive)|
|en sentence|In development|English sentence|
|prog complicated|Fixed|Hell complicated words in software|

## Type-B

### Description

The basic system works the same as Type-A.
However, this mode introduces additional rules. Instead of simply measuring how fast and accurately you can type, the goal is to finish each attempt faster than the specified speed while keeping your mistype count below the allowed limit.

Each attempt has:

* a required KPM threshold you must exceed, and  
* a maximum number of mistypes you must not exceed.

You pass the attempt only if you meet both conditions.

A minimum number of attempts, defined by `minAttempts`, will always be performed.  
Additionally, attempts will continue until you achieve at least `minSuccessCount` successful runs.  
If you keep passing every attempt, the test continues indefinitely.

When you pass an attempt, the KPM threshold increases.
When you fail, the change in the threshold depends on the value of `kpmThresholdOnFail`.

The text used for each typing prompt can be changed via the `prompt` URL parameter.

The initial KPM threshold is determined by `initialKpmThreshold`, but it can be overridden using the `threshold` URL parameter.

The objective of this mode is to achieve as many successful attempts as possible while clearing higher and higher KPM thresholds.

### Install

Copy `settings.example.js` to `settings.js`, and edit it if you want it.

### Usage

Open `index.html`.
