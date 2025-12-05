import { getCartById } from '../../utils/cart';

export default defineEventHandler(async (event) => {
  const { cartId } = getRouterParams(event);

  if (!cartId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Missing required field: cartId',
    });
  }

  try {
    return await getCartById(cartId);
  } catch (error: any) {
    if (error.statusCode === 404 || error.message?.includes('not found')) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Cart not found',
        message: `Cart with ID ${cartId} not found`,
        data: {
          cartId
        }
      });
    }
    
    // Wrap other errors
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error.message || 'Failed to get cart',
    });
  }
});
