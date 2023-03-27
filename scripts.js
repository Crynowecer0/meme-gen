const form = document.getElementById("meme-entry-form");
form.addEventListener("submit", generateMeme);
// submitButton.addEventListener("click", generateMeme);
let allMemes = document.getElementById("meme-container");


console.log(localStorage)

function generateMeme() {
  //access the data in the form fields
  const form = document.getElementById("meme-entry-form");
  const submitter = document.getElementById("submit-button");
  const formData = new FormData(form, submitter);

  const backgroundImg = formData.get("image-url");

  //generate a blank dom element -> seperate function most likely
  const newMeme = document.createElement("div");
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
  newMeme.setAttribute("onclick", "this.remove()");

  newMeme.classList.add("meme");
  //add the new meme to the dom
  const memeContainer = document.getElementById("meme-container");
  memeContainer.appendChild(newMeme);

  //reset the form
  form.reset();
  //prevent defautl
  event.preventDefault();
}
