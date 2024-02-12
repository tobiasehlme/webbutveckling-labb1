const cart = document.getElementsByClassName("cart")[0]
const cartArr = [];
const itemsArr = ["surdegsbröd", "kremla", "kålltorpsfralla", "kanelbullar"]



const buybuttons = document.getElementsByClassName("buy");
for (const button of buybuttons) {
    button.addEventListener("click", ()=>{
        let bread = button.parentElement;
        bread = bread.innerText
        for (const item of itemsArr) {
            if(bread.includes(item)){
                if (cartArr.includes(item)) {
                    const breadElement = document.getElementById(item)
                    const splitted = breadElement.innerText.split(" ")
                    let num = splitted[0]
                    let incrnum = parseInt(num) + 1
                    breadElement.innerText = incrnum + "x" + " " + splitted[1]
                    return
                }
                const li = document.createElement("li")
                const htmlItem = document.createElement("p")
                htmlItem.innerText = "1x " + item
                htmlItem.id = item
                li.appendChild(htmlItem)
                cart.appendChild(li)
                cartArr.push(item)
            }
        }
    })
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