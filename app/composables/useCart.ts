import type { LineItem, Cart, TaxPortion, CentPrecisionMoney, TaxedPrice } from '@commercetools/platform-sdk';

export interface UseCartReturn {
  /**
   * Array of line items in the cart
   */
  lineItems: Ref<LineItem[]>;
  
  /**
   * Total price of the cart in cents
   */
  totalPrice: Ref<CentPrecisionMoney | undefined>;

  /**
   * Taxed price
   */
  taxedPrice: Ref<TaxedPrice | undefined>;
  
  /**
   * Add a line item to the cart
   * @param sku - The SKU of the product variant to add
   * @param quantity - The quantity to add (default: 1)
   */
  addLineItem: (sku: string, quantity?: number) => Promise<void>;
  
  /**
   * Remove a line item from the cart
   * @param lineItemId - The ID of the line item to remove
   * @param quantity - Optional quantity to remove. If omitted, removes the entire line item
   */
  removeLineItem: (lineItemId: string, quantity?: number) => Promise<void>;
  
  /**
   * Update the quantity of a line item in the cart
   * @param lineItemId - The ID of the line item to update
   * @param quantity - The new quantity
   */
  updateLineItemQuantity: (lineItemId: string, quantity: number) => Promise<void>;

  /**
   * Refresh the cart
   */
  refreshCart: () => Promise<void>;
}

/**
 * Composable for managing cart state and operations
 * Uses anonymous cart ID from useAuth to maintain cart state
 * Uses useState to ensure shared reactive state across all components
 */
export function useCart(): UseCartReturn {
  const { anonymousCartId, cartId } = useAuth();

  // Use useState to create shared reactive state that persists across components
  const lineItems = useState<LineItem[]>('cart:lineItems', () => []);
  const totalPrice = useState<CentPrecisionMoney | undefined>('cart:totalPrice', () => undefined);
  const taxedPrice = useState<TaxedPrice | undefined>('cart:taxedPrice', () => undefined);

  /**
   * Updates local cart state from a Cart object
   */
  const updateCartState = (cart: Cart) => {
    lineItems.value = cart.lineItems || [];
    totalPrice.value = cart.totalPrice;
    cartId.value = cart.id;
    taxedPrice.value = cart.taxedPrice;
  };

  /**
   * Resets cart state to empty
   */
  const resetCartState = () => {
    lineItems.value = [];
    totalPrice.value = undefined;
    taxedPrice.value = undefined;
    cartId.value = null;
  };

  /**
   * Refresh the cart from the server
   */
  const refreshCart = async () => {
    if (!cartId.value) {
      resetCartState();
      return;
    }

    try {
      const cart = await $fetch<Cart>(`/api/cart/${cartId.value}`);
      updateCartState(cart);
    } catch (error: any) {
      // If cart not found, reset state
      if (error.statusCode === 404) {
        resetCartState();
      } else {
        throw error;
      }
    }
  };

  /**
   * Add a line item to the cart
   */
  const addLineItem = async (sku: string, quantity: number = 1) => {
    try {
      let cart: Cart;

      if (cartId.value) {
        // Add to existing cart
        cart = await $fetch<Cart>(`/api/cart/${cartId.value}/line-items`, {
          method: 'POST',
          body: { sku, quantity },
        });
      } else {
        // Create new cart with the line item
        cart = await $fetch<Cart>('/api/cart', {
          method: 'POST',
          body: {
            anonymousId: anonymousCartId.value,
            sku,
            quantity,
          },
        });
      }

      updateCartState(cart);
    } catch (error) {
      console.error('Failed to add line item:', error);
      throw error;
    }
  };

  /**
   * Remove a line item from the cart
   */
  const removeLineItem = async (lineItemId: string, quantity?: number) => {
    if (!cartId.value) {
      return;
    }

    try {
      const cart = await $fetch<Cart>(
        `/api/cart/${cartId.value}/line-items/${lineItemId}`,
        {
          method: 'DELETE',
        }
      );

      updateCartState(cart);
    } catch (error) {
      console.error('Failed to remove line item:', error);
      throw error;
    }
  };

  /**
   * Update the quantity of a line item in the cart
   */
  const updateLineItemQuantity = async (lineItemId: string, quantity: number) => {
    if (!cartId.value) {
      return;
    }

    if (quantity <= 0) {
      // If quantity is 0 or less, remove the line item
      await removeLineItem(lineItemId);
      return;
    }

    try {
      // Find the current line item to get its SKU
      const currentLineItem = lineItems.value.find(item => item.id === lineItemId);
      if (!currentLineItem) {
        throw new Error(`Line item with ID ${lineItemId} not found`);
      }

      const currentQuantity = currentLineItem.quantity;
      
      if (quantity === currentQuantity) {
        // No change needed
        return;
      }

      if (quantity > currentQuantity) {
        // Increase quantity by adding the difference
        const difference = quantity - currentQuantity;
        await addLineItem(currentLineItem.variant.sku || '', difference);
      } else {
        // Decrease quantity by removing the difference
        const difference = currentQuantity - quantity;
        await removeLineItem(lineItemId, difference);
      }
    } catch (error) {
      console.error('Failed to update line item quantity:', error);
      throw error;
    }
  };

  return {
    lineItems,
    totalPrice,
    taxedPrice,
    addLineItem,
    removeLineItem,
    updateLineItemQuantity,
    refreshCart,
  };
}

