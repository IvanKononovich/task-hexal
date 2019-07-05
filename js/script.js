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

function openBurger(event) {
    

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