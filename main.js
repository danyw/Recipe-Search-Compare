const userGridContainer = document.querySelector(".user-grid-container");
const recipesContainer = document.getElementById("recipes-container");
const submitButtton = document.getElementById("submit-button");

function RecipeTile(title, imgUrl, time, ingredients, servings, description, recipeUrl) {
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
  h3.textContent = "Today's Featured Recipe";
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
  footer.appendChild(recipeLink);

  return recipe;
}

// let searchInput = searchInput.value
document.querySelector("form").addEventListener("submit", function (e) {
  deleteCurrentRecipies();
  const searchInput = document.querySelector("#search-input");
  e.preventDefault();
  sendAPIRecipeRequest(searchInput.value);
});

// submitButtton.addEventListener("click", );

async function sendAPIRecipeRequest(search) {
  let APP_ID = "6371a87a";
  let API_KEY = "9ab806ec208f3bb4360874ad2c05212b";

  // let response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${API_KEY}`);
  let response = await fetch(`https://api.edamam.com/search?&app_id=${APP_ID}&app_key=${API_KEY}&q=${search}`);
  let data = await response.json();
  recipesData(data);
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
      recipe.url
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

// function addRecipeTiles() {
// const recipe = RecipeTile("Recipe", "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600", 30, 8, "1-3", "Its tasty", "https://www.deliciousmagazine.co.uk/recipes/");
// recipesContainer.appendChild(recipe);
// }
// addRecipeTiles();
