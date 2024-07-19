import axios from "axios";

/**
 * Obtiene el símbolo y la cantidad de decimales permitidos de una moneda a través de su id.
 * Devuelve los valores como null si ocurre un error
 * @param id
*/
export async function getCurrency(id) {
  let currency = null;
  let decimals = null;
  try {
    const priceResponse = await axios.get(`${process.env.MELI_URL}/currencies/${id}`);
    
    if (priceResponse.statusText == "OK") {
      currency = priceResponse.data.symbol;
      decimals = priceResponse.data.decimal_places;
    }
  } catch (error) {
    console.error(error);
  }

  return { currency, decimals }
}

/**
 * Obtiene la ciudad asociada a un vendedor a través de su id.
 * Devuelve null si ocurre un error
 * @param id
*/
export async function getLocation(id) {
  let location = null;
  try {
    const sellerResponse = await axios.get(`${process.env.MELI_URL}/users/${id}`);
    
    if (sellerResponse.statusText == "OK") {
      location = sellerResponse.data.address.city;
    }
  } catch (error) {
    console.error(error);
  }

  return location;
}

/**
 * Obtiene la imagen del tamaño especificado a través de su id.
 * Devuelve null si ocurre un error o la primer versión de la imagen si no encuentra el tamaño deseado
 * @param id
 * @param size
*/
export async function getPicture(id, size) {
  let picture = null;
  try {
    const pictureResponse = await axios.get(`${process.env.MELI_URL}/pictures/${id}`);
    
    if (pictureResponse.statusText == "OK") {
      const bestSize = pictureResponse.data.variations.find((variation) => variation.size == size);
      picture = bestSize ? bestSize.url : pictureResponse.data.variations[0].url;
    }
  } catch (error) {
    console.error(error);
  }

  return picture;
}

/**
 * Obtiene la descripción de un item a través de su id.
 * Devuelve null si ocurre un error 
 * @param id
*/
export async function getDescription(id) {
  let description = null;
  try {
    const pictureResponse = await axios.get(`${process.env.MELI_URL}/items/${id}/description`);
    
    if (pictureResponse.statusText == "OK") {
      description = pictureResponse.data.plain_text;
    }
  } catch (error) {
    console.error(error);
  }

  return description;
}

/**
 * Obtiene un listado de categorias relacionadas a una a través de su id.
 * Devuelve array vacio si ocurre un error
 * @param id
*/
export async function getCategories(id) {
  let categories = [];
  try {
    const categoriesResponse = await axios.get(`${process.env.MELI_URL}/categories/${id}`);
    
    if (categoriesResponse.statusText == "OK") {
      categories = categoriesResponse.data.path_from_root;
    }
  } catch (error) {
    console.error(error);
  }

  return categories;
}