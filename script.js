let week = Number(localStorage.getItem("week")) || 1;

document.getElementById("weekTitle").textContent = "Week " + week;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { name:"Biology Assignment", done:false },
  { name:"Chemistry Notes", done:false }
];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("week", week);
}

function renderTasks() {
  const list = document.getElementById("todo-list");
  list.innerHTML="";

  tasks.forEach((task,i)=>{
    const li=document.createElement("li");
    li.textContent=task.name;
    li.className="todo-item "+(task.done?"green":"red");

    li.onclick=()=>{
      task.done=!task.done;
      save();
      renderTasks();
      updateProgress();
      checkWeekComplete();
    };

    list.appendChild(li);
  });
}

function updateProgress() {
  let done = tasks.filter(t=>t.done).length;
  let percent = Math.round((done/tasks.length)*100);

  ["bio","chem","alg","eng"].forEach(id=>{
    document.getElementById(id+"-progress").style.width=percent+"%";
    document.getElementById(id+"-grade").textContent=percent+"%";
  });
}

function checkWeekComplete() {
  if(tasks.every(t=>t.done)) {
    week++;
    tasks=[];
    save();
    alert("Week unlocked!");
    document.getElementById("weekTitle").textContent="Week "+week;
  }
}

// Fire streak
let lastLogin=localStorage.getItem("lastLogin");
let today=new Date().toDateString();
let streak=Number(localStorage.getItem("streak"))||0;

if(lastLogin!==today){
  streak++;
  localStorage.setItem("streak",streak);
  localStorage.setItem("lastLogin",today);
}

document.getElementById("fireFill").style.height=Math.min(streak*20,100)+"%";

document.getElementById("addTaskBtn").onclick=()=>{
  let name=prompt("Task name:");
  if(name){
    tasks.push({name,done:false});
    save();
    renderTasks();
    updateProgress();
  }
};

renderTasks();
updateProgress();
