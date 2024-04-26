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
      <SfCarousel class="carousel" :settings="{ perView: 6, breakpoints: { 1023: { peek: 0, perView: 6 } } }">
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
        </div>
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
         </div> 
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
        </div>
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
         </div> 
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
        </div>
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
         </div> 
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
        </div>
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
         </div> 
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
        </div>
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
         </div> 
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
        </div>
        </SfCarouselItem>
        <SfCarouselItem class="carousel__item">
        <div>
          <img height="100" src="/homepage/cello.png" alt="" />
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

export default defineComponent({
  name: "Brands",
  components: {
    SfProductCard,
    SfSection,
    SfLoader,
    SfLink,
    SfCarousel,
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