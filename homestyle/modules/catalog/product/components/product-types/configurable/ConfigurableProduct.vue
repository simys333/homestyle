<template>
  <div id="product-detail" class="product">
    <SfLoader class="loading--product-gallery" :loading="isFetching">
      <SfGallery :images="productGallery" :image-width="imageSizes.productGallery.imageWidth"
        :image-height="imageSizes.productGallery.imageHeight" :thumb-width="imageSizes.productGallery.thumbWidth"
        :thumb-height="imageSizes.productGallery.thumbHeight" :enable-zoom="true" image-tag="nuxt-img"
        thumb-image-tag="nuxt-img" class="product__gallery" :nuxt-img-config="{
          fit: 'cover',
        }" :thumb-nuxt-img-config="{
          fit: 'cover',
        }" />
    </SfLoader>
    <div class="product__info">
      <div class="product__header">
        <SfHeading title="Creme Gold Dinner Plate White new" description="Cello" :level="3"
          class="sf-heading--no-underline sf-heading--left" />
        <SvgImage icon="drag" width="40" height="40" class="product__drag-icon smartphone-only" />
      </div>
      <div>
        <SfPrice :regular="$fc(productPrice)" :special="productSpecialPrice && $fc(productSpecialPrice)" />
        <SfPrice class="discount-percentage" regular="20%" />
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
          <div v-if="option.attribute_code === 'color'" :key="option.uid" class="product__colors">
            <p class="product__color-label">{{ option.label }}:</p>
            <SfColor v-for="color in option.values" :key="color.uid" :color="getProductSwatchData(color.swatch_data)"
              :color-uid="color.uid" :selected="productConfiguration[option.attribute_uid] === color.uid
                " class="product__color" @click="() =>
                  updateProductConfiguration(option.attribute_uid, color.uid)
                  " />
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
        <CustomAddToCart v-model="qty" v-e2e="'product_add-to-cart'"
          :disabled="isCartLoading || !canAddToCart(product, qty) || isFetching" class="product__add-to-cart">
          <template #add-to-cart-btn>
            <SfButton class="sf-add-cart__button" :disabled="isCartLoading || !canAddToCart(product, qty) || isFetching
              " @click="
                addItem({
                  product,
                  quantity: parseInt(qty),
                  productConfiguration,
                })
                ">
              {{ $t("Add to cart") }}
            </SfButton>
            <div class="product__additional-actions">
              <AddToWishlist :is-in-wishlist="isInWishlist" :is-show="isAuthenticated"
                @addToWishlist="addItemToWishlist({ product })" />
            </div>
          </template>
        </CustomAddToCart>

        <SfAlert :style="{ visibility: !!addToCartError ? 'visible' : 'hidden' }" class="product__add-to-cart-error"
          :message="$t(addToCartError)" type="danger" />
        <div class="product__additional-actions">
          <AddToWishlist />
        </div>
      </div>
      <div class="shipping-info">
        <ShippingIcon />
        <span class="shipping-text">Ships in 5-7 business days</span>
      </div>
      <LazyHydrate when-idle>
        <ProductTabs :product="product" :open-tab="activeTab" @changeTab="setActiveTab($event)" />
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
import ShippingIcon from "~/components/Icons/ShippingIcon.vue";

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
    ShippingIcon
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
    @include font(--product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary));
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
