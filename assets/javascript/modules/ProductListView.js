class ProductListView {
  constructor(rootContainer, dataSrc) {
    this.container = rootContainer;
    this.dataInput = dataSrc;
    this.composedData = [];

    this.init();
  }

  init() {
    this.composeData();
    this.render();
  }

  composeData() {
    for (var entry in this.dataInput) {
      const product = this.dataInput[entry];
      product.name = entry;

      this.composedData.push(product);
    }
  }

  render() {
    // this.container.innerHTML =
    console.log(this.composedData);
    // this.container.innerHTML +=
    this.container.innerHTML = this.composedData.map(i => {
      return (
        `<div class="col-md-3 col-sm-6 mb-3 faders">
          <div class="card">
            <img class="card-img-top" src="${i.image}" alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title mb-0">${i.name}</h5>
              <p class="card-text"></p>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary cart-button float-right btn-sm">
                <i class="fa fa-cart-plus pointer-events-none"></i>
              </button>
            </div>
          </div>
        </div>`
      )
    }).join('')
  }
}
//
