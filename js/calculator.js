
    
    let user = JSON.parse(localStorage.getItem('user'));

    if(user.age){
        document.getElementById('runIMC').disabled = false;
    }
    function checkAge() {
        if (!user.age){
            alert("Debes de ingresar una edad valida");
        }else if(user.age < 20 || Number.isInteger(user.age) === false ) {
            alert("Ingresa una edad válida, recuerda que debes de tener más de 20 años para que este cálculo sea más aproximado");
        } else{
            let imc = calculateIMC();
            alert("Su Indice de Masa Corporal (IMC) es de: "+ imc);
            let classification = classifyIMC(imc);
            alert("Su nivel de peso se encuentra en: "+ classification);
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
