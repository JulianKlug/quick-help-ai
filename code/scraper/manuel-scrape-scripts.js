// Extract Dicussion LInks

let regex = /\/d\/[0-9]{4}/i;

let discussionLinks = Array.from(document.querySelectorAll('a'))
  .filter(item => item.href.match(regex))

let urls = discussionLinks.map(item => item.href)


// Scroll Down Script

function scrollDown() {
	const height = document.querySelector('body').offsetHeight

  window.scrollTo({
    top: height,
    left: 100,
    behavior: 'smooth'
  });
}

let intervall = setInterval(() => { scrollDown() }, 500)


// Script to save data from console

(function(console){

  console.save = function(data, filename){
  
      if(!data) {
          console.error('Console.save: No data')
          return;
      }
  
      if(!filename) filename = 'console.json'
  
      if(typeof data === "object"){
          data = JSON.stringify(data, undefined, 4)
      }
  
      var blob = new Blob([data], {type: 'text/json'}),
          e    = document.createEvent('MouseEvents'),
          a    = document.createElement('a')
  
      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
   }
  })(console)
