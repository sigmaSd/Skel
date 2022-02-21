function start() {
  const btn = document.createElement("button");
  btn.onclick = () => {
    alert("hello");
  };
  btn.textContent = "Say Hello";
  document.body.appendChild(btn);
}
window.onload = start;
