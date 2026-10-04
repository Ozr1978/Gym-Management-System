const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginContainer = document.getElementById("login-container");
const mainDashboard = document.getElementById("main-dashboard");
const cornerMenu = document.getElementById("corner-menu");
const classesPage = document.getElementById("classesPage");
const role = JSON.parse(sessionStorage.getItem("current_user")) || null;

function renderCoachLogout() {
  const role = JSON.parse(sessionStorage.getItem("current_user")) || null;
  if (role !== "Coach" || document.getElementById("coach-logout")) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="corner-menu" id="coach-menu">
      <button class="menu-item" id="coach-logout">Log out</button>
    </div>
  `,
  );

  document.getElementById("coach-logout").addEventListener("click", () => {
    sessionStorage.removeItem("current_user");
    sessionStorage.removeItem("current_user_name");
    location.reload();
  });
}

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
  if (user && user.role !== "Coach") {
    loginContainer.setAttribute("hidden", "true");
    mainDashboard.removeAttribute("hidden");
    cornerMenu.removeAttribute("hidden");
    sessionStorage.setItem("current_user", JSON.stringify(user.role));
  } else if (user && user.role === "Coach") {
    loginContainer.setAttribute("hidden", "true");
    classesPage.removeAttribute("hidden");
    sessionStorage.setItem("current_user", JSON.stringify(user.role));
    sessionStorage.setItem("current_user_name", JSON.stringify(user.username));
    renderCoachLogout();
  } else {
    alert("Invalid username or password");
    usernameInput.value = "";
    passwordInput.value = "";
  }
});

if (role) {
  if (role !== "Coach") {
    loginContainer.setAttribute("hidden", "true");
    mainDashboard.removeAttribute("hidden");
    cornerMenu.removeAttribute("hidden");
  } else {
    loginContainer.setAttribute("hidden", "true");
    classesPage.removeAttribute("hidden");
    renderCoachLogout();
  }
}

renderCoachLogout();
