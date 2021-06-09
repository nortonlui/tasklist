// Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
let tasks = [];

// Load all event listeners

loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter task event
  filter.addEventListener('keyup', filterTasks);
}

// Create a new element collection item

function createItemCollection(t) {
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(t));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
}

// Get Tasks from LS
function getTasks() {
  getTasksLocalStorage();
  tasks.forEach(function (task) {
    createItemCollection(task);
  });
}

// Add task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('Add a task');
  }
  // Create element item collection
  createItemCollection(taskInput.value);

  // Store in LS
  storeTasksInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = '';
}

// Get tasks from localStorage

function getTasksLocalStorage() {
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
}

// Storage Task

function storeTasksInLocalStorage(task) {
  if (localStorage.getItem('tasks') === null) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Remove task
function removeTask(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  console.log(taskItem);
  if (tasks.length !== 0) {
    tasks.forEach(function (task, index) {
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Clear Tasks
function clearTasks(e) {
  e.preventDefault();
  if (confirm('Are you sure delete all tasks ?')) {
    //askList.innerHTML = '';
    // Faster
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }
  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  e.preventDefault();
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
