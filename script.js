// Progress bars
document.getElementById("bio-progress").style.width = "85%";
document.getElementById("chem-progress").style.width = "90%";
document.getElementById("alg-progress").style.width = "88%";
document.getElementById("eng-progress").style.width = "92%";

// Fire streak
let streak = 3; // example
let fireFill = document.getElementById("fireFill");
fireFill.style.height = streak * 20 + "%";

// To Do List
const tasks = [
  { name: "Biology Assignment 1", status: "red" },
  { name: "Chemistry Test", status: "yellow" },
  { name: "Algebra Notes", status: "red" },
  { name: "English Project", status: "green" }
];

const todoList = document.getElementById("todo-list");

tasks.forEach(task => {
  const li = document.createElement("li");
  li.textContent = task.name;
  li.className = `todo-item ${task.status}`;
  todoList.appendChild(li);
});
