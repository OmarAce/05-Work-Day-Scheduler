// Variable Definitions
var currentDay = $("#currentDay");
var dayPlanner = $(".planner");
var timeRow = $(".time-row");
var currentHour = dayjs().format("H");
var planItems = [];

//Updates Current Date on Page using Dayjs

function updateTime() {
    var now = dayjs().format("dddd, MMMM D, YYYY [at] hh:mm:ss A");
    currentDay.html(now);
};

setInterval(updateTime, 1000);

var todos = {
    9: "get shopping list",
    12: "eat lunch",
}

// Dynamically Renders Planner 

function render() {
    for (var i = 9; i < 18; i++) {
      $(dayPlanner).append(`
      <div class="time-row row" data-hour= ${i}>
        <div class="hour col-2 col-lg-1 d-flex justify-content-center align-items-center">${
          i < 12 ? `${i} am` : i > 12 ? `${i - 12} pm` : "12 pm"
        }</div>
        <textarea
        class="col -8 col-lg-10 description ${
          i < currentHour ? "past" : i === currentHour ? "present" : "future"
        }"
        >${todos[i] || ""}</textarea
        ><button class="col-2 col-lg-1 btn btn-block d-flex justify-content-center align-items-center saveBtn" id="${i}">
        <i class="fas fa-save"></i>
        </button>
        </div>
        `);
    }
  }

  render();
  //when saving todo, update localStorage