showDrinkForm();
getDrinks();
let selectedValue;


let selector = document.querySelector("#InputNumberOfIngredients");
let ingredientContainer= document.querySelector("#container-ingredients");
let container = document.querySelector("#container-drinks");

//lägga till input selectors
let nameInput= document.querySelector("#name-input");
let idInput= document.querySelector("#id-input");
let instructionsInput = document.querySelector("#instructions-input")
let addDrinkBtn = document.querySelector("#btn-add-drink");

//lyssnare
addDrinkBtn.addEventListener("click",addDrink); //lägg till drink

function showDrinkForm() //denna är bara för att gömma div:en som öppnas upp när man klickar på add a drink knappen
 { 
    let x = document.querySelector("#form-add-drink")
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


 function addDrink() //lägga till en drink onödigt klyddig känner jag
 { 
 
  let ingredientArray =[];

  let counter =0;
for(let z=0; z <= 5;z++)
{

   if(document.querySelector("#ingredient-input-"+counter) !=null)
   {
    ingredientToAdd = document.querySelector("#ingredient-input-"+counter);

counter=counter+1;
  
    ingredientArray.push(ingredientToAdd.value);

   }}
   




  let newDrink = {
    id: Number(idInput.value),
    name: nameInput.value,
    ingredients: ingredientArray,
    instructions: instructionsInput.value,
    
  };



 fetch("https://localhost:7130/Drink", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDrink),
  
  });
  getDrinks();
  
}


function testpost() //bara för att testa Post metoden
{
  let newDrink = {
    id: Math.floor(Math.random() * (10000 - 1 + 1)) + 1,
    name: "magisk drink",
    ingredients: ["testar array"],
    instructions: "skaka",
    
  };


  
 fetch("https://localhost:7130/Drink", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDrink),

  });
  getDrinks()
}




selector.addEventListener("click",()=>
selector.addEventListener("change", () => {
    ingredientContainer.innerHTML =" "; //rensa boxen varje gång användare ändrar antal
    let selectedValue = selector.value;
   // addDrink();
    for (let i = 0; i < selectedValue; i++)
    {
      
    
        
        let htmlingredient = `<input 
        id=ingredient-input-${i}  
        type="text" 
        class="form-control" 
        placeholder="Enter ingredient"
/> `
ingredientContainer.innerHTML +=htmlingredient;
    }


}

));

function getDrinks()
{
fetch("https://localhost:7130/Drink")
.then((response) => response.json())
.then((data) => displayDrinks(data));
}


function displayDrinks(drinks) {
  container.innerHTML ="";
  drinks.forEach((d) => {

    let ingredientsList = d.ingredients.map((ingredient) => `<p2>${ingredient}</p2> <br>`).join('');
    

 
    let html = `
    <div class="col-4 text-center">
        <h1 >${d.name}</h1>
        <h1 >"Id: "${d.id}</h1>
        
     
        <div class=img-cover>
        <img src="https://it-tim.se/bilder/drinks/emptyglass.jpg">
         </div>
      
        <h3 ">"How to make"</h3>
        <br>
        <p2">${ingredientsList}</p2>
      

   
    </div>
    `;

    container.innerHTML += html;
  });
}
