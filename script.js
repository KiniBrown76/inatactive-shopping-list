document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearButton');
    const shoppingList = document.getElementById('shoppingList');
    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    function saveItems() {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    function renderItems() {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.textContent = item.text;
            if (item.purchased) {
                li.classList.add('purchased');
            }
            span.addEventListener('click', () => {
                item.purchased = !item.purchased;
                saveItems();
                renderItems();
            });

            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = item.text;
            editInput.classList.add('editable');
            editInput.style.display = 'none';

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                if (editInput.style.display === 'none') {
                    span.style.display = 'none';
                    editInput.style.display = 'inline';
                } else {
                    span.style.display = 'inline';
                    editInput.style.display = 'none';
                    item.text = editInput.value;
                    saveItems();
                    renderItems();
                }
            });

            li.appendChild(span);
            li.appendChild(editInput);
            li.appendChild(editButton);
            shoppingList.appendChild(li);
        });
    }

    addButton.addEventListener('click', () => {
        if (itemInput.value.trim() !== '') {
            const newItem = {
                text: itemInput.value,
                purchased: false
            };
            items.push(newItem);
            saveItems();
            renderItems();
            itemInput.value = '';
        }
    });

    clearButton.addEventListener('click', () => {
        items = [];
        saveItems();
        renderItems();
    });

    renderItems();
});
