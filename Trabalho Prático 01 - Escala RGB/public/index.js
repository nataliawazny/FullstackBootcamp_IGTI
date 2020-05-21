window.addEventListener('load', start)

function start() {
    let RR = document.querySelector('#RR')
    RR.addEventListener('input', funcaoRed)
    let GR = document.querySelector('#GR')
    GR.addEventListener('input', funcaoGreen)
    let BR = document.querySelector('#BR')
    BR.addEventListener('input', funcaoBlue)

    let RT = document.querySelector('#RT')
    RT.value = RR.value
    red = RR.value

    let GT = document.querySelector('#GT')
    GT.value = GR.value
    green = GR.value

    let BT = document.querySelector('#BT')
    BT.value = BR.value
    blue = BR.value

    square.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')'
}

function funcaoRed(event) {
    let red = event.target.value

    cor(red, green, blue)

    let RT = document.querySelector('#RT')
    RT.value = red
}

function funcaoGreen(event) {
    let green = event.target.value

    cor(red, green, blue)

    let GT = document.querySelector('#GT')
    GT.value = green
}

function funcaoBlue(event) {
    let blue = event.target.value

    cor(red, green, blue)

    let BT = document.querySelector('#BT')
    BT.value = blue
}

function cor(red, green, blue) {
    var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
    square.style.backgroundColor = color;
}
