let groupCharacter = document.querySelectorAll(".character > img");
let textBlock = document.querySelectorAll(".conclusion_char");
let str = ''; // Вывод результата

// создание персонажа
createCharacter = function(name, cash, skills, power, speed, vitality) {
    return {
        name, // имя персонажа
        cash, // денежные средства
        skills, // умения, возможности
        power, // сила удара
        speed, // скорость удара
        vitality, // жизненная сила (здоровье)
        impactEnergy: function() {   // энергия удара
            return (this.power * this.speed * this.speed / 2) * this.skills / 10;
        },
        maxImpactCount: function() {    // максимально возможное количество ударов
            return (2 * this.vitality / this.impactEnergy()).toFixed(0);
        },
    };
};

let character = [ // массив персонажей

    createCharacter("Райден", 70, 6, 12, 5, 1100),
    createCharacter("Саб-Зиро", 90, 7, 14, 6, 1200),
    createCharacter("Лю Кан", 70, 5, 11, 5, 1100),
    createCharacter("Скорпион", 100, 8, 15, 6, 1300),
    createCharacter("Шао Кан", 150, 9, 17, 7, 1500),    
];

let lu_Kan = character[2]; // главный персонаж Лю Кан

createTrained = function(type, price) {
    return {
        type, // вид подготовки
        price, // стоимость вида подготовки
        amount: 0, // количество оплачиваемых видов подготовки
    };
};

let trainingCenter = [ // массив с видами подготовки
    createTrained("Занятия с мастером", 40),
    createTrained("Самостоятельная тренировка", 20),
    createTrained("Дополнительное оснащение", 30),
];

// оплатить и получить подготовку
getTrained = function() {

    completePayment = () => {lu_Kan.cash -= trainingCenter[choice-1].price;} // оплата подготовки

    let choice = +prompt("Выберите вид подготовки:" +
                "\n" + "1 - " + trainingCenter[0].type + "  Стоимость: " + trainingCenter[0].price +
                "\n" + "2 - " + trainingCenter[1].type + "  Стоимость: " + trainingCenter[1].price + 
                "\n" + "3 - " + trainingCenter[2].type + "  Стоимость: " + trainingCenter[2].price);
    
    if (trainingCenter[choice-1].price <= lu_Kan.cash) {
        switch (choice) {
            case 1: {                
                completePayment();               
                lu_Kan.skills += 2;
                lu_Kan.speed += 1;
                break;
            }
            case 2: {
                completePayment();
                lu_Kan.power += 2;
                lu_Kan.speed += 1;
                break;
            }
            case 3: {
                completePayment();
                lu_Kan.skills += 1;
                lu_Kan.vitality += 10;
                break;
            }
            default: {
                alert("Неверное значение");
                break;
            }            
        }
    }
    else {
        alert(` "${trainingCenter[choice-1].type}" Средств для оплаты недостаточно.`);        
    }  
    
};

// выбор противника
var enemyIndex; //индекс противника в массиве

function selectCharacter(nameChar) {
    let i = 0;    
    for (var curent of character) {
        if (curent.name == nameChar) { 
            enemyIndex = i; 
            showCharacter(enemyIndex);           
            calculateFight(curent);                      
        } 
        ++i;       
    }        
}

// показать противников
showCharacter = function(numValue) {
    let i = 0;
    for (let index of groupCharacter) {
        if(i == numValue || i == 2) {
                    groupCharacter[i].classList.add("active");
                }
                else {
                    groupCharacter[i].classList.add("novisible");
                }
        i++; 
    }  
};

// расчет поединка
calculateFight = function (curentOpponent) {

    lu_Kan.sumImpactEnergy = 0;
    for (let i = 0; i < lu_Kan.maxImpactCount(); i++) {
        lu_Kan.sumImpactEnergy =+ lu_Kan.impactEnergy();
    }

    curentOpponent.sumImpactEnergy = 0;
    for (let i = 0; i < curentOpponent.maxImpactCount(); i++) {
        curentOpponent.sumImpactEnergy =+ curentOpponent.impactEnergy();
    }

    curentOpponent.remnantVitality = curentOpponent.vitality - lu_Kan.sumImpactEnergy; // остаток жизненной силы противника
    lu_Kan.remnantVitality = lu_Kan.vitality - curentOpponent.sumImpactEnergy; // остаток жизненной силы Лю Кана

    if (lu_Kan.remnantVitality > curentOpponent.remnantVitality) {

        alert(lu_Kan.name + " победил");

        lu_Kan.cash =+ curentOpponent.cash;
        if (lu_Kan.skills < curentOpponent.skills) {
            lu_Kan.skills = curentOpponent.skills;
        }
        if (lu_Kan.vitality < curentOpponent.vitality) {
            lu_Kan.vitality = curentOpponent.vitality;
        }

        curentOpponent.cash = 0;
        curentOpponent.skills = 0;
        curentOpponent.power = 0;
        curentOpponent.speed = 0;
        curentOpponent.vitality = 0;       
        
    }
    else if (lu_Kan.remnantVitality == curentOpponent.remnantVitality) {
        alert(lu_Kan.name + " сражался, но победителей нет.");
        lu_Kan.vitality = (lu_Kan.remnantVitality).toFixed();
        curentOpponent.vitality = (curentOpponent.remnantVitality).toFixed(); 
    }
    else {
        alert(lu_Kan.name + " проиграл поединок");
        lu_Kan.vitality = (lu_Kan.remnantVitality).toFixed();
        curentOpponent.vitality = (curentOpponent.remnantVitality).toFixed();
        console.log("Лю Кан " + lu_Kan.vitality + " " + curentOpponent.name + " " + curentOpponent.vitality);
    }

}

// показать информацию о бойцах
function showInformation() {
       j = 0;
       for (let cur of character) {           
           str += "<h3>" + cur.name + "</h3>"; 
           str += "<p>" + "Средства: " + cur.cash;
           str += "<p>" + "Умения: " + cur.skills;
           str += "<p>" + "Сила: " + cur.power;
           str += "<p>" + "Скорость: " + cur.speed;
           str += "<p>" + "Здоровье: " + cur.vitality;
           
           textBlock[j].innerHTML = str;

           j++;
           str = '';
       }
}

// продолжить игру
function continueGame() {
    let i = 0;
    for (let index of groupCharacter) {
        if(i == enemyIndex || i == 2) {
                    groupCharacter[i].classList.remove("active");
                }
                else {
                    groupCharacter[i].classList.remove("novisible");
                }
        i++; 
    }

    showInformation();

}

