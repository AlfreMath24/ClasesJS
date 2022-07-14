let ingreso = prompt("Por favor ingrese su nombre:");

alert("Bienvenido a HonaShop Tienda Deco.");

class Producto {
  constructor(codigo, nombre, precio, categoria) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
  }
}

function comprar(nombre, email, telefono, carrito) {
  let cantidad = carrito.reduce((acc, item) => item.precio + acc, 0);
  alert(
    "Gracias " + nombre + " por tu compra en HonaShop. \n Total: $" + cantidad
  );
}

let productos = [
  new Producto(001, "PlatosP Grass", 1000, "Platos de Sitio"),
  new Producto(002, "PlatoP Water Color", 1000, "Platos de Sitio"),
  new Producto(003, "PatosP Wild Map", 1100, "Platos de Sitio"),
  new Producto(004, "PlatoP Christmas", 1100, "Platos de Sitio"),
  new Producto(005, "PlatoP Tropical", 1000, "Platos de Sitio"),

  new Producto(101, "Servilleta Molinos Arg", 1500, "Mesa"),
  new Producto(102, "Servilleta Golden Rose", 1500, "Mesa"),
  new Producto(103, "Servilleta Bethania", 1400, "Mesa"),
  new Producto(104, "Servilleta Puntilla", 1200, "Mesa"),
  new Producto(105, "Servilleta Lino Azul", 1400, "Mesa"),

  new Producto(201, "Paño Amsterdam", 1200, "Cocina"),
  new Producto(202, "Paño Jersey Habano", 1300, "Cocina"),
  new Producto(203, "Paño Cotton Oliva", 1400, "Cocina"),
  new Producto(204, "Paño Cotton Plomo", 1400, "Cocina"),
  new Producto(205, "Paño Cotton Beige", 1400, " Cocina"),
];

let categorias = ["Platos de Sitio", "Mesa", "Cocina"];

let carrito = [];

let categoria = "";

while (categoria != "salir" && categoria != null) {
  let auxiliar = categorias.join(", ");
  categoria = prompt(
    `Ingrese una Categoria para COMPRAR o ingrese "salir":\n(` + auxiliar + ")"
  );

  if (categoria != "salir" && categoria != null) {
    let porCategoria = productos.filter((item) => item.categoria == categoria);

    let catalogo = "";
    for (let i = 0; i < porCategoria.length; i++) {
      catalogo +=
        "Codigo: " +
        porCategoria[i].codigo +
        "  Nombre: " +
        porCategoria[i].nombre +
        " " +
        "  Precio: " +
        porCategoria[i].precio +
        "\n";
    }

    let selecciondecodigo = parseInt(
      prompt("Seleccione el Codigo del Producto a COMPRAR; \n\n" + catalogo)
    );

    let productoCarro = porCategoria.find(
      (item) => (item.codigo = selecciondecodigo)
    );

    if (productoCarro) {
      carrito.push(productoCarro);
    }
  }
}

if (carrito.length > 0) {
  alert("Ingrese sus datos para finalizar la COMPRA");
  let nombre = prompt("Ingrese su nombre:");
  let email = prompt("Ingrese su E-mail:");
  let telefono = prompt("Ingrese su número de telefono:");
  comprar(nombre, email, telefono, carrito);
}
