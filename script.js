document.getElementById('addItem').addEventListener('click', function() {
    const userInput = document.getElementById('userInput');
    const newItem = userInput.value;
    if (newItem) {
        const li = document.createElement('li');
        li.textContent = newItem;
        document.getElementById('myList').appendChild(li);
        userInput.value = '';
    }
});