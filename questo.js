
document.addEventListener('DOMContentLoaded', function () {
    // DOM elements, use jQuery since you've included it in the main html file
    const $outcomeElement = $(document.getElementById('outcome'));
    const $answerElement = $(document.getElementById('answer'));
    const $scoreElement = $(document.getElementById('score'));
    const $sentenceElement = $(document.getElementById('sentence'));
    const $checkAnswerBtnElement = $(document.getElementById('button'));
    const $correctElement = $(document.getElementById('correct'))
    const $nextBtnElement = $(document.getElementById('next'));
    
    $nextBtnElement.hide()
    $correctElement.hide()

    
    // check answer button event handler
    $checkAnswerBtnElement.on('click', handleCheckAnswer);
    // check answer button event handler
    $nextBtnElement.on("click", handleNext);

    function handleNext() {
        displaySentence(); // Display a new sentence
        $correctElement.hide();
        $outcomeElement.hide()
        $nextBtnElement.hide();
    }

    const placeholder = "______"

    // map values to an object with keys and values to help with logic
    const solutionMap = {
        [placeholder + " libro è interessante. (This book is interesting.)"]: "Questo",
        [placeholder + " casa è grande. (That house is big.)"]: "Questa",
        [placeholder + " studenti sono bravi. (These students are good.)"]: "Questi",
        [placeholder + " ragazze sono simpatiche. (Those girls are nice.)"]: "Queste",
        [placeholder + " penna è mia. (This pen is mine.)"]: "Questa",
        [placeholder + " zaino è pesante. (That backpack is heavy.)"]: "Questo",
        [placeholder + " scarpe sono comode. (These shoes are comfortable.)"]: "Queste",
        [placeholder + " ragazzi sono alti. (Those boys are tall.)"]: "Questi",
    }

    const sentences = Object.keys(solutionMap)
    
    let currentSentence;
    let score = 0;
    
    function getRandomSentence() {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        return sentences[randomIndex];
    }

    function handleCheckAnswer() {
        const answer = $answerElement.val().trim().toLowerCase();

        if (answer === "") {
            $outcomeElement.text('Incorrect. The answer field must be filled.');
            $outcomeElement.css("color", "red"); // Set font color to red
            return
        }
        
        // get correct answer based on the active current sentence
        const correctAnswer = solutionMap[currentSentence]
    
        if (correctAnswer.toLowerCase() !== answer) {
            $correctElement.show();
            $correctElement.text(`The correct word was "${correctAnswer}".`);
            $outcomeElement.text('Incorrect. Try again.');
            $outcomeElement.css("color", 'red'); // Set font color to red
            // Replace the placeholder with the correct answer
            $sentenceElement.text(currentSentence.replace(placeholder, solutionMap[currentSentence]))
        } else {
            score++; // Increment score if answer is correct
            updateScore()
            $outcomeElement.show();
            $outcomeElement.text('Correct! Well done.');
            $outcomeElement.css("color", ''); // Reset font color (use default)
        }

        $nextBtnElement.show()
        $answerElement.val("")
    }
    

    function displaySentence() {
        currentSentence = getRandomSentence();
        $sentenceElement.text(currentSentence); // Display a new sentence
    }

    function updateScore() {
        $scoreElement.text('Score: ' + score); // Display the score
    }

    // Initialize the game
    displaySentence(); // Display the first sentence when initializing the game
    updateScore(); // Display the initial score
});
