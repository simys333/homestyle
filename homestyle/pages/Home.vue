<template>
  <div id="home">
    <HeroSection
      class="hero-section"
      :title="hero.title"
      :subtitle="hero.subtitle"
      :button-text="hero.buttonText"
      :link="hero.link"
      :image-src="hero.imageSrc"
      :image-width="hero.imageWidth"
      :image-height="hero.imageHeight"
      :nuxt-img-config="hero.imageConfig"
      image-tag="nuxt-img"
    />
    <!-- New section with four boxes -->
    <div class="icon-text-row">
      <div class="icon-text-box">
        <div class="icon">
          <!-- Replace 'icon1.png' with your actual icon image path -->
          <img
            else-if
            src="/homepage/delivery-truck 1.png"
            alt="Icon Description"
          />
        </div>
        <div class="text">
          <h6>Free Shipping</h6>
          <p>Free shipping on all your order</p>
        </div>
      </div>
      <div class="icon-text-box">
        <div class="icon">
          <img
            else-if
            src="/homepage/headphones 1.png"
            alt="Icon Description"
          />
        </div>
        <div class="text">
          <h6>Customer Support 24/7</h6>
          <p>Instant access to Support</p>
        </div>
      </div>
      <div class="icon-text-box">
        <div class="icon">
          <!-- Replace 'icon3.png' with your actual icon image path -->
          <img src="/homepage/shopping-bag.png" alt="Icon Description" />
        </div>
        <div class="text">
          <h6>100% Secure Payment</h6>
          <p>We ensure your money is save</p>
        </div>
      </div>
      <div class="icon-text-box">
        <div class="icon">
          <img src="/homepage/package.png" alt="Icon Description" />
        </div>
        <div class="text">
          <h6>Money-Back Guarantee</h6>
          <p>30 Days Money-Back Guarantee</p>
        </div>
      </div>
    </div>
    <LoadWhenVisible>
      <Category
        :button-text="$t('View All ->')"
        :title="$t('Shop By Category')"
        link="/kitchenware.html"
      />
    </LoadWhenVisible>
    <LoadWhenVisible>
      <NewProducts
        class="products"
        :button-text="$t('View All ->')"
        :title="$t('Best Sellers')"
        link="/kitchenware.html"
      />
    </LoadWhenVisible>
    <LazyHydrate when-visible>
      <SfBannerGrid :banner-grid="1" class="banner-grid">
        <template v-for="item in banners" #[item.slot]>
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            image-tag="nuxt-img"
            :image="item.image"
            :nuxt-img-config="item.imageConfig"
            :class="item.class"
          />
        </template>
      </SfBannerGrid>
    </LazyHydrate>
    <LoadWhenVisible>
      <Brands
        :button-text="$t('View All ->')"
        :title="$t('Shop By Brands')"
        link="/kitchenware.html"
      />
    </LoadWhenVisible>

    <LoadWhenVisible>
      <NewProducts
        class="products"
        :button-text="$t('View All ->')"
        :title="$t('Fresh Arrivals That Capture Our Hearts')"
        link="/dinnerware.html"
      />
    </LoadWhenVisible>
    <img else-if src="/homepage/banner-glass.png" />
    <LoadWhenVisible>
      <NewProducts
        class="products"
        :button-text="$t('View All ->')"
        :title="$t('Thoughtful Gifts for Every Kitchen Enthusiast !')"
        link="/what-is-new.html"
      />
    </LoadWhenVisible>
    <LoadWhenVisible>
      <SfCallToAction
        :title="callToAction.title"
        :button-text="callToAction.buttonText"
        :description="callToAction.description"
        :background="callToAction.background"
        class="call-to-action"
      />
    </LoadWhenVisible>
    <img else-if src="/homepage/luxury.png" />

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
            <img
              else-if
              src="/homepage/diamond (2) 2.png"
              alt="Icon Description"
            />
          </div>
          <div class="text">
            <p>Crafted for a <br />Lifetime.</p>
          </div>
        </div>
        <div class="icon-text-box">
          <div class="icon">
            <img
              else-if
              src="/homepage/romantic-dinner 4.png"
              alt="Icon Description"
            />
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
import { SfBanner, SfBannerGrid,SfCallToAction } from "@storefront-ui/vue";
import { CmsPage } from "~/modules/GraphQL/types";
import HeroSection from "~/components/HeroSection.vue";
import { getMetaInfo } from "~/helpers/getMetaInfo";
import { useContent } from "~/composables";
import LoadWhenVisible from "~/components/utils/LoadWhenVisible.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    HeroSection,
    LazyHydrate,
    LoadWhenVisible,
    SfBanner,
    SfBannerGrid,
    SfCallToAction,
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

    const page = ref <CmsPage|null>;
    const hero = ref({
      title: app.i18n.t("Colorful summer dresses are already in store"),
      subtitle: app.i18n.t("SUMMER COLLECTION {year}", { year }),
      buttonText: app.i18n.t("Learn more"),
      imageSrc: "/homepage/banner.png",
      imageWidth: isDesktop ? 1600 : 328,
      imageHeight: isDesktop ? 578 : 224,
      imageConfig: {
        fit: "cover",
        format: "webp",
      },
      link: "/women.html",
    });
    const banners = ref([
      {
        slot: "banner-A",
        /* subtitle: app.i18n.t('Dresses'),
        title: app.i18n.t('Cocktail & Party'),
        description: app.i18n.t(
          'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
        ),
        buttonText: app.i18n.t('Shop now'),*/
        image: {
          mobile: "/homepage/bannerB.webp",
          desktop: "/homepage/bannerleft.png",
        },
        imageConfig: {
          fit: "cover",
          width: isDesktop ? 312 : 328,
          height: isDesktop ? 644 : 343,
          format: "webp",
        },
        class: "sf-banner--slim desktop-only",
        link: "/women/women-clothing-skirts",
      },
      {
        slot: "banner-B",
        image: "/homepage/banner-middle.png",
        imageConfig: {
          fit: "contain",
          width: isDesktop ? 648 : 328,
          height: isDesktop ? 644 : 343,
          format: "webp",
        },
        class: "sf-banner--slim banner-central desktop-only",
        link: "/women/women-clothing-dresses",
      },
      {
        slot: "banner-C",
        /*  subtitle: app.i18n.t('T-Shirts'),
        title: app.i18n.t('The Office Life'),*/
        image: "/homepage/bannerrighttop.png",
        imageConfig: {
          fit: "contain",
          width: isDesktop ? 312 : 328,
          height: isDesktop ? 310 : 343,
          format: "webp",
        },
        class: "sf-banner--slim banner__tshirt",
        link: "/women/women-clothing-shirts",
      },
      {
        slot: "banner-D",
        /* subtitle: app.i18n.t('Summer Sandals'),
        title: app.i18n.t('Eco Sandals'),*/
        image: "/homepage/bannerrightbottom.png",
        imageConfig: {
          fit: "contain",
          width: isDesktop ? 312 : 328,
          height: isDesktop ? 310 : 343,
          format: 'webp',
        },
        class: "sf-banner--slim banner__tshirt",
        link: "/women/women-shoes-sandals",
      },
    ]);
    const callToAction = ref({
      title: app.i18n.t('Stuck on what to choose for that special occasion ? Weve got you covered !  Explore our tailored suggestions guaranteed to delight your loved ones !'),
      description: '',
      buttonText: app.i18n.t('SHOP NOW'),
      background:'#F96C3B'
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
      page,
    };
  },
  head() {
    return getMetaInfo(this.page);
  },
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
  margin: var(--spacer-xl) 0;

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-2xl) 0;
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
    font-family: "Recoleta";
    font-size: 32px;
  }
  ::v-deep .sf-call-to-action__button {
    color: #f8470a;
    background-color: #ffffff;
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
  background-size: contain;
  min-height: 14rem;
}

.icon-text-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--spacer-md);
  margin: var(--spacer-lg) 0;

  @include for-desktop {
    justify-content: flex-start;
    margin: var(--spacer-lg) 0;
  }
}

.icon-text-box {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 15px;

  border-radius: 4px;

  .icon {
    margin-right: var(--spacer-md);

    img {
      width: 40px;
      height: auto;
    }
  }

  @include for-desktop {
    .icon {
      margin-right: var(--spacer-lg);

      img {
        width: 60px; /* Adjust the size as needed for desktop */
      }
    }

    .text {
      h6 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
      }

      p {
        font-size: 14px;
      }
    }
  }
}
</style>
