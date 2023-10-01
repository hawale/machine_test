const axios = require('axios');

async function productList(req, res) {
  try {
    const response = await axios.get('https://dummyjson.com/products');

    if (response.status !== 200) {
      throw 'Failed to fetch product details';
    }

    const products = response.data;

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

module.exports = {
    productList
}
