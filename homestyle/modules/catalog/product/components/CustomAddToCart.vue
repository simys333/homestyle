<template>
  <div class="add-to-cart-wrapper">
    <slot name="quantity-select-input" v-bind="{ qty }">
      <SfQuantitySelector
        :qty="qty"
        :aria-label="'Quantity'"
        :disabled="disabled"
        class="sf-add-to-cart__select-quantity"
        @input="$emit('input', $event)"
      />
    </slot>
    <div class="want-to-buy">
      Want to buy this in bulk? <a href="#">Click here</a>
    </div>
    <div class="cart-button-wrapper">
      <SfButton
        class="sf-buy-now__button"
        :disabled="disabled"
        v-on="$listeners"
      >
        Buy Now
      </SfButton>
      <slot name="add-to-cart-btn">
        <SfButton
          class="sf-add-cart__button"
          :disabled="disabled"
          v-on="$listeners"
        >
          Add to cart
        </SfButton>
      </slot>
    </div>
  </div>
</template>
<script>
import { SfButton, SfQuantitySelector } from "@storefront-ui/vue";
export default {
  name: "CustomAddToCart",
  components: {
    SfButton,
    SfQuantitySelector,
  },
  model: {
    prop: "qty",
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    qty: {
      type: [Number, String],
      default: 1,
    },
  },
};
</script>
<style lang="scss">
@import "./product-types/styles.scss";
</style>
