function menuOnClick() {
  document.getElementById("nav-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("navbar-bg").classList.toggle("change-bg");
}
$(document).ready(function () {
  $("#deep-footer").load("footer.html");
});
