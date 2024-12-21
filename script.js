let url = "https://www.freetogame.com/api/games";

//Dynamic UI Designs
let container = document.createElement("div");
container.className = "container";

let heading = document.createElement("h1");
heading.className = "heading";

let outputContainer = document.createElement("div");
outputContainer.className = "outputContainer";

heading.innerText = "Select game to get details of game";

document.body.appendChild(heading);
document.body.appendChild(container);
document.body.appendChild(outputContainer);



//Fetch data from API using promise.
let promise = new Promise((resolve,reject)=>{

    let request = new XMLHttpRequest();

    request.open("GET",url);


    request.onload = function(){ 
        if(request.status == 200){
            let data = JSON.parse(request.response);
            resolve(data);
        }else
            reject("Some error occured while fetching the data");
    }
    request.send();
})

function displayDetails(title,thumbnail,short_description,publisher,developer,gameURL){
  outputContainer.innerHTML = `<div class="card outputCard" style="width: 18rem;">
 <img src="${thumbnail}" class="card-img-top" alt="thumbnail">
  <div class="card-body">
    <h3 class="card-title">${title}</h3>
    <p class="card-text">${short_description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><a href="${gameURL}">Link to website</li>
    <li class="list-group-item"><span>Publisher: </span>${publisher}</li>
    <li class="list-group-item"><span>Developer: </span>${developer}</li>
  </ul>
</div>`
}
promise.then((data)=>{
    let dropdownHTML = `<div class="dropdown">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" 
  aria-expanded="false">
   Select Game
  </button>
  <ul class="dropdown-menu gameList">
  ${data.map((element)=>{   return `<li 
   data-title="${element.title}" 
   data-thumbnail="${element.thumbnail}"  
   data-short_description="${element.short_description}"
   data-publisher="${element.publisher}" 
   data-developer="${element.developer}"
   data-url=${element.game_url}>${element.title}</li>`
  }).join('')
}
  </ul>
</div>`
container.innerHTML = '';  
container.innerHTML = dropdownHTML;


let gameList = document.querySelectorAll(".gameList li");

gameList.forEach((item)=>{
  item.addEventListener("click",function(){
    let title = item.dataset.title;
    let thumbnail = item.dataset.thumbnail;
    let short_description = item.dataset.short_description;
    let publisher = item.dataset.publisher;
    let developer = item.dataset.developer;
    let gameURL = item.dataset.url;
    displayDetails(title,thumbnail,short_description,publisher,developer,gameURL);
  })
})
}).catch((err)=>console.log(err));

// data-title=${element.title} data-thumbnail=${element.thumbnail} data-description=${element.short_description}
    // data-url=${game_url} data-publisher=${element.publisher} data-developer=${element.developer}
    // data-profile=${freetogame_profile_url}