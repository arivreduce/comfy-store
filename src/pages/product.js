// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

const newData = {
  'high-back bench': {
    price: 14999,
    description:
      "This high-back bench combines elegance and comfort, making it perfect for entryways or dining areas. Crafted from durable wood with a smooth finish, it's designed to add both style and function to any space.",
    colors: ['#8B4513', '#A0522D'], // Saddle brown and sienna
  },
  'albany table': {
    price: 24999,
    description:
      'The Albany table features a solid wood construction with a contemporary design. Its spacious tabletop makes it ideal for family gatherings or dinner parties, adding a warm touch to your dining area.',
    colors: ['#D2B48C', '#A9A9A9'], // Tan and dark gray
  },
  'accent chair': {
    price: 12999,
    description:
      "This accent chair offers a comfortable seating experience with a stylish look. Upholstered in soft fabric with sturdy wooden legs, it's perfect for reading nooks or adding a pop of color to your living room.",
    colors: ['#FF6347', '#4682B4'], // Tomato red and steel blue
  },
  'wooden table': {
    price: 19999,
    description:
      'Classic and versatile, this wooden table boasts a timeless design suitable for any room. Its sturdy build and natural finish make it a great choice for both dining and workspace setups.',
    colors: ['#8B4513', '#CD853F'], // Saddle brown and peru
  },
  'dining table': {
    price: 49999,
    description:
      'Elevate your dining experience with this spacious dining table. Crafted from high-quality wood with a rich finish, it comfortably seats six and brings a warm ambiance to your home.',
    colors: ['#A0522D', '#2F4F4F'], // Sienna and dark slate gray
  },
  'sofa set': {
    price: 89999,
    description:
      'This sofa set brings luxury and comfort to your living space. Upholstered in plush fabric with spacious seating, it’s perfect for family rooms or entertaining guests.',
    colors: ['#708090', '#2E8B57'], // Slate gray and sea green
  },
  'modern bookshelf': {
    price: 17999,
    description:
      'Stylish and functional, this modern bookshelf provides ample space for books and decor. Its minimalist design and sturdy construction make it an ideal addition to contemporary spaces.',
    colors: ['#778899', '#C0C0C0'], // Light slate gray and silver
  },
  'emperor bed': {
    price: 74999,
    description:
      'Sleep in style with this Emperor bed, designed with a plush headboard and a sturdy frame. Its spacious design provides unmatched comfort and a touch of luxury for your bedroom.',
    colors: ['#B0C4DE', '#8B0000'], // Light steel blue and dark red
  },
  'utopia sofa': {
    price: 54995,
    description:
      'The Utopia sofa combines comfort and elegance with its sleek lines and soft fabric. Perfect for relaxing, it adds a modern touch to any living space.',
    colors: ['#483D8B', '#FFD700'], // Dark slate blue and gold
  },
  'entertainment center': {
    price: 29998,
    description:
      'Organize and display your media devices with this entertainment center. With plenty of storage and a clean design, it’s a practical and stylish addition to your living room.',
    colors: ['#2F4F4F', '#8B4513'], // Dark slate gray and saddle brown
  },
  'albany sectional': {
    price: 119999,
    description:
      'This Albany sectional is designed for comfort and style, perfect for large gatherings. Its modular setup offers flexibility, allowing it to fit any living room layout.',
    colors: ['#556B2F', '#8B4513'], // Dark olive green and saddle brown
  },
  'leather sofa': {
    price: 149999,
    description:
      'Luxurious and durable, this leather sofa brings sophistication to any space. Its premium leather finish and plush seating make it a timeless piece for your living room.',
    colors: ['#A52A2A', '#D2691E'], // Brown and chocolate
  },
};

// selections
// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
  const urlID = window.location.search;

  try {
    const response = await fetch(`${singleProductUrl}${urlID}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      const { id, fields } = product;
      productID = id;

      // Extract data from API response
      const { name, company } = fields;
      let price = fields.price;
      let colors = fields.colors;
      let description = fields.description;
      const image = fields.image[0].thumbnails.large.url;

      // Check if `newData` contains the product and override values if it does
      if (newData[name]) {
        price = newData[name].price || price; // Fallback to original price if undefined
        description = newData[name].description || description; // Fallback to original description if undefined
        colors = newData[name].colors || colors; // Fallback to original colors if undefined
      }

      // Set values on the page
      document.title = `${name.toUpperCase()} | Comfy`;
      pageTitleDOM.textContent = `Home / ${name}`;
      imgDOM.src = image;
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;

      // Clear existing colors and add new ones
      colorsDOM.innerHTML = '';
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = color;
        colorsDOM.appendChild(span);
      });
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `
        <div>
          <h3 class="error">Sorry, something went wrong</h3>
          <a href="index.html" class="btn">back home</a>
        </div>`;
    }
  } catch (error) {
    console.log(error);
  }

  loading.style.display = 'none';
});

cartBtn.addEventListener('click', function () {
  addToCart(productID);
});
