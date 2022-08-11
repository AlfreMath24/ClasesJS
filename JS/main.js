fetch("./productos.json")
  .then((resInicial) => resInicial.json())
  .then((resFinal) => {
    console.log(resFinal);
  })
  .catch((e) => {
    console.log(e);
  });

const Clickbutton = document.querySelectorAll(".addToCart");

const boxCompra = document.querySelector(".shoppingCartItemsContainer");

let shoppingCartItemsContainer = [];

Clickbutton.forEach((btn) => {
  btn.addEventListener("click", addToCarritoItem);
  btn.addEventListener("click", () => {
    swal.fire({
      text: "Se ha agregado el producto con exito!",
      icon: "success",
      timer: "2000",
      background: "rgba(149, 166, 138, 1)",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
    });
  });
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

    div.addEventListener("click", () => {
      swal.fire({
        text: "Se ha eliminado producto del carrito!",
        icon: "error",
        timer: "2000",
        background: "rgba(149, 166, 138, 1)",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
    });

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

const comprar = document.querySelector(".comprarButton");

comprar.addEventListener("click", () => {
  swal.fire({
    title: "Gracias!",
    text: "Se ha realizado la compra con exito!",
    icon: "success",
    background: "rgba(149, 166, 138, 1)",
    button: "rgba(145, 95, 44, 0.5)",
  });
});

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = "";

  CarritoTotal();
}

// class Producto {
//   constructor(codigo, nombre, precio, categoria) {
//     this.nombre = nombre;
//     this.codigo = codigo;
//     this.precio = precio;
//     this.categoria = categoria;
//   }
//   mostrarse() {
//     console.log(this.codigo, this.nombre, this.precio, this.categoria);
//   }
// }
// let miArrayProducto = [];

// async function fetchInicial() {
//   const res = await fetch("./data.json");
//   auxArray = await res.json();

//   auxArray.forEach((item) => {
//     miArrayProducto.push(
//       new Producto(item.codigo, item.nombre, item.precio, item.categoria)
//     );
//   });

//   miArrayProducto[0].mostrarse();
// }

// fetchInicial();
