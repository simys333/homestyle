<template>
  <div id="home">
    <HeroSection class="hero-section" :title="hero.title" :subtitle="hero.subtitle" :description="hero.description"
      :button-text="hero.buttonText" :link="hero.link" :image-src="hero.imageSrc" :image-width="hero.imageWidth"
      :image-height="hero.imageHeight" :nuxt-img-config="hero.imageConfig" image-tag="nuxt-img" />
    <!-- New section with four boxes -->
    
    <div class="icon-text-row">
      <div class="icon-text-box">
        <div class="icon">
          <!-- Replace 'icon1.png' with your actual icon image path -->
          <img src="/homepage/delivery-truck 1.png" alt="Icon Description" />
        </div>
        <div class="text">
          <h6>Free Shipping</h6>
          <span>Free shipping on all your orders</span>
        </div>
      </div>
      <div class="icon-text-box">
        <div class="icon">
          <img src="/homepage/headphones 1.png" alt="Icon Description" />
        </div>
        <div class="text">
          <h6>Customer Support 24/7</h6>
          <span>Instant access to Support</span>
        </div>
      </div>
      <div class="icon-text-box">
        <div class="icon">
          <!-- Replace 'icon3.png' with your actual icon image path -->
          <img src="/homepage/shopping-bag.png" alt="Icon Description" />
        </div>
        <div class="text">
          <h6>100% Secure Payment</h6>
          <span>We ensure your money is safe</span>
        </div>
      </div>
      <div class="icon-text-box">
        <div class="icon">
          <img src="/homepage/package.png" alt="Icon Description" />
        </div>
        <div class="text">
          <h6>Money-Back Guarantee</h6>
          <span>30 Days Money-Back Guarantee</span>
        </div>
      </div>
    </div>
    <LoadWhenVisible>
      <Category :button-text="$t('View All')" :title="$t('Shop By Category')" link="/kitchenware.html" />
    </LoadWhenVisible>
    <LoadWhenVisible>
      <NewProducts class="products" :button-text="$t('View All')" :title="$t('Best Sellers')"
        link="/kitchenware.html" />
    </LoadWhenVisible>
    <LazyHydrate when-visible>
      <CustomBannerGrid class="banner-grid">
        <template v-for="item in banners" #[item.slot]>
          <SfBanner :key="item.slot" :title="item.title" :subtitle="item.subtitle" :description="item.description"
            :button-text="item.buttonText" image-tag="nuxt-img" :image="item.image" :nuxt-img-config="item.imageConfig"
            :class="item.class" />
        </template>
      </CustomBannerGrid>
    </LazyHydrate>
    <LoadWhenVisible>
      <Brands :button-text="$t('View All')" :title="$t('Shop By Brands')" link="/kitchenware.html" />
    </LoadWhenVisible>

    <LoadWhenVisible>
      <NewProducts class="products" :button-text="$t('View All')" :title="$t('Fresh Arrivals That Capture Hearts')"
        link="/dinnerware.html" />
    </LoadWhenVisible>
    <LoadWhenVisible>
      <SaleSection :title="sale.title" :subtitle="sale.subtitle" :description="sale.description"
        :button-text="sale.buttonText" :link="sale.link" :image-src="sale.imageSrc" :image-width="sale.imageWidth"
        :image-height="sale.imageHeight" :nuxt-img-config="sale.imageConfig" image-tag="nuxt-img" />
    </LoadWhenVisible>
    <LoadWhenVisible>
      <NewProducts class="products" :button-text="$t('View All')"
        :title="$t('Thoughtful Gifts for Every Kitchen Enthusiast !')" link="/what-is-new.html" />
    </LoadWhenVisible>
    <LoadWhenVisible>
     <!-- <SfCallToAction :title="callToAction.title" :button-text="callToAction.buttonText"
        :description="callToAction.description" :background="callToAction.background" class="call-to-action" />
    -->
    <SfCallToAction class="call-to-action" :title="callToAction.title" :description="callToAction.description"
        :background="callToAction.background">
        <template #button>
          <SfButton class="sf-call-to-action__button">
            Shop Now  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="13" viewBox="0 0 24 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>

          </SfButton>
        </template>
      </SfCallToAction>
      </LoadWhenVisible>
    <SfBanner class="luxury-banner" title="Fine Dining, Finer Choices" subtitle=""
      description="Explore Our Exclusive Luxury Dinnerware!" buttonText="Shop Now" background=""
      image="/homepage/luxury.png" />

    <div>
      <h3 style="color: #f8470a">We Design & Curate the Best.</h3>
      <p>
        At Homstyle, we prioritize excellence in every piece. Our commitment to
        superior craftsmanship ensures that each item is meticulously designed
        and crafted with the highest quality materials, guaranteeing durability
        and timeless appeal.
      </p>
      <div class="icon-text-row">
        <div class="icon-text-box">
          <div class="icon">
            <!-- Replace 'icon1.png' with your actual icon image path -->
            <img else-if src="/homepage/diamond (2) 2.png" alt="Icon Description" />
          </div>
          <div class="text">
            <p>Crafted for a <br />Lifetime.</p>
          </div>
        </div>
        <div class="icon-text-box">
          <div class="icon">
            <img else-if src="/homepage/romantic-dinner 4.png" alt="Icon Description" />
          </div>
          <div class="text">
            <p>
              Everyday Essentials,<br />
              Extraordinary Style.
            </p>
          </div>
        </div>
        <div class="icon-text-box">
          <div class="icon">
            <!-- Replace 'icon3.png' with your actual icon image path -->
            <img src="/homepage/romantic-dinner 3.png" alt="Icon Description" />
          </div>
          <div class="text">
            <p>Beauty in <br />Every Detail.</p>
          </div>
        </div>
        <div class="icon-text-box">
          <div class="icon">
            <img src="/homepage/cheers 3.png" alt="Icon Description" />
          </div>
          <div class="text">
            <p>Crafting Memories, <br />Where Moments Matter.</p>
          </div>
        </div>
      </div>
    </div>
    <Newsletter />
  </div>
</template>
<script lang="ts" type="module">
import {
  defineComponent,
  ref,
  useContext,
  onMounted,
  useFetch,
} from "@nuxtjs/composition-api";
import LazyHydrate from "vue-lazy-hydration";
import { useCache, CacheTagPrefix } from "@vue-storefront/cache";
import { SfBanner, SfCallToAction,SfButton } from "@storefront-ui/vue";
import { CmsPage } from "~/modules/GraphQL/types";
import HeroSection from "~/components/HeroSection.vue";
import SaleSection from "~/components/SaleSection.vue";
import CustomBannerGrid from "~/components/CustomBannerGrid.vue";
import { getMetaInfo } from "~/helpers/getMetaInfo";
import { useContent } from "~/composables";
import LoadWhenVisible from "~/components/utils/LoadWhenVisible.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    HeroSection,
    SaleSection,
    LazyHydrate,
    LoadWhenVisible,
    SfBanner,
    CustomBannerGrid,
    SfCallToAction,
    SfButton,
    MobileStoreBanner: () =>
      import(/* webpackPrefetch: true */ "~/components/MobileStoreBanner.vue"),
    NewProducts: () =>
      import(/* webpackPrefetch: true */ "~/components/NewProducts.vue"),
    Brands: () =>
      import(/* webpackPrefetch: true */ "~/components/Brands.vue"),
    Category: () =>
      import("~/components/Category.vue"),
    Newsletter: () =>
      import("~/components/Newsletter.vue"),
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const { addTags } = useCache();
    const { loadPage } = useContent();
    const { app } = useContext();
    const year = new Date().getFullYear();
    const { isDesktop } = app.$device;

    const page = ref<CmsPage | null>;
    const hero = ref({
      title: app.i18n.t("30-80% OFF"),
      subtitle: app.i18n.t("Sale is Live"),
      description: app.i18n.t("+ EXTRA 5% OFF"),
      buttonText: app.i18n.t("SHOP NOW"),
      imageSrc: "/homepage/banner.png",
      imageWidth: isDesktop ? 1600 : 328,
      imageHeight: isDesktop ? 578 : 224,
      imageConfig: {
        fit: "contain",
        format: "webp",
      },
      link: "/women.html",
    });
    const sale = ref({
      title: app.i18n.t("30-80% OFF"),
      subtitle: app.i18n.t("Clearance Sale"),
      description: app.i18n.t("On Premium Collection of Glassware"),
      buttonText: app.i18n.t("SHOP NOW"),
      imageSrc: "/homepage/sale.png",
      imageWidth: isDesktop ? 1600 : 328,
      imageHeight: isDesktop ? 578 : 224,
      imageConfig: {
        fit: "contain",
        format: "webp",
      },
      link: "/women.html",
    });
    const banners = ref([
      {
        slot: "banner-A",
        subtitle: app.i18n.t('Plate Specials'),
        title: app.i18n.t('30% OFF'),
        image: "/homepage/banner-left-top.png",
        imageConfig: {
          fit: "contain",
          width: isDesktop ? 312 : 328,
          height: isDesktop ? 310 : 343,
        },
        class: "sf-banner--slim banner__tshirt",
        link: "/women/women-clothing-shirts",
        description:"",
        buttonText:""
      },
      {
        slot: "banner-B",
        subtitle: app.i18n.t('Plate Specials'),
        title: app.i18n.t('30% OFF'),
        image: "/homepage/banner-left-bottom.png",
        imageConfig: {
          fit: "contain",
          width: isDesktop ? 312 : 328,
          height: isDesktop ? 310 : 343,
        },
        class: "sf-banner--slim banner__tshirt",
        link: "/women/women-shoes-sandals",
        description:"",
        buttonText:""
      },
      {
        slot: "banner-C",
        subtitle: app.i18n.t('Bundle Up & Save'),
        title: app.i18n.t('50% OFF'),
        image: "/homepage/banner-middle.png",
        imageConfig: {
          fit: "contain",
          width: isDesktop ? 648 : 328,
          height: isDesktop ? 644 : 343,
        },
        class: "sf-banner--slim banner-central desktop-only",
        link: "/women/women-clothing-dresses",
        description:"",
        buttonText:""
      },
      {
        slot: "banner-D",
        subtitle: app.i18n.t('Plate Specials'),
        title: app.i18n.t('30% OFF'),
        image: "/homepage/banner-right-top.png",
        imageConfig: {
          fit: "contain",
          width: isDesktop ? 312 : 328,
          height: isDesktop ? 310 : 343,
        },
        class: "sf-banner--slim banner__tshirt",
        link: "/women/women-clothing-shirts",
        description:"",
        buttonText:""
      },
      {
        slot: "banner-E",
        subtitle: app.i18n.t('Plate Specials'),
        title: app.i18n.t('30% OFF'),
        image: "/homepage/banner-right-bottom.png",
        imageConfig: {
          fit: "contain",
          width: isDesktop ? 312 : 328,
          height: isDesktop ? 310 : 343,
        },
        class: "sf-banner--slim banner__tshirt",
        link: "/women/women-shoes-sandals",
        description:"",
        buttonText:""
      },
    ]);
    const callToAction = ref({
      title: app.i18n.t("Stuck on what to choose for that special occasion? We've got you covered!  Explore our tailored suggestions guaranteed to delight your loved ones!"),
      description: '',
      buttonText: app.i18n.t('SHOP NOW'),
      background: '#F96C3B'
    });

    /*useFetch(async () => {
      page.value = await loadPage({ identifier: "home" });
    });*/

    onMounted(() => {
      addTags([{ prefix: CacheTagPrefix.View, value: "home" }]);
    });

    // @ts-ignore
    return {
      banners,
      callToAction,
      hero,
      sale,
      page,
    };
  },
  /*head() {
    return getMetaInfo(this.page);
  },*/
});
</script>
<style lang="scss" scoped>
.article-meta h4 a {
  color: #111111;
  font-weight: 600;
  font-size: 20px;
}

.article-meta {
  margin-top: 10px;
}

.article-item__meta-item:not(:last-child)::after {
  display: inline-block;
  content: "";
  width: 5px;
  height: 5px;
  margin: -1px 10px 0 10px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.4);
  vertical-align: middle;
}

#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);

  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero-section {
  /* margin: var(--spacer-xl) auto var(--spacer-lg);*/

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    /*margin: var(--spacer-xl) auto var(--spacer-2xl);*/
  }
}

.hero-section {
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
}

.banner-grid {
  --banner-container-width: 50%;
  margin-bottom: var(--spacer-xl);

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    ::v-deep .sf-link {
      --button-width: auto;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }

  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;

  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;

  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }

  ::v-deep .sf-call-to-action__title {
    font-family: var(--font-family--secondary);
    font-size: 32px;

    @include for-mobile {
      font-size: 12px;
    }
  }

  ::v-deep .sf-call-to-action__button {
    color: #f8470a;
    background-color: #ffffff;
    font-size: 14px;
    font-weight: 600;

    @include for-mobile {
      font-size: 11px;
    }
  }
}

.products {
  margin-top: var(--spacer-base);
}

.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;

  @include for-desktop {
    margin: 0;
  }

  &__item {
    margin: 1.375rem 0 2.5rem 0;

    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }

    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
}

section.sf-banner.sf-banner--slim {
  background-size: cover;
  min-height: 20rem;

  ::v-deep .sf-banner__wrapper-desktop {
    background-color: rgba(255, 255, 255, 0.5);
    margin: 20px 0px 0px 20px;
    padding: 15px;

    .sf-banner__title {
      font-size: 30px;
      font-weight: 600;
      margin-top:0px;
    }

    .sf-banner__subtitle {
      font-size: 25px;
      color: #190701;
      text-transform: capitalize;
    }
  }
}

section.sf-banner.banner-central {
  background-size: cover;
  background-position: top left;

  ::v-deep .sf-banner__wrapper-desktop {

    .sf-banner__title {
      font-size: 38px;
    }

    .sf-banner__subtitle {
      font-size: 26px;
    }
  }
}

.sale-section {
  margin: var(--spacer-2xl) 0 var(--spacer-2xl) 0;
}

.luxury-banner {
  margin: var(--spacer-lg) 0 var(--spacer-lg) 0;

  @include for-desktop {
    margin: var(--spacer-2xl) 0 var(--spacer-2xl) 0;
  }

  ::v-deep .sf-banner__wrapper.sf-button {
    display: none;
  }

  ::v-deep .sf-banner__wrapper-desktop {
    display: block;
  }

  ::v-deep .sf-banner__title {
    color: #fca385;
    max-width: 18rem;
    text-transform: capitalize;

    @include for-desktop {
      font-size: 48px;
    }
  }

  ::v-deep .sf-banner__description {
    display: block;
    color: #fca385;
    text-transform: capitalize;

    @include for-desktop {
      font-size: 24px;
    }
  }

  ::v-deep .sf-banner__call-to-action {
    display: block;
    color: #ffffff;
    background-color: var(--c-primary);
  }
}

.icon-text-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: var(--spacer-lg) 0;

  @include for-desktop {
    margin: var(--spacer-lg) 0;
  }
  @include for-mobile {
    diaplay: flex;
    flex-direction: column;
  }
  h6 {
    @include for-mobile {
      font-size: 1em;
      margin-bottom: 5px;
      margin-top: 15px;
    }
  }
}

.icon-text-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .icon {
    margin-right: var(--spacer-sm);
  }
  @include for-mobile {
    margin-top: 20px;
  }

  @include for-desktop {
    .icon {
      margin-right: var(--spacer-sm);
    }

    .text {
      h6 {
        font-family: var(--font-family--primary);
        font-size: 16px;
        font-weight: 600;
        margin: 0;
      }

      span {
        font-size: 14px;
        color: #756a67;
      }
    }
  }
}
</style>
