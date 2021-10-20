// Variable Definitions

var currentDay = $("#currentDay");
var dayPlanner = $(".planner");
var currentHour = dayjs().format("H");
var toDoItems = [];

//Updates Current Date on Page using Dayjs

function updateTime() {
    var now = dayjs().format("dddd, MMMM D, YYYY [at] hh:mm:ss A");
    currentDay.html(now);
};

setInterval(updateTime, 1000);

// Dynamically Renders Planner 

function render() {

    for (var i = 9; i < 18; i++) {
      $(dayPlanner).append(`
      <div class="time-row row" data-hour=${i}>
        <div class="hour col-2 col-lg-1 d-flex justify-content-center align-items-center">${
          i < 12 ? `${i} am` : i > 12 ? `${i - 12} pm` : "12 pm"
        }</div>
        <textarea
        class="col -8 col-lg-10 description ${
          i < currentHour ? "past" : i == currentHour ? "present" : "future"
        }"
        >${toDoItems[i] || ""}</textarea
        ><button class="col-2 col-lg-1 btn btn-block d-flex justify-content-center align-items-center saveBtn" id="${i}">
        <i class="fas fa-save"></i>
        </button>
        </div>
        `);
    }
}

render();

function startSchedule(){

$('.time-row').each(function(){
  var thisRow = $(this);
  var thisRowHr = Number((thisRow.attr("data-hour")));

  var todoObj = {
    hour: thisRowHr,
    text: "",
  }
  console.log(todoObj);
  toDoItems.push(todoObj);
});

// Loop all rows, save to the local storage
localStorage.setItem("toDos", JSON.stringify(toDoItems)); 
};

function saveTodo(){
    var currentRow = parseInt($(this).parent().attr("data-hour")); //Target Curent Row Hour ID Make Integer
    var taskUpdate = (($(this).parent()).children("textarea")).val(); //Target Text Area
    for (var i = 0; i < toDoItems.length; i++){
      if (toDoItems[i].hour == currentRow){
       
        toDoItems[i].text = taskUpdate;
      }
    }
    localStorage.setItem("toDos", JSON.stringify(toDoItems));
    console.log(currentRow);
    console.log(taskUpdate);
    // getTodos();
    renderSchedule();

}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);
    
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }
}

$(document).ready(function(){

if(!localStorage.getItem("toDos")){
  //initialize the array of objects
  startSchedule();
}
});

$(document).ready(function(){

  if(!localStorage.getItem("toDos")){
    //initialize the array of objects
    startSchedule();
  }
  });

dayPlanner.on("click", "button", saveTodo);
