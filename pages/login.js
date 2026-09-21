const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginContainer = document.getElementById("login-container");
const mainDashboard = document.getElementById("main-dashboard");
const cornerMenu = document.getElementById("corner-menu");
const classesPage = document.getElementById("classesPage");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  const allSystemsUsers =
    JSON.parse(localStorage.getItem("allSystemsUsers")) || [];

  const username = data.get("username");
  const password = data.get("password");

  const user = allSystemsUsers.find(
    (user) => user.username === username && user.password === password,
  );
  if (user && user.role !== "trainer") {
    loginContainer.setAttribute("hidden", "true");
    mainDashboard.removeAttribute("hidden");
    cornerMenu.removeAttribute("hidden");
    sessionStorage.setItem("current_user", JSON.stringify(user.role));
  } else if (user && user.role === "trainer") {
    loginContainer.setAttribute("hidden", "true");
    classesPage.removeAttribute("hidden");
    sessionStorage.setItem("current_user", JSON.stringify(user.role));
  } else {
    alert("Invalid username or password");
    usernameInput.value = "";
    passwordInput.value = "";
  }
});
