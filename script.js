function loadClassData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            classData = data;
            displayClasses();
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
}

function displayClasses() {
    const scheduleContainer = document.getElementById('class-schedule');
    scheduleContainer.innerHTML = '';

    classData.forEach(classItem => {
        const classCard = document.createElement('div');
        classCard.className = 'class-card';
        classCard.innerHTML = `
            <h3>${classItem.name}</h3>
            <p>Время: ${classItem.time}</p>
            <p>Максимальное количество участников: ${classItem.maxParticipants}</p>
            <p>Текущее количество участников: <span id="participants-${classItem.id}">${classItem.currentParticipants}</span></p>
            <button class="signup" id="signup-${classItem.id}" ${classItem.currentParticipants >= classItem.maxParticipants ? 'disabled' : ''}>Записаться</button>
            <button class="cancel" id="cancel-${classItem.id}">Отменить запись</button>
        `;
        scheduleContainer.appendChild(classCard);

        document.getElementById(`signup-${classItem.id}`).addEventListener('click', () => signUp(classItem.id));
        document.getElementById(`cancel-${classItem.id}`).addEventListener('click', () => cancelSignUp(classItem.id));
    });
}

function signUp(classId) {
    const classItem = classData.find(item => item.id === classId);
    if (classItem.currentParticipants < classItem.maxParticipants) {
        classItem.currentParticipants += 1;
        document.getElementById(`participants-${classId}`).innerText = classItem.currentParticipants;
        if (classItem.currentParticipants >= classItem.maxParticipants) {
            document.getElementById(`signup-${classId}`).disabled = true;
        }
    }
}


function cancelSignUp(classId) {
    const classItem = classData.find(item => item.id === classId);
    if (classItem.currentParticipants > 0) {
        classItem.currentParticipants -= 1;
        document.getElementById(`participants-${classId}`).innerText = classItem.currentParticipants;
        if (classItem.currentParticipants < classItem.maxParticipants) {
            document.getElementById(`signup-${classId}`).disabled = false;
        }
    }
}

let classData = [];
window.onload = loadClassData;