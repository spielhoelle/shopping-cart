class shoppingCart {
  constructor () {
    this.db = JSON.parse( localStorage.getItem('cart') ) || [];
    this.db.total = this.db.total || 0;
    this.db.shipping = this.db.shipping || 0;
    this.db.time = this.db.time || 0;
    this.elements = {
      //TODO provide selectors for:
      //- product list
      //- selector where the contents of the cart should be displayed
      //- the reset button
      totaltarget: document.querySelectorAll(".total-target"),
      cart: document.getElementById("cart"),
      //- total amount
      //- total template
      template: document.getElementById("template")
    }
    this.init()
  }
  init(){
    //here you take your cart item template and clone this piece of html to a virtual copy
    var card = this.elements.template
    for (var i in database ) {
      var element = card.cloneNode(true);
      //TODO here we have clone our template lets remove the id first and rmove display none class

      //TODO fill the element with the image from the database and add the name of the product to the title
      
      //TODO lets put in the footer the shipping costs and delivery time

      //TODO now we take the  button and fill it with all our data to use this for the remove action

      // Fade-in effect
      // this removes the faded class with a timeout from all divs - wooosh!
      var divs = document.querySelectorAll('#products > div');
      var time = 0;
      for (let div of divs) {
        setTimeout(function(){
          div.classList.remove('faded');
        }, time);
        time+=100
      }
    }
    document.addEventListener('click', (e)=>{
      // these are the event listeners for dynamically created elements. Eg: A element is not present and will be generated and rendered with js, its hart to define the event listeners on document load. They will not hook up, so we listen to the document
      if(e.target && e.target.classList.contains( 'btn-danger' )){
        let itemKey = this.findItemKey(e.target.dataset.name)
        this.updateCart(e.target.dataset.name, true)
      } else if (e.target && e.target.classList.contains( 'cart-button' )){
        this.updateCart(e.target.dataset.name);
        this.render();
      }
    })

    this.render()
    this.resetEventListener()
  }
  resetEventListener() {
    this.elements.reset.addEventListener('click', (e)=>{
      this.db.items = []
      this.db.total = 0
      this.db.shipping = 0
      this.db.delivery = 0
      localStorage.setItem("cart", JSON.stringify( {shipping: 0, total: 0, items: [], delivery: 0 } ))
      this.render()
    })
  }
  findItemKey(itemName){
    //TODO this is the "find a item" in the database function, refactor it to array.filter
    for (let i = 0; i < this.db.items.length; i++){
      if (this.db.items[i].name == itemName){
        return i
      }
    }
  }
  updateCart(item, remove = false){
    //here the magic happens
    //try to understand what happens here
    let itemKey = this.findItemKey(item)
    if(remove){
      if(this.db.items[itemKey].count > 1){
        this.db.items[itemKey].count--
      }else{
        this.db.items.shift(itemKey)
      }
    } else {
      if(itemKey !== undefined){
        this.db.items[itemKey].count++
      } else {
        this.db.items.push({shipping: event.target.dataset.shipping, name: event.target.dataset.name, price: event.target.dataset.price, delivery: event.target.dataset.delivery, count: 1})
      }
    }
    if(this.db.items.length > 0) {
      this.db.total = this.db.items.map((i) => {
        return i.price * i.count
      }).reduce((e, i) => Number(e) + Number(i))

      this.db.shipping = this.db.items.map((i) => {
        return i.shipping
      })
      this.db.shipping = Math.max(...this.db.shipping)

      this.db.delivery = this.db.items.map((i) => {
        return i.delivery
      })
      this.db.delivery = Math.max(...this.db.delivery)
    } else {
      this.db.shipping = 0;
      this.db.total = 0;
      this.db.delivery = 0;
    }

    localStorage.setItem("cart", JSON.stringify( {shipping: this.db.shipping, total: this.db.total, items: this.db.items, delivery: this.db.delivery } ))
    this.render()
  }
  render(){
    this.db.items = this.db.items || []
    // the function checks if items are in the cart and hides the cart if it is empty
    if( this.db.items.length > 0 ){
      this.elements.cart.classList.remove('faded')
      for (let i = 0; i < this.elements.totaltarget.length; i++){
        this.elements.totaltarget[i].classList.remove('faded')
      }
    } else {
      this.elements.cart.classList.add('faded')
      for (let i = 0; i < this.elements.totaltarget.length; i++){
        this.elements.totaltarget[i].classList.add('faded')
      }
    }

    var cart = document.createElement('div')
    this.db.items.forEach( item => {
      //TODO create a list item, add bootstrap classes
      //fill it with a bootstrap badge span which shows the count, the name, the price, the total and the remove button
      // here yo go
      cart.appendChild(element);
    })
    for (let i = 0; i < this.elements.result.length; i++){
      this.elements.result[i].innerHTML = cart.innerHTML
    }
    //TODO we want to show the list of totals several times on the page
    //we loop over the target elements, take each time a new template, fill it with data and display it on the page
    var ttemplate = this.elements.total_template
    for (let i = 0; i < this.elements.totaltarget.length; i++){
      ttemplate = ttemplate.cloneNode(true);
      // here yo go
      this.elements.totaltarget[i].innerHTML = ttemplate.innerHTML
    }
  }
}
var instaceOfCart = new shoppingCart();
