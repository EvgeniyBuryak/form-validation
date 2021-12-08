
let re = /\(?\d{3}\)?([-\/\.])\d{3}\1\d{4}/;

function testInfo (phoneInput) {
    const OK = re.exec(phoneInput.value);
    if(!OK)
        window.alert(RegExp.input + " isn't a phone number with area code!");
    else 
        window.alert("Thanks, your phone number is " + OK[0]);
}