console.log('Showtec site loaded');

//--------PAGE TRANSITION
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