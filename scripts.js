const form = document.getElementById("meme-entry-form");
form.addEventListener("submit", generateMeme);
// submitButton.addEventListener("click", generateMeme);

function generateMeme() {
  //access the data in the form fields
  const form = document.getElementById("meme-entry-form");
  const submitter = document.getElementById("submit-button");
  const formData = new FormData(form, submitter);

  const backgroundImg = 'https://www.ultimate-leadership-training.co.uk/images/xshit_down.jpg.pagespeed.ic.fO-EV_o3OU.webp'

  //generate a blank dom element -> seperate function most likely
  const newMeme = document.createElement("div");
  const memeImg = document.createElement('Img')
  memeImg.src = backgroundImg;
  newMeme.appendChild(memeImg)

  const memeContent = document.createTextNode('hello world!')
  newMeme.appendChild(memeContent)
  newMeme.classList.add('meme')
  //add the new meme to the dom
  const memeContainer = document.getElementById('meme-container')
  memeContainer.appendChild(newMeme)

  //append the data from the form fields to the appropriate places
  //on the generated dom element
  //append the generated element to the dom

  event.preventDefault();
}
