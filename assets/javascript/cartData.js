class CartData  {
  constructor (cart) {
    const defaultDB = {
      total: 0,
      shipping: 0,
      delivery: 0,
      items: []
    }

    this.localStorageKey = 'myCart';
    this.db = Object.assign(
      defaultDB,
      JSON.parse( localStorage.getItem(this.localStorageKey) ),
      cart
    )

    this.init();
  }

  init() {
    console.log('Init: ', this.db);
    this.updateCart();
    console.log('Updated: ', this.db);
  }

  addItem(itemObj) {
    this.db.items.push(itemObj);
    this.updateCart();
  }

  removeItem() {

    this.updateCart()
  }

  updateCart() {
    this.updateDelivery();
    this.updateShipping();
    this.updateLocalStorage();
  }

  updateShipping() {

  }

  updateDelivery() {

  }

  updateLocalStorage() {
    window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.db));
  }
}

shoppingCartData = new CartData({delivery: 15})
shoppingCartData.addItem({name: "Pants", shipping: "4.99", delivery: "5", price: "19.99"})
console.log(shoppingCartData.db)
