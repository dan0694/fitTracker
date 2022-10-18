showProfile();

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
    `;
    } else{
        alert("Presiona el botón para completar tu perfil.");
    }
}

function fillProfile(){
    let name = prompt("Por favor, ingrese su nombre");
    let age = parseInt(prompt("Por favor, ingrese su edad"));
    // gender:prompt("Por favor, ingrese su género (Masculino o Femenino)"),
    let height = parseInt(prompt("Por favor, ingrese su altura en centimetros (cm)"));
    let weight = parseInt(prompt("Por favor, ingrese su peso en kilogramos (kg)"));
    let user = new User(name, age, height, weight);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(localStorage.getItem("user"));
    let profile = document.getElementById('info');
    profile.innerHTML=`
        <h3>Información del usuario</h3>
        <p>Nombre: ${user.name}</p>
        <p>Edad: ${user.age}</p>
        <p>Altura: ${user.height}</p>
        <p>Peso: ${user.weight}</p>
    `;
}


function deleteData() {
    localStorage.removeItem("user");
    let profile = document.getElementById('info');
    profile.innerHTML=``;
}
