const deskTaskInput = document.querySelector('#description-task');
const addTaskBtn = document.querySelector('.input-wrapper');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks,
    todoItemElems;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

function Task(description) {
    this.description = description;
    this.completed = false;
}

/* const fillHtmlList = () =>{
	todosWrapper.innerHTML = '';
	if(tasks.length > 0){
		tasks.forEach(({
			description,
			completed
		}) => {
			todosWrapper.innerHTML += `
			<div class="todo-item ${completed ? 'checked' : ''}">
                <div class="description">${description}</div>
                <div class="buttons">
                    <input class="btn-complete" type="checkbox" ${completed ? 'checked':''}>
                    <button class="btn-delete">X</button>
                </div>
            </div>
			`
		});
	}
} */

const createTemplate = (task, index) => {
    return `
	<div class="todo-item ${task.completed ? 'checked' : ''}">
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input onclick = "completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked':''}>
                    <button onclick = "deleteTask(${index})" class="btn-delete">X</button>
                </div>
            </div>
		`
}

const filterTasks = () => {
    const activeTasks = tasks.filter(item => {
        return !item.completed
    });
    console.log(activeTasks);
    const completeTask = tasks.filter(item => {
        return item.completed
    });
    tasks = [...activeTasks, ...completeTask];
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = '';
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked')
    }
    updateLocal();
    fillHtmlList();
}

const deleteTask = index => {
    todoItemElems[index].classList.add('delition')
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();

    }, 1000)
}

addTaskBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    if (deskTaskInput.value.trim()) {
        tasks.push(new Task(deskTaskInput.value));
        updateLocal();
        deskTaskInput.value = "";
        fillHtmlList();
    }
});

fillHtmlList();
filterTasks();
console.log(tasks);