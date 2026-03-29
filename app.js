const STORAGE_KEY = 'todo_tasks_v1';

function getTasks(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    console.error('Failed to parse tasks', e);
    return [];
  }
}

function saveTasks(tasks){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskObject(title){
  return {
    id: Date.now().toString(),
    title: title.trim(),
    createdAt: new Date().toISOString()
  };
}

function renderTasks(){
  const list = document.getElementById('task-list');
  const empty = document.getElementById('empty-msg');
  const tasks = getTasks();

  list.innerHTML = '';
  if(tasks.length === 0){
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  for(const t of tasks){
    const li = document.createElement('li');
    li.className = 'task-item';

    const left = document.createElement('div');
    left.className = 'task-left';

    const title = document.createElement('p');
    title.className = 'task-title';
    title.textContent = t.title;

    const meta = document.createElement('div');
    meta.className = 'task-meta';
    const date = new Date(t.createdAt);
    meta.textContent = date.toLocaleString();

    left.appendChild(title);
    left.appendChild(meta);

    li.appendChild(left);

    // actions (delete)
    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const del = document.createElement('button');
    del.className = 'btn btn--danger';
    del.type = 'button';
    del.textContent = 'Delete';
    del.setAttribute('aria-label', `Delete task ${t.title}`);
    del.addEventListener('click', () => {
      removeTask(t.id);
    });

    actions.appendChild(del);
    li.appendChild(actions);

    list.appendChild(li);
  }
}

function removeTask(id){
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
  renderTasks();
}

function onFormSubmit(ev){
  ev.preventDefault();
  const input = document.getElementById('task-input');
  const value = input.value.trim();
  if(!value) return;

  const tasks = getTasks();
  tasks.unshift(createTaskObject(value));
  saveTasks(tasks);
  input.value = '';
  renderTasks();
  input.focus();
}

function init(){
  const form = document.getElementById('task-form');
  form.addEventListener('submit', onFormSubmit);
  renderTasks();
}

document.addEventListener('DOMContentLoaded', init);
