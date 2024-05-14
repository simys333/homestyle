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
    <SfCarousel class="carousel" :settings="{ gap: 30, rewind: false }">
      <template #prev="prevArrow">
        <CarouselLeftArrow @click="prevArrow.go('prev')" />
      </template>
      <template #next="nextArrow">
        <CarouselRightArrow @click="nextArrow.go('next')" />
      </template>
      <SfCarouselItem class="carousel__item">
       
        
      <div class="products">
        <SfProductCard
          v-for="(product, i) in mappedProducts"
          :key="i"
          class="product"
          image-tag="nuxt-img"
          :title="productGetters.getName(product)"
          :image-width="imageSizes.productCard.width"
          :image-height="imageSizes.productCard.height"
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
          :max-rating="5"
          :score-rating="productGetters.getAverageRating(product)"
          :reviews-count="productGetters.getTotalReviews(product)"
          :is-in-wishlist="isInWishlist({ product })"
          :is-added-to-cart="isInCart(product)"
          :wishlist-icon="isAuthenticated ? 'heart' : ''"
          :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
          @click:wishlist="addItemToWishlist(product)"
          @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
        /></div></SfCarouselItem>
     
    
 
      
      
    </SfCarousel>
    <!--<SfLoader :class="{ loading }" :loading="loading">
      <div class="products">
        <SfProductCard
          v-for="(product, i) in mappedProducts"
          :key="i"
          class="product"
          image-tag="nuxt-img"
          :title="productGetters.getName(product)"
          :image-width="imageSizes.productCard.width"
          :image-height="imageSizes.productCard.height"
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
          :max-rating="5"
          :score-rating="productGetters.getAverageRating(product)"
          :reviews-count="productGetters.getTotalReviews(product)"
          :is-in-wishlist="isInWishlist({ product })"
          :is-added-to-cart="isInCart(product)"
          :wishlist-icon="isAuthenticated ? 'heart' : ''"
          :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''"
          @click:wishlist="addItemToWishlist(product)"
          @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
        />
      </div>
    </SfLoader>-->
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
      const newestProducts = await getProductList({
        pageSize: 8,
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

  ::v-deep .sf-product-card__badge {
    font-family: "IBM Plex Sans";
    top: 0;
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
    ::v-deep .sf-image--placeholder {
      display: none;
    }
    @include for-desktop {
      ::v-deep .sf-carousel__wrapper {
        max-width: calc(100% - 8rem);
      }
    }
    ::v-deep .sf-carousel__slides {
      max-height: 430px;
    }
    ::v-deep .sf-product-card__title {
      font-size: 18px;
      font-family: "IBM Plex Sans";
    }
    ::v-deep .sf-price__special,
    ::v-deep .sf-price__old {
      font-size: 20px;
      font-family: "IBM Plex Sans";
      font-weight: var(--font-weight--semibold);
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
