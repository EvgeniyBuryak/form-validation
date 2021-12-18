
let rePhone = /\(?\d{3}\)?([-\/\.])\d{3}\1\d{4}/;
// let reName = new RegExp("^[А-ЯЁ]{1}([а-яё\\s]{1,})+$");
let reName = new RegExp("^([А-ЯЁ]{1})([а-яё]+)([-\\s]{1})(([А-ЯЁа-яё]{1})([а-яё]+))$|^([А-ЯЁ]{1})([а-яё]+)$");
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

// коллекция имен инпутов
const COLL_TYPE = { 
    text: 'Кириллицей',
    email: 'Email',
    password: 'пароль',
    date: 'дата',
};

// коллекция регулярных выражений
// const COLL_REGEXP = { 
//     text: reName,
//     email: reEmail,
//     password: rePassword,
//     date: reDate,
// };
const COLL_REGEXP = { 
    'first-name': reName,
    'second-name': reName,
    'email': reEmail,
    'first-password': rePassword,
    'second-password': rePassword,
    'date': reDate,
};


const ARR_MAP_REGEXP = new Map(Object.entries(COLL_REGEXP));

// Коллекция сообщений об ошибке для конкретного поля ввода в форме
const COLL_MESSAGE_ABOUT_ERROR = {
    'first-name': "Имя должно начинаться с большой буквы киррилицей!",
    'second-name': "Фамилия должнa начинаться с большой буквы киррилицей!",
    'email': "Неправильный email! Пример: example@domen.ru",
    'first-password': "Пароль должен содержать не менее одной цифры, символа и большой буквы!",
    'second-password': "Пароль не совпадает!",
    'date': "Вам нет 18-ти лет!",                        
};

const MAP_INPUTS_IS_VALIDATE = new Map([
    ['first-name', false],
    ['second-name', false],
    ['email', false],
    ['first-password', false],
    ['second-password', false],
    ['date', false],
]);

const checkPasswordAfterSecondInput = (value) => {
    
    if (RegExp.input != value) return false;

    console.log(`Пароль: ${RegExp.input} совпадает`);
    return true;
}


const checkValueOnRegExp = (value, re) => {
    
    // if (COLL_TYPE['password'] == titleType) {
    //     checkPasswordAfterSecondInput(value);
    // }
    
    const OK = re.exec(value);
    
    if(!OK) {
        // alert(RegExp.input + ` - Неверный ${titleType}`);
        return false;
    }        
    else {
        // alert(`Thanks, your ${titleType} is ${OK[0]}`);
        return true;
    }
}

// const checkPasswordOnRegExp = (value) => {

//     // if (COLL_TYPE['password'] == titleType) {
//     const IS_PASSWORD_MATCHES = checkPasswordAfterSecondInput(value);
//         // console.log('456');
//     return IS_PASSWORD_MATCHES;
//         // checkPasswordAfterSecondInput(value);
//     // }
//     // console.log('123');
//     // const IS_REG_EXP_RIGHT = checkValueOnRegExp(value, titleType, re);
//     // return (IS_PASSWORD_MATCHES) ? true : IS_REG_EXP_RIGHT;
//     // return IS_PASSWORD_MATCHES && IS_REG_EXP_RIGHT; // первая истина
// }
    
// Проверка пользователя на совершеннолетие
const userIsAdults = (value) => {
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

    return isNaN(userDateTimeStamp) ? false : true;
}

const collectionPromptForUser = new Map();

// Создание подсказки
const createPromptForUser = (input) => {
    const KEY = input.dataset.showErrorMessage;

    if (collectionPromptForUser.has(KEY)) return;// alert('already exist's');

    // получаем строки за массива по типу
    const str = COLL_MESSAGE_ABOUT_ERROR[KEY];
    
    const div = document.createElement('div');
    // const textNode = document.createTextNode('Неправильно сука!');                
    div.classList.add('alert');
    // errorAlert.appendChild(textNode);
    div.innerHTML = str;

    collectionPromptForUser.set(KEY, div);
    // collectionPromptForUser.add(div);

    input.style.outlineColor = '#d54c4c';
    input.after(div);
}

// Удаление подсказки
const removePromptForUser = (input) => {
    const KEY = input.dataset.showErrorMessage;
    // console.log(KEY);

    if (collectionPromptForUser.has(KEY)) {
        const div = collectionPromptForUser.get(KEY);
        div.remove();
        collectionPromptForUser.delete(KEY);
    }
    input.style.outlineColor = '#56bf58';
    // console.log(div);
    // div.innerHTML = "123";
    
    // alert(KEY);
    // alert(collectionPromptForUser.get('first-name'));
    // for (let value of collectionPromptForUser) {
    //     value.
    // }
}

// Валидация формы
function validate () {

    const ARR_INPUT = document.querySelectorAll('input');

    let isValidate = false;

    for (let input of ARR_INPUT) {

        let type = input.getAttribute('type');
        let KEY = input.dataset.showErrorMessage;
        // let title = COLL_TYPE[type];
        // let re = COLL_REGEXP[type];
        let re = ARR_MAP_REGEXP.get(KEY);
        // console.log(ARR_MAP_REGEXP);

        // есть подозрения что будет работать и без switch
        switch(KEY) {

            case "first-name":
            case "second-name":
            case "email":
            case "first-password":
                isValidate = checkValueOnRegExp(input.value, re);
                // if (isValidate === true) MAP_INPUTS_IS_VALIDATE.set(KEY, isValidate);
                // else MAP_INPUTS_IS_VALIDATE.set(KEY, isValidate);
                break;

            case "second-password":
                isValidate = checkPasswordAfterSecondInput(input.value);
                // if (isValidate === true) MAP_INPUTS_IS_VALIDATE.set(KEY, isValidate);
                // else MAP_INPUTS_IS_VALIDATE.set(KEY, isValidate);
                break;

                // // Выводим подсказку юзеру, о том что требуется исправить
                // if (!isValidate) createPromptForUser(input);
                // else removePromptForUser(input);

            case "date":
                isValidate = checkValueOnRegExp(input.value, re);
                
                const IS_ADULT = isValidate ? userIsAdults(input.value) : false;
                
                isValidate = IS_ADULT ? isValidate : false;
                
                // console.log(isValidate);
                // const IS_ADULT = userIsAdults(input.value);
                // MAP_INPUTS_IS_VALIDATE.set(KEY, isValidate);

                // if (IS_ADULT === false) continue;

                // if (IS_ADULT === true) 
                //     isValidate = true;
                // else
                //     isValidate = false;

                // if (IS_ADULT === true) {
                //     // if (isValidate === true) 
                //     MAP_INPUTS_IS_VALIDATE.set(KEY, isValidate);

                //     removePromptForUser(input);
                    
                //     console.log('Есть 18 лет!');
                // } else
                //     createPromptForUser(input);
                //     MAP_INPUTS_IS_VALIDATE.set(KEY, isValidate);
                break;
            case "reset":                
                //console.log(RegExp);
                break;
            default:
                break;
                
        }

        // Пропукаем подсказку для кнопки "Отправить" и "Даты"
        if (type == "submit") continue;
        // if (type == "date") continue;

        // Запоминаем какой input успешно прошел валидацию
        MAP_INPUTS_IS_VALIDATE.set(KEY, isValidate);

        // Выводим подсказку юзеру, о том что требуется исправить
        if (!isValidate) createPromptForUser(input);
        else removePromptForUser(input);
    }
    console.log(`BEFORE isValidate: ${isValidate}`)
    // Проверка на валидность всех вводных
    for (let [key, value] of MAP_INPUTS_IS_VALIDATE.entries()) {
        console.log(`BEFORE key: ${key} value: ${value}`);
        isValidate = (value === false) ? false : isValidate;
        console.log(`AFTER  key: ${key} value: ${value}`);
    }
    // console.log(collectionPromptForUser);
    console.log(`AFTER  isValidate: ${isValidate}`)
    return false;//isValidate;
    // let form = document.forms.my;
    // console.dir(form);
}
