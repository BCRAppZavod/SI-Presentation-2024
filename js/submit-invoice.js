//Selecting Currency & Submiting Invoice Process:

function selectCurrency(lineNum, selectedCurrency) {
    //Creating elements:
    let ddButtonID = 'dropdownButtonInvoice'+lineNum;
    let currencyButton = document.getElementById(ddButtonID);
    let elementContainer = document.getElementById('elt'+lineNum);
    //Deleting currency button:
    while (elementContainer.firstChild) {
        elementContainer.removeChild(elementContainer.firstChild);
    };
    //Adding selected currency as text:
    let newParagraph = document.createElement('p');
    newParagraph.textContent = selectedCurrency;
    newParagraph.id = ddButtonID;
    elementContainer.appendChild(newParagraph);
    elementContainer.style["background"] = 'rgba(255, 248, 242, 0.3)';
};

function submitInvoice(lineNum) {
    //Check if currency is selected:
    let ddButtonID = 'dropdownButtonInvoice'+lineNum;
    let currencyButtonText = document.getElementById(ddButtonID).textContent;
    let currencyButtonClassList = document.getElementById(ddButtonID).classList;
    if (currencyButtonText.trim() === 'Select') {
        //Display error message:
        currencyButtonClassList.add('flash-border');
    } else {
        //Switch to 'Pending' status:
        let submitButtonID = 'submitButtonInvoice'+lineNum;
        let submitButton = document.getElementById(submitButtonID);
        submitButton.textContent = 'Pending';
        submitButton.style["font-weight"] = '600';
        submitButton.style["background"] = 'rgba(255, 248, 242, 0.3)';
        submitButton.style["color"] = '#404040';
        //Delete error message:
        if (currencyButtonClassList.contains('flash-border')) {
            currencyButtonClassList.remove('flash-border');
        };
    };
};