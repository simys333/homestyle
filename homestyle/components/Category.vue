<template>
  <div class="new-products">
    <div class="heading">
      <h4 class="sf-heading__title title">
        {{ title }}
      </h4>
      <SfLink :link="localePath(link)" target="_blank">
        {{ buttonText }}
      </SfLink>
    </div>
    <SfCarousel
      class="carousel"
      :settings="{ perView: 5, breakpoints: { 1023: { peek: 0, perView: 6 } } }"
    >
      <template #prev="prevArrow">
        <SfButton
          aria-label="previous"
          class="sf-arrow"
          @click="prevArrow.go('prev')"
        >
          <SvgImage icon="chevron_left" width="20" height="20" />
        </SfButton>
      </template>
      <template #next="nextArrow">
        <SfButton
          aria-label="next"
          class="sf-arrow"
          @click="nextArrow.go('next')"
        >
          <SvgImage icon="chevron_right" width="20" height="20" />
        </SfButton>
      </template>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Dinner Ware.png" alt="" />
          <p>Dinner Ware</p>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Mugs.png" alt="" />
          <p>Mugs</p>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Cutlery.png" alt="" />
          <p>Cutlery</p>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Bottles.png" alt="" />
          <p>Bottles</p>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Dinner Ware.png" alt="" />
          <p>Dinner Ware</p>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Bowls.png" alt="" />
          <p>Bowls</p>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Casserole.png" alt="" />
          <p>Casserole</p>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Dinner Ware.png" alt="" />
          <p>Dinner Ware</p>
        </div>
      </SfCarouselItem>
    </SfCarousel>
  </div>
</template>

<script lang="ts">
import {
  SfLink,
  SfLoader,
  SfProductCard,
  SfSection,
  SfCarousel,
  SfButton,
  SfIcon,
} from "@storefront-ui/vue";

import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from "@nuxtjs/composition-api";
import { useImage, useProduct } from "~/composables";
import useWishlist from "~/modules/wishlist/composables/useWishlist";
import productGetters from "~/modules/catalog/product/getters/productGetters";
import { useUser } from "~/modules/customer/composables/useUser";
import { useAddToCart } from "~/helpers/cart/addToCart";
import { SortEnum } from "~/modules/GraphQL/types";
import SvgImage from "~/components/General/SvgImage.vue";

export default defineComponent({
  name: "Brands",
  components: {
    SfProductCard,
    SfSection,
    SfLoader,
    SfLink,
    SfCarousel,
    SfButton,
    SfIcon,
    SvgImage,
  },
  props: {
    buttonText: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup() {
    const { isAuthenticated } = useUser();
    const { getProductList, loading, getProductPath } = useProduct();
    const { isInWishlist, addOrRemoveItem } = useWishlist();
    const { addItemToCart, isInCart } = useAddToCart();
    const products = ref([]);

    const mappedProducts = computed(() =>
      products.value.map((product) => ({
        ...product,
        isInWishlist: isInWishlist({ product }),
      }))
    );

    const addItemToWishlist = async (product) => {
      await addOrRemoveItem({ product });
    };

    const { getMagentoImage, imageSizes } = useImage();

    onMounted(async () => {
      /*const newestProducts = await getProductList({
        pageSize: 4,
        currentPage: 1,
        sort: {
          position: SortEnum.Asc,
        },
      });

      if (newestProducts?.items?.length) {
        products.value = newestProducts.items;
      }*/
    });

    return {
      addItemToCart,
      addItemToWishlist,
      isAuthenticated,
      isInCart,
      isInWishlist,
      loading,
      mappedProducts,
      productGetters,
      getMagentoImage,
      imageSizes,
      getProductPath,
    };
  },
});
</script>

<style lang="scss" scoped>
.new-products {
  .heading {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .sf-section__content {
    margin: 0;
  }

  .title {
    font-family: "Recoleta";
    font-size: 24px;
    font-weight: var(--font-weight--semibold);
  }

  .sf-link {
    text-decoration: none;
    font-size: 16px;
    font-family: "IBM Plex Sans";
  }

  .carousel {
    margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
    @include for-desktop {
      margin: 0;
    }
    &__item {
      margin: 1.9375rem 0 2.4375rem 0;
    }

    ::v-deep .icon-text-box {
      text-align: center;
    }
    .sf-carousel__controls {
      button {
        background-color: transparent;
      }
      span {
        color: #190701;
      }
    }
  }

  .products {
    display: flex;
    justify-content: space-between;

    @include for-mobile {
      flex-wrap: wrap;
    }

    .product {
      @include for-desktop {
        flex: 1 1 25%;
      }

      @include for-mobile {
        flex: 1 1 50%;
      }
    }
  }
}
</style>
