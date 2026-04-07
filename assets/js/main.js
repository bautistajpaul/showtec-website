console.log('Showtec site loaded');

//-------------------------PAGE TRANSITION-------------------------
// Fade IN when page loads
window.addEventListener("load", () => {
document.body.classList.add("loaded");
});

// Fade OUT when clicking links
document.querySelectorAll("a").forEach(link => {
if (link.hostname === window.location.hostname) {
    link.addEventListener("click", function(e) {
    e.preventDefault();
    const href = this.href;

    document.body.classList.remove("loaded");

    setTimeout(() => {
        window.location = href;
    }, 300); // match CSS duration
    });
}
});

//-------------------------NAV BAR-------------------------
// adding active class
  const links = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });