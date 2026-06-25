'use strict';

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = 5;
const optCloudClassPrefix = 'tag-size-';

   /* TITLES */

function generateTitleLinks(customSelector = '') {
  console.log('generateTitleLinks was run');

  /* remove titles */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

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

    /* link html variable */
    html = html + linkHTML;

    // console.log(html);
  }

titleList.innerHTML = html;

const links = document.querySelectorAll(optTitleListSelector + ' a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

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

  /* JAKIES LICZENIE TAGOW CHYBA / CHYBA GIT? */

  function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;

  if (normalizedMax === 0) {
    return optCloudClassPrefix + '1';
  }

  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

  /* TAGS */

function generateTags() {

  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* check if this tag is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
      /* add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* tagList.innerHTML = allTags.join(''); */

    }

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }

  /* END LOOP: for every article: */


/* find list of tags in right column */
const tagList = document.querySelector(optTagsListSelector);

const tagsParams = calculateTagsParams(allTags);
console.log('tagsParams:', tagsParams);

/* create variable for all links HTML code */
let allTagsHTML = '';

/* START LOOP: for each tag in allTags */
for (let tag in allTags) {
  /* generate code of a link and add it to allTagsHTML */
  const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';

allTagsHTML += tagLinkHTML;
}

/* END LOOP: for each tag in allTags */

/* add html from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;
}

function tagClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove('active');
  }

  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let foundTagLink of foundTagLinks) {
    foundTagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const links = document.querySelectorAll('a[href^="#tag-"]');

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}

 /* AUTHORS */

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find author */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* get data-author*/
    const articleAuthor = article.getAttribute('data-author');

    /* generate HTML */
    const linkHTML = 'by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';

    /* HTML into author */
    authorWrapper.innerHTML = linkHTML;
  }

}

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }

  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let foundAuthorLink of foundAuthorLinks) {
    foundAuthorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const links = document.querySelectorAll('a[href^="#author-"]');

  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}

 /* TAGSLIST */



generateTitleLinks();
generateTags();
generateAuthors();
addClickListenersToTags();
addClickListenersToAuthors();
