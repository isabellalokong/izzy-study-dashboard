let week=Number(localStorage.getItem("week"))||1;

let tasks=[
{name:"Biology Assignment",due:1},
{name:"Chemistry Notes",due:2},
{name:"English Reading",due:3}
];

function autoPriority(){
tasks.sort((a,b)=>a.due-b.due);
}

function renderTasks(){
autoPriority();
const list=document.getElementById("todo-list");
list.innerHTML="";
tasks.forEach(task=>{
const li=document.createElement("li");
let color="yellow";
if(task.due===1) color="red";
if(task.due>2) color="green";
li.className=`todo-item ${color}`;
li.textContent=task.name;
list.appendChild(li);
});
}

function updateProgress(){
let percent=Math.round((week/8)*100);
document.getElementById("week-progress").style.width=percent+"%";
document.getElementById("week-percent").textContent=percent+"%";

["bio","chem","alg","eng"].forEach(id=>{
document.getElementById(id+"-progress").style.width=percent+"%";
document.getElementById(id+"-grade").textContent=percent+"%";
});
}

// FIRE TIME BASED
let fire=Number(localStorage.getItem("fire"))||0;
let lastDay=localStorage.getItem("day");
let today=new Date().toDateString();

if(today!==lastDay){
fire++;
localStorage.setItem("fire",fire);
localStorage.setItem("day",today);
}

document.getElementById("fireCount").textContent=fire;

// SUBJECT PANEL
function openPanel(subject){
document.getElementById("subjectPanel").style.display="flex";
document.getElementById("subjectTitle").textContent=subject.toUpperCase();
}

function closePanel(){
document.getElementById("subjectPanel").style.display="none";
}

// THEME
document.getElementById("themeToggle").onclick=()=>{
document.body.classList.toggle("dark");
};

document.getElementById("weekTitle").textContent="Week "+week;

renderTasks();
updateProgress();
