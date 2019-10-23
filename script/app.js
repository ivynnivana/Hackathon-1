function getApiData(url) {
  axios.get(url).then(response => {
    let data = structureObjectData(getRandomCompanies(response.data));
    createCards(data);
  });
}
//This function will filter out any objects that do not have names
function checkName(item) {
  return item.name !== "";
}
//this function will getRandom Companies from the api data
function getRandomCompanies(data) {
  //this filters the function and returns an array of objects that have names
  let filteredData = data.filter(checkName);
  let randomArray = [];

  //loop 100 times and get 100 random companies
  while (randomArray.length !== 100) {
    let random = Math.floor(Math.random() * filteredData.length);
    if (randomArray.indexOf(filteredData[random]) === -1) {
      randomArray.push(filteredData[random]);
    }
  }
  return randomArray;
}

// this function will structure the objects for only the data we need to use
function structureObjectData(array) {
  let newArray = array.map(item => ({
    symbol: item.symbol,
    name: item.name,
    id: item.iexId
  }));
  console.log(newArray);
  return newArray;
}
function createCards(arr) {
  let container = document.querySelector(".card");

  for (i = 0; i < arr.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card-container");
    container.appendChild(card);

    //Create span for name, symbol and iexID
    let companyName = document.createElement("h3");
    companyName.classList.add("card-container__name");
    card.appendChild(companyName);
    let companySymbol = document.createElement("p");
    companySymbol.classList.add("card-container__symbol");
    card.appendChild(companySymbol);
    let companyID = document.createElement("p");
    companyID.classList.add("card-container__ID");
    card.appendChild(companyID);
    //Create textnode for name, symbol and iexID
    let companyNameValue = document.createTextNode(arr[i]["name"]); //Creating text node and appending name value for arr[i]
    companyName.appendChild(companyNameValue);
    let companySymbolValue = document.createTextNode(arr[i]["symbol"]); //creating text node and appending symbol value for arr[i]
    companySymbol.appendChild(companySymbolValue);
    let companyIDValue = document.createTextNode(arr[i]["id"]); //creating text node and appending iexID value for arr[i]
    companyID.appendChild(companyIDValue);
  }
}

function filterFunction() {
  let searchInput = document.querySelector(".card__text-input");
  let filter = searchInput.value.toUpperCase();
  let cardSection = document.querySelector(".card");
  let card = cardSection.getElementsByClassName("card-container");

  for (i = 0; i < card.length; i++) {
    let symbol = card[i].getElementsByClassName("card-container__symbol")[0];
    let name = card[i].getElementsByClassName("card-container__name")[0];

    let symbolContent = symbol.innerText;
    let nameContent = name.innerText;

    if (
      symbolContent.toUpperCase().indexOf(filter) > -1 ||
      nameContent.toUpperCase().indexOf(filter) > -1
    ) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}

filterFunction();

getApiData("https://api.iextrading.com/1.0/ref-data/symbols");
