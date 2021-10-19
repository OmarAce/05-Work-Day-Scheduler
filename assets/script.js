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


