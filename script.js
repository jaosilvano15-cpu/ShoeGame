const products = [
  { id: "p01", name: "Nike Air Force 1", price: 4990, img: "images/NikeAirForce1.jpg" },
  { id: "p02", name: "Air Jordan 1", price: 7990, img: "images/AirJordan1.jpg" },
  { id: "p03", name: "Timberland Boots", price: 5990, img: "images/timberlands.jpg" },
  { id: "p04", name: "Adidas Superstar", price: 3990, img: "images/AdidasSuperstar.jpg" },
  { id: "p05", name: "Jordan 4", price: 8990, img: "images/jordan4.jpg" },
  { id: "p06", name: "Yeezy Boost 350", price: 12990, img: "images/YeezyBoost350.jpg" },
  { id: "p07", name: "Vans Old Skool", price: 3390, img: "images/VansOldSkool.jpg" },
  { id: "p08", name: "Converse Chuck 70", price: 3790, img: "images/ConverseChuck70.jpg" },
  { id: "p09", name: "Nike Air Max 90", price: 7290, img: "images/NikeAirMax90.jpg" },
  { id: "p10", name: "Puma Suede Classic", price: 3490, img: "images/PumaSuedeClassic.jpg" },
  { id: "p11", name: "Air Jordan 3 Retro Black", price: 4990, img: "images/AirJordan3RetroBlackCat.jpg" },
  { id: "p12", name: "Shox R4", price: 3590, img: "images/shoxr4.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

function renderProducts() {
  products.forEach((p, i) => {
    productList.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₱${p.price}</p>
        <button class="btn" onclick="addToCart(${i})">Add to Cart</button>
      </div>`;
  });
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((c, i) => {
    total += c.price * c.qty;
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${c.img}">
        <div>
          <h4>${c.name}</h4>
          <p>₱${c.price}</p>
        </div>
        <button class="qty-btn" onclick="changeQty(${i}, -1)">-</button>
        <span>${c.qty}</span>
        <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
        <button class="remove-btn" onclick="removeItem(${i})">Remove</button>
      </div>`;
  });
  cartTotal.innerText = total;
  cartCount.innerText = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(i) {
  const item = products[i];
  const exist = cart.find(c => c.name === item.name);
  if (exist) exist.qty++;
  else cart.push({ ...item, qty: 1 });
  renderCart();
}

function changeQty(i, amount) {
  cart[i].qty += amount;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  renderCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

renderProducts();
renderCart();
