/* define global dom node constants */
const form = document.getElementById("meme-entry-form");
const allMemes = document.getElementById("meme-container");
const submitter = document.getElementById("submit-button");

/* On load/refresh, access localStorage and append all saved memes to the DOM */
for (var i = 0; i < localStorage.length; i++) {
  let storedMemeString = localStorage.getItem(localStorage.key(i));
  let node = document.createElement("html");
  allMemes.insertAdjacentHTML("afterbegin", storedMemeString);
}

/* After appending saved memes to DOM, mount deleteMeme function on each meme */
const elements = document.getElementsByClassName("meme");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", deleteMeme, false);
}

/* add global event listeners */
form.addEventListener("submit", generateMeme);

/* this function generates a new meme from the current form data,
saves the meme to local storage, and then clears the submit form */
function generateMeme(event) {
  const formData = new FormData(form, submitter);
  const backgroundImg = formData.get("image-url");

  //generate a blank dom element -> seperate function most likely
  const newMeme = document.createElement("div");
  newMeme.setAttribute("id", `meme#${localStorage.length}`);
  const memeImg = document.createElement("Img");
  memeImg.src = backgroundImg;
  newMeme.appendChild(memeImg);

  //create the div to hold the top text and add text to it
  const topText = document.createElement("div");
  topText.classList.add("top-text");
  const topTextContent = document.createTextNode(formData.get("top-text"));
  topText.appendChild(topTextContent);

  //create the div to hold the bottom text and text to it
  const bottomText = document.createElement("div");
  bottomText.classList.add("bottom-text");
  const bottomTextContent = document.createTextNode(
    formData.get("bottom-text")
  );
  bottomText.appendChild(bottomTextContent);

  //add the hover-only text and element
  const hoverTextWrapper = document.createElement("div");
  hoverTextWrapper.classList.add("delete-image-wrapper");
  const hoverText = document.createElement("p");
  hoverText.classList.add("delete-image-text");
  hoverText.appendChild(document.createTextNode("Click to delete the meme"));
  hoverTextWrapper.appendChild(hoverText);

  newMeme.appendChild(hoverTextWrapper);

  //append the Top Text to the meme
  newMeme.appendChild(topText);
  //append the bottom text to the meme
  newMeme.appendChild(bottomText);

  newMeme.addEventListener("click", deleteMeme);

  newMeme.classList.add("meme");

  //store the newly created meme in local storage
  storeMeme(newMeme);
  allMemes.appendChild(newMeme);

  form.reset();
  event.preventDefault();
}

/* helper function that deletes a clicked on meme from the page and removes
the same meme from localstorage */
function deleteMeme(e) {
  localStorage.removeItem(e.currentTarget.id);
  e.currentTarget.remove();
}

/* helper function called by the generateMeme function - adds
the newly created meme to localStorage */
function storeMeme(meme) {
  const key = meme.id;
  const value = meme.outerHTML;

  localStorage.setItem(key, value);
}
