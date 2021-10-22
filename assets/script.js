
var currentDay = $("#currentDay");
var dayPlanner = $(".planner");
var timeRow = $(".time-row");
var currentHour = dayjs().format("H");
var toDoItems = [];

//Updates Current Date on Page using Dayjs

function updateTime() {
    var now = dayjs().format("dddd, MMMM D, YYYY [at] hh:mm:ss A");
    currentDay.html(now);
};

//Dynamically updates time every second
setInterval(updateTime, 1000);

// An array of objects
function startSchedule(){
  timeRow.each(function(){
  var thisRow = $(this);
  var thisRowHr = parseInt(thisRow.attr("data-hour"));
  var todoObj = {
    hour: thisRowHr,
    text: "",
  }
  toDoItems.push(todoObj);
});

// Retrieves Local Storage
localStorage.setItem("todos", JSON.stringify(toDoItems)); 
};

// Function to Save currently selected row based on save icon location of row
function saveTodo(){
var hourToUpdate = $(this).parent().attr("data-hour");
var itemToAdd = (($(this).parent()).children("textarea")).val(); 
for (var i = 0; i < toDoItems.length; i++){
  if (toDoItems[i].hour == hourToUpdate){
   
    toDoItems[i].text = itemToAdd;
  }
}
localStorage.setItem("todos", JSON.stringify(toDoItems));
// Re-Renders Todos
renderSchedule();
}

//Changes the row style depending on time of day
function setUpRows(){
timeRow.each(function(){
var thisRow = $(this);
var thisRowHr = parseInt(thisRow.attr("data-hour"));

// Adds class to row based on currenthour
if (thisRowHr == currentHour) {
  thisRow.addClass("present").removeClass("past future");
}
if (thisRowHr < currentHour) {
  thisRow.addClass("past").removeClass("present future");
}
if (thisRowHr > currentHour) {
  thisRow.addClass("future").removeClass("past present");
}
});
}

//Adds Todos to Page after retrieve items from Local Storage
function renderSchedule(){

toDoItems = localStorage.getItem("todos");
toDoItems = JSON.parse(toDoItems);

for (var i = 0; i < toDoItems.length; i++){
  var itemHour = toDoItems[i].hour;
  var itemText = toDoItems[i].text; 

  $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
}
}

//Runs function that checks time and marks past present and future classes for rows
$(document).ready(function(){
setUpRows();

if(!localStorage.getItem("todos")){
  //Initializes first open of page
startSchedule();
} 

//Adds all todo items to page
renderSchedule();
//when a todo item save button is clicked, save it
dayPlanner.on("click", "button", saveTodo);

});

