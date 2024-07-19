import axios from "axios";
import { getCategories, getCurrency, getDescription, getLocation, getPicture } from "../utils/getAttributes.js";

/**
 * Gets items by query, category and/or page number
 * @route  GET /api/items
*/
export const getItems = async (req, res, next) => {
  try {
    let url = new URL(`${process.env.MELI_URL}/sites/MLA/search`);

    if (req.query.q)
      url.searchParams.append("q", req.query.q)
    
    if (req.query.category)
      url.searchParams.append("category", req.query.category)
   
    if (req.query.page && req.query.page > 0)
      url.searchParams.append("offset", (req.query.page - 1) * 4)
    
    url.searchParams.append("limit", 4)

    const meliResponse = await axios.get(url);

    if (meliResponse.statusText !== "OK") {
      return res.status(400);
    }

    const items = await Promise.all(meliResponse.data.results.map(async ({ id, title, condition, shipping, currency_id, price, seller, thumbnail_id }) => {
      const currencyData = await getCurrency(currency_id);
      
      const location = await getLocation(seller.id);
      
      const picture = await getPicture(thumbnail_id, "200x200");
      
      return { id, title, price: { ...currencyData, amount: price }, picture, condition, free_shipping: shipping.free_shipping, location }
    }))

    const categories = meliResponse.data.filters.find((filter) => filter.id == "category")      

    const formattedRes = {
      author: {
        name: "",
        lastName: "",
      },
      categories: categories ? categories.values[0].path_from_root : [],
      items,
      pagination: {
        total: Math.ceil((meliResponse.data.paging.total <= 1000 ? meliResponse.data.paging.total : 1000) / meliResponse.data.paging.limit),
      },
    };

    return res.status(200).json(formattedRes);
  } catch (error) {
    return next(error?.response?.data);
  }
};
/**
 * Gets item by id
 * @route  GET /api/items/:id
*/
export const getItemById = async (req, res, next) => {
  try {
    const meliResponse = await axios.get(
      `${process.env.MELI_URL}/items/${req.params.id}`
    );

    if (meliResponse.statusText !== "OK") {
      return res.status(400);
    }

    const currencyData = await getCurrency(meliResponse.data.currency_id);
    
    const categories = await getCategories(meliResponse.data.category_id);

    const picture = await getPicture(meliResponse.data.thumbnail_id, "800x800");

    const description = await getDescription(meliResponse.data.id);

    const formattedRes = {
      author: {
        name: "",
        lastName: "",
      },
      item: {
        id: meliResponse.data.id,
        title: meliResponse.data.title,
        price: { ...currencyData, amount: meliResponse.data.price },
        picture,
        condition: meliResponse.data.condition,
        free_shipping: meliResponse.data.shipping.free_shipping,
        sold_quantity: meliResponse.data.sold_quantity !== undefined ? meliResponse.data.sold_quantity : null,
        description,
        categories
      }
    };

    return res.status(200).json(formattedRes);
  } catch (error) {
    return next(error.response.data);
  }
};