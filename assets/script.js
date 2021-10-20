// Variable Definitions
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

function getTodos(){
    toDoItems = JSON.parse(localStorage.getItem("toDos"));
    console.log(toDoItems);
}

getTodos();

function saveTodo(){
    var currentRow = parseInt($(this).parent().attr("data-hour")); //Target Curent Row Hour ID Make Integer
    var taskUpdate = (($(this).parent()).children("textarea")).val(); //Target Text Area
        toDoItems = {
        hour: currentRow,
        text: taskUpdate,
        }
    localStorage.setItem("toDos", JSON.stringify(toDoItems));
    console.log(currentRow);
    console.log(taskUpdate);
    getTodos();

}

dayPlanner.on("click", "button", saveTodo);
