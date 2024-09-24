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
    <VueSlickCarousel v-bind="carouselSettings">
      <SfProductCard
        image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_2__2.png"
        :imageWidth="312" :imageHeight="360" badgeLabel="20%" badgeColor="" title="Creme Gold Dinner Plate White new"
        linkTag="" regularPrice="₹1600" specialPrice="₹1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
        :isInWishlist="false" showAddToCartButton :is-in-wishlist="isInWishlist({ product })"
        :is-added-to-cart="isInCart(product)" :wishlist-icon="isAuthenticated ? 'heart' : ''"
        :is-in-wishlist-icon="isAuthenticated ? 'heart_fill' : ''" @click:wishlist="addItemToWishlist(product)"
        @click:add-to-cart="addItemToCart({ product, quantity: 1 })" />

      <SfProductCard
        image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_3_.png"
        :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner bowl Black" linkTag=""
        regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill" :isInWishlist="false"
        showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />

      <SfProductCard
        image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_1_.png"
        :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner Plate White new"
        linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
        :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />

      <SfProductCard
        image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_1.png"
        :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner Plate White new"
        linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
        :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />

      <SfProductCard
        image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_2__2.png"
        :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner Plate White new"
        linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
        :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />

      <SfProductCard
        image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_3_.png"
        :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner bowl Black" linkTag=""
        regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill" :isInWishlist="false"
        showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />

      <SfProductCard
        image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_1_.png"
        :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner Plate White new"
        linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
        :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />

      <SfProductCard
        image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_1.png"
        :imageWidth="312" :imageHeight="360" badgeLabel="" badgeColor="" title="Creme Gold Dinner Plate White new"
        linkTag="" regularPrice="1600" specialPrice="1280" wishlistIcon="heart" isInWishlistIcon="heart_fill"
        :isInWishlist="false" showAddToCartButton :isAddedToCart="false" :addToCartDisabled="false" />

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
import CarouselLeftArrow from "./CarouselLeftArrow.vue";
import CarouselRightArrow from "./CarouselRightArrow.vue";
import RightArrowIcon from "./Icons/RightArrowIcon.vue";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default defineComponent({
  name: "NewProducts",
  components: {
    SfProductCard,
    SfSection,
    SfLoader,
    SfLink,
    CarouselLeftArrow,
    CarouselRightArrow,
    RightArrowIcon,
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

    const { getMagentoImage, imageSizes } = useImage();

    onMounted(async () => {
      // const newestProducts = await getProductList({
      //   pageSize: 4,
      //   currentPage: 1,
      //   sort: {
      //     position: SortEnum.Asc,
      //   },
      // });

      // if (newestProducts?.items?.length) {
      //   products.value = newestProducts.items;
      // }
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

  ::v-deep .sf-product-card__badge {
    font-family: var(--font-family--primary);
    top: 0;
    font-size: 1rem;
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
