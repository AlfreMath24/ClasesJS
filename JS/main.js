const addCarrito = document.querySelectorAll(".addToCart");
addCarrito.forEach((addToCartButton) => {
  addToCartButton.addEventListener("click", addToCartClicked);
});

const shoppingCartItemsContainer = document.querySelector(
  ".shoppingCartItemsContainer"
);

const comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", comprarButtonClicked);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest(".card-body");
  const cardTitle = item.querySelector(".card-title").textContent;
  const precio = item.querySelector(".precio").textContent;

  addItemToShoppingCart(cardTitle, precio);
}

function addItemToShoppingCart(cardTitle, precio) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    "shoppingCartItemTitle"
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === cardTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".shoppingCartItemQuantity"
      );
      elementQuantity.value++;
      $(".toast").toast("show");
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement("div");
  const shoppingCartContent = `<div class="row shoppingCartItem">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${cardTitle}
            </h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-precio d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-precio mb-0 shoppingCartItemprecio">${precio}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                value="1">
            <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
    </div>
</div>`;

  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeShoppingCartItem);

  shoppingCartRow
    .querySelector(".shoppingCartItemQuantity")
    .addEventListener("change", quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
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
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}
function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest(".shoppingCartItem").remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = "";
  updateShoppingCartTotal();
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
});
