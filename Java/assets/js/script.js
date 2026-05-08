//alert("Hello world!");
const storage = document.querySelector("#storage");
const exit = document.querySelector("#exit");
const reset = document.querySelector("#reset");
const story = document.querySelector("#story");
const result = document.querySelector("#result");
const ascii = document.querySelector("#ascii");

let hasKey = false;
let doorAttempts = 0;

storage.addEventListener("click", function () {
  story.textContent = "You open the cabinet.";
  if (hasKey === false) {
    hasKey = true;
    result.textContent = "You find a small key and take it.";
  } else {
    result.textContent = "You search again. Nothing new.";
  }
});

exit.addEventListener("click", function () {
  result.textContent = "You stand in front of the exit door.";
  doorAttempts = doorAttempts + 1;
  if (hasKey === true) {
    result.textContent = "The key turns, the door opens. You escape.";
  } else {
    if (doorAttempts === 1) {
      result.textContent = "You pull the handle. It's locked";
    } else if (doorAttempts === 2) {
      result.textContent = "You try again. Still locked.";
    } else {
      result.textContent = "You try to kick the door in and hurt your foot.";
    }
  }
});
