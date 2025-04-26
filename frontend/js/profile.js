// frontend/js/profile.js
const urlParams = new URLSearchParams(window.location.search);
const clientId = urlParams.get('id');
const CLIENT_API = `http://localhost:5000/api/clients/${clientId}`;
const PROGRAM_API = "http://localhost:5000/api/programs";
const token = localStorage.getItem('token');

// Fetch client profile
async function fetchProfile() {
    const response = await fetch(CLIENT_API, {
        headers: { 'Authorization': token }
    });
    const client = await response.json();

    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = `
        <p><strong>Name:</strong> ${client.name}</p>
        <p><strong>Age:</strong> ${client.age}</p>
        <p><strong>Gender:</strong> ${client.gender}</p>
        <p><strong>Registered At:</strong> ${client.created_at}</p>

        <h4 class="mt-3">Enrolled Programs</h4>
        <ul>${client.enrolledPrograms.map(p => `<li>${p.name} (Enrolled: ${p.enrolled_at})</li>`).join('')}</ul>
    `;
}

// Fetch programs for enrolling
async function fetchPrograms() {
    const response = await fetch(PROGRAM_API, {
        headers: { 'Authorization': token }
    });
    const programs = await response.json();

    const select = document.getElementById('programSelect');
    programs.forEach(program => {
        const option = document.createElement('option');
        option.value = program.id;
        option.textContent = program.name;
        select.appendChild(option);
    });
}

// Enroll client to a program
document.getElementById('enrollForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const programId = document.getElementById('programSelect').value;

    const response = await fetch(`${CLIENT_API}/enroll`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ programId })
    });

    if (response.ok) {
        alert('Client enrolled successfully!');
        fetchProfile(); // Refresh profile
    } else {
        const data = await response.json();
        alert(data.message);
    }
});

// Initial load
fetchProfile();
fetchPrograms();
