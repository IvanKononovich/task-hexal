// -------------------------------------------------------------------------
// start slider script
// -------------------------------------------------------------------------

$('.slider').slick({
    arrows: false,
    dots: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
});

// -------------------------------------------------------------------------
// end slider script
// -------------------------------------------------------------------------



// -------------------------------------------------------------------------
// start burger script
// -------------------------------------------------------------------------

const burgerButton = document.querySelector('.button-open-burger');
const burgerOpenBg = document.querySelector('.burger__open-bg');

function openBurger() {
    const burgerContainer = document.querySelector('.burger__container');

    burgerButton.classList.toggle('button-open-burger_open');
    burgerContainer.classList.toggle('show');
}

[burgerButton, burgerOpenBg].forEach((item) => {
    item.addEventListener('click', openBurger);
    item.addEventListener('touch', openBurger);
});

// -------------------------------------------------------------------------
// end burger script
// -------------------------------------------------------------------------



// -------------------------------------------------------------------------
// start send form
// -------------------------------------------------------------------------

const feedbackForm = document.querySelector('.feedback__form');

function validationCheck(dataToCheck) {
    const regExp = dataToCheck.regExp;
    const input = dataToCheck.input;
    const str = input.value;
   
    if (str) {
        const condition = regExp.test(str);

        if (condition) {
            input.classList.remove('feedback__input_err');
            return true;
        }
    }
    
    input.classList.add('feedback__input_err');
    return false;
}

function dataFormCollection() {
    const listInputs = feedbackForm.querySelectorAll('*');
    const listDataToCheck = [
        {
            title: 'name',
            regExp: /^[a-zа-я]+$/gi,
        },
        {
            title: 'email',
            regExp: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/gi,
        }
    ];
    const data = {};

    const admissionToSend = [...listInputs].every((input) => {
        if (input.dataset.type) {
            const title = input.dataset.type;
            const content = input.value;
            const dataToCheck = listDataToCheck.find((item) => item.title === title);

            if (dataToCheck) {
                dataToCheck.input = input;
                data[title] = content;

                return validationCheck(dataToCheck)
            } else {
                data[title] = content;
            } 
        }

        return true;
    });

    if (admissionToSend) {
        sendRequest('http://localhost:8080', JSON.stringify(data));
    }
}

function sendRequest(url, data) {
    const request = fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: data,
    });

    request.then(() => {
        const feedbackFormCap = document.querySelector('.feedback__form-cap');
        feedbackFormCap.classList.add('show');

        localStorage.setItem('formSubmission', 'true');

        window.location.href = './success.html';
    })
    .catch(() => {
        alert('Server is not responding')
    });
}

feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!localStorage.formSubmission) {
        dataFormCollection();
    }
});

if (localStorage.formSubmission) {
    const feedbackFormCap = document.querySelector('.feedback__form-cap');
    feedbackFormCap.classList.add('show');
}

// -------------------------------------------------------------------------
// end send form
// -------------------------------------------------------------------------
