
    
    let user = JSON.parse(localStorage.getItem('user'));
    checkAge();
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

    function calculateIMC() {

        let imc = (user.weight / ( Math.pow((user.height/100), 2)));
        return imc.toFixed(2);
       
    }

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

function calculateBMRForWomen(){
    let BMR = 0;
    // switch (true) {
    //     case age <= 3:
    //         BMR = (58.317 * weight) - 31.1;
    //         break;
    //     case age > 3 && age <= 10:
    //         BMR = (20.315 * weight) + 485.9;
    //         break;
    //     case age > 10 && age <= 18:
    //         BMR = (13.384 * weight) + 692.6;
    //         break;
    //     case age > 18 && age <= 30:
    //         BMR = (14.818 * weight) + 486.6;
    //         break;
    //     case age > 30 && age <= 60:
    //         BMR = (8.126 * weight) + 845.6;
    //         break;
    //     case age > 60:
    //         BMR = (9.082 * weight) + 658.5;
    //         break;
    
    //     default:
    //         break;
    // }
    // Harris-Benedict
     BMR = 655 + (9.6*user.weight) + (1.8*user.height) - (4.7*user.age)
    return BMR;
}
function calculateBMRForMen(){
    let BMR = 0;
    // switch (true) {
    //     case age <= 3:
    //         BMR = (59.512 * weight) - 30.4;
    //         break;
    //     case age > 3 && age <= 10:
    //         BMR = (22.706 * weight) + 504.3;
    //         break;
    //     case age > 10 && age <= 18:
    //         BMR = (17.686 * weight) + 658.2;
    //         break;
    //     case age > 18 && age <= 30:
    //         BMR = (15.057 * weight) + 692.2;
    //         break;
    //     case age > 30 && age <= 60:
    //         BMR = (11.472 * weight) + 873.1;
    //         break;
    //     case age > 60:
    //         BMR = (11.711 * weight) + 587.7;
    //         break;
    
    //     default:
    //         break;
    // }
    // Harris-Benedict
     BMR = 66 + (13.7*user.weight) + (5*user.height) - (6.75*user.age)
    return BMR;
}

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

