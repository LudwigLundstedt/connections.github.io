window.onload = function () {
  localStorage.clear(); // Clears all data in localStorage

  // Add event listener to each input field for "Enter" key
  const inputFields = [];
  inputFields.push(document.getElementById("group1"));
  inputFields.push(document.getElementById("group2"));
  inputFields.push(document.getElementById("group3"));
  inputFields.push(document.getElementById("group4"));

  console.log(inputFields);
  inputFields.forEach((input) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission or page reload

        const buttonId = input.nextElementSibling.id; // Find the corresponding button
        const button = document.getElementById(buttonId);
        if (!button) return; // Skip if button is not found

        const inputId = input.id;
        const containerId = "container-" + inputId;

        const container = document.getElementById(containerId);
        if (!container) {
          console.error(`Container with ID ${containerId} not found.`);
          return; // Skip if container is not found
        }

        handleSubmit(button, inputId, containerId); // Call handleSubmit
      }
    });
  });
};
