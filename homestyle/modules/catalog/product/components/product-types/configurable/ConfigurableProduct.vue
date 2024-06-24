<template>
  <div id="product-detail" class="product">
    <SfLoader class="loading--product-gallery" :loading="isFetching">
      <SfGallery
        :images="productGallery"
        :image-width="imageSizes.productGallery.imageWidth"
        :image-height="imageSizes.productGallery.imageHeight"
        :thumb-width="imageSizes.productGallery.thumbWidth"
        :thumb-height="imageSizes.productGallery.thumbHeight"
        :enable-zoom="true"
        image-tag="nuxt-img"
        thumb-image-tag="nuxt-img"
        class="product__gallery"
        :nuxt-img-config="{
          fit: 'cover',
        }"
        :thumb-nuxt-img-config="{
          fit: 'cover',
        }"
      />
    </SfLoader>
    <div class="product__info">
      <div class="product__header">
        <SfHeading
          :title="getProductName(product)"
          description="Cello"
          :level="3"
          class="sf-heading--no-underline sf-heading--left"
        />
        <SvgImage
          icon="drag"
          width="40"
          height="40"
          class="product__drag-icon smartphone-only"
        />
      </div>
      <div>
        <SfPrice
          :regular="$fc(productPrice)"
          :special="productSpecialPrice && $fc(productSpecialPrice)"
        />
        <SfPrice class="discount-percentage" regular="calculatePercentage(product)"  />
        <!-- <div>
          <div class="product__rating">
            <SfRating :score="averageRating" :max="5" />
            <a v-if="!!totalReviews" href="#" class="product__count">
              ({{ totalReviews }})
            </a>
          </div>
          <SfButton
            class="sf-button--text"
            @click="setActiveTab(TabsConfig.reviews.ID)"
          >
            {{ $t("Read all reviews") }}
          </SfButton>
          |
          <SfButton class="sf-button--text" @click="openNewReviewTab">
            {{ $t("Add a review") }}
          </SfButton>
        </div>-->
      </div>
      <div v-if="product !== null">
        <template v-for="option in configurableOptions">
          <div
            v-if="option.attribute_code === 'color'"
            :key="option.uid"
            class="product__colors"
          >
            <p class="product__color-label">{{ option.label }}:</p>
            <SfColor
              v-for="color in option.values"
              :key="color.uid"
              :color="getProductSwatchData(color.swatch_data)"
              :color-uid="color.uid"
              :selected="
                productConfiguration[option.attribute_uid] === color.uid
              "
              class="product__color"
              @click="
                () =>
                  updateProductConfiguration(option.attribute_uid, color.uid)
              "
            />
          </div>
          <!--<SfSelect
            v-else
            :key="option.uid"
            :value="productConfiguration[option.attribute_uid]"
            :label="option.label"
            class="sf-select--underlined product__select-size"
            :required="true"
            @input="
              ($event) =>
                updateProductConfiguration(option.attribute_uid, $event)
            "
          >
            <SfSelectOption :value="''" />
            <SfSelectOption
              v-for="attribute in option.values"
              :key="attribute.uid"
              :value="attribute.uid"
            >
              {{ attribute.label }}
            </SfSelectOption>
          </SfSelect>-->
        </template>
        <CustomAddToCart
          v-model="qty"
          v-e2e="'product_add-to-cart'"
          :disabled="isCartLoading || !canAddToCart(product, qty) || isFetching"
          class="product__add-to-cart"
        >
          <template #add-to-cart-btn>
            <SfButton
              class="sf-add-cart__button"
              :disabled="
                isCartLoading || !canAddToCart(product, qty) || isFetching
              "
              @click="
                addItem({
                  product,
                  quantity: parseInt(qty),
                  productConfiguration,
                })
              "
            >
              {{ $t("Add to cart") }}
            </SfButton>
          </template>
        </CustomAddToCart>

        <SfAlert
          :style="{ visibility: !!addToCartError ? 'visible' : 'hidden' }"
          class="product__add-to-cart-error"
          :message="$t(addToCartError)"
          type="danger"
        />
        <div class="product__additional-actions">
          <AddToWishlist
            :is-in-wishlist="isInWishlist"
            :is-show="isAuthenticated"
            @addToWishlist="addItemToWishlist({ product })"
          />
        </div>
      </div>
      <hr class="sf-divider" />
      <div class="shipping-info">
        <SfIcon
          icon="M5.68545 19.115C4.95745 19.115 4.34045 18.861 3.83445 18.353C3.32779 17.8443 3.07445 17.2267 3.07445 16.5H1.68945V6.615C1.68945 6.155 1.84379 5.771 2.15245 5.463C2.46045 5.15433 2.84479 5 3.30545 5H16.5355V8.615H18.8435L22.3055 13.269V16.5H20.6895C20.6895 17.2267 20.4348 17.8443 19.9255 18.353C19.4161 18.861 18.7975 19.115 18.0695 19.115C17.3421 19.115 16.7255 18.861 16.2195 18.353C15.7128 17.8443 15.4595 17.2267 15.4595 16.5H8.30545C8.30545 17.2307 8.05079 17.8493 7.54145 18.356C7.03145 18.8627 6.41279 19.115 5.68545 19.115ZM5.68945 18.116C6.13945 18.116 6.52145 17.9593 6.83545 17.646C7.14879 17.332 7.30545 16.95 7.30545 16.5C7.30545 16.05 7.14879 15.6683 6.83545 15.355C6.52212 15.0417 6.14012 14.885 5.68945 14.885C5.23879 14.885 4.85712 15.0417 4.54445 15.355C4.23112 15.6683 4.07445 16.05 4.07445 16.5C4.07445 16.95 4.23112 17.3317 4.54445 17.645C4.85779 17.9583 5.23945 18.116 5.68945 18.116ZM2.68945 15.5H3.33545C3.47812 15.0587 3.76812 14.6793 4.20545 14.362C4.64212 14.044 5.13679 13.885 5.68945 13.885C6.21612 13.885 6.70479 14.0407 7.15545 14.352C7.60612 14.6633 7.90212 15.046 8.04345 15.5H15.5355V6H3.30545C3.15145 6 3.01045 6.064 2.88245 6.192C2.75379 6.32067 2.68945 6.46167 2.68945 6.615V15.5ZM18.0745 18.115C18.5245 18.115 18.9061 17.9583 19.2195 17.645C19.5328 17.3317 19.6895 16.95 19.6895 16.5C19.6895 16.05 19.5328 15.6683 19.2195 15.355C18.9061 15.0417 18.5245 14.885 18.0745 14.885C17.6245 14.885 17.2428 15.0417 16.9295 15.355C16.6161 15.6683 16.4595 16.05 16.4595 16.5C16.4595 16.95 16.6161 17.3317 16.9295 17.645C17.2428 17.9583 17.6245 18.115 18.0745 18.115ZM16.5355 13.5H21.2475L18.3055 9.615H16.5355V13.5Z"
          size="sm"
          color="#756A67"
          viewBox="0 0 24 24"
          :coverage="1"
        />
        <span class="shipping-text">Ships in 5-7 business days</span>
      </div>
      <LazyHydrate when-idle>
        <ProductTabs
          :product="product"
          :open-tab="activeTab"
          @changeTab="setActiveTab($event)"
        />
      </LazyHydrate>
    </div>
  </div>
</template>
<script lang="ts">
import LazyHydrate from "vue-lazy-hydration";
import {
  SfButton,
  SfColor,
  SfGallery,
  SfHeading,
  SfLoader,
  SfPrice,
  SfRating,
  SfSelect,
  SfAlert,
  SfIcon,
  SfInput,
} from "@storefront-ui/vue";
import {
  ref,
  computed,
  useContext,
  useRoute,
  useRouter,
  defineComponent,
  PropType,
  toRef,
} from "@nuxtjs/composition-api";

import {
  getSwatchData as getProductSwatchData,
  getName as getProductName,
} from "~/modules/catalog/product/getters/productGetters";

import {
  getTotalReviews,
  getAverageRating,
} from "~/modules/review/getters/reviewGetters";

import { useCart } from "~/modules/checkout/composables/useCart";
import useWishlist from "~/modules/wishlist/composables/useWishlist";
import SvgImage from "~/components/General/SvgImage.vue";
import HTMLContent from "~/components/HTMLContent.vue";
import AddToWishlist from "~/components/AddToWishlist.vue";
import { useUser } from "~/modules/customer/composables/useUser";
import { getConfigurableProductPriceCommand } from "~/modules/catalog/pricing/getConfigurableProductPriceCommand";
import { getConfigurableProductSpecialPriceCommand } from "~/modules/catalog/pricing/getConfigurableProductSpecialPriceCommand";
import { Product } from "~/modules/catalog/product/types";
import ProductTabs from "~/modules/catalog/product/components/tabs/ProductTabs.vue";
import CustomAddToCart from "~/modules/catalog/product/components/CustomAddToCart.vue";

import { useProductGallery } from "~/modules/catalog/product/composables/useProductGallery";
import {
  TabsConfig,
  useProductTabs,
} from "~/modules/catalog/product/composables/useProductTabs";

import { usePageStore } from "~/stores/page";

export default defineComponent({
  name: "ConfigurableProduct",
  components: {
    HTMLContent,
    LazyHydrate,
    SfButton,
    SfColor,
    SfGallery,
    SfHeading,
    SfLoader,
    SfPrice,
    SfRating,
    SfSelect,
    SfAlert,
    AddToWishlist,
    SvgImage,
    ProductTabs,
    SfIcon,
    SfInput,
    CustomAddToCart,
  },
  transition: "fade",
  props: {
    product: {
      type: [Object, null] as PropType<Product>,
      default: null,
    },
    isFetching: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const qty = ref(1);
    const product = toRef(props, "product");
    const route = useRoute();
    const router = useRouter();
    const { routeData } = usePageStore();
    const {
      addItem,
      error: cartError,
      loading: isCartLoading,
      canAddToCart,
    } = useCart();
    const { productGallery, imageSizes } = useProductGallery(product);
    const { activeTab, setActiveTab, openNewReviewTab } = useProductTabs();

    const { isAuthenticated } = useUser();
    const { addOrRemoveItem, isInWishlist } = useWishlist();
    const { app } = useContext();

    const productShortDescription = computed(
      () => props.product?.short_description?.html || ""
    );

    const configurableOptions = computed(
      () => props.product?.configurable_options ?? []
    );

    const productConfiguration = ref(route.value.query);
    const productPrice = computed(() =>
      getConfigurableProductPriceCommand(props.product)
    );
    const productSpecialPrice = computed(() =>
      getConfigurableProductSpecialPriceCommand(props.product)
    );

    const getBaseSearchQuery = () => ({
      filter: {
        sku: {
          eq: routeData.sku,
        },
      },
      configurations: Object.entries(productConfiguration.value).map(
        (config) => config[1]
      ) as string[],
    });

    const totalReviews = computed(() => getTotalReviews(props.product));
    const averageRating = computed(() => getAverageRating(props.product));
    const addToCartError = computed(() => cartError.value?.addItem?.message);
    const updateProductConfiguration = (label: string, value: string) => {
      if (productConfiguration.value[label] === value) return;

      productConfiguration.value[label] = value;
      const routerData = router.resolve({
        path: `${app.localePath(window.location.pathname)}`,
        query: {
          ...productConfiguration.value,
        },
      });

      window.history.pushState({}, null, routerData.href);

      emit("fetchProduct", { query: getBaseSearchQuery() });
    };
    const calculatePercentage=(product) =>{
    const regularPrice = productPrice;
    const specialPrice =productSpecialPrice;
    if (specialPrice && specialPrice !== 0) {
      return Math.round(((regularPrice - specialPrice) / specialPrice) * 100).toString()+ '%';
    } else {
      return ""; // Handle division by zero case or specialPrice being 0
    }
  }
    return {
      addItem,
      addItemToWishlist: addOrRemoveItem,
      canAddToCart,
      configurableOptions,
      updateProductConfiguration,
      isAuthenticated,
      isInWishlist: computed(() => isInWishlist({ product: props.product })),
      isCartLoading,
      productConfiguration,
      productGallery,
      getProductName,
      getProductSwatchData,
      productPrice,
      productShortDescription,
      productSpecialPrice,
      qty,
      totalReviews,
      averageRating,
      imageSizes,
      setActiveTab,
      openNewReviewTab,
      activeTab,
      TabsConfig,
      addToCartError,
      calculatePercentage
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../styles.scss";

.product {
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }

  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);

    @include for-mobile {
      margin-left: var(--spacer-sm);
    }
  }

  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }

  &__color {
    margin: 0 var(--spacer-2xs);
  }
}
</style>
