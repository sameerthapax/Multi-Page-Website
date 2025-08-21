// script.js — activates features only if the page has the matching container

document.addEventListener('DOMContentLoaded', () => {
    initDynamicList();   // activates on #dynamic page if present
    initContactsList();  // activates on #contacts page if present
});

/* ========== Dynamic Page (existing) ========== */
function initDynamicList(){
    const wrap = document.getElementById('dynamic');
    if (!wrap) return;

    const KEY = 'myListItems:v1';
    const input = document.getElementById('userInput');
    const addBtn = document.getElementById('addItem');
    const delBtn = document.getElementById('deleteItem');
    const listEl = document.getElementById('myList');
    const countNote = document.getElementById('countNote');

    if(!input || !addBtn || !delBtn || !listEl) return;

    let items = load(KEY);
    let selected = new Set();

    render();

    addBtn.addEventListener('click', addItem);
    input.addEventListener('keydown', e => { if(e.key === 'Enter') addItem(); });
    delBtn.addEventListener('click', deleteSelected);
    document.addEventListener('keydown', e => {
        if((e.key === 'Delete' || e.key === 'Backspace') && selected.size > 0 && document.activeElement !== input){
            e.preventDefault(); deleteSelected();
        }
    });

    function addItem(){
        const value = (input.value || '').trim();
        if(!value){ input.focus(); return; }
        items.push(value);
        save(KEY, items);
        input.value = '';
        render();
    }

    function deleteSelected(){
        if(selected.size === 0) return;
        items = items.filter((_, idx) => !selected.has(idx));
        selected.clear();
        save(KEY, items);
        render();
    }

    function onItemClick(idx){
        selected.has(idx) ? selected.delete(idx) : selected.add(idx);
        updateSelectionState();
    }

    function updateSelectionState(){
        [...listEl.children].forEach((li, i) => {
            li.classList.toggle('selected', selected.has(i));
            li.setAttribute('aria-selected', selected.has(i) ? 'true' : 'false');
        });
        delBtn.disabled = selected.size === 0;
        const total = items.length, sel = selected.size;
        countNote.textContent = total === 0 ? 'Your list is empty. Add the first item!' : `${total} item${total>1?'s':''} • ${sel} selected`;
    }

    function render(){
        listEl.innerHTML = '';
        items.forEach((text, idx) => {
            const li = document.createElement('li');
            li.setAttribute('role', 'option');
            li.appendChild(dot());
            li.appendChild(document.createTextNode(text));
            li.addEventListener('click', () => onItemClick(idx));
            listEl.appendChild(li);
        });
        updateSelectionState();
    }
}

/* ========== Contacts Page (new) ========== */
function initContactsList(){
    const wrap = document.getElementById('contacts');
    if (!wrap) return;

    const KEY = 'contacts:v1';
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const addBtn = document.getElementById('addContact');
    const delBtn = document.getElementById('deleteContact');
    const listEl = document.getElementById('contactList');
    const countNote = document.getElementById('contactCountNote');

    if(!nameInput || !addBtn || !delBtn || !listEl) return;

    let contacts = load(KEY);             // [{name, email}]
    let selected = new Set();             // indices

    render();

    addBtn.addEventListener('click', addContact);
    nameInput.addEventListener('keydown', e => { if(e.key === 'Enter') addContact(); });
    emailInput.addEventListener('keydown', e => { if(e.key === 'Enter') addContact(); });
    delBtn.addEventListener('click', deleteSelected);

    document.addEventListener('keydown', e => {
        const active = document.activeElement;
        const typing = active === nameInput || active === emailInput;
        if((e.key === 'Delete' || e.key === 'Backspace') && selected.size > 0 && !typing){
            e.preventDefault(); deleteSelected();
        }
    });

    function addContact(){
        const name = (nameInput.value || '').trim();
        const email = (emailInput.value || '').trim();
        if(!name){ nameInput.focus(); return; }

        contacts.push({ name, email });
        save(KEY, contacts);
        nameInput.value = '';
        emailInput.value = '';
        nameInput.focus();
        render();
    }

    function deleteSelected(){
        if(selected.size === 0) return;
        contacts = contacts.filter((_, idx) => !selected.has(idx));
        selected.clear();
        save(KEY, contacts);
        render();
    }

    function onItemClick(idx){
        selected.has(idx) ? selected.delete(idx) : selected.add(idx);
        updateSelectionState();
    }

    function updateSelectionState(){
        [...listEl.children].forEach((li, i) => {
            const sel = selected.has(i);
            li.classList.toggle('selected', sel);
            li.setAttribute('aria-selected', sel ? 'true' : 'false');
        });
        delBtn.disabled = selected.size === 0;

        const total = contacts.length, sel = selected.size;
        countNote.textContent = total === 0
            ? 'No contacts yet. Add your first contact!'
            : `${total} contact${total>1?'s':''} • ${sel} selected`;
    }

    function render(){
        listEl.innerHTML = '';
        contacts.forEach((c, idx) => {
            const li = document.createElement('li');
            li.setAttribute('role', 'option');

            const name = document.createElement('div');
            name.className = 'contact-name';
            name.textContent = c.name;

            const email = document.createElement('div');
            email.className = 'contact-email';
            email.textContent = c.email || '';

            li.appendChild(dot());
            const wrapper = document.createElement('div');
            wrapper.appendChild(name);
            if (c.email) wrapper.appendChild(email);
            li.appendChild(wrapper);

            li.addEventListener('click', () => onItemClick(idx));
            listEl.appendChild(li);
        });
        updateSelectionState();
    }
}

/* ========== Shared small utils ========== */
function load(key){
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : []; }
    catch { return []; }
}
function save(key, val){
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function dot(){
    const d = document.createElement('span');
    d.className = 'dot';
    return d;
}