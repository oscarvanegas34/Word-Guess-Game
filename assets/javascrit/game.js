// Grab reference to my DOM elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');
var $hint = document.getElementById('hint');

// Grab music reference to my DOM elements
var $song1 = document.getElementById('angel');
var $song2 = document.getElementById('wake');
var $song3 = document.getElementById('maza');
var $song4 = document.getElementById('palabra');
var $song5 = document.getElementById('amazing');
var $song6 = document.getElementById('depend');
var $song7 = document.getElementById('mix');

// Create variables for game (wordBank, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank)

var wordBank = ['Angel', 'Wake Me Up', 'La Maza', 'Una Palabra', 'Amazing', 'No One To Depend On', 'Salsa Party Mix'];
var wins = 0;
var losses = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

// newGame function to reset all stats, pick new word and create placeholders

function newGame() {
    //Reset all game info
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
    document.getElementById('mark').src = "assets/images/word.jpg";

    $hint.innerHTML = '';    
    
    pauseSong();
    

    // Pick a new word
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    console.log(pickedWord);
    changeHint();

    // Create a placeholders out of new pickedWord
    for(var i = 0; i < pickedWord.length; i++){
        if (pickedWord[i] === ' '){
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }     
    

    // Write all new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join('');
    $guessedLetters.textContent = incorrectLetterBank;
}

// letterGuess function, takes in the letter you pressed and sees it's in the selected word
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        // Running Game Logic
        guessedLetterBank.push(letter);

        // Check if guessed letter is in my picked word
        for(var i = 0; i < pickedWord.length; i++) {
            // Convert both values to lower case so I can compare them correctly
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()){
                // IF a match, swap out that character in the placeholder with the actual letter
                pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }
        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        checkIncorrect(letter);
    }
    else {
        if (!gameRunning) {
            alert("The game isn't running, click on New Game Button to start over.");
        } else {
            ("You've already guessed this letter, try a new one!");
        }
    }
}

// checkIncorrect(letter)
function checkIncorrect(letter) {
    // Check to see if letter DIDN'T make it into our pickedWordPlaceholder(therefore, incorrect guess)
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && 
    pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        // Decrement guesses
        guessesLeft--;
        // Add Incorrect letter to incorrectLetteBank
        incorrectLetterBank.push(letter);
        // Write new bank of incorrect letters guessed to DOM
        $guessedLetters.textContent = incorrectLetterBank.join(' ');
        // Write new amount of guesses left to DOM
        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

// checkLoss
function checkLoss() {
    if (guessesLeft === 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        // This will add the pickedWord to the DOM
        $placeholders.textContent = pickedWord;
    }
    checkWin();
}

// checkWin
function checkWin() {
    if(pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLocaleLowerCase()){
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
         playSong();
    } 
           
} 

// Add even listener for new game button
$newGameButton.addEventListener('click', newGame);

// Add onkeyup event to trigger letterGuess

document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}

// Function to play audio.

    function playSong() {
        if(pickedWord == 'Angel') {
            $song1.play();
            document.getElementById('mark').src = "assets/images/angel.jpg";
           
        }
        else if(pickedWord == 'Wake Me Up') {
            $song2.play();
            document.getElementById('mark').src = "assets/images/wake-me-up.jpg";
        }
        else if(pickedWord == 'La Maza') {
            $song3.play();
            document.getElementById('mark').src = "assets/images/la-maza.jpg";
        }
        else if(pickedWord == 'Una Palabra') {
            $song4.play();
            document.getElementById('mark').src = "assets/images/una-palabra.jpg";
        }
        else if(pickedWord == 'Amazing') {
            $song5.play();
            document.getElementById('mark').src = "assets/images/amazing.jpg";
        }
        else if(pickedWord == 'No One To Depend On') {
            $song6.play();
            document.getElementById('mark').src = "assets/images/no-one-to-depend-on.jpg";
        }
        else if (pickedWord == 'Salsa Party Mix') {
            $song7.play();
            document.getElementById('mark').src = "assets/images/salsa-party-mix.jpg";
        }

        };  
        
        
// Function to stop audio and reset currentTime to 0  

    function pauseSong() {
        if(pickedWord == 'Angel') {
            $song1.pause();
            $song1.currentTime = 0;
        }
        else if(pickedWord == 'Wake Me Up') {
            $song2.pause();
            $song2.currentTime = 0;
        }
        else if(pickedWord == 'La Maza') {
            $song3.pause();
            $song3.currentTime = 0;
        }
        else if(pickedWord == 'Una Palabra') {
            $song4.pause();
            $song4.currentTime = 0;
        }
        else if(pickedWord == 'Amazing') {
            $song5.pause();
            $song5.currentTime = 0;
        }
        else if(pickedWord == 'No One To Depend On') {
            $song6.pause();
            $song6.currentTime = 0;
        }
        else if (pickedWord == 'Salsa Party Mix') {
            $song7.pause();
            $song7.currentTime = 0;
        }

        };

    // Change the Hint for the song

    function changeHint() {
    if(pickedWord == 'Angel') {
        $hint.innerHTML  = "Te encontré de madrugada Cuando menos lo esperaba";
    }
    else if(pickedWord == 'Wake Me Up') {
        $hint.innerHTML  = "I tried carrying the weight of the world But I only have two hands";
    }
    else if(pickedWord == 'La Maza') {
        $hint.innerHTML  = "Si no creyera en la locura De la garganta del cenzontle";
    }
    else if(pickedWord == 'Una Palabra') {
        $hint.innerHTML  = "Y al mismo tiempo lo esconde todo Igual que el viento que esconde el agua";
    }
    else if(pickedWord == 'Amazing') {
        $hint.innerHTML  = "Had an angel of mercy to see me through all my sins";
    }
    else if(pickedWord == 'No One To Depend On') {
        $hint.innerHTML  = "That I know of, no tengo a nadie";
    }
    else if (pickedWord == 'Salsa Party Mix') {
        $hint.innerHTML  = "Various Singers on this one";
    }

}    
        
    


       