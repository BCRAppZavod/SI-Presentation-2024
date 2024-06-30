//Hide and Dislay Password:

let eyeIsClosed = false;
let firstEyeIsClosed = false;
let secondEyeIsClosed = false;
let thirdEyeIsClosed = false;

function hideReveal(isClosed, imgId, inputId) {
    let eyeImg = document.getElementById(imgId);
    let srcImg1 = "assets/img/eye_closed.png";
    let srcImg2 = "assets/img/eye_opened.png";
    let inputPassword = document.getElementById(inputId);

    if (isClosed === false) {
        eyeImg.src = srcImg1;
        inputPassword.type = 'text';
        isClosed = true;
    } else {
        eyeImg.src = srcImg2;
        inputPassword.type = 'password';
        isClosed = false;
    };
    return isClosed
}