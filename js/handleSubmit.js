export let words = [];

export function handleSubmit(button, id, containerId) {
  // Get the current count from the button's data attribute
  let count = parseInt(button.getAttribute("data-count")) || 0;

  let elemId = document.getElementById(id);
  let value = elemId.value;

  if (count < 4 && value !== "") {
    count++;
    button.setAttribute("data-count", count);

    // Create a new button element
    let newButton = document.createElement("button");
    newButton.id = "wordButton";
    newButton.textContent = value;

    newButton.addEventListener("click", function (event) {
      event.preventDefault();

      let index = words.findIndex((word) => word === value + ":" + id);
      words.splice(index, 1);

      button.setAttribute("data-count", count);
      newButton.remove();

      let container = document.getElementById(containerId);
      let remainingButtons = container.querySelectorAll(
        "button[id^='wordButton']"
      );
      let newCount = remainingButtons.length;

      // Update the count based on the remaining buttons
      button.setAttribute("data-count", newCount);
    });

    // Get the container element by ID and append the new button
    let container = document.getElementById(containerId);
    container.appendChild(newButton);

    // Clear the input value and add the word to the array
    let textarea = document.getElementById("textarea-" + id);
    elemId.value = "";
    words.push(value + ":" + textarea.value);
  }
}

// Expose handleSubmit globally
window.handleSubmit = handleSubmit;
