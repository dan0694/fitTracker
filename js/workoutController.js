let workoutArray = [];
let numberOfExcercises = 0;
let storageIndex = localStorage.getItem('index') | 0;

showWorkout();
const input = document.getElementById('search');
input.addEventListener('input', searchworkout);


// Carga el listado de rutinas en localstorage a DOM
function showWorkout() {
    let workouts = getWorkouts();
    if (workouts[0]) {
        workouts.forEach(workout => {
            addPanel(workout);
        });
    }

}

// Consigue las rutinas de localstorage
function getWorkouts() {
    let workouts = [];
    for (let index = 0; index < storageIndex; index++) {
        let workout = JSON.parse(localStorage.getItem('workout-' + index));
        if (workout) {
            workouts.push(workout);
        }
    }
    return workouts;
}


// Carga el formulario para agregar una nueva rutina
function createWorkout() {
    let div = document.querySelector('#newWorkout');
    div.innerHTML = `
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <form id="workoutForm">
                <div class="mb-3">
                    <label for="workoutTitle" class="form-label">Título de la rutina</label>
                    <input type="text" class="form-control" id="workoutTitle"
                        aria-describedby="workoutTitleHelp">
                    <div id="workoutTitleHelp" class="form-text ">Ingresa un nombre descriptivo para esta
                        rutina.</div>
                </div>
                <div class="mb-3">
                    <label for="">Para agregar ejercicios, presiona el botón "+"</label>
                    <button type="button" onclick="addExercise()" class="btn btn-dark ms-3">+</button>
                    <div id="exercises" class="mt-2">
                    </div>
                </div>
                <div class="text-center">
                    <button type="button" onclick="addWorkout()" class="btn btn-dark ms-3">Agregar</button>
                </div>
                
            </form>
        </div>
    </div>
    `;

}

// Agrega un input para agregar mas ejericios en el formulario
function addExercise() {
    numberOfExcercises++;
    let div = document.querySelector('#exercises');
    let input = document.createElement('div');
    input.innerHTML = `
    <div class="input-group mb-3" id="exercise-${numberOfExcercises}">
        <input type="text" id="input-exercise-${numberOfExcercises}" class="form-control" placeholder="Agrega un ejercicio" aria-label="Recipient's username" aria-describedby="button-remove-${numberOfExcercises}">
        <button class="btn btn-outline-dark" type="button" id="button-remove-${numberOfExcercises}" onclick="removeExercise(${numberOfExcercises})">x</button>
    </div>
    `;
    div.appendChild(input);

}

// Elimina un ejercicio del formualrio
function removeExercise(id) {
    document.querySelector('#exercise-' + id).remove();
}

// Crea el objeto workout a partir del formulario y llama al metodo que lo agrega al addPanel
function addWorkout() {
    let title = document.querySelector('#workoutTitle').value;
    for (let index = 0; index <= numberOfExcercises; index++) {
        let exerciseInput = document.querySelector('#input-exercise-' + index);
        if (exerciseInput) {
            let exercise = new Exercise(exerciseInput.value, 1, 1);
            workoutArray.push(exercise);
        }
    }
    let workout = new Workout(storageIndex, title, workoutArray);
    localStorage.setItem('workout-' + storageIndex, JSON.stringify(workout));
    storageIndex++;
    localStorage.setItem('index', storageIndex);
    workoutArray = [];
    addPanel(workout);
    removeForm();
}
// elimina el formulario
function removeForm(){
    let div = document.querySelector('#newWorkout');
    div.replaceChildren();
}

// Carga una rutina como un card en el DOM
function addPanel(workout) {
    let workoutDiv = document.getElementById('workout');
    let card = document.createElement("div");
    card.setAttribute('id', 'card-'+workout.title);
    card.classList.add('card', 'my-5', 'col-md-4');

    let header = document.createElement('div');
    header.classList.add('card-header');
    header.innerHTML = workout.title;
    card.appendChild(header);

    let body = document.createElement('div');
    body.classList.add('card-body');

    for (let i = 0; i < workout.exercises.length; i++) {
        let p = document.createElement('p');

        p.classList.add('card-text', workout.exercises[i].name.replaceAll(' ', '-'));
        p.innerHTML = workout.exercises[i].name;
        body.appendChild(p)
    }
    let footer = document.createElement('div');
    footer.classList.add('card-footer');

    let button = document.createElement('div');
    button.classList.add('text-center');
    button.innerHTML = `
        <button onclick="removeWorkout('${workout.title}')" class="btn btn-danger">Eliminar</button>
    `;
    footer.appendChild(button)
    card.appendChild(body);
    card.appendChild(footer);
    workoutDiv.appendChild(card);

}


// Filtra coincidencias en base al ejercicio del input
function searchworkout(e) {
    let workouts = getWorkouts();
    let key = e.target.value;
    for (const workout of workouts) {
        for (const exercise of workout.exercises) {
            let div = document.querySelector('.'+exercise.name.replaceAll(' ', '-'));
            if(exercise.name.includes(key) && key != ''){
                div.style.backgroundColor = '#78dede';
            } else if(key === ''){
                let li = document.querySelectorAll('p');
                for (const listItem of li) {
                    listItem.style.backgroundColor = "white"
                }
            } else{
                div.style.backgroundColor = 'white';
            }
        }
    }
}

// Elimina una rutina del DOM y de localStorage
function removeWorkout(title){
    let div = document.querySelector('#card-'+title);
    div.remove();
    let workouts = getWorkouts();
    for (const workout of workouts) {
        if(workout.title === title){
            localStorage.removeItem('workout-'+workout.id);
        }
    }
}
