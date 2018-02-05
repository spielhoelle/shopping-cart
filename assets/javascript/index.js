class shoppingCart {
  constructor () {
    this.db = JSON.parse( localStorage.getItem('cart') ) || [];
    this.db.total = this.db.total || 0;
    this.db.shipping = this.db.shipping || 0;
    this.db.time = this.db.time || 0;
    this.elements = {
      list: document.getElementById('products'),
      items: document.querySelectorAll('#products li'),
      result: document.querySelectorAll('.cartresult'),
      reset: document.getElementById('reset'),
      cart: document.getElementById('cart'),
      totaltarget: document.querySelectorAll('.total-target'),
      total_template: document.getElementById('total-template'),
      template: document.getElementById('template')
    }
    this.init()
  }
  init(){
    var card = this.elements.template
    for (var i in database ) {
      var element = card.cloneNode(true);
      element.removeAttribute("id");
      element.classList.remove("d-none")

      element.querySelector('.card-img-top').src = database[i].image
      element.querySelector('.card-title').prepend(i)
      //element.querySelector('.card-text').innerHTML = `${ database[i].content } `
      
      var footer = document.createElement('small');
      footer.classList.add('text-muted');
      footer.innerHTML = `shipping: ${database[i].shipping}&euro; <br> delivery: ${database[i].delivery}d`;
      element.querySelector('.card-footer').appendChild(footer);

      var button = element.querySelector('.btn-primary');
      button.dataset.name = i
      button.dataset.shipping = database[i].shipping;
      button.dataset.delivery = database[i].delivery;
      button.dataset.price = database[i].price;
      this.elements.list.appendChild(element);

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
      if(e.target && e.target.classList.contains( 'btn-danger' )){//do something}
        let itemKey = this.findItemKey(e.target.dataset.name)
        this.updateCart(e.target.dataset.name, true)
      } else if (e.target && e.target.classList.contains( 'cart-button' )){
        this.updateCart(e.target.dataset.name)
        this.render()
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
    for (let i = 0; i < this.db.items.length; i++){
      if (this.db.items[i].name == itemName){
        return i
      }
    }
  }
  removeFromCart(item){

    let itemKey = this.findItemKey(item)
  }
  updateCart(item, remove = false){
    let itemKey = this.findItemKey(item)
    if(remove){
      //this.db.total -= Number( this.db.items[itemKey].price )
      if(this.db.items[itemKey].count > 1){
        this.db.items[itemKey].count--
      }else{
        this.db.items.shift(itemKey)
      }
    } else {
      //this.db.total += Number( event.target.dataset.price )
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
      var element = document.createElement('li');
      element.classList += 'list-group-item d-flex justify-content-between align-items-center ';
      element.innerHTML = `<span class="badge badge-info badge-pill mr-2">${item.count} </span>  ${ item.name } - ${item.price}&euro; <span class="ml-auto mr-3 font-weight-bold">${( item.price * item.count ).toFixed(2)}&euro;</span>`;
      var button = document.createElement('button');
      button.classList.add('btn', 'btn-sm', 'btn-danger');
      button.dataset.name = item.name
      button.innerHTML = "<i class='fa fa-close pointer-events-none'></i>";
      element.appendChild(button);
      cart.appendChild(element);
    })
    var ttemplate = this.elements.total_template
    for (let i = 0; i < this.elements.totaltarget.length; i++){
      ttemplate = ttemplate.cloneNode(true);
      ttemplate.removeAttribute("id");
      ttemplate.classList.remove("d-none")
      ttemplate.querySelector(".total").innerHTML = this.db.total ? this.db.total.toFixed(2) : 0
      ttemplate.querySelector(".delivery").innerHTML = this.db.delivery ? this.db.delivery.toFixed(0) : 0
      ttemplate.querySelector(".shipping").innerHTML = this.db.shipping ? this.db.shipping.toFixed(0) : 0
      this.elements.totaltarget[i].innerHTML = ttemplate.innerHTML
    }
    for (let i = 0; i < this.elements.result.length; i++){
      this.elements.result[i].innerHTML = cart.innerHTML
    }
  }
}
var instaceOfCart = new shoppingCart();
