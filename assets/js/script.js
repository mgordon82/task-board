// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

// Set const for controlling Dialog
const TaskDialog = $('#addTaskDialog');
const ButtonDialog = $('#taskDialogButton');

function getTaskFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function setTaskToLocalStorage(value) {
  localStorage.setItem('tasks', JSON.stringify(value));
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  nextId = nextId || 0;
  localStorage.setItem('nextId', ++nextId);
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  let statusClass = 'task-card draggable';
  const today = dayjs();
  if (task.status !== 'done') {
    if (today.isSame(task.dueDate, `day`)) {
      statusClass += ' bg-warning text-white';
    } else if (today.isAfter(task.dueDate)) {
      statusClass += ' bg-danger text-white';
    }
  }
  const deleteBtn = $(`<button></button>`)
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  deleteBtn.on('click', handleDeleteTask);
  const section = $(`<section data-task-id=${task.id} class='${statusClass}'>
  <h3>${task.taskTitle}</h3>
  <p>${task.taskDescription}</p>
  <p>${task.dueDate}</p>
</section>`);
  section.append(deleteBtn);
  return (task.innerHTML = section);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const taskList = getTaskFromLocalStorage();
  const todoCol = $('#todo-cards');
  todoCol.empty();
  const progressCol = $('#in-progress-cards');
  progressCol.empty();
  const doneCol = $('#done-cards');
  doneCol.empty();

  for (let i = 0; i < taskList.length; i++) {
    taskList[i].status === 'to-do'
      ? todoCol.append(createTaskCard(taskList[i]))
      : '';
    taskList[i].status === 'in-progress'
      ? progressCol.append(createTaskCard(taskList[i]))
      : '';
    taskList[i].status === 'done'
      ? doneCol.append(createTaskCard(taskList[i]))
      : '';
  }
  $('.draggable').draggable({ zIndex: 999, revert: 'invalid' });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const id = generateTaskId();
  const title = $('#taskTitle').val();
  const date = $('#datepicker').val();
  const desc = $('#taskDescription').val();
  const obj = {
    id: id,
    taskTitle: title,
    dueDate: date,
    taskDescription: desc,
    status: 'to-do',
  };
  const taskList = getTaskFromLocalStorage();
  taskList.push(obj);
  if (!obj.taskTitle || !obj.dueDate || !obj.taskDescription) {
    const pEl = $('#error-p');
    if (pEl.length > 0) {
      return;
    }
    const errorArea = $('#errorMsg');
    const pElement = $('<p></p>');
    pElement.attr('id', 'error-p');
    pElement.addClass('error');
    pElement.text('You must fill in the required fields');
    errorArea.append(pElement);
    return;
  }
  setTaskToLocalStorage(taskList);
  renderTaskList();
  $('#taskForm')[0].reset();
  $('#staticBackdrop').modal('hide');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  let taskList = getTaskFromLocalStorage();
  const currentTaskId = $(event.target).data('task-id');
  const updatedTaskArray = taskList.filter((task) => task.id != currentTaskId);
  setTaskToLocalStorage(updatedTaskArray);
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskList = getTaskFromLocalStorage();
  const currentTaskId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;
  const taskIndex = taskList.findIndex((task) => task.id == currentTaskId);
  if (taskIndex || taskIndex == 0) {
    taskList[taskIndex].status = newStatus;
    setTaskToLocalStorage(taskList);
  }

  renderTaskList();
}

// Clearing elements if close button is clicked
function handleClose() {
  $('#error-p').remove();
  $('#taskForm')[0].reset();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $('#closeBtn').click(handleClose);
  $('#headerCloseBtn').click(handleClose);
  $('#addTaskButton').click(handleAddTask);
  $('.lane').droppable({ accept: '.draggable', drop: handleDrop });
  $('#datepicker').datepicker({ changeMonth: true, changeYear: true });
});
