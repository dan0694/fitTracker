    let age = prompt("Por favor, ingrese su edad");
    getIMC(age);
    let again = confirm("Desea volver a ejecutar la calculadora de IMC?");
    while(again) {
        let age = prompt("Por favor, ingrese su edad");
        getIMC(age);
        again = confirm("Desea volver a ejecutar la calculadora de IMC?");
    }
   

    function getIMC(age) {
        if (!age){
            alert("Debes de ingresar un valor");
        }else if(age < 20) {
            alert("Lo sentimos, debes de tener más de 20 años para que este cálculo sea más aproximado");
        } else{
            let imc = calculateIMC();
            alert("Su Indice de Masa Corporal (IMC) es de: "+  imc);
            let classification = classifyIMC(imc);
            alert("Su nivel de peso se encuentra en: "+ classification);
        }
    }

    function calculateIMC() {
        let height = prompt("Ingrese su altura en centimetros (cm)");
        let weight = prompt("Ingrese su peso en kilogramos (kg)");
        let imc = (weight / ( Math.pow((height/100), 2)));
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