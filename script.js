/********************
 CORE DATA
********************/

const TOTAL_WEEKS = 8;
let currentWeek = Number(localStorage.getItem("currentWeek")) || 1;

const subjects = ["Biology","Chemistry","Algebra 2","English"];

let progress = JSON.parse(localStorage.getItem("progress")) || {
  Biology:0,
  Chemistry:0,
  "Algebra 2":0,
  English:0,
  week:0
};

let fire = Number(localStorage.getItem("fire")) || 0;
let lastDay = localStorage.getItem("lastDay");

/********************
 CURRICULUM
********************/

const curriculum = {
  1: {
    Biology: {
      lesson: "Cell structure and function",
      assignments: [
        "Label a cell diagram",
        "Explain mitochondria",
        "5 cell questions"
      ],
      test: "Cell biology quiz",
      project: "Create a cell infographic"
    },
    Chemistry: {
      lesson: "Atomic structure",
      assignments: [
        "Protons neutrons electrons",
        "Periodic table basics",
        "5 atom questions"
      ],
      test: "Atoms quiz",
      project: "Build an atom model"
    },
    "Algebra 2": {
      lesson: "Quadratic equations",
      assignments: [
        "Solve 5 quadratics",
        "Graph a parabola",
        "Word problems"
      ],
      test: "Quadratic quiz",
      project: "Real-life parabola project"
    },
    English: {
      lesson: "Theme and symbolism",
      assignments: [
        "Short reading",
        "Theme questions",
        "Paragraph response"
      ],
      test: "Theme quiz",
      project: "Mini essay"
    }
  }
};

/********************
 DAILY TASK SYSTEM
********************/

let tasks = JSON.parse(localStorage.getItem("tasks")) || generateTasks();

function generateTasks(){
  let list = [];
  let weekData = curriculum[currentWeek];

  subjects.forEach(sub=>{
    list.push({name:`${sub} Lesson: ${weekData[sub].lesson}`,type:"lesson",done:false});
    weekData[sub].assignments.forEach(a=>{
      list.push({name:`${sub} Assignment: ${a}`,type:"assignment",done:false});
    });
    list.push({name:`${sub} Test`,type:"test",done:false});
  });

  list.push({name:"Project (bi-weekly)",type:"project",done:false});

  localStorage.setItem("tasks",JSON.stringify(list));
  return list;
}

/********************
 FIRE SYSTEM (TIME BASED)
********************/

const today = new Date().toDateString();
if(today !==
