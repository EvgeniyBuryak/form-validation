
let rePhone = /\(?\d{3}\)?([-\/\.])\d{3}\1\d{4}/;
let reName = new RegExp("^[А-ЯЁ][а-яё\\s]+$");
let reEmail = new RegExp("^[A-Za-z0-9]+[A-Za-z0-9-_.]*[A-Za-z0-9]+@[A-Za-z]+\\.([A-Za-z]{2,4})+$");
let rePassword = new RegExp("(?=.*[A-Z])(?=.*[a-z])(?=.*[\\d])(?=.*[\\W])[\\w\\W]{8,}"); // позитивный просмотр вперед
let reDate = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");
// let rePassword = new RegExp("[A-Za-z]+(?=.*\\d{1,})?"); // позитивный просмотр вперед
// let rePassword = new RegExp("^(([A-Za-z0-9]+\\d+))+$");
// let reEmail = /^[A-Za-z0-9]+@[A-Za-z]+\.com$/;


// function testInfo (phoneInput) {
//     const OK = rePhone.exec(phoneInput.value);
//     if(!OK)
//         window.alert(RegExp.input + " isn't a phone number with area code!");
//     else 
//         window.alert("Thanks, your phone number is " + OK[0]);
// }

// массив имен инпутов
const ARR_TYPE = { 
    text: 'Кириллицей',
    email: 'Email',
    password: 'пароль',
    date: 'дата',
};

// массив регулярных выражений
const ARR_REGEXP = { 
    text: reName,
    email: reEmail,
    password: rePassword,
    date: reDate,
};

const passConfirm = (value) => {
    if (RegExp.input == value)
        console.log(`Пароль: ${RegExp.input} совпадает`);
}

const CheckValue = (value, titleType, re) => {
    //if (type != inputType) continue;

    if (ARR_TYPE['password'] == titleType) passConfirm(value);

    const OK = re.exec(value);

    if(!OK)
        alert(RegExp.input + ` - Неверный ${titleType}`);
    else 
        alert(`Thanks, your ${titleType} is ${OK[0]}`);
}

const IsAdults = (value) => {
    // Day in milliseconds
    // let oneDay = 24 * 3600 * 1000;                    

    // Текущая дата
    const currentDateTimeStamp = Date.now(); // create date in the milliseconds
    // Дата рождения пользователя
    const userDateTimeStamp = Date.parse(value); // from string to milliseconds
    
    // Дата в читаемом виде 2012-12-12 + time + UTC
    let currentDate = new Date(currentDateTimeStamp);
    let userDate = new Date(userDateTimeStamp);
    
    const eighteenYearsAgo = currentDate.getFullYear() - 18;

    if (eighteenYearsAgo < userDate.getFullYear()) return false;
    if (currentDate.getMonth() < userDate.getMonth()) return false;
    if (currentDate.getDate() < userDate.getDate()) return false;

    return true;
}

function testInfo () {
    const ARR_INPUT = document.querySelectorAll('input');

    for (let input of ARR_INPUT) {

        let type = input.getAttribute('type');
        let title = ARR_TYPE[type];
        let re = ARR_REGEXP[type];
        
        // есть подозрения что будет работать и без switch
        switch(type) {
            case "text":
                CheckValue(input.value, title, re);
                break;
            case "email": 
                CheckValue(input.value, title, re);
                break;
            case "password":
                CheckValue(input.value, title, re);
                break;
            case "date":
                CheckValue(input.value, title, re);
                
                const IS_ADULT = IsAdults(input.value);
                break;
            case "reset":                
                //console.log(RegExp);
                break;
            default:
                break;
                
        }
    }
}
