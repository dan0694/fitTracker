let workoutArray = [];


function createWorkout(){
    let excercises = [];
    let title = prompt("Agrega un título a esta rutina");
    let flag = confirm("Desea agregar un nuevo ejercicio a la rutina?");
    do {
        excercises.push(prompt("Ingrese el ejercicio"))
        flag = confirm("Desea agregar un nuevo ejercicio a la rutina?");
    } while (flag);

    workoutArray.push(excercises)
    addPanel(title, excercises);

}

function addPanel(title, excercises){
    let workout = document.getElementById('workout');
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    h2.innerHTML = title;
    div.append(h2);
    let ul = document.createElement("ul");
    ul.setAttribute("id", title);

    for (let i = 0; i < excercises.length; i++) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(excercises[i]));
        li.setAttribute('class', excercises[i])
        ul.appendChild(li);
    }
    div.appendChild(ul);
    let button = document.createElement("div");
    // button.innerHTML = `
    // <button  onclick="addExercise(${title})">Agrega más ejercicios</button>
    // `;
    // div.appendChild(button);
    workout.appendChild(div);

}

const input = document.getElementById('search');
input.addEventListener('input', searchworkout);

function searchworkout(e){
    let key = e.target.value;
    for (const workout of workoutArray) {
        if(workout.includes(key)){
            let results = document.getElementsByClassName(key);
            for (const listItem of results) {
                listItem.style.backgroundColor = "yellow"
            }
        }
    }

    if (key === '') {
        let li = document.querySelectorAll('li');
        for (const listItem of li) {
            listItem.style.backgroundColor = "white"
        }
    }
}


// function addExercise(title){
//     let flag = confirm("Desea agregar un nuevo ejercicio a la rutina?");
//     do {
//         excercises.push(prompt("Ingrese el ejercicio"))
//         flag = confirm("Desea agregar un nuevo ejercicio a la rutina?");
//     } while (flag);

//     console.log(title);
// }