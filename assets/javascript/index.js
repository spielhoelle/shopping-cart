const shoppingCartData = new CartData({delivery: 15})
shoppingCartData.addItem({name: "Pants", shipping: "4.99", delivery: "5", price: "19.99"})
console.log(shoppingCartData.db)

const productList = new ProductListView(document.querySelector('#products'), database);
