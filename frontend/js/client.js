// frontend/js/client.js
const API_URL = "http://localhost:5000/api/clients";
const token = localStorage.getItem('token');

// Add new client
document.getElementById('clientForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ name, age, gender })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Client added successfully!');
        document.getElementById('clientForm').reset();
    } else {
        alert(data.message);
    }
});

// Search clients
document.getElementById('searchBtn').addEventListener('click', async () => {
    const name = document.getElementById('searchInput').value;

    const response = await fetch(`${API_URL}/search?name=${name}`, {
        headers: { 'Authorization': token }
    });

    const clients = await response.json();

    const list = document.getElementById('clientList');
    list.innerHTML = '';

    clients.forEach(client => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<a href="profile.html?id=${client.id}">${client.name} (Age: ${client.age}, Gender: ${client.gender})</a>`;
        list.appendChild(li);
    });
});
