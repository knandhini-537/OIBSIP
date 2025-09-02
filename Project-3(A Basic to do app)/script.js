window.onload = () => {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const dateAdded = new Date().toLocaleDateString();

  const task = {
    text: taskText,
    date: dateAdded,
    completed: false
  };

  saveTask(task);
  renderTasksByDate(); 
  input.value = "";
}
function renderTasksByDate() {
  const taskContainer = document.getElementById("taskList");
  taskContainer.innerHTML = ""; 
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const grouped = {};
  tasks.forEach(task => {
    if (!grouped[task.date]) grouped[task.date] = [];
    grouped[task.date].push(task);
  });

  for (const date in grouped) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "date-group";

    const title = document.createElement("div");
    title.className = "date-title";
    title.textContent = "📅 " + date;
    groupDiv.appendChild(title);

    const ul = document.createElement("ul");

    grouped[date].forEach(task => {
      const li = document.createElement("li");

      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.textContent = task.text;

      if (task.completed) {
        li.classList.add("completed");
      }

      taskText.addEventListener("click", () => {
        li.classList.toggle("completed");
        task.completed = !task.completed;
        updateTaskInStorage(task);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => {
        li.remove();
        deleteTaskFromStorage(task.text, task.date);
        renderTasksByDate();
      };

      li.appendChild(taskText);
      li.appendChild(deleteBtn);
      ul.appendChild(li);
    });

    groupDiv.appendChild(ul);
    taskContainer.appendChild(groupDiv);
  }
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasksByDate();
}
function updateTaskInStorage(updatedTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task =>
    task.text === updatedTask.text && task.date === updatedTask.date
      ? updatedTask
      : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromStorage(text, date) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => !(task.text === text && task.date === date));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
