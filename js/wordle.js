let word = [];

async function getWord() {
  try {
    const response = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
    const test = await response.json();
    console.log(test[0]);
    for (let i = 0; i < 5; i++) {
      word.push(test[0].charAt(i));
    }
    console.log(word);
  } catch (error) {
    console.error(error);
  }
}

getWord();
