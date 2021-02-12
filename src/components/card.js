const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  let card = document.createElement("div")
  card.classList.add("card")
  
  let headline = document.createElement("div")
  headline.classList.add("headline")
  headline.textContent = article.headline
  
  let author = document.createElement("div")
  author.classList.add("author")
  
  let imgContainer = document.createElement("div")
  imgContainer.classList.add("img-container")
  
  let img = document.createElement("img")
  img.setAttribute('src', article.authorPhoto)
  
  let authorName = document.createElement("span")
  authorName.textContent = `By ${article.authorName}`

  imgContainer.appendChild(img)

  author.appendChild(imgContainer)
  author.appendChild(authorName)

  card.appendChild(headline)
  card.appendChild(author)

  return card
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  let toPasteTo = document.querySelector(selector)
  
  axios.get('https://lambda-times-api.herokuapp.com/articles')
    .then(data => {
      console.log(data.data.articles)
      for (let element in data.data.articles){
        data.data.articles[element].forEach((card)=>{
          let fullCard = Card(card)
          toPasteTo.appendChild(fullCard)
        })
      }
    })
}

export { Card, cardAppender }
