const Clickbutton = document.querySelectorAll(".addToCart");
const boxCompra = document.querySelector(".shoppingCartItemsContainer");
let shoppingCartItemsContainer = [];

Clickbutton.forEach((btn) => {
  btn.addEventListener("click", addToCarritoItem);
});

function addToCarritoItem(e) {
  const button = e.target;
  const item = button.closest(".card");
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemPrice = item.querySelector(".precio").textContent;

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    cantidad: 1,
  };

  addItemCarrito(newItem);
}

function addItemCarrito(newItem) {
  const InputElemnto = boxCompra.getElementsByClassName(
    "shoppingCartItemQuantity"
  );
  for (let i = 0; i < shoppingCartItemsContainer.length; i++) {
    if (shoppingCartItemsContainer[i].title.trim() === newItem.title.trim()) {
      shoppingCartItemsContainer[i].cantidad++;
      const inputValue = InputElemnto[i];
      inputValue.value++;
      CarritoTotal();
      return null;
    }
  }

  shoppingCartItemsContainer.push(newItem);

  renderCarrito();
}

function renderCarrito() {
  boxCompra.innerHTML = "";
  shoppingCartItemsContainer.map((item) => {
    const div = document.createElement("div");
    div.classList.add("ItemCarrito");
    const Content = `<div class="row shoppingCartItem">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${item.title}
            </h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-precio d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-precio mb-0 shoppingCartItemprecio">${item.precio}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" min="1"
                value=${item.cantidad}>
            <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
    </div>
</div>
    `;
    div.innerHTML = Content;
    boxCompra.append(div);

    div
      .querySelector(".buttonDelete")
      .addEventListener("click", removeItemCarrito);
    div
      .querySelector(".shoppingCartItemQuantity")
      .addEventListener("change", sumaCantidad);
  });
  CarritoTotal();
}

function CarritoTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

  const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemprecioElement = shoppingCartItem.querySelector(
      ".shoppingCartItemprecio"
    );
    const shoppingCartItemprecio = Number(
      shoppingCartItemprecioElement.textContent.replace("$", "")
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      ".shoppingCartItemQuantity"
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemprecio * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total}$`;

  addLocalStorage();
}

function removeItemCarrito(e) {
  const buttonDelete = e.target;
  const div = buttonDelete.closest(".ItemCarrito");
  const title = div.querySelector(".shoppingCartItemTitle").textContent;
  for (let i = 0; i < shoppingCartItemsContainer.length; i++) {
    if (shoppingCartItemsContainer[i].title.trim() === title.trim()) {
      shoppingCartItemsContainer.splice(i, 1);
    }
  }

  div.remove();
  CarritoTotal();
}

function sumaCantidad(e) {
  const input = e.target;
  input.value <= 0 ? (input.value = 1) : null;
  CarritoTotal();
}

function addLocalStorage() {
  localStorage.setItem(
    "shoppingCartItemsContainer",
    JSON.stringify(shoppingCartItemsContainer)
  );
}

window.onload = function () {
  const storage = JSON.parse(
    localStorage.getItem("shoppingCartItemsContainer")
  );
  if (storage) {
    shoppingCartItemsContainer = storage;
    renderCarrito();
  }
};

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = "";

  CarritoTotal();
}

const openModal = document.querySelector(`.comprarButton`);
const modal = document.querySelector(`.modal`);

openModal.addEventListener(`click`, (e) => {
  e.preventDefault();
  modal.classList.add(`modal_show`);
});

closeModal.addEventListener(`click`, (e) => {
  e.preventDefault();
  modal.classList.remove(`modal_show`);
  Content.remove();
});
