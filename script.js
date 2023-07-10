'use strict';

// Selections
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('header');
const sections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]')

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

  // Return if null
  const clicked = e.target.closest('.operations__tab');
  if(!clicked) return;  

  // Make the target button active
  clicked.classList.add('operations__tab--active');

  // Hide all inactive contents
  tabsContent.forEach(function(c) {
    return c.classList.remove('operations__content--active')
  })



  // Make active content visible
  const data = e.target.closest('.operations__tab').dataset.tab;
  const activeContent = document.querySelector(`.operations__content--${data}`).classList.add('operations__content--active')
})

// Menu fade animation
const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    
    siblings.forEach(s => {
      if (s !== link)
        s.style.opacity = this
      });

    logo.style.opacity = this;
  }

}

nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

// Sticky navigation

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-90px'
}

const obsCallback = function(entries) {
  const [entry] = entries

  if(!entry.isIntersecting)
    nav.classList.add('sticky');
  else
  nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(obsCallback, obsOptions);
headerObserver.observe(header);

// Reveal sections on scroll

const revealSection = function(entries) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {root: null, threshold: 0.15});

sections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

// Lazy loading images

const imgObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
}

const loadImages = function(entries) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(e) {
    entry.target.classList.remove('lazy-img');
  })
  imgObserver.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImages, imgObserverOptions)

imgTargets.forEach(img => imgObserver.observe(img));