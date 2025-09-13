function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  let tasks = getTasks();
  tasks.push({
    text: taskText,
    completed: false,
    date: new Date().toLocaleDateString()
  });

  saveTasks(tasks);
  input.value = "";
  loadTasks();
}

function markAsComplete(index) {
  let tasks = getTasks();
  tasks[index].completed = true;
  tasks[index].date=new Date().toLocaleDateString();
  saveTasks(tasks);
  loadTasks();
}

function deleteTask(index) {
  let tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
}

function loadTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let tasks = getTasks();
  let groupedTasks = {};
  tasks.forEach((task, index) => {
    if (!groupedTasks[task.date]) {
      groupedTasks[task.date] = [];
    }
    groupedTasks[task.date].push({ ...task, index });
  });

  Object.keys(groupedTasks).forEach(date => {
    let groupDiv = document.createElement("div");
    groupDiv.className = "date-group";
    let heading = document.createElement("h3");
    heading.textContent = date;
    groupDiv.appendChild(heading);

    let columnsDiv = document.createElement("div");
    columnsDiv.className = "task-columns";
    let pendingColumn = document.createElement("div");
    pendingColumn.className = "task-column";
    let pendingTitle = document.createElement("h4");
    pendingTitle.textContent = "Pending Tasks";
    pendingColumn.appendChild(pendingTitle);
    let pendingList = document.createElement("ul");
    pendingColumn.appendChild(pendingList);
    let completedColumn = document.createElement("div");
    completedColumn.className = "task-column";
    let completedTitle = document.createElement("h4");
    completedTitle.textContent = "Completed Tasks";
    completedColumn.appendChild(completedTitle);
    let completedList = document.createElement("ul");
    completedColumn.appendChild(completedList);

    groupedTasks[date].forEach(taskObj => {
      let li = document.createElement("li");

      let taskSpan = document.createElement("span");
      taskSpan.className = "task-text";
      taskSpan.textContent = taskObj.text;
      let actionsDiv = document.createElement("div");
      actionsDiv.className = "task-actions";

      if (!taskObj.completed) {
        let completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.className = "complete";
        completeBtn.onclick = () => markAsComplete(taskObj.index);
        actionsDiv.appendChild(completeBtn);
      }
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete";
      deleteBtn.onclick = () => deleteTask(taskObj.index);
      actionsDiv.appendChild(deleteBtn);
      li.appendChild(taskSpan);
      li.appendChild(actionsDiv);
      if (taskObj.completed) {
        li.classList.add("completed", "fade-in");
        completedList.appendChild(li);
      } else {
        pendingList.appendChild(li);
      }
    });

    columnsDiv.appendChild(pendingColumn);
    columnsDiv.appendChild(completedColumn);
    groupDiv.appendChild(columnsDiv);

    taskList.appendChild(groupDiv);
  });
}

window.onload = loadTasks;
