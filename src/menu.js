// References to DOM elements

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

prevBtn.style.display = "none";

// Event listeners
prevBtn.addEventListener("click", goPrevious);
nextBtn.addEventListener("click", goNext);

// Business Logic
let currentState = 1;
let numOfPapers = 38;
let maxState = numOfPapers;
let paper = new Array(numOfPapers);

function addingPapers() {
  let paperHTML = `
    <div id="p1" class="paper">
      <div class="front">
        <img
          id="f1"
          class="img-fluid front-content"
          src="./images/Somnia-Menu/1.jpg"
          alt="Cover Menu Somnia"
        />
      </div>
      <div class="back">
        <img
          id="b1"
          class="img-fluid back-content"
          src="./images/Somnia-Menu/2.jpg"
          alt="Back Cover Menu Somnia"
        />
      </div>
    </div>`;
  for (let index = 1; index < numOfPapers; index++) {
    paperHTML += `<div id="p${index + 1}" class="paper">
      <div class="front">
        <img
          id="f${index + 1}"
          class="img-fluid front-content"
          src="./images/Somnia-Menu/${2 * index + 1}.jpg"
          alt="Cover Menu Somnia"
        />
      </div>
      <div class="back">
        <img
          id="b${index + 1}"
          class="img-fluid back-content"
          src="./images/Somnia-Menu//${2 * index + 2}.jpg"
          alt="Back Cover Menu Somnia"
        />
      </div>
    </div>`;
  }
  document.getElementById("papers").innerHTML = paperHTML;
}

function openBook() {
  if (window.matchMedia("(max-width: 900px)").matches) {
    prevBtn.style.transform = "translateY(-180px)";
    nextBtn.style.transform = "translateY(-180px)";
  } else {
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
  }
  book.style.transform = "translateX(50%)";
  prevBtn.style.display = "block";
}

function closeBook(isFirstPage) {
  if (isFirstPage) {
    book.style.transform = "translateX(0%)";
    prevBtn.style.display = "none";
  } else {
    book.style.transform = "translateX(100%)";
  }
  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";
  nextBtn.style.display = "none";
}

function goNext() {
  if (currentState <= maxState) {
    switch (currentState) {
      case 1:
        openBook();
        paper[0].classList.add("flipped");
        paper[0].style.zIndex = 1;
        break;
      case numOfPapers:
        closeBook(false);
        paper[numOfPapers - 1].classList.add("flipped");
        paper[numOfPapers - 1].style.zIndex = numOfPapers;
        break;
      default:
        paper[currentState - 1].classList.add("flipped");
        paper[currentState - 1].style.zIndex = currentState;
        break;
    }

    currentState++;
  }
}

function goPrevious() {
  if (currentState > 1) {
    switch (currentState) {
      case 2:
        closeBook(true);
        paper[0].classList.remove("flipped");
        paper[0].style.zIndex = numOfPapers;
        break;
      case numOfPapers + 1:
        openBook();
        paper[numOfPapers - 1].classList.remove("flipped");
        paper[numOfPapers - 1].style.zIndex = 1;
        break;
      default:
        paper[currentState - 2].classList.remove("flipped");
        paper[currentState - 2].style.zIndex = numOfPapers - currentState + 2;
        break;
    }

    currentState--;
    nextBtn.style.display = "block";
  }
}
window.onload = function () {
  addingPapers();
  for (let index = 0; index < paper.length; index++) {
    paper[index] = document.querySelector(`#p${index + 1}`);
    paper[index].style.zIndex = numOfPapers - index;
  }
};
