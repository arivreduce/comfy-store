import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {
  const response = await fetch(allProductsUrl).catch((err) => console.log(err));
  if (response) {
    const products = await response.json();
    const newPrices = {
      'high-back bench': 14999,
      'albany table': 24999,
      'accent chair': 12999,
      'wooden table': 19999,
      'dining table': 49999,
      'sofa set': 89999,
      'modern bookshelf': 17999,
      'emperor bed': 74999,
      'utopia sofa': 54995,
      'entertainment center': 29998,
      'albany sectional': 119999,
      'leather sofa': 149999,
    };
    const updatedProducts = products.map((item) => {
      if (newPrices[item.fields.name] !== undefined) {
        return {
          ...item,
          fields: {
            ...item.fields,
            price: newPrices[item.fields.name],
          },
        };
      }
      return item;
    });

    return updatedProducts;
  }
  return response;
};

export default fetchProducts;
