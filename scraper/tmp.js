posts = document.querySelector('[class="PostStream"]')



firstPost = posts.firstChild
rolesOfPoster = Array.from(
  firstPost
    .querySelector('[class="PostUser-badges badges"]')
    .querySelectorAll('span')
).map(span => span.getAttribute('data-original-title'))
isEmployee = rolesOfPoster.includes("Admin", "Community Manager")