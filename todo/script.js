// grab the elements we need from the page
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const count = document.getElementById("count");
const filterButtons = document.querySelectorAll(".filters button");

// all the tasks live in this array
let todos = [];
let nextId = 1;
let filter = "all";

function addTodo(text) {
  todos.push({ id: nextId, text: text, done: false });
  nextId = nextId + 1;
}

function toggleTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].done = !todos[i].done;
    }
  }
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
}

function renderTodos() {
  // clear the list and build it again from the array
  list.innerHTML = "";

  let visible = todos;
  if (filter === "active") {
    visible = todos.filter((t) => !t.done);
  } else if (filter === "completed") {
    visible = todos.filter((t) => t.done);
  }

  visible.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.done) {
      li.classList.add("done");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      toggleTodo(todo.id);
      renderTodos();
    });

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = todo.text;

    const delButton = document.createElement("button");
    delButton.textContent = "Delete";
    delButton.addEventListener("click", () => {
      deleteTodo(todo.id);
      renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delButton);
    list.appendChild(li);
  });

  // live count of tasks still left to do
  const remaining = todos.filter((t) => !t.done).length;
  count.textContent = remaining + " task(s) remaining";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    renderTodos();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    renderTodos();
  });
});

renderTodos();
