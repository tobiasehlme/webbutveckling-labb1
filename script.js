const cart = document.getElementsByClassName("cart")[0]
let cartArr = [];
const shoppingCart = document.getElementById("shopping-cart")
const canvasBody = document.getElementsByClassName("offcanvas-body")[0]
badQuotes();

class Pastry{
    constructor(name, description, price, ingredient, img){
        this.name = name;
        this.description = description;
        this.price = price;
        this.ingredient = ingredient
        this.img = img
    }
}

const itemsArr = [
    new Pastry("Lilla Sur Orginal", "Vårt egna surdegsbröd", 20, ["Vetemjöl"], "./assets/lillasurorginal.jpg"),
    new Pastry("Kremla", "Sveriges godaste kremla", 20, ["Vetemjöl", "Mjölk", "Mandel"], "./assets/kremla.jpg"),
    new Pastry("Kålltorpsfralla", "Gbgs bästa kålltorpsfralla", 20, ["Vetemjöl", "Vallmofrö"], "./assets/kålltorpsfralla.jpg"),
    new Pastry("Kanelbullar", "Vårt take på kanelbullar", 15, ["Vetemjöl", "Mjölk", "Ägg"], "./assets/kanelbulle.jpg")
]
getProducts();




async function badQuotes() {
    const response = await fetch("https://api.breakingbadquotes.xyz/v1/quotes");
    const quote = await response.json();
    

    const apiContainer = document.getElementById("api")
    const api = document.createElement("p")
    apiContainer.classList.add("text-center", "text-light", "skugga")
    apiContainer.appendChild(api)
    api.innerText = `${quote[0].quote} - ${quote[0].author}`



    
}





const buyButtons = document.getElementsByClassName("buy");

for (const button of buyButtons) {
    button.addEventListener("click", ()=>{
        let bread = button.parentElement;
        bread = bread.innerText
        const pling = document.createElement("span")
        pling.classList.add("position-absolute", "top-0", "start-100", "translate-middle", "p-2", "bg-danger", "border", "border-light", "rounded-circle")
        if (shoppingCart.childElementCount == 0) {
            shoppingCart.appendChild(pling)
        }
        for (const item of itemsArr) {
            if(bread.includes(item.description)){
                if (cartArr.includes(item.name)) {
                    const badgeElement = document.getElementById(`${item.name}-badge`)
                    let badgeNumb = parseInt(badgeElement.innerHTML)
                    badgeNumb += 1
                    badgeElement.innerText = badgeNumb
                    return
                }
                const li = document.createElement("li")
                const badge = document.createElement("span")
                const removeButton = document.createElement("button")
                removeButton.classList.add("remove")
                removeButton.id = `${item.name}-remove`
                badge.classList.add("badge", "bg-primary", "rounded-pill")
                badge.innerText = 1;
                badge.id = `${item.name}-badge`
                li.innerText = item.name
                li.id = item.name
                li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-evenly", "text-light", "p-2", "skugga")
                li.appendChild(badge)
                li.appendChild(removeButton)
                cart.appendChild(li)
                cartArr.push(item.name)
                
                RemoveButtonsEvent(removeButton.id);
                
                
            }
        }
       
    })
}

function RemoveButtonsEvent(id) {
    
    const removeButton = document.getElementById(id)
    if (removeButton != null){
        removeButton.addEventListener("click", ()=>{
            const badge = removeButton.previousSibling
            const item = removeButton.parentElement
            if (parseInt(badge.innerText) == 1) {
                cart.removeChild(item)
                cartArr = cartArr.filter((p)=>p != item.id)
                if (cartArr.length == 0) {
                    Empty();
                }
                return
            }
            
            else{
                badgeNumb = parseInt(badge.innerText)
                badgeNumb -= 1
                badge.innerText = badgeNumb
                return
            }
        })
    }
}

const canvas = document.getElementById("offcanvas")
const bsCanvas = new bootstrap.Offcanvas(canvas)


shoppingCart.addEventListener("click", ()=>{
    bsCanvas.show();
    
    if (shoppingCart.firstElementChild != null) {
        shoppingCart.removeChild(shoppingCart.firstElementChild)
        
    }
    if (cart.childElementCount == 0 && canvasBody.lastElementChild.id != "tom") {
        Empty();
    }
    if (cart.childElementCount > 0 && canvasBody.lastElementChild.id == "tom"){
        canvasBody.removeChild(tom)
    }
})

function Empty() {
    const tom = document.createElement("p")
        tom.id = "tom"
        tom.innerText = "Ooooh nej, din varukorg är tom!"
        canvasBody.appendChild(tom)
}




const infoButtons = document.getElementsByClassName("info");
const infoModal = new bootstrap.Modal("#modalModel")
const modalTitle = document.getElementsByClassName("modal-title")[0]
modalTitle.classList.add("sofia-sans")
const modalBody = document.getElementsByClassName("modal-body")[0]
modalBody.classList.add("sofia-sans")

for (const button of infoButtons) {
    button.addEventListener("click", ()=>{
        let bread = button.parentElement;
        bread = bread.innerText;
        for (const item of itemsArr) {
            if(bread.includes(item.description)){
                modalTitle.innerText = item.name
            for (const ingredient of item.ingredient) {
                modalBody.innerHTML += `<p>${ingredient} <br></p>`
                
            }
            infoModal.show();
            }
            
        }
        
        
    })
    const modalButton = document.getElementById("modal-button")
    modalButton.addEventListener("click", ()=>{
        modalBody.innerText = "";
    })
    
}

function getProducts() {
    const productDiv = document.getElementById("product-div")
for (const item of itemsArr) {
    const colDiv = document.createElement("div")
    colDiv.classList.add("col-2", "pt-5")
    const cardDiv = document.createElement("div")
    cardDiv.classList.add("card", "product-card", "text-light")
    const cardHeader = document.createElement("div")
    cardHeader.classList.add("card-header", "sofia-sans")
    cardHeader.innerText = item.name
    const cardImg = document.createElement("img")
    cardImg.src = item.img
    cardImg.alt = item.description
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body", "sofia-sans")
    const cardBodyText = document.createElement("p")
    cardBodyText.classList.add("card-text")
    cardBodyText.innerHTML = `${item.description} <br> ${item.price} kr`
    const cardInfo = document.createElement("a")
    cardInfo.classList.add("btn", "btn-primary", "info", "d-inline-flex", "m-1")
    cardInfo.innerText = "Innehåll"
    const cardBuy = document.createElement("a")
    cardBuy.classList.add("btn", "btn-primary", "buy", "d-inline-flex", "m-1")
    cardBuy.innerText = "Köp"

    productDiv.appendChild(colDiv)
    colDiv.appendChild(cardDiv)
    cardDiv.appendChild(cardHeader)
    cardDiv.appendChild(cardImg)
    cardDiv.appendChild(cardBody)
    cardBody.appendChild(cardBodyText)
    cardBody.appendChild(cardInfo)
    cardBody.appendChild(cardBuy)

    
}
}



