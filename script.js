// --- DATA & INITIALIZATION ---
let patients = JSON.parse(localStorage.getItem('patients')) || [];
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

// Simulated Database of Doctors
const doctors = [
    { name: "Dr. Sarah Smith", specialty: "Cardiology", status: "Available" },
    { name: "Dr. James Omondi", specialty: "Pediatrics", status: "In Surgery" },
    { name: "Dr. Emily Blunt", specialty: "General Medicine", status: "Available" },
    { name: "Dr. Mark Zua", specialty: "Dentist", status: "On Leave" }
];

document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    renderPatients();
    renderAppointments();
    populatePatientSelect();
    
    // Load Doctors & Services
    renderDoctors(); 
    populateDoctorSelect();
});

// --- NAVIGATION ---
function showSection(sectionId, linkElement) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
    if(linkElement) linkElement.classList.add('active');
}

// --- PATIENT MANAGEMENT ---
document.getElementById('patientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('pName').value;
    const age = document.getElementById('pAge').value;
    const contact = document.getElementById('pContact').value;
    const gender = document.getElementById('pGender').value;

    if(age < 0) { alert("Age cannot be negative!"); return; }

    const newPatient = { id: patients.length + 101, name, age, contact, gender };
    patients.push(newPatient);
    saveData();
    
    this.reset();
    renderPatients();
    populatePatientSelect();
    updateDashboard();
    alert("Patient Registered Successfully!");
});

function renderPatients() {
    const tbody = document.querySelector('#patientTable tbody');
    tbody.innerHTML = '';
    patients.forEach(p => {
        const row = `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.age}</td><td>${p.contact}</td><td>${p.gender}</td></tr>`;
        tbody.innerHTML += row;
    });
}

// --- DOCTOR & APPOINTMENT LOGIC ---
function renderDoctors() {
    const grid = document.getElementById('doctor-grid');
    grid.innerHTML = ''; 

    doctors.forEach(doc => {
        const card = `
            <div class="card" style="border-left-color: #6610f2;">
                <h3>👨‍⚕️</h3>
                <p><strong>${doc.name}</strong></p>
                <p style="font-size: 0.9em; color: #666;">${doc.specialty}</p>
                <br>
                <span class="status ${doc.status === 'Available' ? 'confirmed' : 'pending'}">${doc.status}</span>
            </div>
        `;
        grid.innerHTML += card;
    });
}

function populatePatientSelect() {
    const select = document.getElementById('apptPatient');
    select.innerHTML = '<option value="">-- Choose Patient --</option>';
    patients.forEach(p => {
        const option = document.createElement('option');
        option.value = p.name;
        option.textContent = `${p.name} (ID: ${p.id})`;
        select.appendChild(option);
    });
}

function populateDoctorSelect() {
    const select = document.getElementById('apptDoctor');
    select.innerHTML = '<option value="">-- Choose Doctor --</option>';
    doctors.forEach(doc => {
        if(doc.status !== 'On Leave') { 
            const option = document.createElement('option');
            option.value = doc.name;
            option.textContent = `${doc.name} (${doc.specialty})`;
            select.appendChild(option);
        }
    });
}

document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const patientName = document.getElementById('apptPatient').value;
    const date = document.getElementById('apptDate').value;
    const doctor = document.getElementById('apptDoctor').value;

    const newAppt = { patientName, doctor, date, status: 'Confirmed' };
    appointments.push(newAppt);
    saveData();

    this.reset();
    renderAppointments();
    updateDashboard();
    alert("Appointment Booked!");
});

function renderAppointments() {
    const tbody = document.querySelector('#apptTable tbody');
    tbody.innerHTML = '';
    appointments.forEach(a => {
        const row = `<tr><td>${a.patientName}</td><td>${a.doctor}</td><td>${a.date}</td><td><span class="status confirmed">${a.status}</span></td></tr>`;
        tbody.innerHTML += row;
    });
}

// --- CONTACT FORM LOGIC ---
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Message Sent! We will contact you shortly.");
    this.reset();
});

// --- UTILITY ---
function saveData() {
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

function updateDashboard() {
    document.getElementById('total-patients').textContent = patients.length;
    document.getElementById('total-appointments').textContent = appointments.length;
    document.getElementById('total-doctors').textContent = doctors.filter(d => d.status === 'Available').length;
}