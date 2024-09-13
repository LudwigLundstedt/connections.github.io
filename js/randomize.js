import createButton from "./createButton.js";

export default function randomize() {
  //let g1 = createList("group1");
  // let g2 = createList("group2");
  //let g3 = createList("group3");
  //let g4 = createList("group4");

  // let words = g1.concat(g2).concat(g3.concat(g4));
  let words = createList();

  words.forEach((word) => {
    let tempWords = word.split(":");
    createButton(tempWords[0], tempWords[1]);
  });
}

function createList() {
  let s = localStorage.getItem("groups");
  let list = [];
  s.split(",").forEach((word) => {
    list.push(word);
  });
  return list;
}

window.onload = function () {
  randomize();
};
