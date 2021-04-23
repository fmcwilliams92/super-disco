// global variables
// array of all of the task textareas
var tasks = $('.description');

// this is the saved tasks, that will be used for the load and saving of tasks
var savedTasks = [];

// call the init function
init();

// This function will get the current time, color the tasks, and load the tasks
// from localStorage
function init() {

  // getting the current date from moment.js
  var currentDate = moment();
  // set the html value to the currentDate variable formatted to "Day of week, Month Day"
  $("#currentDay").html(currentDate.format("dddd, MMMM DD"));

  // get the current hour
  var currentHour = currentDate.hours();

  //default all of the tasks as future then update the rest
  $(".description").addClass("future");

  // if it's past 5pm, update all the tasks to past (removing the future class)
  if(currentHour > 17){
    $(".description").removeClass("future");
    $(".description").addClass("past");
  }
  // else, it's between 9am and 5pm, so update the tasks to the correct class
  else {
    /* for all of the hours between 9am and the hour before the current hour
    * remove the future class and add the past class
    * NOTE: i - 9, because that should put us at the correct index of the jQuery array for the tasks
    */
    for(var i = currentHour - 1; i >= 9; i--){
      $(".description").eq(i - 9).removeClass("future");
      $(".description").eq(i - 9).addClass("past");
    }
    // for the current hour, remove the future class and add the present class
    $(".description").eq(currentHour - 9).removeClass("future");
    $(".description").eq(currentHour - 9).addClass("present");
  }

    // load all of the tasks from localStorage
    loadTasks();
};

// delete todo function

// saves the tasks to localStorage
function saveTask(index) {
  // add value to savedTasks array then store it in localStorage
  savedTasks[index] = tasks[index].value;
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
};

// Load tasks from localStorage and input the values into the html
function loadTasks() {
  // pull savedTasks from localStorage and parse it back into an array
  savedTasks = JSON.parse(localStorage.getItem("savedTasks"));

  // if localStorage brought nothing back, reinit the savedTasks variable
  // as an empty array
  if (!savedTasks) {
    savedTasks = []
  }

  // loop over savedTasks and update the HTML with the tasks
  for(var i = 0; i < savedTasks.length; i++) {
    tasks[i].value = savedTasks[i];
  }
};