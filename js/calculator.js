
    
    let user = JSON.parse(localStorage.getItem('user'));
    checkAge();
    // Valida que la edad del usuario sea menor a 20 años, para que los cálculos sean efectivos
    function checkAge() {
        if(!user ) {
            let str = 'Ingresa tus datos en la sección de Perfil.';
           addCard(str);
        } else if(user.age < 20 || Number.isInteger(user.age) === false ) {
            let str = 'Ingresa una edad válida, recuerda que debes de tener más de 20 años para que este cálculo sea más aproximado';
            addCard(str);
        } else{
           addCard();
        }
    }

    // Calcula el Indice de Masa Corporal
    function calculateIMC() {

        let imc = (user.weight / ( Math.pow((user.height/100), 2)));
        return imc.toFixed(2);
       
    }

    // Clasifica el indice de masa corporal en base al valor obtenido
    function classifyIMC(imc) {
        let classification = "";
        switch (true) {
            case imc < 18.5:
                classification = "Bajo Peso"
                break;
        
            case 18.5 <= imc && imc < 25:
                classification = "Normal"
                break;
        
            case 25 <= imc && imc < 29.9:
                classification = "Sobrepeso"
                break;
        
            case imc > 29.9:
                classification = "Obesidad"
                break;
        
            default:
                break;
        }

        return classification;
    }

    // Agrega el contenido calculado a DOM
    function addCard(str) {
        let div = document.querySelector('#imc');
        if (str === undefined) {
            let imc = calculateIMC();
            div.innerHTML = `
            <div class="card mt-5">
                <div class="card-body text-center">
                    <p class="display-1">${imc}</p>
                    <p class="display-6">${classifyIMC(imc)}</p>
                </div>
            </div>
            `;
            calculateCalories();
        } else{
            div.innerHTML = `
            <div class="card mt-5">
                <div class="card-body text-center">
                    <h4 class="">${str}</h4>
                </div>
            </div>
            `;
        }
        
    }


// Gestiona el cálculo de calorías en base al género
function calculateCalories(){
    let bmr
    if (user.gender === "Femenino") {
       bmr =   calculateBMRForWomen();
    } else{
        bmr = calculateBMRForMen();
    }
    let calories = addActivityToBMR(bmr);
    addCaloriesCard(calories.toFixed(2));
}

// Calculo de calorías base para mujeres
function calculateBMRForWomen(){
    let BMR = 0;
     BMR = 655 + (9.6*user.weight) + (1.8*user.height) - (4.7*user.age)
    return BMR;
}

// Calculo de calorías base para hombres
function calculateBMRForMen(){
    let BMR = 0;
     BMR = 66 + (13.7*user.weight) + (5*user.height) - (6.75*user.age)
    return BMR;
}

// Agrega un porcentaje en base al nivel de actividad física del usuario
function addActivityToBMR(bmr){
    let calories;
    switch (user.activityIndicator) {
        case 1:
            calories = bmr*1.2;
            break;
        case 2:
            calories = bmr*1.375;
            break;
        case 3:
            calories = bmr*1.55;
            break;
        case 4:
            calories = bmr*1.72;
            break;
        case 5:
            calories = bmr*1.9;
            break;
    
        default:
            break;
    }

    return calories;
}

// Agrega la data de las calorías a DOM
function addCaloriesCard(calories){
    let div = document.querySelector('#calories');
    let activity = getActivityIndicator(user.activityIndicator);
        div.innerHTML = `
        <h1 class="mt-5">Cálculo de calorías</h1>
        <p>Cálculos efectuados bajo las ecuacion de Harris-Benedict. Esto solamente es una recomendación, favor consultar con su nutricionista.</p>
        <p>Cálculo para una persona de género ${user.gender}, de ${user.age} años, que pesa ${user.weight} kilogramos y se considera con actividad física de categoría  "${activity}".</p>
        
        <div class="card mt-5">
            <div class="card-body text-center">
                <p class="display-5">Calorías para mantenimiento de peso:</p>
                <p class="display-6"><strong>${calories}</strong></p>
            </div>
        </div>
        `;
   
}

// Mapeo de nivel de actividad guardado en LocalStorage
function getActivityIndicator(activity){
    let indicator;
    switch (activity) {
        case 1:
            indicator = "Sedentario";
            break;
        case 2:
            indicator = "Ligeramente Activo";
            
            break;
        case 3:
            indicator = "Activo";
            
            break;
        case 4:
            indicator = "Muy Activo";
            
            break;
        case 5:
            indicator = "deportista Profesional";
            
            break;
    
        default:
            break;
    }
    return indicator;
}

