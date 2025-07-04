function login() {
  const correctPin = "1720";
  const inputPin = document.getElementById("pin").value;
  const errorMsg = document.getElementById("error");

  if (inputPin === correctPin) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    errorMsg.textContent = "Incorrect PIN. Try again!";
  }
}