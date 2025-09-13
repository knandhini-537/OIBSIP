
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
function signup() {
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const message = document.getElementById("signup-message");
  if (!username || !password) {
    message.textContent = "❌ Please fill all fields!";
    message.className = "error";
    return;
  }

  let users = getUsers();
  if (users.find(user => user.username === username)) {
    message.textContent = "❌ Username already exists!";
    message.className = "error";
    return;
  }
  users.push({ username, password });
  saveUsers(users);
  message.textContent = "✅ Account created successfully! Redirecting...";
  message.className = "success";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}
function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const message = document.getElementById("login-message");
  if (!username || !password) {
    message.textContent = "❌ Please fill all fields!";
    message.className = "error";
    return;
  }
  let users = getUsers();
  let user = users.find(u => u.username === username && u.password === password);

  if (user) {
    sessionStorage.setItem("loggedInUser", username);
    message.textContent = "✅ Login successful! Redirecting...";
    message.className = "success";

    setTimeout(() => {
      window.location.href = "welcome.html";
    }, 1200);
  } else {
    message.textContent = "❌ Invalid username or password!";
    message.className = "error";
  }
}
window.onload = function () {
  const welcomeMsg = document.getElementById("welcome-msg");
  if (welcomeMsg) {
    const user = sessionStorage.getItem("loggedInUser");
    if (!user) {
      window.location.href = "login.html";
    } else {
      welcomeMsg.textContent = `🎉 ${user} Welcome to Oasis InfoByte Task(Login Authentication)!`;
    }
  }
};
function logout() {
  const user = sessionStorage.getItem("loggedInUser");

  if (user) {
    let users = getUsers().filter(u => u.username !== user);
    saveUsers(users);
  }

  sessionStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
