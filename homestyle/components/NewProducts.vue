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
    <SfLoader :class="{ loading }" :loading="loading">

     
      <VueSlickCarousel v-if="mappedProducts.length>0" v-bind="carouselSettings">

        <div
          v-for="(product, i) in mappedProducts"
          :key="i" >
          <SfProductCard 
            image-tag="nuxt-img"
            :title="productGetters.getName(product)"
            :image-width="imageSizes.productCard.width"
            :image-height="imageSizes.productCard.height"
            :badgeLabel="calculatePercentage(product)"
            :image="
              getMagentoImage(productGetters.getProductThumbnailImage(product))
            "
            :nuxt-img-config="{
              fit: 'cover',
            }"
            :regular-price="$fc(productGetters.getPrice(product).regular)"
            :special-price="
              productGetters.getPrice(product).special &&
              $fc(productGetters.getPrice(product).special)
            "
            :link="localePath(getProductPath(product))"
            :is-in-wishlist="isInWishlist({ product })"
            :is-added-to-cart="isInCart(product)"
            :wishlist-icon="isAuthenticated ? 'heart' : ''"
            :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
            @click:wishlist="addItemToWishlist(product)"
            @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
          />
     
       </div>
       <template #prevArrow>
        <CarouselLeftArrow />
      
        </template>
        <template #nextArrow>
          <CarouselRightArrow />
        </template>
      </VueSlickCarousel>

  </SfLoader>

   
   
  </div>
</template>

<script lang="ts">
import {
  SfLink,
  SfLoader,
  SfProductCard,
  SfSection,
  SfCarousel,
  SfButton
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
import SvgImage from "~/components/General/SvgImage.vue";
import VueSlickCarousel from 'vue-slick-carousel';

import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';



export default defineComponent({
  name: "NewProducts",
  components: {
    SfProductCard,
    SfSection,
    SfLoader,
    SfLink,
    SfCarousel,
    CarouselLeftArrow,
    CarouselRightArrow,
    RightArrowIcon,
    SfButton,
    SvgImage,
    VueSlickCarousel

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
    const carouselSettings = {
      "arrows": true, "dots": false, "infinite": false, "slidesToShow": 4, "responsive": [
        {
          "breakpoint": 600,
          "settings": {
            "slidesToShow": 3,
            "slidesToScroll": 3,
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
    const mappedProducts = computed(() =>
      products.value.map((product) => ({
        ...product,
        isInWishlist: isInWishlist({ product }),
      }))
    );

    const addItemToWishlist = async (product) => {
      await addOrRemoveItem({ product });
    };
    const calculatePercentage=(product) =>{
    const regularPrice = productGetters.getPrice(product).regular;
    const specialPrice =productGetters.getPrice(product).special;
    if (specialPrice && specialPrice !== 0) {
      return Math.round(((regularPrice - specialPrice) / specialPrice) * 100).toString()+ '%';
    } else {
      return ""; // Handle division by zero case or specialPrice being 0
    }
  }
    const { getMagentoImage, imageSizes } = useImage();

    onMounted(async () => {
      const newestProducts = await getProductList({
        pageSize: 10,
        currentPage: 1,
        sort: {
          position: SortEnum.Asc,
        },
      });

      if (newestProducts?.items?.length) {
        products.value = newestProducts.items;
      }
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
      calculatePercentage,
      carouselSettings
    };
  },
});
</script>

<style lang="scss" scoped>

/*.new-products {
  .heading {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .slick-slider {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: -35px;
    margin-right: -35px;
    .slick-prev {
      left: 0;
    }
    .slick-next {
      right: 0;
    }
  }
    ::v-deep .slick-slide {
      display: flex !important;
      justify-content: center;
    }
  .carousel .sf-carousel__controls button.sf-button
  {
    background:transparent;
  }
  .sf-carousel__controls span {
    color: #000000;
}
.carousel .sf-carousel__controls button.sf-button:hover {
    --button-box-shadow-opacity: 0;
}
  .sf-section__content {
    margin: 0;
  }

  ::v-deep .sf-product-card__badge {
    font-family: var(--font-family--primary);
    top: 0;
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
  .sf-product-card {
    padding: 0;
  }
  ::v-deep .sf-product-card__add-button {
    bottom: -1rem;
  }

  .carousel {
    margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
    @include for-desktop {
      margin: 0;
    }
    &__item {
      margin: 1.9375rem 0 2.4375rem 0;
    }
    ::v-deep .sf-product-card:hover {
      --product-card-box-shadow: none;
    }
    ::v-deep .sf-image--placeholder {
      display: none;
    }
    @include for-desktop {
      ::v-deep .sf-carousel__wrapper {
        max-width: calc(100% - 8rem);
      }
    }
    ::v-deep .sf-carousel__slides {
      max-height: auto;
    }
    ::v-deep .sf-product-card__title {
      font-size: 18px;
      font-family: var(--font-family--primary);
      overflow: auto;
      text-overflow: initial;
      white-space: normal;
    }
    ::v-deep .sf-price__special,
    ::v-deep .sf-price__old {
      font-size: 20px;
      font-family: var(--font-family--primary);
      font-weight: var(--font-weight--semibold);
    }
    ::v-deep .sf-price__regular
    {
      font-family: var(--font-family--primary);
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
}*/
.new-products {
  .heading {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  ::v-deep .sf-price__regular
    {
      font-family: var(--font-family--primary);
    }
  .sf-section__content {
    margin: 0;
  }

  ::v-deep .sf-product-card__badge {
    font-family: var(--font-family--primary);
    top: 0;
    font-size: 1rem;
  }

  .title {
    font-family: var(--font-family--secondary);
    font-size: 24px;
    font-weight: var(--font-weight--semibold);
    @include for-mobile {
    width:80%;

  }
  }

  .sf-link {
    text-decoration: none;
    font-size: 16px;
    font-family: var(--font-family--primary);
    @include for-mobile {
    width:24%;

  }
  }

  /*.sf-product-card {
    padding: 0;
  }*/

  ::v-deep .sf-product-card__add-button {
    bottom: -1rem;
  }


  .slick-slider {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: -35px;
    margin-right: -35px;

    .slick-prev {
      left: 0;
    }

    .slick-next {
      right: 0;
    }

    ::v-deep .sf-product-card__title {
      font-size: 18px;
      font-family: var(--font-family--primary);
      color: #190701;
      white-space: normal;

    }

    ::v-deep .sf-price__special,
    ::v-deep .sf-price__old {
      font-size: 20px;
      font-family: var(--font-family--primary);
      font-weight: var(--font-weight--medium);
    }

    ::v-deep .sf-price__old {
      color: #756A67;
    }

    ::v-deep .slick-slide {
      display: flex !important;
      justify-content: center;
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
