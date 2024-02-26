
const deleteTask = document.getElementById('delete')
const task = document.getElementById('message-input');
const sendMsg = document.getElementById('send-message');
const user = document.getElementById('username-input');
const sendUser = document.getElementById('send-username');
const displayMsg = document.getElementById('display-message');
const typingLabel = document.getElementById('typing-label');
const chatWindow = document.getElementById('chat-window');
const usersCounter = document.getElementById('users-counter');
const msgErr = document.getElementById('message-error');
const userErr = document.getElementById('username-error');
const join = document.getElementById('you-joined');
const chat = document.getElementById('chat');
const login = document.getElementById('login-page');


sendUser.addEventListener('click', () => {
  if (user.value === null || user.value.trim().length === 0) {
    userErr.innerHTML = 'Input your name';
    return;
  }

  userErr.innerHTML = '';
  login.style.display = 'none';
  chat.style.display = 'block';
  join.innerHTML = '<p>You have joined the chat!<p>';
});

deleteTask.addEventListener('click', () => {
  fetch("https://communal-jaybird-69.hasura.app/api/rest/delete-todos", {
      headers: {
        "x-hasura-access-key":
          "Lh5FtTEIzpGcC4nWQudYRDomc8bn5mYcIAsIQMh5jkLboRHbcWMlfpvohrOEuWFn",
      },
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => {
       console.log("sdsdasdasd");
       const chatWindow = document.getElementById("chat-window");
       chatWindow.innerHTML ='';
    });
});

sendMsg.addEventListener('click', () => {
  if (task.value === null || task.value.trim().length === 0) {
    msgErr.innerHTML = '🚨 Message is required!';
    return;
  }

  const newTask = {
    username: user.value,
    task: task.value,
  }

  fetch("https://communal-jaybird-69.hasura.app/api/rest/createtodos", {
      headers: {
        "x-hasura-access-key":
          "Lh5FtTEIzpGcC4nWQudYRDomc8bn5mYcIAsIQMh5jkLboRHbcWMlfpvohrOEuWFn",
      },
      method: "POST",
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then(() => {
        const chatWindow = document.getElementById("chat-window");
        const newMessageElement = document.createElement("p");
        newMessageElement.innerHTML = `<strong>${user.value}</strong> at ${new Date().getHours()}:${new Date().getMinutes()} : ${task.value}`;
        chatWindow.appendChild(newMessageElement);
      
        chatWindow.scrollTop = chatWindow.scrollHeight;
      
        task.value = '';
        msgErr.innerHTML = '';
    });
});

task.addEventListener('keypress', () => {
});

const tasksToRender = [];
const renderTasksAndUpdateChat = (tasks) => {
  const chatWindow = document.getElementById("chat-window");

  chatWindow.innerHTML = "";

  tasks.reverse();

  tasks.forEach((task) => {
    const taskElement = document.createElement("p");
    taskElement.innerHTML = `<strong>${task.username}</strong> at ${new Date(task.created_at).getHours()}:${new Date(task.created_at).getMinutes()} : ${task.task}`;
    chatWindow.appendChild(taskElement);
  });


  chatWindow.scrollTop = chatWindow.scrollHeight;
};

window.addEventListener("load", () => {
  fetch("https://communal-jaybird-69.hasura.app/api/rest/todos_test", {
    headers: {
      "x-hasura-access-key":
        "Lh5FtTEIzpGcC4nWQudYRDomc8bn5mYcIAsIQMh5jkLboRHbcWMlfpvohrOEuWFn",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderTasksAndUpdateChat(data.todos);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
