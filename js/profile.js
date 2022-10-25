showProfile();

// Carga los datos por primera vez
function showProfile(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
    let profile = document.getElementById('info');
    profile.innerHTML=`
        <h3>Información del usuario</h3>
        <p>Nombre: ${user.name}</p>
        <p>Edad: ${user.age}</p>
        <p>Altura: ${user.height}</p>
        <p>Peso: ${user.weight}</p>
        <p>Genero: ${user.gender}</p>
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
function fillProfile(){
    let name = document.querySelector('#userName').value;
    let age = parseInt(document.querySelector('#userAge').value);
    // gender:prompt("Por favor, ingrese su género (Masculino o Femenino)"),
    let height = parseInt(document.querySelector('#userHeight').value);
    let weight = parseInt(document.querySelector('#userWeight').value);
    let gender = (document.querySelector('#userGender').value);
    console.log(gender);
    let activity = parseInt(document.querySelector('#userActivity').value);
    let user = new User(name, age, height, weight, gender, activity);
    localStorage.setItem('user', JSON.stringify(user));
    let profile = document.getElementById('info');
    profile.innerHTML=`
        <h3>Información del usuario</h3>
        <p>Nombre: ${user.name}</p>
        <p>Edad: ${user.age}</p>
        <p>Altura: ${user.height}</p>
        <p>Peso: ${user.weight}</p>
        <p>Genero: ${user.gender}</p>
    `;
    
}

// Eliminamos los datos del usuario
function deleteData() {
    localStorage.removeItem("user");
    let profile = document.getElementById('info');
    profile.innerHTML=``;
    document.querySelector('#userName').value = "";
    document.querySelector('#userAge').value = "";
    document.querySelector('#userHeight').value = "";
    document.querySelector('#userWeight').value = "";
    document.querySelector('#userGender').value = "";
    document.querySelector('#userActivity').value = "";
}

