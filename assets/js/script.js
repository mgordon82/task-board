// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

// Set const for controlling Dialog
const TaskDialog = $('#addTaskDialog');
const ButtonDialog = $('#taskDialogButton');

function openTaskDialog() {
  TaskDialog.dialog({ autoOpen: false });
  ButtonDialog.click(function () {
    TaskDialog.dialog('open');
  });
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  if (!nextId) {
    localStorage.setItem('nextId', 1);
  } else {
    localStorage.setItem('nextId', nextId + 1);
  }
}

// Todo: create a function to create a task card
function createTaskCard(task) {}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  console.log('here we go');
  generateTaskId();
  renderTaskList();
  openTaskDialog();
});
