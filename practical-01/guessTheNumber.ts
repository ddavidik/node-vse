const randomNumber = Math.ceil(Math.random() * 10);
const maxGuesses = 5;

let guesses = 0;

const guessTheNumberGame = () => {
  while (guesses < maxGuesses) {
    const userGuess = prompt(
      `Uhádni číslo od 1 do 10! Máš na to ${maxGuesses} pokusů.`
    );

    if (!userGuess) {
      alert('Hra byla hráčem zrušena.');
      return;
    }

    const parsedGuess = parseInt(userGuess, 10);

    if (isNaN(parsedGuess)) {
      alert('Prosím zadejte validní číslo.');
      continue;
    }

    if (parsedGuess === randomNumber) {
      alert('Gratuluju! Uhodl jsi správné číslo!');
      return;
    } else guesses++;
  }

  alert(`Je mi líto, ale prohlál jsi. Hledané číslo bylo ${randomNumber}`);
};

guessTheNumberGame();
