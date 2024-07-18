import axios from "axios";

export async function getCurrency(id) {
  let currency = null;
  let decimals = null;
  try {
    const priceResponse = await axios.get(`https://api.mercadolibre.com/currencies/${id}`);
    
    if (priceResponse.statusText == "OK") {
      currency = priceResponse.data.symbol;
      decimals = priceResponse.data.decimal_places;
    }
  } catch (error) {
    console.error(error);
  }

  return { currency, decimals }
}

export async function getLocation(id) {
  let location = null;
  try {
    const sellerResponse = await axios.get(`https://api.mercadolibre.com/users/${id}`);
    
    if (sellerResponse.statusText == "OK") {
      location = sellerResponse.data.address.city;
    }
  } catch (error) {
    console.error(error);
  }

  return location;
}

export async function getPicture(id, size) {
  let picture = null;
  try {
    const pictureResponse = await axios.get(`https://api.mercadolibre.com/pictures/${id}`);
    
    if (pictureResponse.statusText == "OK") {
      const bestSize = pictureResponse.data.variations.find((variation) => variation.size == size);
      picture = bestSize ? bestSize.url : pictureResponse.data.variations[0].url;
    }
  } catch (error) {
    console.error(error);
  }

  return picture;
}

export async function getDescription(id) {
  let description = null;
  try {
    const pictureResponse = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
    
    if (pictureResponse.statusText == "OK") {
      description = pictureResponse.data.plain_text;
    }
  } catch (error) {
    console.error(error);
  }

  return description;
}

export async function getCategories(id) {
  let categories = [];
  try {
    const categoriesResponse = await axios.get(`https://api.mercadolibre.com/categories/${id}`);
    
    if (categoriesResponse.statusText == "OK") {
      categories = categoriesResponse.data.path_from_root;
    }
  } catch (error) {
    console.error(error);
  }

  return categories;
}