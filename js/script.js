'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';

function generateTitleLinks() {
  console.log('generateTitleLinks was run');

  /* remove titles */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';

  for (let article of articles) {
    /* get article id */
    const articleId = article.getAttribute('id');

    /* find title */
    const articleTitle = article.querySelector(optTitleSelector);

    /* get title*/
    const title = articleTitle.innerHTML;

    /* create HTML link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + title + '</span></a></li>';

    /* link into title */
    titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* link html variable */
    html = html + linkHTML;

    console.log(html);
  }

titleList.innerHTML = html;

}

const titleClickHandler = function(event) {
  event.preventDefault();

  const clickedElement = this;

  console.log('Link was clicked!');
  console.log(event);
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

for (let activeLink of activeLinks) {
  activeLink.classList.remove('active');
}

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
const activeArticles = document.querySelectorAll('.post.active');

for (let activeArticle of activeArticles) {
activeArticle.classList.remove('active');
    }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}