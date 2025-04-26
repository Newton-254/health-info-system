// frontend/js/program.js
const PROGRAM_API = "http://localhost:5000/api/programs";
const token = localStorage.getItem('token');

// Create new program
document.getElementById('programForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('programName').value;

    const response = await fetch(PROGRAM_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ name })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Program created!');
        document.getElementById('programForm').reset();
        fetchPrograms();
    } else {
        alert(data.message);
    }
});

// Fetch all programs
async function fetchPrograms() {
    const response = await fetch(PROGRAM_API, {
        headers: { 'Authorization': token }
    });
    const programs = await response.json();

    const list = document.getElementById('programList');
    list.innerHTML = '';

    programs.forEach(program => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = program.name;
        list.appendChild(li);
    });
}

// Load programs on page load
fetchPrograms();
