
let rePhone = /\(?\d{3}\)?([-\/\.])\d{3}\1\d{4}/;
// pattern="^[А-Яа-яЁё\s]+$")
// const RE_NAME = /[\sА-Яа-яЁё]\W+/;
let reName = new RegExp("^[А-ЯЁ][а-яё\\s]+$");//[^0-9]");


function testInfo (phoneInput) {
    const OK = rePhone.exec(phoneInput.value);
    if(!OK)
        window.alert(RegExp.input + " isn't a phone number with area code!");
    else 
        window.alert("Thanks, your phone number is " + OK[0]);
}

 const checkValue = (value) => {
    const OK = reName.exec(value);
    if(!OK)
        alert(RegExp.input + " the text must be Cyrillic");
    else 
        alert("Thanks, your name is " + OK[0]);
}

function testInfo () {
    const inputArray = document.querySelectorAll('input');

    for (let input of inputArray) {
        let type = input.getAttribute('type');
        switch(type) {
            case "text": 
                // console.log(input.value);
                checkValue(input.value);
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
