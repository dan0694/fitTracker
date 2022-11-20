setForm();
showProfile();

function setForm() {
    let container = document.querySelector("#container");
    container.innerHTML = `
    <h1>Perfil de usuario</h1>
    <p class="fs-6">Por favor, ingrese sus datos</p>
    <form action="#">
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="userName" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="userName" aria-describedby="userNameHelp">
            </div>
            <div class="col-md-6 mb-3">
                <label for="userAge" class="form-label">Edad</label>
                <input type="number" class="form-control" id="userAge" aria-describedby="userAgeHelp">
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="userHeight" class="form-label">Altura</label>
                <input type="number" class="form-control" id="userHeight" aria-describedby="userHeightHelp">
                <div id="userHeightHelp" class="form-text">Favor, ingrese su altura en centímetros</div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="userWeight" class="form-label">Peso</label>
                <input type="number" class="form-control" id="userWeight" aria-describedby="userWeightHelp">
                <div id="userWeightHelp" class="form-text">Favor, ingrese su peso en kilogramos</div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Genero</label>
                <select class="form-select" id="userGender" aria-label="Genero">
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
            </div>
            <div class="col-md-6 mb-3">
                <label for="">Actividad Física</label>
                <select class="form-select" id="userActivity" aria-label="actividad">
                    <option value="1">Sedentario (No hago actividad fisica)</option>
                    <option value="2">Ligeramente activo (Hago actividad física de 1 a 2 veces por semana)</option>
                    <option value="3">Activo (Hago actividad física de 3 a 4 veces por semana)</option>
                    <option value="4">Muy Activo (Hago actividad física de 4 a 6 veces por semana)</option>
                    <option value="5">Deportista Profesional</option>
                  </select>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <button class="btn btn-dark"  onclick="fillProfile()">Completar perfil</button>
            </div>
        </div>
    </form>
    <div id="info"></div>
    <div class="text-center mt-2">
        <button  class="btn btn-danger" onclick="deleteData()">Eliminar datos de usuario</button>
    </div>
    `;
}

// Carga los datos por primera vez
function showProfile() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        let profile = document.getElementById('info');
        profile.innerHTML = `
            <div class="info shadow m-2 rounded px-5 py-1">
                <h3 class="text-center">Información del usuario</h3>
                <p>Nombre: <span class="info-content"> ${user.name}</span></p>
                <p>Edad: <span class="info-content"> ${user.age}</span></p>
                <p>Altura: <span class="info-content"> ${user.height}</span></p>
                <p>Peso: <span class="info-content"> ${user.weight}</span></p>
                <p>Genero: <span class="info-content"> ${user.gender}</span></p>
            </div>
    `;
        document.querySelector('#userName').value = user.name;
        document.querySelector('#userAge').value = user.age;
        document.querySelector('#userHeight').value = user.height;
        document.querySelector('#userWeight').value = user.weight;
        document.querySelector('#userGender').value = user.gender;
        document.querySelector('#userActivity').value = user.activityIndicator;
    }
}

// Agrega los datos del form a localStorage
function fillProfile() {
    let name = document.querySelector('#userName').value;
    let age = parseInt(document.querySelector('#userAge').value);
    let height = parseInt(document.querySelector('#userHeight').value);
    let weight = parseInt(document.querySelector('#userWeight').value);
    let gender = (document.querySelector('#userGender').value);
    let activity = parseInt(document.querySelector('#userActivity').value);
    let user = new User(name, age, height, weight, gender, activity);
    localStorage.setItem('user', JSON.stringify(user));
    let profile = document.getElementById('info');
    profile.innerHTML = `
        <h3>Información del usuario</h3>
        <p>Nombre: ${user.name}</p>
        <p>Edad: ${user.age}</p>
        <p>Altura: ${user.height}</p>
        <p>Peso: ${user.weight}</p>
        <p>Genero: ${user.gender}</p>
    `;
    setAlert("Se han actualizado tus datos");
}

// Despliega confirmación de borrar
function deleteData() {
    swal({
        title: 'Seguro que desea eliminar la información?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.value) {
            clear();
        }
    });

}
// Eliminamos los datos del usuario
function clear() {
    localStorage.removeItem("user");
    let profile = document.getElementById('info');
    profile.innerHTML = ``;
    document.querySelector('#userName').value = "";
    document.querySelector('#userAge').value = "";
    document.querySelector('#userHeight').value = "";
    document.querySelector('#userWeight').value = "";
    document.querySelector('#userGender').value = "";
    document.querySelector('#userActivity').value = "";
    setAlert("Se han eliminado tus datos");
}

// Agrega una alerta de confirmación al registrar datos
function setAlert(text) {
    Toastify({
        text: text,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}

