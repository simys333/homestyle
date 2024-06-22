<template>
  <div class="new-products">
    <div class="heading">
      <h4 class="sf-heading__title title">
        {{ title }}
      </h4>
      <SfLink :link="localePath(link)" target="_blank">
        {{ buttonText }}
        <RightArrowIcon />
      </SfLink>
    </div>
    <SfLoader :class="{ loading }" :loading="loading">

      <SfCarousel
        :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
        class="carousel"
      >
     
        <SfCarouselItem
          v-for="(product, i) in mappedProducts"
          :key="i"
          class="carousel__item"
        >
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
        </SfCarouselItem>
       
      <template #prev="prevArrow">
          <SfButton
            aria-label="previous"
            class="sf-arrow"
            @click="prevArrow.go('prev')"
          >
            <SvgImage icon="chevron_left" width="24" height="24" />
          </SfButton>
        </template>
        <template #next="nextArrow">
          <SfButton
            aria-label="next"
            class="sf-arrow"
            @click="nextArrow.go('next')"
          >
            <SvgImage icon="chevron_right" width="24" height="24" />
          </SfButton>
        </template>
      </SfCarousel>

  </SfLoader>

   <!---<SfCarousel class="carousel" :settings="{ gap: 30, rewind: false }">
      <template #prev="prevArrow">
        <CarouselLeftArrow @click="prevArrow.go('prev')" />
      </template>
      <template #next="nextArrow">
        <CarouselRightArrow @click="nextArrow.go('next')" />
      </template>
      <SfCarouselItem class="carousel__item">
        <SfProductCard
          image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_2__2.png"
          :imageWidth="312" :imageHeight="360" badgeLabel="20%" badgeColor="" title="Creme Gold Dinner Plate White new"
          linkTag="" regularPrice="₹1600" specialPrice="₹1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
          :isInWishlist="false" showAddToCartButton :is-in-wishlist="isInWishlist({ product })"
          :is-added-to-cart="isInCart(product)" :wishlist-icon="isAuthenticated ? 'heart' : ''"
          :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''" @click:wishlist="addItemToWishlist(product)"
          @click:add-to-cart="addItemToCart({ product, quantity: 1 })" />
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <SfProductCard
          image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_3_.png"
          :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner bowl Black"
          linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
          :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <SfProductCard
          image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_1_.png"
          :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner Plate White new"
          linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
          :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <SfProductCard
          image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_1.png"
          :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner Plate White new"
          linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
          :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <SfProductCard
          image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_2__2.png"
          :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner Plate White new"
          linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
          :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <SfProductCard
          image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_3_.png"
          :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner bowl Black"
          linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
          :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <SfProductCard
          image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_1_.png"
          :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner Plate White new"
          linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
          :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />
      </SfCarouselItem>
      <SfCarouselItem class="carousel__item">
        <SfProductCard
          image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_1.png"
          :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner Plate White new"
          linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
          :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />
      </SfCarouselItem>
    </SfCarousel>
  -->
   
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
    const calculatePercentage=(product) =>{
      console.log(product)
    const regularPrice = this.productGetters.getPrice(product).regular;
    const specialPrice = this.productGetters.getPrice(product).special;
    if (specialPrice !== 0) {
      return Math.round(((regularPrice - specialPrice) / specialPrice) * 100);
    } else {
      return 0; // Handle division by zero case or specialPrice being 0
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
      calculatePercentage
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
      max-height: 430px;
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
