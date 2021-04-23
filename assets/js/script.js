var tasks = $('.description');
var savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];

function init() {
  var currentDate = moment();

  $("#currentDay").html(currentDate.format("dddd, MMMM DD"));
  
  var currentHour = currentDate.hours();
  
  $(".description").addClass("future");
  
  if(currentHour > 17){
    $(".description").removeClass("future");
    $(".description").addClass("past");
  } else {
  for(var i = currentHour - 1; i >= 9; i--){
    $(".description").eq(i - 9).removeClass("future");
    $(".description").eq(i - 9).addClass("past");
    }
    $(".description").eq(currentHour - 9).removeClass("future");
    $(".description").eq(currentHour - 9).addClass("present");
  }
};

init();

function saveTask(index) {
  savedTasks[index] = tasks[index].value;
  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
};

function loadTasks() {
  savedTasks = JSON.parse(localStorage.getItem("savedTasks"));

  if (!savedTasks) {
    savedTasks = []
  }
  for(var i = 0; i < savedTasks.length; i++) {
    tasks[i].value = savedTasks[i];
  }
};