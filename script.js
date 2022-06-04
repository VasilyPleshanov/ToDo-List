const todoForm = document.querySelector('.todo-form')
const todoFormInput = document.querySelector('.todo-form_input')
const tasks = document.querySelector('.tasks')

let arrTasks
!localStorage.tasks ? arrTasks = [] : arrTasks = JSON.parse(localStorage.getItem('tasks'))

function Task(description) {
  this.description = description
  this.completed = false
}

const createTemplate = (task, index) => {
  return `
    <div class="task ${task.completed ? 'checked' : ''}">
      <input onclick="completeTask(${index})" type="checkbox" class="task_checkbox" ${task.completed ? 'checked' : ''} id="task_checkbox_${index}">
      <label class="task_label" for="task_checkbox_${index}"></label>
      <p class="task_title">${task.description}</p>
      <input type="text" class="task_input" value="${task.description}">
      <button onclick="editTask(${index})" class="task_btn-edit button"></button>
      <button onclick="deleteTask(${index})" class="task_btn-delete button"></button>
    </div>
  `
}

const fillHtmlList = () => {
  tasks.innerHTML = ''
  if(arrTasks.length > 0) {
    arrTasks.forEach((item, index) => {
      tasks.innerHTML += createTemplate(item, index)
    })
    todoTaskElems = document.querySelectorAll('.task')
  }
}

fillHtmlList()

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(arrTasks))
}

const completeTask = index => {
  arrTasks[index].completed = !arrTasks[index].completed
  if (arrTasks[index].completed) {
    todoTaskElems[index].classList.add('checked')
  } else {
    todoTaskElems[index].classList.add('checked')
  }
  updateLocal()
  fillHtmlList()
}

const deleteTask = index => {
  arrTasks.splice(index, 1)
  updateLocal()
  fillHtmlList()
}

const editTask = index => {
  const editBtn = todoTaskElems[index].querySelector('.task_btn-edit')
  const taskInput = todoTaskElems[index].querySelector('.task_input')
  const taskTitle = todoTaskElems[index].querySelector('.task_title')
  
  if (taskInput.value === '') return alert('Необходимо ввести название задачи.')
  
  if (todoTaskElems[index].classList.contains('edit')) {
    todoTaskElems[index].classList.remove('edit')
    taskTitle.innerText = taskInput.value
    arrTasks[index].description = taskInput.value
    
    updateLocal()
    fillHtmlList()
  } else {
    todoTaskElems[index].classList.add('edit')
    taskInput.value = taskTitle.innerText
    taskInput.focus()
  }
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault()
  
  todoFormInput.focus()

  if (todoFormInput.value === '') return alert('Необходимо ввести название задачи.')
  
  arrTasks.push(new Task(todoFormInput.value))
  updateLocal()
  fillHtmlList()
  todoFormInput.value = ''
})



