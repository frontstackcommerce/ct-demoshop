import { createAnonymousCart } from '../../utils/cart';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) || {};
    const {
      anonymousId,
      sku,
      quantity = 1,
    } = body;

    // Validate required fields
    if (!sku) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Missing required field: sku',
      });
    }

    if(!anonymousId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: 'Missing required field: anonymousId',
      });
    }

    return await createAnonymousCart(anonymousId, sku, quantity);
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    // Wrap other errors
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error.message || 'Failed to create cart',
    });
  }
});
