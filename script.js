const cart = document.getElementsByClassName("cart")[0]
const cartArr = [];
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

async function badQuotes() {
    const response = await fetch("https://api.breakingbadquotes.xyz/v1/quotes");
    const quote = await response.json();
    

    const apiContainer = document.getElementById("api")
    const api = document.createElement("p")
    apiContainer.classList.add("text-center", "text-light", "skugga")
    apiContainer.appendChild(api)
    api.innerText = `${quote[0].quote} - ${quote[0].author}`



    
}



const itemsArr = [
    new Pastry("Lilla Sur Orginal", "Vårt egna surdegsbröd", 20, ["Vetemjöl"], "./assets/lillasurorginal.jpg"),
    new Pastry("Kremla", "Sveriges godaste kremla", 20, ["Vetemjöl", "Mjölk", "Mandel"], "./assets/kremla.jpg"),
    new Pastry("Kålltorpsfralla", "Gbgs bästa kålltorpsfralla", 20, ["Vetemjöl", "Vallmofrö"], "./assets/kålltorpsfralla.jpg"),
    new Pastry("Kanelbullar", "Vårt take på kanelbullar", 15, ["Vetemjöl", "Mjölk", "Ägg"], "./assets/kanelbulle")
]

const buyButtons = document.getElementsByClassName("buy");
for (const button of buyButtons) {
    button.addEventListener("click", ()=>{
        let bread = button.parentElement;
        bread = bread.innerText
        for (const item of itemsArr) {
            if(bread.includes(item.description)){
                if (cartArr.includes(item.name)) {
                    const breadElement = document.getElementById(item.name)
                    const badgeElement = breadElement.lastChild
                    let num = parseInt(badgeElement.innerText)
                    num += 1
                    badgeElement.innerText = num;
                    console.log(badgeElement)
                    return
                }
                const li = document.createElement("li")
                const badge = document.createElement("span")
                badge.classList.add("badge", "bg-primary", "rounded-pill")
                badge.innerText = 1;
                li.innerText = item.name
                li.id = item.name
                li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center")
                li.appendChild(badge)
                cart.appendChild(li)
                cartArr.push(item.name)
                badQuotes();
            }
        }
    })
}





const infoButtons = document.getElementsByClassName("info");
const infoModal = new bootstrap.Modal("#modalModel")
const modalTitle = document.getElementsByClassName("modal-title")[0]
const modalBody = document.getElementsByClassName("modal-body")[0]

for (const button of infoButtons) {
    button.addEventListener("click", ()=>{
        let bread = button.parentElement;
        bread = bread.innerText;
        for (const item of itemsArr) {
            if(bread.includes(item.description)){
                modalTitle.innerText = item.name
            for (const ingredient of item.ingredient) {
                modalBody.innerText += `${ingredient}, `
            }
            infoModal.show();
            }
            
        }
        
        
    })
    modalBody.innerText = "";
    
}




// buy.addEventListener("click", ()=>{

//     const li = document.createElement("li")
//     const item = document.createElement("p")
//     item.innerText = "Kremla 1x"
//     li.appendChild(item)
//     cart.appendChild(li)
// })

//detta bör optimeseras, istället för att ha en buy för varje, så har man en buy för allt.
//funktionen ska leta sig upp och se vilken produkt har blivit tryckt.
//därefter ska den läggas till i carten
//innan detta så ska funktionen samt se ifall produkten redan finns i carten. ifall de finns ska det läggas till +1. om inte så skapas en ny list item.
//detta är rätt enkelt, man skapar bara en tom array som heter cart. är carten tom så finns ingen produkt och list item kan läggas. om det finns en av samma produkt ska den göra +1.
//rätt enkelt med ett lamba uttryck.