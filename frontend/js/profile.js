// frontend/js/profile.js

const CLIENTS_API = "http://localhost:5000/api/clients";
const PROGRAMS_API = "http://localhost:5000/api/programs";
const token = localStorage.getItem('token');

let selectedClientId = null;

// Fetch all clients for selection
async function fetchClients() {
    try {
        const response = await fetch(CLIENTS_API, {
            headers: { 'Authorization': token }
        });
        const clients = await response.json();

        const clientSelect = document.getElementById('clientSelect');
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = client.name + ` (Age: ${client.age})`;
            clientSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

// Fetch all programs for enrollment
async function fetchPrograms() {
    try {
        const response = await fetch(PROGRAMS_API, {
            headers: { 'Authorization': token }
        });
        const programs = await response.json();

        const programSelect = document.getElementById('programSelect');
        programSelect.innerHTML = '';
        programs.forEach(program => {
            const option = document.createElement('option');
            option.value = program.id;
            option.textContent = program.name;
            programSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

// Fetch and display selected client's profile
async function fetchProfile(clientId) {
    try {
        const response = await fetch(`${CLIENTS_API}/${clientId}`, {
            headers: { 'Authorization': token }
        });
        const client = await response.json();

        const profileDiv = document.getElementById('profile');
        profileDiv.innerHTML = `
            <div class="card shadow">
                <div class="card-body">
                    <h3 class="card-title">${client.name}</h3>
                    <p><strong>Age:</strong> ${client.age}</p>
                    <p><strong>Gender:</strong> ${client.gender}</p>
                    <p><strong>Registered At:</strong> ${new Date(client.created_at).toLocaleString()}</p>
                    
                    <h4 class="mt-4">Enrolled Programs</h4>
                    <ul class="list-group">
                        ${client.enrolledPrograms.length > 0 
                            ? client.enrolledPrograms.map(p => `<li class="list-group-item">${p.name} (Enrolled at: ${new Date(p.enrolled_at).toLocaleString()})</li>`).join('')
                            : '<li class="list-group-item">No programs enrolled yet.</li>'
                        }
                    </ul>
                </div>
            </div>
        `;

        // Show the enroll section now
        document.getElementById('enrollSection').style.display = 'block';
    } catch (error) {
        console.error(error);
    }
}

// Handle selecting a client
document.getElementById('clientSelectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    selectedClientId = document.getElementById('clientSelect').value;
    fetchProfile(selectedClientId);
    fetchPrograms();
});

// Handle enrolling client into program
document.getElementById('enrollForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!selectedClientId) {
        Swal.fire({
            icon: 'warning',
            title: 'Please select a client first!',
            confirmButtonColor: '#3085d6'
        });
        return;
    }
    const programId = document.getElementById('programSelect').value;

    try {
        const response = await fetch(`${CLIENTS_API}/${selectedClientId}/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ programId })
        });

        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Enrolled Successfully!',
                text: 'Client has been enrolled into the program.',
                confirmButtonColor: '#3085d6'
            });
            fetchProfile(selectedClientId); // Refresh profile
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: data.message || 'Enrollment failed.',
                confirmButtonColor: '#d33'
            });
        }
    } catch (error) {
        console.error(error);
    }
});

// Initial load
fetchClients();
