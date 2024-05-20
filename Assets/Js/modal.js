var modal = document.getElementById("loginModal");
var closeButton = document.getElementsByClassName("close")[0];
var introTitle = document.querySelector(".intro__title");

window.onload = function() {
  modal.style.display = "block";
}

closeButton.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); 
  var username = document.getElementById("username").value;
  
  introTitle.textContent = "Вітаємо " + username + " на сайті!";
  
  modal.style.display = "none";
});