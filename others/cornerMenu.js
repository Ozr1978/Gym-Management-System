const cornerMenu = document.getElementById("corner-menu");
const menuToggle = document.getElementById("menuToggle");
const menuItems = document.querySelectorAll(".menu-item");
const menuDropdown = document.getElementById("menuDropdown");
const dashboardContainer = document.getElementById("main-dashboard");
const membersContainer = document.getElementById("membersPage");
const classesContainer = document.getElementById("classesPage");
const staffManagementContainer = document.getElementById("staffManagementPage");
const bodyElement = document.body;

menuToggle.addEventListener("click", () => {
  if (menuDropdown.hasAttribute("hidden"))
    menuDropdown.removeAttribute("hidden");
  else menuDropdown.setAttribute("hidden", "true");
});

menuItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const target = e.target.id;

    if (target === "dashboard") {
      dashboardContainer.removeAttribute("hidden");
      membersContainer.setAttribute("hidden", "true");
      classesContainer.setAttribute("hidden", "true");
      staffManagementContainer.setAttribute("hidden", "true");
    } else if (target === "members") {
      membersContainer.removeAttribute("hidden");
      dashboardContainer.setAttribute("hidden", "true");
      classesContainer.setAttribute("hidden", "true");
      staffManagementContainer.setAttribute("hidden", "true");
    } else if (target === "classes") {
      classesContainer.removeAttribute("hidden");
      dashboardContainer.setAttribute("hidden", "true");
      membersContainer.setAttribute("hidden", "true");
      staffManagementContainer.setAttribute("hidden", "true");
    } else if (target === "staffManagement") {
      staffManagementContainer.removeAttribute("hidden");
      dashboardContainer.setAttribute("hidden", "true");
      membersContainer.setAttribute("hidden", "true");
      classesContainer.setAttribute("hidden", "true");
    } else if (target === "logout") {
      sessionStorage.removeItem("current_user");
      location.reload();
    }
  });
});

bodyElement.addEventListener("click", (e) => {
  if (
    !menuDropdown.hasAttribute("hidden") &&
    !menuDropdown.contains(e.target) &&
    !menuToggle.contains(e.target) // ← changed
  ) {
    menuDropdown.setAttribute("hidden", "true");
  }
});
