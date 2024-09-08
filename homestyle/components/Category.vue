<template>
  <div class="new-products">
    <div class="heading">
      <h4 class="sf-heading__title title">
        {{ title }}
      </h4>
      <SfLink :link="localePath(link)" target="_blank">
        {{ buttonText }}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 24 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>

      </SfLink>
    </div>
    <SfCarousel class="carousel" :settings="{
      perView: 6,
      gap: 20,
      peek: 16,
      breakpoints: { 1023: { peek: 0, perView: 2 } },
    }">
      <template #prev="prevArrow">
        <CarouselLeftArrow @click="prevArrow.go('prev')" />
      </template>
      <template #next="nextArrow">
        <CarouselRightArrow @click="nextArrow.go('next')" />
      </template>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Dinner Ware.png" alt="" />
          <span>Dinner Ware</span>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Mugs.png" alt="" />
          <span>Mugs</span>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Cutlery.png" alt="" />
          <span>Cutlery</span>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Bottles.png" alt="" />
          <span>Bottles</span>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Dinner Ware.png" alt="" />
          <span>Dinner Ware</span>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Bowls.png" alt="" />
          <span>Bowls</span>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Casserole.png" alt="" />
          <span>Casserole</span>
        </div>
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <div class="icon-text-box">
          <img src="/homepage/Dinner Ware.png" alt="" />
          <span>Dinner Ware</span>
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
import CarouselLeftArrow from "./CarouselLeftArrow.vue";
import CarouselRightArrow from "./CarouselRightArrow.vue";
import RightArrowIcon from "./Icons/RightArrowIcon.vue";

export default defineComponent({
  name: "Brands",
  components: {
    SfProductCard,
    SfSection,
    SfLoader,
    SfLink,
    SfCarousel,
    CarouselLeftArrow,
    CarouselRightArrow,
    RightArrowIcon
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
    font-family: var(--font-family--secondary);
    font-size: 24px;
    font-weight: var(--font-weight--semibold);
  }

  .sf-link {
    text-decoration: none;
    font-size: 16px;
    font-family: var(--font-family--primary);
  }

  .carousel {
    margin: 0 calc(-1 * var(--spacer-sm)) 0 0;

    @include for-desktop {
      margin: 0;
    }

    &__item {
      margin: 3rem 0;
    }

    @include for-desktop {
      ::v-deep .sf-carousel__wrapper {
        max-width: calc(100% - 8rem);
      }
    }

    ::v-deep .icon-text-box {
      align-items: center;
      display: flex;
      flex-direction: column;

      span {
        font-size: 18px;
        margin-top: 10px;
        color: #190701;
      }
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
