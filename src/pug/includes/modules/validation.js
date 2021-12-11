
let rePhone = /\(?\d{3}\)?([-\/\.])\d{3}\1\d{4}/;
// pattern="^[А-Яа-яЁё\s]+$")
// const RE_NAME = /[\sА-Яа-яЁё]\W+/;
let reName = new RegExp("^[А-ЯЁ][а-яё\\s]+$");//[^0-9]");
let reEmail = new RegExp("^[A-Za-z0-9]+@[A-Za-z]+\\.com$");
// let reEmail = new RegExp("^[a-z]@[a-z]+\\.com$");
// let reEmail = /^[A-Za-z0-9]+@[A-Za-z]+\.com$/;


// function testInfo (phoneInput) {
//     const OK = rePhone.exec(phoneInput.value);
//     if(!OK)
//         window.alert(RegExp.input + " isn't a phone number with area code!");
//     else 
//         window.alert("Thanks, your phone number is " + OK[0]);
// }

const ARR_TYPE = { 
    text: 'Кириллицей',
    email: 'Email',
};

const ARR_REGEXP = { 
    text: reName,
    email: reEmail,
};

const checkValue = (value, inputType, re) => {
    //for (let [type, re] of Object.entries(ARR_REGEXP)) {
        
        //if (type != inputType) continue;

        const OK = re.exec(value);

        if(!OK)
            alert(RegExp.input + ` должен быть ${inputType}`);
        else 
            alert("Thanks, your name is " + OK[0]);
    //}
}

function testInfo () {
    const inputArray = document.querySelectorAll('input');

    for (let input of inputArray) {

        let type = input.getAttribute('type');
        let re = ARR_REGEXP[type];
        
        switch(type) {
            // case "text": 
            //     console.log(type);
            //     // console.log(input.value);
            //     checkValue(input.value, ARR_TYPE.text, re);
            //     break;
            case "email": 
                console.log(type);
                // console.log(input.value);
                checkValue(input.value, ARR_TYPE.email, re);
                break;
            case "reset":                
                //console.log(RegExp);
                break;
            default:
                break;
                
        }
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
