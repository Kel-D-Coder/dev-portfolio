 const navLinks = document.getElementById("nav-links");
  const openMenu = document.getElementById("open-menu");
  const closeMenu = document.getElementById("close-menu");

  openMenu.addEventListener("click", () => {
    navLinks.classList.add("show");
  });

  closeMenu.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });