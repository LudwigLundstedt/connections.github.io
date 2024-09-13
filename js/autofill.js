function autofill() {
  fetch("./assets/groups.json")
    .then((response) => response.json()) // Parse the JSON
    .then((data) => {
      // Initialize an array to store the transformed key-value pairs
      const pairs = Object.keys(data);
      const pairs2 = [];
      let randGroups = getRandomElements(pairs, 4);

      randGroups.forEach((groupName) => {
        const participants = data[groupName];
        participants.forEach((participant) => {
          pairs2.push(`${participant}:${groupName}`);
          // Check if data is an object
          localStorage.setItem("groups", randGroups);
        });
      });

      const pairsString = pairs2.join(",");

      localStorage.setItem("groups", pairsString);
      window.location.href = "./game.html";
    });
}

function getRandomElements(arr, num) {
  // Shuffle the array
  const shuffled = arr.sort(() => 0.5 - Math.random());

  // Return the first 'num' elements
  return shuffled.slice(0, num);
}

window.autofill = autofill;
