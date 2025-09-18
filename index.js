import { menuArray } from './data.js'


const menuEl = document.getElementById('menu')
const orderSectionEl = document.getElementById('order')
const paymentModalEl = document.getElementById('payment-modal')
const nameInput = document.getElementById('name-input')


let selectedItems = []

document.addEventListener('click',  function(e){
    if(e.target.classList.contains('add-btn')){
        const itemContainer = e.target.closest('.item-container')
        if(itemContainer){
            const itemId = itemContainer.dataset.itemId
            const selectedItem = menuArray.find(item => item.id.toString() === itemId)
            if (selectedItem){
                selectedItems.push(selectedItem)
                const totalPrice = calculateTotalPrice(selectedItems)
                renderOrder(selectedItems,totalPrice)
            }          
        }
    }
    else if(e.target.classList.contains('remove-link')){
        const priceItem = e.target.closest('.price-item')
        if(priceItem){
            const itemId = priceItem.dataset.itemId
            const indexToRemove = selectedItems.findIndex(item => item.id === Number(itemId))
            if(indexToRemove > -1){
                selectedItems.splice(indexToRemove,1)
            }
            const totalPrice = calculateTotalPrice(selectedItems)
            renderOrder(selectedItems,totalPrice)
        }
     }
     else if(e.target.id == 'complete-order'){
        paymentModalEl.style.display = 'block'
     }
      else if(e.target.id == 'pay-btn'){
        paymentModalEl.style.display = 'none'
        renderSuccessionMessage(nameInput)
        
     }
})



function renderItems(){
    const html = menuArray.map(item => {
           return `<div class="item-container" data-item-id="${item.id}">
                    <div class="items">
                        <p role="img" aria-label="${item.name} emoji" class="big-emoji">${item.emoji}</p> 
                        <div class="item-details">
                            <h2 class="name">${item.name}</h2>
                            <p class="ingredients">${item.ingredients.join(', ')}</p>
                            <p class="price">$${item.price}</p>
                        </div>
                    </div>
                    <button class="add-btn" >+</button>
                </div>`
}).join('')

menuEl.innerHTML = html
}

function renderOrder(selectedItems, totalPrice){
    if(selectedItems.length){
        orderSectionEl.style.display = 'block'
        const orderHtml =  selectedItems.map(item => {
       return `<div class="price-item" data-item-id="${item.id}">
                    <div class="ordered-item">
                        <h3>${item.name}</h3>
                        <a class="remove-link">remove</a>
                    </div>
                    <h class="price">$${item.price}</h>
                </div>
                `
   }).join('')
   const titleHtml = `<h2 class="order-title">Your order</h2>`
   const restHtml = `<hr class="divider">
                  <div class="total-price-item">
                     <h3>Total Price:</h3>
                     <h class="price">${totalPrice}</h>
                </div>
                <button id="complete-order" class="btn">Complete order</button>`
                
    orderSectionEl.innerHTML = titleHtml + orderHtml + restHtml
    }
    else{
        orderSectionEl.style.display = 'none'
    }
   
}

function renderSuccessionMessage(name){
    const successionMessage = `
    <div class="succsess"> 
        <h2>Thanks, ${name}! Your order is on its way!</h2>
    </div>
    
    `
      
     orderSectionEl.innerHTML = successionMessage
}



function calculateTotalPrice(selectedItems){
    return selectedItems.reduce((total,selectedItem) => total + selectedItem.price, 0)
}



renderItems()