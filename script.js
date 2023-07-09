'use strict';

// Selections
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function(btn) {
  return btn.addEventListener('click',openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////
// Button Scrolling

btnScrollTo.addEventListener('click', function() {
  section1.scrollIntoView({behavior: 'smooth'});
})

//////////////////////////////////////////
// Page navigation

navLinks.addEventListener('click' , function(e) {
  e.preventDefault();
  
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

// Tabbed component

tabsContainer.addEventListener('click', function(e) {
  
  // Restore all buttons to default position
  tabs.forEach(function(tab) {
    return tab.classList.remove('operations__tab--active');
  })

  // Make the target button active
  e.target.closest('.operations__tab').classList.add('operations__tab--active');

  // Hide all inactive contents
  tabsContent.forEach(function(c) {
    return c.classList.remove('operations__content--active')
  })

  // Make active content visible
  const data = e.target.closest('.operations__tab').dataset.tab;
  const activeContent = document.querySelector(`.operations__content--${data}`).classList.add('operations__content--active')
})