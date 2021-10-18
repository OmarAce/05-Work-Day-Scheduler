// Variable Definitions
var currentDay = $("#currentDay");
var dayPlanner = $(".planner");
var timeRow = $(".time-row");
var currentDate = dayjs().format("dddd, MMMM D, YYYY h:mm A");
var currentHour = dayjs().format("H");
var planItems = [];

//Updates Current Date on Page using Dayjs
currentDay.text(currentDate);