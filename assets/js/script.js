// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

// Set const for controlling Dialog
const TaskDialog = $('#addTaskDialog');
const ButtonDialog = $('#taskDialogButton');

function getTaskFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function setTaskFromLocalStorage(value) {
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
  const section = `<section data-task-id=${task.id} class='${statusClass}'>
  <h3>${task.taskTitle}</h3>
  <p>${task.taskDescription}</p>
  <p>${task.dueDate}</p>
   ${deleteBtn.outerHTML} 
</section>`;
  console.log('delete button', deleteBtn);
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
  setTaskFromLocalStorage(taskList);
  $('#taskForm')[0].reset();
  $('#staticBackdrop').modal('hide');
  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  console.log('are we here');
  const taskList = getTaskFromLocalStorage();
  const currentTaskId = $(event.target).data('task-id');
  const taskIndex = taskList.findIndex((task) => task.id == currentTaskId);
  taskList.splice(taskIndex);
  setTaskFromLocalStorage(taskList);
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
    setTaskFromLocalStorage(taskList);
  }

  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $('#addTaskButton').click(handleAddTask);
  $('.lane').droppable({ accept: '.draggable', drop: handleDrop });
  $('#datepicker').datepicker({ changeMonth: true, changeYear: true });
});
