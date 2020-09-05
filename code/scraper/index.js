const fs = require('fs')
const puppeteer = require('puppeteer');
let links = require('./data/dicussion-links.json');

startScraper(links)


async function startScraper(links)  {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  // links = links.slice(1,5);
  const {errors, results} = await scrapeLinks(page, links)
  await browser.close();

  saveResults({errors, results})
}

function saveResults({errors, results}) {
  console.log(`
    ***********************************
    finished scraping - writing to files
    ***********************************
  `)
  fs.writeFileSync(__dirname + `/data/results/results.json`, JSON.stringify(results, null, 2)); 
  fs.writeFileSync(__dirname + `/data/errors/error.json`, JSON.stringify(errors, null, 2)); 

  console.log(`
    ***********************************
                  DONE
    ***********************************
  `)
}

async function scrapeLinks(page, links) {
  const errors = []
  const results = []

  let count = 0;
  for(let link of links) {
    console.log(` ${count} : ${link}`)
    count++;

    try {
      await page.goto(link);
      const discussion = await scrapeDiscussion(page)
      await sleep(1)
      results.push(discussion)
    } catch (err) {
      errors.push({
        link,
        error: err
      })
      console.error('Error Occured: ', link)
    }
  }

  return {
    errors,
    results
  }
}

async function scrapeDiscussion(page) {
  return await page.evaluate(pageEvaluation);
}

async function pageEvaluation() {
  // Scrape the discussions
  // 1. Check if discussion was started by admin
  // 2. Scrape Discussion Title
  // 3. Scrape First Post (Question)
  // 4. Scrape First Answer of an Admin / Community Manager

  const discussion = {
    link: '',
    title: '',
    question: '',
    answer: '',
    startedByEmployee: false
  }
  discussion.link = window.location.href
  discussion.title = document.querySelector('[class="DiscussionHero-title"]').textContent
  const posts = document.querySelector('[class="PostStream"]')

  const firstPost = posts.firstChild

  discussion.startedByEmployee = isPostFromEmployee(firstPost)
  discussion.question = getPostText(posts.firstChild)


  answer = null;
  let count = 0
  while(!answer && count < 3) {
    answer = findEmployeeAnswer(posts)
    count++
    await scrollDown()
  }
  discussion.answer = answer
  

  return discussion

  /**
   * Takes the dom element which wraps all the posts
   * Return the first post which is from an employee
   * @param {DOM Node} posts 
   */
  function findEmployeeAnswer(posts) {
    const postsElements = Array.from(
      posts.querySelectorAll('[class="PostStream-item"]')
    )
    postsElements.shift()


    for(const post of postsElements) {
      if(isPostFromEmployee(post)) {
        return getPostText(post)
      }
    }
  }

  async function scrollDown() {
    const height = document.querySelector('body').offsetHeight
  
    window.scrollTo({
      top: height,
      left: 100,
      behavior: 'smooth'
    });

    await sleep(1)
  }

  async function sleep(seconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000)
    })
  }

  function isPostFromEmployee(post) {
    const badgeWrapper = post
      .querySelector('[class="PostUser-badges badges"]')
    if(!badgeWrapper) return false

    const badges = badgeWrapper.querySelectorAll('span')
    if(badges.length === 0) return false

    const rolesOfPoster = Array.from(badges)
      .map(span => span.getAttribute('data-original-title'))
    const isEmployee = rolesOfPoster.includes("Admin") || rolesOfPoster.includes("Community Manager") 
    return !!isEmployee
  }

  function getPostText(node) {
    return node.querySelector('[class="Post-body"]').innerText.replace('\n',  '')
  }
}




async function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000)
  })
}