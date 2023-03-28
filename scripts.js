const form = document.getElementById("meme-entry-form");
form.addEventListener("submit", generateMeme);
// submitButton.addEventListener("click", generateMeme);
let allMemes = document.getElementById("meme-container");

// localStorage.clear();

console.log(localStorage.length);
for (var i = 0; i < localStorage.length; i++) {
  let storedMemeString = localStorage.getItem(localStorage.key(i));
  let node = document.createElement("html");
  allMemes.insertAdjacentHTML("afterbegin", storedMemeString);
}

//loop over memes created from storage and add appropriate event listener
const elements = document.getElementsByClassName("meme");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", deleteMeme, false);
}

function generateMeme(e) {
  //access the data in the form fields
  const form = document.getElementById("meme-entry-form");
  const submitter = document.getElementById("submit-button");
  const formData = new FormData(form, submitter);
  const timeStamp = new Date();
  const backgroundImg = formData.get("image-url");

  //generate a blank dom element -> seperate function most likely
  const newMeme = document.createElement("div");
  newMeme.setAttribute("id", `meme#${localStorage.length}`);
  newMeme.localStorageKey = timeStamp;
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

  //append the topTop Text to the meme
  newMeme.appendChild(topText);
  //append the bottom text to the meme
  newMeme.appendChild(bottomText);
  const memeContent = document.createTextNode("hello world!");

  //code to delete a meme when clicked on
  //TODO: working version
  // newMeme.setAttribute("onclick", "this.remove()");
  //FIXME: experimental version
  newMeme.addEventListener("click", deleteMeme);

  newMeme.classList.add("meme");
  //add the new meme to the dom
  const memeContainer = document.getElementById("meme-container");
  memeContainer.appendChild(newMeme);

  storeMeme(newMeme);
  //reset the form
  form.reset();
  //prevent defautl
  event.preventDefault();
}

//function to delete a meme and remove it from local storage
//TODO: WORK IN PROGRESS
function deleteMeme(e) {
localStorage.removeItem(e.currentTarget.id)
  e.currentTarget.remove();
}

//function to store created memes in local storage
//this function needs to store each meme element as a key : value pair within
//the local storage array that we defined earlier
function storeMeme(meme) {
  const key = meme.id;
  const value = meme.outerHTML;

  localStorage.setItem(key, value);
  console.log(localStorage);
  // const storageArray = JSON.parse(localStorage.getItem("memes"));
  // storageArray.push(meme);
  // localStorage.setItem("memes", JSON.stringify(storageArray));
  // console.log(storageArray);
}
