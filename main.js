const userGridContainer = document.querySelector(".user-grid-container");
const recipesContainer = document.getElementById("recipes-container");
const submitButtton = document.getElementById("submit-button");
const recipeDetails = document.getElementById("recipe-details");
const backgroundPicture = document.getElementById("background-picture");

let recipe = [];

async function sendAPIRecipeRequest(search) {
  let APP_ID = "6371a87a";
  let API_KEY = "9ab806ec208f3bb4360874ad2c05212b";
  let response = await fetch(`https://api.edamam.com/search?&app_id=${APP_ID}&app_key=${API_KEY}&q=${search}`);
  let data = await response.json();
  console.log(data);
  recipesData(data);
}

// get
async function sendAPINutritionAnalysisRequest(title, servings, ingredientList) {
  let APP_ID = "dc851d7e";
  let API_KEY = "73ebff395d8af27738744484e5317740";
  let response = await fetch(
    `https://api.edamam.com/api/nutrition-data?&app_id=${APP_ID}&app_key=${API_KEY}&nutrition-type=cooking&ingr=${ingredientList}`
  );
  let data = await response.json();
  console.log(data);
  return data;
}

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  let app_id = "dc851d7e";
  let app_key = "73ebff395d8af27738744484e5317740";
  let pre = document.getElementById("response");

  var url = "https://api.edamam.com/api/nutrition-details?app_id=" + app_id + "&app_key=" + app_key;

  var xhr = createCORSRequest("POST", url);
  if (!xhr) {
    alert("CORS not supported");
    return;
  }

  // Response handlers.
  xhr.onload = function () {
    let response = xhr.responseText;
    const jsonResponse = JSON.parse(response);
    pre.innerHTML = "";
    populateInfoTable(jsonResponse);
  };

  xhr.onerror = function () {
    alert("Woops, there was an error making the request.");
  };

  pre.innerHTML = "Please give it a moment...";
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(recipe);
}

function detailsPrepare(ingredientLines, title, servings) {
  recipe = JSON.stringify({
    title: title,
    yield: servings,
    ingr: ingredientLines,
  });
  recipeDetails.setAttribute("data-state", "ON");
  makeCorsRequest();
}

function RecipeTile(title, imgUrl, time, ingredients, servings, description, recipeUrl, ingredientLines, mealType) {
  const recipe = document.createElement("div");
  recipe.classList.add("ft-recipe");

  const thumb = document.createElement("div");
  thumb.classList.add("ft-recipe__thumb");
  recipe.appendChild(thumb);

  const closeModal = document.createElement("span");
  closeModal.id = "close-modal";
  thumb.appendChild(closeModal);

  const closeModalIcon = document.createElement("i");
  closeModalIcon.classList.add("ion", "ion-md-close");
  closeModal.appendChild(closeModalIcon);

  const h3 = document.createElement("h3");
  h3.textContent = mealType;
  thumb.appendChild(h3);

  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = title;
  thumb.appendChild(img);

  const content = document.createElement("div");
  content.classList.add("ft-recipe__content");
  recipe.appendChild(content);

  const header = document.createElement("header");
  header.classList.add("content__header");
  content.appendChild(header);

  const rowWrapper = document.createElement("div");
  rowWrapper.classList.add("row-wrapper");
  header.appendChild(rowWrapper);

  const recipeTitle = document.createElement("h2");
  recipeTitle.classList.add("recipe-title");
  recipeTitle.textContent = title;
  rowWrapper.appendChild(recipeTitle);

  const userRating = document.createElement("div");
  userRating.classList.add("user-rating");
  rowWrapper.appendChild(userRating);

  const recipeDetails = document.createElement("ul");
  recipeDetails.classList.add("recipe-details");
  header.appendChild(recipeDetails);

  const timeLi = document.createElement("li");
  timeLi.classList.add("recipe-details-item", "time");
  recipeDetails.appendChild(timeLi);

  const timeIcon = document.createElement("i");
  timeIcon.classList.add("ion", "ion-ios-clock-outline");
  timeLi.appendChild(timeIcon);

  const timeValue = document.createElement("span");
  timeValue.classList.add("value");
  timeValue.textContent = time;
  timeLi.appendChild(timeValue);

  const timeTitle = document.createElement("span");
  timeTitle.classList.add("title");
  timeTitle.textContent = "Minutes";
  timeLi.appendChild(timeTitle);

  const ingredientsLi = document.createElement("li");
  ingredientsLi.classList.add("recipe-details-item", "ingredients");
  recipeDetails.appendChild(ingredientsLi);

  const ingredientsIcon = document.createElement("i");
  ingredientsIcon.classList.add("ion", "ion-ios-book-outline");

  ingredientsIcon.classList.add("ion", "ion-ios-book-outline");
  ingredientsLi.appendChild(ingredientsIcon);

  const ingredientsValue = document.createElement("span");
  ingredientsValue.classList.add("value");
  ingredientsValue.textContent = ingredients;
  ingredientsLi.appendChild(ingredientsValue);

  const ingredientsTitle = document.createElement("span");
  ingredientsTitle.classList.add("title");
  ingredientsTitle.textContent = "Ingredients";
  ingredientsLi.appendChild(ingredientsTitle);

  const servingsLi = document.createElement("li");
  servingsLi.classList.add("recipe-details-item", "servings");
  recipeDetails.appendChild(servingsLi);

  const servingsIcon = document.createElement("i");
  servingsIcon.classList.add("ion", "ion-ios-person-outline");
  servingsLi.appendChild(servingsIcon);

  const servingsValue = document.createElement("span");
  servingsValue.classList.add("value");
  servingsValue.textContent = servings;
  servingsLi.appendChild(servingsValue);

  const servingsTitle = document.createElement("span");
  servingsTitle.classList.add("title");
  servingsTitle.textContent = "Servings";
  servingsLi.appendChild(servingsTitle);

  const descriptionP = document.createElement("p");
  descriptionP.classList.add("description");
  descriptionP.textContent = description.toUpperCase();
  content.appendChild(descriptionP);

  const footer = document.createElement("footer");
  footer.classList.add("content__footer");
  content.appendChild(footer);

  const recipeLink = document.createElement("a");
  recipeLink.href = recipeUrl;
  recipeLink.textContent = "View Recipe";
  recipeLink.setAttribute("target", "_blank");
  footer.appendChild(recipeLink);

  const recipeLinkDetails = document.createElement("a");
  recipeLinkDetails.href = "#recipe-details";
  recipeLinkDetails.textContent = "Details";
  recipeLinkDetails.onclick = function (event) {
    event.preventDefault();
    detailsPrepare(ingredientLines);
  };
  footer.appendChild(recipeLinkDetails);
  return recipe;
}

function recipesData(data) {
  let description = `Source`;
  for (let i = 0; i < data.hits.length; i++) {
    let recipe = data.hits[i].recipe;
    let recipeTile = RecipeTile(
      recipe.label,
      recipe.image,
      recipe.totalTime,
      recipe.ingredientLines.length,
      recipe.yield,
      recipe.source,
      recipe.url,
      recipe.ingredientLines,
      recipe.mealType
    );
    recipesContainer.appendChild(recipeTile);
  }
}

function deleteCurrentRecipies() {
  const elements = document.querySelectorAll(".ft-recipe");
  elements.forEach((element) => {
    element.remove();
  });
}

function populateInfoTable(jsonResponse) {
  let calories = document.getElementById("calories-value");
  calories.textContent = jsonResponse.calories.toFixed(1);

  let totalFat = document.getElementById("total-fat-value");
  let totalFatPercent = document.getElementById("total-fat-percent");
  totalFat.textContent = jsonResponse.totalNutrients.FAT.quantity.toFixed(1);
  totalFatPercent.textContent = jsonResponse.totalDaily.FAT.quantity.toFixed(0);

  let cholersterol = document.getElementById("cholersterol-value");
  let cholersterolPercent = document.getElementById("cholersterol-percent");
  cholersterol.textContent = jsonResponse.totalNutrients.CHOLE.quantity.toFixed(1);
  cholersterolPercent.textContent = jsonResponse.totalDaily.CHOLE.quantity.toFixed(0);

  let sodium = document.getElementById("sodium-value");
  let sodiumPercent = document.getElementById("sodium-percent");
  sodium.textContent = jsonResponse.totalNutrients.NA.quantity.toFixed(1);
  sodiumPercent.textContent = jsonResponse.totalDaily.NA.quantity.toFixed(0);

  let totalCarbs = document.getElementById("total-carbs-value");
  let totalCarbsPercent = document.getElementById("total-carbs-percent");
  totalCarbs.textContent = jsonResponse.totalNutrients.CHOCDF.quantity.toFixed(1);
  totalCarbsPercent.textContent = jsonResponse.totalDaily.CHOCDF.quantity.toFixed(0);

  let protein = document.getElementById("protein-value");
  let proteinPercent = document.getElementById("protein-percent");
  protein.textContent = jsonResponse.totalNutrients.PROCNT.quantity.toFixed(1);
  proteinPercent.textContent = jsonResponse.totalDaily.PROCNT.quantity.toFixed(0);
}

document.querySelector("form").addEventListener("submit", function (e) {
  deleteCurrentRecipies();
  const searchInput = document.querySelector("#search-input");
  backgroundPicture.setAttribute("data-background", "OFF");
  e.preventDefault();
  sendAPIRecipeRequest(searchInput.value);
});
