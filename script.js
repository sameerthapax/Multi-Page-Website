document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("addItem");
  const input = document.getElementById("userInput");
  const list = document.getElementById("myList");

  addButton.addEventListener("click", () => {
    const value = input.value.trim();
    if (value !== "") {
      const li = document.createElement("li");
      li.textContent = value;
      list.appendChild(li);
      input.value = "";
    }
  });
});