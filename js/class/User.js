class User{
    constructor(name, age, height, weight, gender, activityIndicator){
        this.name = name;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.gender = gender;
        this.activityIndicator = activityIndicator;
    }

    imc(){
        return ((user.weight / ( Math.pow((user.height/100), 2)))).toFixed(2);
    }
}