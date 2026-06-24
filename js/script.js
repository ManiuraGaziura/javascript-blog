'use strict';

const titleClickHandler = function(event) {
  event.preventDefault();

  console.log('Link was clicked!');
  console.log(event);

  const clickedElement = this;

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (const activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (const activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const links = document.querySelectorAll('.titles a');

for (const link of links) {
  link.addEventListener('click', titleClickHandler);
}