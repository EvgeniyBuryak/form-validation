
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

const checkValue = (value, titleType, re) => {
    //if (type != inputType) continue;

    if (ARR_TYPE['password'] == titleType) passConfirm(value);

    const OK = re.exec(value);

    if(!OK)
        alert(RegExp.input + ` - Неверный ${titleType}`);
    else 
        alert(`Thanks, your ${titleType} is ${OK[0]}`);
}

function testInfo () {
    const ARR_INPUT = document.querySelectorAll('input');

    for (let input of ARR_INPUT) {

        let type = input.getAttribute('type');
        let title = ARR_TYPE[type];
        let re = ARR_REGEXP[type];
        
        // есть подозрения что будет работать и без switch
        switch(type) {
            // case "text": 
            // //     console.log(type);
            // //     // console.log(input.value);
            //     checkValue(input.value, ARR_TYPE.text, re);
            //     break;
            // case "email": 
            //     // console.log(type);
            //     // console.log(input.value);
            //     checkValue(input.value, ARR_TYPE.email, re);
            //     break;
            // case "password": 
            //     //console.log(type);
            //     // console.log(input.value);
            //     checkValue(input.value, title, re);
            //     break;
            case "date":
                
                const isAdults = (value) => {
                    // Day in milliseconds
                    // let oneDay = 24 * 3600 * 1000;                    

                    // Текущая дата по гринвичу
                    const currentDateTimeStamp = Date.now(); // create date in the milliseconds UTC+0
                    // Пользовательская дата по НСК
                    const userDateTimeStamp = Date.parse(value); // from string to milliseconds UTC+07
                    
                    // Дата в читаемом виде 2012-12-12 + time + UTC
                    let currentDate = new Date(currentDateTimeStamp);
                    let userDate = new Date(userDateTimeStamp);// - sixHours);
                    
                    const eighteenYearsAgo = currentDate.getFullYear() - 18;

                    // let eighteenYearsAgo = new Date(
                    //     currentDate.getFullYear() - 18, 
                    //     currentDate.getMonth(), 
                    //     currentDate.getDate(),
                    // );

                    if (eighteenYearsAgo < userDate.getFullYear()) return false;
                    if (currentDate.getMonth() < userDate.getMonth()) return false;
                    if (currentDate.getDate() < userDate.getDate()) return false;

                    return true;
                }
                
                const res = isAdults(input.value);
                
                checkValue(input.value, title, re);

                break;
            case "reset":                
                //console.log(RegExp);
                break;
            default:
                break;
                
        }
        // console.log(input.value);
        // if (input.getAttribute('type') == "text") {
        //     // console.log(input.value);
        //     checkValue(input.value);
        // }
        // if (input.getAttribute('type') == "email") {
        //     // console.log(input.value);
        //     // checkValue(input.value);
        // }
        // if (input.getAttribute('type') == "password") {
        //     console.log(input.value);
        // }
        // if (input.getAttribute('type') == "date") {
        //     console.log(input.value);
        // }
        // if (input.getAttribute('type') == "reset") {
        //     console.log(RegExp);
        // }
    }
}
