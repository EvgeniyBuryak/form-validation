let reName = new RegExp("^([А-ЯЁ]{1})([а-яё]+)([-\\s]{1})(([А-ЯЁа-яё]{1})([а-яё]+))$|^([А-ЯЁ]{1})([а-яё]+)$");
let reEmail = new RegExp("^[A-Za-z0-9]+[A-Za-z0-9-_.]*[A-Za-z0-9]+@[A-Za-z]+\\.([A-Za-z]{2,4})+$");
let rePassword = new RegExp("(?=.*[A-Z])(?=.*[a-z])(?=.*[\\d])(?=.*[\\W])[\\w\\W]{8,}"); // позитивный просмотр вперед
let reDate = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");

const SAVING_PROMPTS_USER = new Map();

// Длина 40 символов учитывает разнообразие длины большинста имен на территории всей России
const MAX_LENGTH = 40; 

// коллекция имен инпутов
const COLL_TYPE = { 
    text: 'Кириллицей',
    email: 'Email',
    password: 'пароль',
    date: 'дата',
};

const COLL_REGEXP_FOR_INPUTS = { 
    'first-name': reName,
    'second-name': reName,
    'email': reEmail,
    'first-password': rePassword,
    'second-password': rePassword,
    'date': reDate,
};

const MAP_REGEXP_FOR_INPUTS = new Map(Object.entries(COLL_REGEXP_FOR_INPUTS));

// Коллекция сообщений об ошибке для конкретного поля ввода в форме
const COLL_MESSAGE_ABOUT_ERROR = {
    'first-name': "Имя должно начинаться с большой буквы киррилицей!",
    'second-name': "Фамилия должнa начинаться с большой буквы киррилицей!",
    'email': "Неправильный email! Пример: example@domen.ru",
    'first-password': "Пароль должен содержать не менее одной цифры, символа и большой буквы!",
    'second-password': "Пароль не совпадает!",
    'date': `Укажите дату рождения!`,
};

const COLL_MESSAGE_PROMPT = {
    'length': `Количество символов не должно превышать ${MAX_LENGTH}`,    
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
    
    const GOOD = re.exec(value);
    
    if(!GOOD) {        
        return false;
    }        
    else {
        return true;
    }
}

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

// Создание подсказки
const createPromptForUser = (input) => {

    const KEY = input.dataset.showErrorMessage;

    if (SAVING_PROMPTS_USER.has(KEY)) return;// alert('already exists');

    // получаем строки за массива по типу
    const str = COLL_MESSAGE_ABOUT_ERROR[KEY];
    
    const div = document.createElement('div');
    
    div.classList.add('alert');
    
    div.innerHTML = str;

    SAVING_PROMPTS_USER.set(KEY, div);

    input.style.outlineColor = '#d54c4c';
    input.after(div);
}

// Удаление подсказки
const removePromptForUser = (input) => {

    const KEY = input.dataset.showErrorMessage;    

    if (SAVING_PROMPTS_USER.has(KEY)) {

        const div = SAVING_PROMPTS_USER.get(KEY);
        
        div.remove();

        SAVING_PROMPTS_USER.delete(KEY);
    }

    input.style.outlineColor = '#56bf58';
}

const changePromtForUser = (input, message) => {

    let KEY = input.dataset.showErrorMessage;

    if (SAVING_PROMPTS_USER.has(KEY)) {
        const div = SAVING_PROMPTS_USER.get(KEY);
        div.innerHTML = message;

        return;
    }    
    
    const div = document.createElement('div');
    
    div.classList.add('alert');
    div.innerHTML = message;

    SAVING_PROMPTS_USER.set(KEY, div);
    
    input.style.outlineColor = '#d54c4c';
    input.after(div);    
}

// Валидация формы
const validate = () => {
    
    const ARR_INPUT = document.querySelectorAll('input');

    let isValidate = false;

    for (let input of ARR_INPUT) {

        // let type = input.getAttribute('type');
        const KEY = input.dataset.showErrorMessage;
        const RE = MAP_REGEXP_FOR_INPUTS.get(KEY);
        const LENGTH = input.value.length;
        
        switch(KEY) {

            case "first-name":
            case "second-name":
                isValidate = checkValueOnRegExp(input.value, RE);

                // Выводим подсказку юзеру, о том что требуется исправить
                if (!isValidate) createPromptForUser(input);
                else removePromptForUser(input);

                // Проверяем длину имени и фамилии
                // если больше положенного предупреждаем пользователя
                if (LENGTH > MAX_LENGTH) {
                    changePromtForUser(input, COLL_MESSAGE_PROMPT.length);
                    isValidate = false;
                }

                break;
            case "email":
            case "first-password":
                isValidate = checkValueOnRegExp(input.value, RE);

                // Выводим подсказку юзеру, о том что требуется исправить
                if (!isValidate) createPromptForUser(input);
                else removePromptForUser(input);

                break;

            case "second-password":
                isValidate = checkPasswordAfterSecondInput(input.value);

                // Выводим подсказку юзеру, о том что требуется исправить
                if (!isValidate) createPromptForUser(input);
                else removePromptForUser(input);

                break;

            case "date":
                
                isValidate = checkValueOnRegExp(input.value, RE);
                
                // Выводим подсказку юзеру, о том что требуется исправить
                if (!isValidate) createPromptForUser(input);
                else removePromptForUser(input);

                // Дата не указана только после перезагрузки страницы, поэтому пропускаем итерацию
                if (!isValidate) continue;

                // Если дата не пуста и прошла первоначальную валидацию
                // проверяем на возвраст
                const IS_ADULT = userIsAdults(input.value);                
                                
                if (!IS_ADULT) {
                    changePromtForUser(input, COLL_MESSAGE_PROMPT.date);
                    
                    isValidate = false;
                }

                break;
            default:
                break;
                
        }

        // Запоминаем какой input успешно прошел валидацию
        MAP_INPUTS_IS_VALIDATE.set(KEY, isValidate);
    }
    
    // Проверка на валидность всех вводных
    for (let value of MAP_INPUTS_IS_VALIDATE.values()) {
        isValidate = (value === false) ? false : isValidate;
    }

    if (isValidate) console.log('Данные формы регистрации успешно отправлены!');
    return isValidate;
}