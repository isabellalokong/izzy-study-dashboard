let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { name: "Biology Assignment", due: "2026-02-15", done: false },
  { name: "Chemistry Test", due: "2026-02-14", done: false },
  { name: "Algebra Notes", due: "2026-02-13", done: true }
];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getPriority(task) {
  if (task.done) return "green";

  const today = new Date();
  const dueDate = new Date(task.due);
  const diff = (dueDate - today) / (1000 * 60 * 60 * 24);

  if (diff < 0) return "red";
  if (diff <= 1) return "red";
  if (diff <= 3) return "yellow";
  return "yellow";
}

function renderTasks() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const priority = getPriority(task);
    li.className = `todo-item ${priority}`;
    li.textContent = `${task.name} (due ${task.due})`;

    li.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
      updateGrades();
    };

    list.appendChild(li);
  });
}

function updateGrades() {
  let completed = tasks.filter(t => t.done).length;
  let total = tasks.length;
  let percent = Math.round((completed / total) * 100);

  ["bio","chem","alg","eng"].forEach(id => {
    document.getElementById(id+"-grade").textContent = percent+"%";
    document.getElementById(id+"-progress").style.width = percent+"%";
  });
}

// Fire streak
let lastLogin = localStorage.getItem("lastLogin");
let streak = Number(localStorage.getItem("streak")) || 0;
let today = new Date().toDateString();

if (lastLogin !== today) {
  streak++;
  localStorage.setItem("streak", streak);
  localStorage.setItem("lastLogin", today);
}

document.getElementById("fireFill").style.height = Math.min(streak*20,100) + "%";

// Add task button
document.getElementById("addTaskBtn").onclick = () => {
  let name = prompt("Task name:");
  let due = prompt("Due date (YYYY-MM-DD):");

  if(name && due) {
    tasks.push({name, due, done:false});
    saveTasks();
    renderTasks();
    updateGrades();
  }
};

renderTasks();
updateGrades();
