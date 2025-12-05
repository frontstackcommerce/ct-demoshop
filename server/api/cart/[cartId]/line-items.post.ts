import { getCartById, addLineItemToCart } from '../../../utils/cart';

export default defineEventHandler(async (event) => {
  const { cartId } = getRouterParams(event);
  
  try {
    const body = await readBody(event) || {};
    const { sku, quantity = 1 } = body;

    // Validate required fields
    if (!sku) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Missing required field: sku',
      });
    }

    // Get the cart to retrieve its current version
    const cart = await getCartById(cartId);

    // Add the line item
    return await addLineItemToCart(cart.id, cart.version, sku, quantity);
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    
    // Handle 404 from commercetools
    if (error.statusCode === 404 || error.message?.includes('not found')) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Cart not found',
        message: `Cart with ID ${cartId} not found`,
      });
    }

    // Wrap other errors
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error.message || 'Failed to add line item to cart',
    });
  }
});

