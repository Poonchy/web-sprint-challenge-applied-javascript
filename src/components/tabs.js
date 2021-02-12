const Tabs = (topics) => {
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //
  let topic = document.createElement("div")
  topic.classList.add("topics")

  topics.forEach((element)=>{
    let tab = document.createElement("div")
    tab.classList.add("tab")
    tab.textContent = element

    const sheet = new CSSStyleSheet();
    tab.addEventListener('click', function(event){
      sheet.replaceSync(`.cards-container .card {display:none;} .cards-container .${element.split(".")[0]}{display:flex;}`)
      document.adoptedStyleSheets = [sheet];
    })
    
    
    // Apply the stylesheet to a document:
    

    topic.appendChild(tab)
  })
  return topic
}

const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `https://lambda-times-api.herokuapp.com/topics`
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //
  let toPasteTo = document.querySelector(selector)
  axios.get('https://lambda-times-api.herokuapp.com/topics')
    .then(data => {
      let tabs = Tabs(data.data.topics)
      toPasteTo.appendChild(tabs)
    })
  
}

export { Tabs, tabsAppender }
