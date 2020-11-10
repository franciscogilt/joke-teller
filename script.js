const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Pass Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "01af437b7de849fd80ca6bd03f765052",
    src: joke,
    hl: "en-US",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Joke from Joke API
async function getJoke() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton(); // Disable Button
  } catch (error) {
    console.log("whoops", error);
  }
}

// Event Listeners
button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
