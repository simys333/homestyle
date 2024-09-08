<template>
  <div>
    <SfHeader
      class="sf-header--has-mobile-search"
      :class="{ 'header-on-top': isSearchOpen }"
    >
      <template #logo>
        <HeaderLogo />
      </template>
      <template #search>
        <SearchBar
          :is-search-open="isSearchOpen"
          @set-is-open="isSearchOpen = $event"
          @set-search-results="productSearchResults = $event"
        />
      </template>
     
      <template #header-icons="{ activeIcon }">
        <div class="sf-header__icons">
          <SfButton
            v-e2e="'app-header-account'"
            class="sf-button--pure sf-header__action headericon-color"
            data-testid="accountIcon"
            aria-label="Account"
            @click="handleAccountClick"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem"  height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user sf-header__icon is-active"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
       <!---    <SvgImage
              :icon="accountIcon"
              :label="$t('Account')"
              width="1.25rem"
              height="1.25rem"
              :class="{
                'sf-header__icon is-active': activeIcon === 'account',
              }"
            />-->
          </SfButton>
          <SfButton
            class="sf-button--pure sf-header__action headericon-color"
            data-testid="wishlistIcon"
            aria-label="Wishlist"
            @click="toggleWishlistSidebar"
          >
          <svg xmlns="http://www.w3.org/2000/svg"  width="1.25rem"  height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
           <!-- <SvgImage
              :icon="wishlistHasProducts ? 'heart_fill' : 'heart'"
              :label="$t('Wishlist')"
              width="1.25rem"
              height="1.25rem"
              class="sf-header__icon"
              :class="{
                'sf-header__icon is-active': activeIcon === 'wishlist',
              }"
            />-->
            <SfBadge
              v-if="wishlistHasProducts"
              class="sf-badge--number cart-badge"
            >
              {{ wishlistItemsQty }}
            </SfBadge>
          </SfButton>
          <SfButton
            v-e2e="'app-header-cart'"
            class="sf-button--pure sf-header__action headericon-color"
            aria-label="Toggle cart sidebar"
            @click="toggleCartSidebar"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            
            <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">
              {{ cartTotalItems }}
            </SfBadge>
          </SfButton>
        </div>
      </template>
    </SfHeader>
    <SearchResults
      v-if="isSearchOpen"
      :visible="isSearchOpen"
      :search-results="productSearchResults"
      @close="isSearchOpen = false"
    />
    <SfOverlay :visible="isSearchOpen" />
    <div>
      <HeaderNavigation :category-tree="categoryTree" />
    </div>
  </div>
</template>
<script lang="ts">
import { SfOverlay, SfHeader, SfButton, SfBadge } from "@storefront-ui/vue";

import {
  computed,
  ref,
  defineComponent,
  useRouter,
  useContext,
  onMounted,
  useFetch,
} from "@nuxtjs/composition-api";
import HeaderNavigation from "~/components/Header/Navigation/HeaderNavigation.vue";
import { useCategory } from "~/modules/catalog/category/composables/useCategory";
import { useUiHelpers, useUiState } from "~/composables";
import { useCart } from "~/modules/checkout/composables/useCart";
import { useWishlist } from "~/modules/wishlist/composables/useWishlist";
import { useUser } from "~/modules/customer/composables/useUser";
import { useWishlistStore } from "~/modules/wishlist/store/wishlistStore";
import type { CategoryTree, ProductInterface } from "~/modules/GraphQL/types";
import HeaderLogo from "~/components/HeaderLogo.vue";
import SvgImage from "~/components/General/SvgImage.vue";
import { useTopBar } from "./TopBar/useTopBar";

export default defineComponent({
  components: {
    HeaderNavigation,
    SfHeader,
    SfOverlay,
    HeaderLogo,
    SvgImage,
    SfButton,
    SfBadge,
    CurrencySelector: () => import("~/components/CurrencySelector.vue"),
    StoreSwitcher: () => import("~/components/StoreSwitcher.vue"),
    SearchBar: () => import("~/components/Header/SearchBar/SearchBar.vue"),
    SearchResults: () =>
      import(
        /* webpackPrefetch: true */ "~/components/Header/SearchBar/SearchResults.vue"
      ),
  },
  setup() {
    const router = useRouter();
    const { app } = useContext();
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } =
      useUiState();
    const { setTermForUrl, getCatLink } = useUiHelpers();
    const { isAuthenticated } = useUser();
    const { loadTotalQty: loadCartTotalQty, cart } = useCart();
    const { loadItemsCount: loadWishlistItemsCount } = useWishlist();
    const { categories: categoryList, load: categoriesListLoad } =
      useCategory();

    const { hasCurrencyToSelect, hasStoresToSelect } = useTopBar();

    const isSearchOpen = ref(false);
    const productSearchResults = ref<ProductInterface[] | null>(null);

    const wishlistStore = useWishlistStore();
    const wishlistItemsQty = computed(
      () => wishlistStore.wishlist?.items_count ?? 0
    );

    const wishlistHasProducts = computed(() => wishlistItemsQty.value > 0);
    const accountIcon = computed(() =>
      isAuthenticated.value ? "profile_fill" : "profile"
    );
    const categoryTree = ref<CategoryTree[]>([]);

    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        await router.push(app.localeRoute({ name: "customer-my-profile" }));
      } else {
        toggleLoginModal();
      }
    };

    useFetch(async () => {
      await categoriesListLoad({ pageSize: 20 });
      categoryTree.value = categoryList.value?.[0]?.children.filter(
        (category) => category.include_in_menu
      );
    });

    onMounted(async () => {
      if (app.$device.isDesktop) {
        await loadCartTotalQty();
        // eslint-disable-next-line promise/catch-or-return
        await loadWishlistItemsCount();
      }
    });

    return {
      accountIcon,
      cartTotalItems: computed(() => cart.value?.total_quantity ?? 0),
      categoryTree,
      getCatLink,
      handleAccountClick,
      isAuthenticated,
      isSearchOpen,
      productSearchResults,
      setTermForUrl,
      toggleCartSidebar,
      toggleWishlistSidebar,
      wishlistHasProducts,
      wishlistItemsQty,
      hasCurrencyToSelect,
      hasStoresToSelect,
    };
  },
});
</script>
<style lang="scss" scoped>
.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0 var(--spacer-sm);
  }
  &__header {
    max-width: 83.5rem;
  }
  &__switchers {
    display: flex;
  }
}
.header-navigation {
  @include for-mobile {
    display: none;
  }
}
.sf-header__action {
  margin: var(--header-action-margin, 0 0 0 var(--spacer-sm));
}

.header-on-top {
  z-index: 2;
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
.header-navigation {
  @include for-mobile {
    display: none;
  }
}
.headericon-color
{
  color: #190701;
}
.sf-header-navigation-item
{
  position: var(--header-navigation-item-position, relative);
  display: flex;

&__item {
  display: flex;
    display: var(--header-navigation-item-display, flex);
    max-width: 83.5rem;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
}


</style>
