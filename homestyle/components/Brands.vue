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
   
      
      <VueSlickCarousel v-bind="carouselSettings">
     
        <div>
          <img src="/homepage/cello.png" alt="" />
        </div>
    
   
        <div>
          <img src="/homepage/yera.png" alt="" />
        </div>
    
        <div>
          <img src="/homepage/union.png" alt="" />
        </div>
        <div>
          <img src="/homepage/fackelmann.png" alt="" />
        </div>
        <div>
          <img src="/homepage/pearlpet.png" alt="" />
        </div>
        <div>
          <img src="/homepage/cello.png" alt="" />
        </div>
        <div>
          <img src="/homepage/cello.png" alt="" />
        </div>
        <div>
          <img src="/homepage/cello.png" alt="" />
        </div>
        <div>
          <img src="/homepage/cello.png" alt="" />
        </div>
        <div>
          <img src="/homepage/cello.png" alt="" />
        </div>
        <div>
          <img src="/homepage/cello.png" alt="" />
        </div>
        <div>
          <img src="/homepage/cello.png" alt="" />
        </div>
        <template #prevArrow>
        <CarouselLeftArrow />


      </template>
      
        <template #nextArrow>
          <CarouselRightArrow />
      </template>
      </VueSlickCarousel>
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
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

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
    RightArrowIcon,
    VueSlickCarousel,
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
    const carouselSettings = {
      "arrows": true, "dots": false, "infinite": false, "slidesToShow": 7, "responsive": [
        {
          "breakpoint": 1366,
          "settings": {
            "slidesToShow": 7,
            "slidesToScroll": 7,
            "arrows": false,
          }
        },
        {
          "breakpoint": 600,
          "settings": {
            "slidesToShow": 4,
            "slidesToScroll": 4,
            "arrows": false,
          }
        },
        {
          "breakpoint": 480,
          "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 2,
            "arrows": false,
          }
        }
      ]
    };

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
      carouselSettings

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

  .slick-slider {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: -30px;
    margin-right: -30px;
    .slick-prev {
      left: 0;
    }
    .slick-next {
      right: 0;
    }
    ::v-deep .slick-slide {
      display: flex !important;
      justify-content: center;
    }
    &__item {
      margin: 2rem 0 2rem 0;
      text-align: center;

      img {
        width: 120px;
        height: auto;
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
