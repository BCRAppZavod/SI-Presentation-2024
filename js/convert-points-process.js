//Points Conversion & Payment Email Change:

function processChoice(paymentEmail) {
    const pointsForm = document.getElementById('pointsForm');
    let bountyChoice = document.getElementById('inputBounty');
    event.preventDefault();
    if (pointsForm.checkValidity()) {
        confirmBounty(paymentEmail);
        pointsForm.submit();
    } else {
        bountyChoice.classList.add('flash-border-5s');
        //alert('Veuillez choisir le type de récompense.');
    }
}

function createButton(btnText, btnRM='', btnId='') {
    let newButton = document.createElement('button');
    let buttonClassesToAdd = ['btn','btn-primary','fs-6','btn-lg','text-white','fw-bold'];
    for (let i = 0; i < buttonClassesToAdd.length; i++) {
        newButton.classList.add(buttonClassesToAdd[i]);
    }
    newButton.textContent = btnText;
    if (btnRM.length > 0) {
        newButton.style["margin-right"] = btnRM;
    }
    if (btnId.length > 0) {
        newButton.id = btnId;
    }
    return newButton;
}

function confirmBounty(paymentEmail) {
    let conversionTable = document.getElementById('conversion');
    let bountyChoice = document.getElementById('inputBounty');
    bountyChoice = bountyChoice.value;
    let selectedNumPoints = getNumPoints();
    let bountyConfirmationMessage = "Vous avez choisi de convertir "+selectedNumPoints+" points avec "+bountyChoice+".";
    const initialElements = [];
    for (let i = 0; i < conversionTable.children.length; i++) {
        initialElements.push(conversionTable.children[i]);
    }
    while (conversionTable.firstChild) {
        conversionTable.removeChild(conversionTable.firstChild);
    }

    let messageContainer = document.createElement('div');
    messageContainer.id = "messageContainer";
    let messageClassesToAdd = ['bg-white','px-2','py-4','p-md-4','rounded-5',
                        'basic-shadow','text-gray-700','fw-bold'];
    for (let i = 0; i < messageClassesToAdd.length; i++) {
        messageContainer.classList.add(messageClassesToAdd[i]);
    }

    let newSubtitle = document.createElement('h4');
    newSubtitle.textContent = "Confirmation de votre choix :";
    newSubtitle.style["margin-bottom"] = '25px';
    messageContainer.appendChild(newSubtitle);

    let newMessage = document.createElement('p');
    newMessage.textContent = bountyConfirmationMessage;
    newMessage.style["margin-bottom"] = '50px';
    messageContainer.appendChild(newMessage);

    let restoreButton = createButton('Retour', '200px');
    restoreButton.onclick = function(){restoreTable(initialElements, conversionTable)};
    messageContainer.appendChild(restoreButton);

    let confirmBountyBtn = createButton('Confirmer');
    confirmBountyBtn.onclick = function(){confirmEmail(paymentEmail, initialElements, conversionTable)};
    messageContainer.appendChild(confirmBountyBtn);

    conversionTable.appendChild(messageContainer);
}

function restoreTable(iniElt, iniContainer) {
    while (iniContainer.firstChild) {
        iniContainer.removeChild(iniContainer.firstChild);
    }
    for (let i = 0; i < iniElt.length; i++) {
        iniContainer.appendChild(iniElt[i]);
    }
}

function getNumPoints() {
    const pointsRadios = document.getElementsByName("points-converted");
    let numPoints = 0;
    for (let i = 0; i < pointsRadios.length; i++) {
        if (pointsRadios[i].checked) {
            numPoints = pointsRadios[i].value;
        }
    }
    return numPoints;
}

function confirmEmail(paymentEmail, iniElt, iniContainer) {
    let messageContainer = document.getElementById('messageContainer');
    while (messageContainer.firstChild) {
        messageContainer.removeChild(messageContainer.firstChild);
    }
    if (paymentEmail.length === 0) {
        alert('Veuillez renseigner votre email de paiement.');
        let newMessage = document.createElement('p');
        newMessage.textContent = "Veuillez renseigner votre email de paiement !";
        newMessage.style["margin-bottom"] = '50px';
        messageContainer.appendChild(newMessage);

        let cancelBtn = createButton('Annuler', '200px', 'cancelBtn');
        cancelBtn.onclick = function(){restoreTable(iniElt, iniContainer)};
        messageContainer.appendChild(cancelBtn);

        let addEmailBtn = createButton('Ajouter', '', 'addEmailBtn');
        addEmailBtn.onclick = function(){addChangeEmail(messageContainer, iniElt, iniContainer, true)};
        messageContainer.appendChild(addEmailBtn);
    } else {
        let newSubtitle = document.createElement('h4');
        newSubtitle.style["margin-bottom"] = '25px';
        newSubtitle.textContent = "Confirmation de votre email de paiement :";
        messageContainer.appendChild(newSubtitle);

        let newMessage = document.createElement('p');
        let emailConfirmationMessage = 'Votre email de paiement est "' + paymentEmail +'".';
        newMessage.textContent = emailConfirmationMessage;
        messageContainer.appendChild(newMessage);

        let secondMessage = document.createElement('p');
        let infoMessage = "Pour rappel, il s'agit de l'email associé à votre compte PayPal ou Amazon.";
        secondMessage.textContent = infoMessage;
        secondMessage.classList.add('fw-normal');
        secondMessage.style["margin-bottom"] = '50px';
        messageContainer.appendChild(secondMessage);

        let cancelBtn = createButton('Annuler', '100px', 'cancelBtn');
        cancelBtn.onclick = function(){restoreTable(iniElt, iniContainer)};
        messageContainer.appendChild(cancelBtn);

        let modifyEmailBtn = createButton('Modifier', '100px', 'modifyEmailBtn');
        modifyEmailBtn.onclick = function(){addChangeEmail(messageContainer, iniElt, iniContainer, false)};
        messageContainer.appendChild(modifyEmailBtn);

        let confirmEmailBtn = createButton('Confirmer', '', 'confirmEmailBtn');
        confirmEmailBtn.onclick = function(){finalizePayment(iniElt, iniContainer, paymentEmail)};
        messageContainer.appendChild(confirmEmailBtn);
    }
}

function finalizePayment(iniElt, iniContainer, paymentEmail) {
    if (paymentEmail.length === 0) {
        event.preventDefault();
        return '';
    }
    let messageContainer = document.getElementById('messageContainer');
    while (messageContainer.firstChild) {
        messageContainer.removeChild(messageContainer.firstChild);
    }
    let newSubtitle = document.createElement('h4');
    newSubtitle.style["margin-bottom"] = '25px';
    newSubtitle.textContent = "Votre demande a bien été prise en compte !";
    messageContainer.appendChild(newSubtitle);

    let newMessage = document.createElement('p');
    let paymentConfirmationMessage = 'Merci pour votre demande de conversion. Veuillez consulter votre email "'+paymentEmail+'" pour vérifier votre paiement. A bientôt !';
    newMessage.textContent = paymentConfirmationMessage;
    newMessage.style["margin-bottom"] = '50px';
    messageContainer.appendChild(newMessage);

    let backBtn = createButton('Retour');
    backBtn.onclick = function(){restoreTable(iniElt, iniContainer)};
    messageContainer.appendChild(backBtn);
}

function addChangeEmail(container, iniElt, iniContainer, ifAdd=true) {
    let newForm = document.createElement('form');

    let emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'inputPaymentEmail';
    emailInput.placeholder = 'Entrez votre nouvel Email';
    emailInput.classList.add('flash-border-5s');
    emailInput.style["width"] = '400px';
    emailInput.required = true;
    newForm.appendChild(emailInput);

    container.appendChild(newForm);

    if (ifAdd) {
        let containedBtn = ['cancelBtn','addEmailBtn'];
        for (let i = 0; i < containedBtn.length; i++) {
            let btn = document.getElementById(containedBtn[i]);
            container.removeChild(btn);
        }
        let newBtn = createButton('Ajouter');
        newBtn.type = 'submit'
        newBtn.classList.add('mt-3');
        newBtn.onclick = function(){finalizePayment(iniElt, iniContainer, emailInput.value)};
        container.appendChild(newBtn);
    } else {
        let containedBtn = ['cancelBtn','modifyEmailBtn','confirmEmailBtn'];
        for (let i = 0; i < containedBtn.length; i++) {
            let btn = document.getElementById(containedBtn[i]);
            container.removeChild(btn);
        }
        let newBtn = createButton('Valider');
        newBtn.type = 'submit'
        newBtn.classList.add('mt-3');
        newBtn.onclick = function(){finalizePayment(iniElt, iniContainer, emailInput.value)};
        container.appendChild(newBtn);
    }
}