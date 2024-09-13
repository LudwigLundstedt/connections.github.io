export let toggledCount = 0; // Track how many buttons are "on"
const maxToggled = 4; // Limit of 4 "on" buttons
export let toggledButtons = [];

// Array to hold button data
const buttonData = [];

export default function createButton(content, group) {
  // Create a button object and store it in the array
  const button = {
    content: content,
    group: group,
  };
  buttonData.push(button);

  // Create and append buttons after shuffling
  function appendButtons() {
    const buttonContainer = document.querySelector(".flex-grid");

    // Shuffle the button data array
    shuffleArray(buttonData);

    // Clear existing buttons
    buttonContainer.innerHTML = "";

    // Create and append buttons in shuffled order
    buttonData.forEach((buttonInfo) => {
      let newButton = document.createElement("button");
      newButton.type = "button";
      newButton.className = "grid-item"; // Apply initial style
      newButton.textContent = buttonInfo.content;
      newButton.setAttribute("group", buttonInfo.group);

      // Add event listener to toggle the button's state
      newButton.addEventListener("click", function () {
        if (newButton.classList.contains("on")) {
          // If button is currently "on", toggle it "off"
          newButton.classList.remove("on");
          newButton.style.backgroundColor = "white";
          toggledCount--;
          let index = toggledButtons.findIndex(
            (button) => button === newButton
          );
          toggledButtons.splice(index, 1);
        } else {
          // If button is "off" and less than 4 buttons are toggled on, toggle it "on"
          if (toggledCount < maxToggled) {
            newButton.classList.add("on");
            newButton.style.backgroundColor = "lightblue";
            toggledCount++;
            toggledButtons.push(newButton);
          } else {
            alert("Maximum of 4 buttons can be ON at the same time!");
          }
        }
      });

      // Append the new button to the container
      buttonContainer.appendChild(newButton);
    });
  }

  // Call appendButtons to add buttons after shuffling
  appendButtons();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}
