document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#create-task-form');

  form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get the values from the form inputs
      const todoValue = document.querySelector('#new-task-description').value;
      const userValue = document.querySelector('#user').value;
      const durationValue = document.querySelector('#duration').value;
      const dateDueValue = document.querySelector('#date-due').value;
      const priorityValue = document.querySelector('#priority').value;
      
      buildToDoItem(todoValue, userValue, durationValue, dateDueValue, priorityValue);
      form.reset(); // Reset form after submission
  });

  document.querySelector('#sort-asc').addEventListener('click', () => {
    sortTasks(true);
  });

  document.querySelector('#sort-desc').addEventListener('click', () => {
    sortTasks(false);
  });
});

function buildToDoItem(todo, user, duration, dateDue, priority) {
  const li = document.createElement('li'); // Create a new list item element
  const deleteBtn = document.createElement('button'); // Create a delete button
  const editBtn = document.createElement('button'); // Create an edit button

  deleteBtn.textContent = 'X';
  editBtn.textContent = 'Edit';
  
  deleteBtn.addEventListener('click', handleDelete); // Attach delete handler
  editBtn.addEventListener('click', () => handleEdit(li, todo, user, duration, dateDue, priority)); // Attach edit handler
  
  // Set the color of the task based on priority
  if (priority === 'high') {
    li.style.color = 'red';
  } else if (priority === 'medium') {
    li.style.color = 'blue';
  } else {
    li.style.color = 'green';
  }

  // Set the list item content
  li.innerHTML = `
    <strong>${todo}</strong> 
    <em>(Assigned to: ${user}, Duration: ${duration}, Due: ${dateDue})</em> 
    - Priority: ${priority}
  `;
  
  li.setAttribute('data-priority', priority); // Store priority as a data attribute
  li.appendChild(editBtn); // Append the edit button to the list item
  li.appendChild(deleteBtn); // Append the delete button to the list item
  
  document.querySelector('#tasks').appendChild(li); // Add the list item to the tasks list
}

function handleDelete(e) {
  e.target.parentNode.remove(); // Remove the parent <li> of the button
}

function handleEdit(li, todo, user, duration, dateDue, priority) {
  document.querySelector('#new-task-description').value = todo;
  document.querySelector('#user').value = user;
  document.querySelector('#duration').value = duration;
  document.querySelector('#date-due').value = dateDue;
  document.querySelector('#priority').value = priority;
  
  li.remove();

}


function sortTasks(isAscending) {
  const tasks = document.querySelectorAll('#tasks li');
  const tasksArray = Array.from(tasks);
  
  tasksArray.sort((a, b) => {
    const priorityA = a.getAttribute('data-priority');
    const priorityB = b.getAttribute('data-priority');
    
    const priorityMap = { 'high': 1, 'medium': 2, 'low': 3 };
    
    if (isAscending) {
      return priorityMap[priorityA] - priorityMap[priorityB];
    } else {
      return priorityMap[priorityB] - priorityMap[priorityA];
    }
  });

  const taskList = document.querySelector('#tasks');
  taskList.innerHTML = '';
  
  tasksArray.forEach(task => {
    taskList.appendChild(task);
  });
}
