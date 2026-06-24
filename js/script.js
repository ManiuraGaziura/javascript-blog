'use strict';

const titleClickHandler = function(event) {
  event.preventDefault();

  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (const activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.post.active');

  for (const activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
};

const links = document.querySelectorAll('.titles a');

for (const link of links) {
  link.addEventListener('click', titleClickHandler);
}