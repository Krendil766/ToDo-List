const deskTaskInput = document.querySelector('#description-task');
const addTaskBtn = document.querySelector('#add-task-btn');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

function Task (description){
	this.description = description;
	this.completed = false;
}

const fillHtmlList = () =>{
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
}

const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', ()=>{
	tasks.push(new Task(deskTaskInput.value));
	updateLocal();
	deskTaskInput.value = "";
	fillHtmlList();
})

fillHtmlList();
console.log(tasks);