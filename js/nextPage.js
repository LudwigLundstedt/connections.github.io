import { words } from "./handleSubmit.js";

export function nextPage() {
  let count1 =
    parseInt(
      document.getElementById("button-group1").getAttribute("data-count")
    ) || 0;
  let count2 =
    parseInt(
      document.getElementById("button-group2").getAttribute("data-count")
    ) || 0;
  let count3 =
    parseInt(
      document.getElementById("button-group3").getAttribute("data-count")
    ) || 0;
  let count4 =
    parseInt(
      document.getElementById("button-group4").getAttribute("data-count")
    ) || 0;

  if (count1 == 4 && count2 == 4 && count3 == 4 && count4 == 4) {
    localStorage.setItem("groups", words);
    window.location.href = "./game.html";
  } else {
    console.log("not enough");
  }
}

window.nextPage = nextPage;
