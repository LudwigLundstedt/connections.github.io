import { toggledButtons, toggledCount } from "./createButton.js";
let tries = 0;
let success = 0;
let alreadyGuessed = [];
const colors = ["##EFEFE7", "#839EE2", "#C5DF74", "#EFD559"];

export default function check() {
  let tempList = [];
  if (toggledCount === 4) {
    let unique = new Set();
    toggledButtons.forEach((button) => {
      unique.add(button.getAttribute("group"));
      tempList.push(button.textContent);
    });

    if (allExsists(alreadyGuessed, tempList)) {
      showPopup("Already tried!");
    } else {
      if (unique.size === 1) {
        success++;

        toggledButtons.forEach((button) => {
          setTimeout(() => {
            button.click();
            button.style.backgroundColor = "green";
            button.disabled = true;
            button.remove();
          }, 100);
        });

        if (success === 4) {
          //alert("VICTORY");
        }

        // Create a new text area
        const resultTextarea = document.createElement("p");
        resultTextarea.className = "result-textarea"; // Apply a class for styling

        const gridItem = document.querySelector(".grid-item");
        const itemHeight = gridItem ? gridItem.offsetHeight : 0;

        resultTextarea.style.height = `${itemHeight}px`;

        // Populate the new text area with the text content of the toggled buttons
        const buttonTexts = toggledButtons
          .map((button) => button.textContent)
          .join(" ");
        resultTextarea.innerHTML = `${
          unique.values().next().value
        }<br>${buttonTexts}`;

        resultTextarea.style.backgroundColor = colors[success - 1];

        // Append the new text area to the .flex-grid container
        const flexGrid = document.querySelector(".flex-grid");
        if (flexGrid) {
          flexGrid.insertBefore(resultTextarea, flexGrid.firstChild);
        }
      } else {
        if (tries < 3) {
          tries++;
          shakeButtons(toggledButtons);
          showPopup(`Wrong! Tries left ${4 - tries}`);
          alreadyGuessed.push(tempList);
          addGussedWords(tempList);

          //alert("Tries left: " + String(4 - tries));
        } else {
          alreadyGuessed.push(tempList);
          addGussedWords(tempList);
          showPopup("Game over");
          let buttons = document.getElementsByClassName("grid-item");

          const buttonsArray = Array.from(buttons);

          const uniqueValues = new Set(
            buttonsArray.map((button) => button.getAttribute("group"))
          );

          uniqueValues.forEach((value) => {
            let tempButtons = findButtonsByGroup(value, buttonsArray);
            tempButtons.forEach((button) => {
              setTimeout(() => {
                button.style.backgroundColor = "green";
                button.disabled = true;
                button.remove();
              }, 100);
            });

            const resultTextarea = document.createElement("p");
            resultTextarea.className = "result-textarea"; // Apply a class for styling

            const gridItem = document.querySelector(".grid-item");
            const itemHeight = gridItem ? gridItem.offsetHeight : 0;

            resultTextarea.style.height = `${itemHeight}px`;

            // Populate the new text area with the text content of the toggled buttons
            const buttonTexts = findButtonsByGroup(value, buttonsArray)
              .map((button) => button.textContent)
              .join(" ");
            resultTextarea.innerHTML = `${value}<br>${buttonTexts}`;
            success++;
            resultTextarea.style.backgroundColor = colors[success - 1];

            // Append the new text area to the .flex-grid container
            const flexGrid = document.querySelector(".flex-grid");
            if (flexGrid) {
              flexGrid.insertBefore(resultTextarea, flexGrid.firstChild);
            }
          });
        }
      }
    }
  }
}

function addGussedWords(gussedWords) {
  let words = gussedWords.join("<br>");

  let newElement = document.createElement("a");
  // newElement.className = "wrongWords";
  newElement.innerHTML = words;

  let container = document.getElementsByClassName("wrongWords");
  container[0].appendChild(newElement);
}

//checks if all elements in arr2, finns in any of the arrays of arrarr1 of type [[]]
function allExsists(arrarr1, arr2) {
  let trueOrFalse = false;
  arrarr1.forEach((arr) => {
    if (arr2.every((element) => arr.includes(element))) {
      trueOrFalse = true;
    }
  });

  return trueOrFalse;
}

function shakeButtons(buttons) {
  buttons.forEach((button) => {
    button.classList.add("shake");
    // Remove the class after animation ends to allow future shakes
    button.addEventListener(
      "animationend",
      () => {
        button.classList.remove("shake");
      },
      { once: true }
    );
  });
}

function findButtonsByGroup(groupValue, buttonsArray) {
  // Convert HTMLCollection to an array
  // Filter buttons by 'group' attribute value
  const filteredButtons = buttonsArray.filter(
    (button) => button.getAttribute("group") === groupValue
  );

  return filteredButtons;
}

function showPopup(message, duration = 3000) {
  const popup = document.getElementById("popup");
  popup.textContent = message; // Set the message content

  popup.classList.add("show"); // Show the popup

  // Hide the popup after the specified duration
  setTimeout(() => {
    popup.classList.remove("show");
  }, duration);
}

// Example usage
window.check = check;
