const burgerBtn = document.querySelector('.burger');
const overlay = document.querySelector('.overlay');
const nav = document.querySelector('.nav');
let isMenuShow = false;

const showMenu = () => {
  document.body.classList.add('overlay');  
  nav.classList.remove('displayNone');
  setTimeout(() => {
    nav.classList.add('nav_active');
    burgerBtn.classList.add('burger_close');
  }, 0);  
  isMenuShow = true;  
};

const closeMenu = () => {  
  document.body.classList.remove('overlay');  
  nav.classList.remove('nav_active');
  burgerBtn.classList.remove('burger_close');
  isMenuShow = false;
  setTimeout(() => {
    nav.classList.add('displayNone');
  }, 500)

};

burgerBtn.addEventListener('click', () => {  
  if (isMenuShow) {      
    closeMenu()   
  } else showMenu();
})

document.body.addEventListener('click', ({target}) => {
  if (target.classList.contains('overlay') || (target.classList.contains('nav__link'))) {
    closeMenu();
  }
});

const mediaQuery = window.matchMedia('(max-width: 1024px)');
mediaQuery.addListener(closeMenu);