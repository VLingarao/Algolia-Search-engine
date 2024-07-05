import algoliasearch from "algoliasearch"


const client = algoliasearch("3RXAQ2790P", "fb336ca5739530d1ab11ffe536f63e18");
const index = client.initIndex("search");

index
  .search("John")
  .then(({ hits }) => {
    console.log(hits);
  })
  .catch(err => {
    console.log(err);
  });



let data = []

let resultsRootElement = document.querySelector('.results');

fetch('https://fakestoreapi.com/products').then(res=>res.json()).then(json=>{
    data = json;
    // console.log(data)
})

document.querySelector('#searchInput').addEventListener('keyup',()=>{
    let searchTerm = document.querySelector('#searchInput').value
    let resultsArray = []

    if(String(searchTerm).trim().length > 0){
        // resultsArray = data.filter(product=> String(product.title).includes(searchTerm))
        // // console.log(resultsArray)


    
    index.search(searchTerm).then((response) => {
        // console.log(response.hits)
        renderProducts(response.hits)
  })
  .catch(err => {console.log(err);});
    



    }else{removeElements() }
       
})

function renderProducts(products){
    removeElements()
    products.forEach(product => {
        renderSingleProduct(product);
    });
}

function renderSingleProduct(product){
    let resultDiv = document.createElement('div')
    let resultImage = document.createElement('img')
    let resultTitle = document.createElement('h4')
    let resultPrice = document.createElement('p')
    let purchaseButton = document.createElement('button')

    resultImage.src = product.image;
    resultTitle.innerText = product.title;
    resultPrice.innerText = product.price;
    purchaseButton.innerHTML = 'Purchase'

    resultDiv.appendChild(resultImage)
    resultDiv.appendChild(resultTitle)
    resultDiv.appendChild(resultPrice)
    resultDiv.appendChild(purchaseButton)
    resultDiv.className = 'result'

    resultsRootElement.appendChild(resultDiv);
}

function removeElements(){
    document.querySelectorAll('.result').forEach(prod=>{
        prod.remove()
    })
}


function addNewProduct(){
    index.saveObject({
            objectID: 92939,
            "id": 1,
            "title": "Cynohub <> React Project",
            "price": 109.95,
            "description": "This is a algolia based project ,where we learn how to use search",
            "category": "developement",
            "image": "https://picsum.photos/200",
            "rating": {
              "rate": 5,
              "count": 120
            }
    }).then(response=>{
        // console.log(response)
    })
}

addNewProduct()