<template>
  <div id="cart">
    <div class="container">
      <div key="my-cart" class="my-cart">
        <div class="content">
          <SfHeading
            title="In your bag(2)"
            :level="4"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfLoader :loading="loading">
            <transition name="sf-fade" mode="out-in">
              <div class="collected-product-list">
                <transition-group name="sf-fade" tag="div">
                  <SfCollectedProduct
                    key="1"
                    :has-more-actions="false"
                    data-testid="cart-sidebar-collected-product"
                    image="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_3__1.png"
                    title="Creme Gold Dinner Plate White new"
                    :regular-price="1600"
                    :special-price="1200"
                    class="collected-product"
                  >
                    <template #image>
                      <SfImage
                        image-tag="nuxt-img"
                        src="https://magento.homstyle.in/media/catalog/product/cache/fb1be9b35736f95f9b8328c138c4d7ab/i/m/img_3__1.png"
                        alt="Creme Gold Dinner Plate White new"
                        class="sf-collected-product__image"
                        :nuxt-img-config="{
                          fit: 'cover',
                        }"
                      />
                    </template>
                    <template #input>
                      <div class="sf-collected-product__quantity-wrapper">
                        <SfQuantitySelector
                          :disabled="loading"
                          qty="1"
                          class="sf-collected-product__quantity-selector"
                        />
                      </div>
                      <SfBadge class="color-danger sf-badge__absolute">
                        <template #default>
                          <span>{{ $t("Out of stock") }}</span>
                        </template>
                      </SfBadge>
                    </template>
                    <template #configuration>
                      <div data-testid="cart-sidebar-attribute-container">
                        <SfProperty name="Color" value="Black" />
                      </div>
                    </template>
                    <template #actions>
                      <div class="desktop-only collected-product__actions">
                        <SfButton
                          class="sf-button--text collected-product__fav"
                        >
                          Add to favorites
                        </SfButton>
                      </div>
                    </template>
                  </SfCollectedProduct>
                </transition-group>
              </div>
              <div key="empty-cart" class="empty-cart">
                <div class="empty-cart__banner">
                  <SvgImage
                    icon="empty_cart_image"
                    :label="$t('Empty bag')"
                    width="211"
                    height="143"
                    class="empty-cart__image"
                  />
                  <SfHeading
                    :title="$t('Your cart is empty')"
                    :level="2"
                    class="empty-cart__heading"
                    :description="
                      $t(
                        'Looks like you haven’t added any items to the bag yet. Start shopping to fill it in.'
                      )
                    "
                  />
                  <SfButton
                    class="sf-button--full-width color-primary"
                    data-testid="cart-sidebar-back"
                    @click="handleHomeClick"
                  >
                    {{ $t("Go back shopping") }}
                  </SfButton>
                </div>
              </div>
            </transition>
          </SfLoader>
        </div>
        <div class="sidebar">
          <div class="sidebar-summary">
            <SfHeading
              title="Order Summary"
              :level="4"
              class="sf-heading--no-underline sf-heading--left"
            />
            <transition name="sf-fade">
              <div>
                <SfProperty
                  name="Item Subtotal"
                  class="sf-property--full-width sf-property--small"
                >
                  <template #value>
                    <SfPrice regular="2560" class="my-cart__subtotal-price" />
                  </template>
                </SfProperty>
                <SfProperty
                  :name="$t('Discount')"
                  class="sf-property--full-width sf-property--small"
                >
                  <template #value>
                    <SfPrice
                      :regular="$fc(discount)"
                      class="my-cart__discount"
                    />
                  </template>
                </SfProperty>
                <SfProperty
                  name="Shipping"
                  class="sf-property--full-width sf-property--small"
                >
                  <template #value>
                    <SfPrice regular="2560" class="my-cart__subtotal-price" />
                  </template>
                </SfProperty>
                <SfProperty
                  name="Total"
                  class="sf-property--full-width sf-property--large my-cart__total-price"
                >
                  <template #value>
                    <SfPrice data-testid="cart-sidebar-total" regular="2048" />
                  </template>
                </SfProperty>
              </div>
            </transition>
          </div>
          <a @click="goToCheckout">
            <SfButton
              v-e2e="'go-to-checkout-btn'"
              data-testid="category-sidebar-go-to-checkout"
              class="sf-button--full-width"
            >
              {{ $t("Checkout") }}
            </SfButton>
          </a>
        </div>
      </div>
      <transition name="sf-collapse-top" mode="out-in">
        <div class="notifications">
          <SfNotification
            v-if="!loading"
            :visible="isRemoveModalVisible"
            :title="$t('Are you sure?')"
            :message="
              $t(
                'Are you sure you would like to remove this item from the shopping cart?'
              )
            "
            type="secondary"
          >
            <template #action>
              <div class="button-wrap">
                <SfButton
                  class="sf-button_remove_item"
                  data-testid="cart-sidebar-remove-item-yes"
                  @click="removeItemAndSendNotification(itemToRemove)"
                >
                  {{ $t("Yes") }}
                </SfButton>
                <SfButton @click="isRemoveModalVisible = false">
                  {{ $t("Cancel") }}
                </SfButton>
              </div>
            </template>
            <template #close>
              <div />
            </template>
          </SfNotification>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  SfBadge,
  SfBreadcrumbs,
  SfButton,
  SfCollectedProduct,
  SfHeading,
  SfImage,
  SfLoader,
  SfNotification,
  SfPrice,
  SfProperty,
  SfQuantitySelector,
  SfIcon,
} from "@storefront-ui/vue";
import {
  defineComponent,
  ref,
  useRouter,
  useContext,
} from "@nuxtjs/composition-api";
import SvgImage from "~/components/General/SvgImage.vue";
import { Breadcrumb } from "~/modules/catalog/types";
import { useCartView } from "~/modules/checkout/composables/useCartView";
import CouponCode from "../../../components/CouponCode.vue";

export default defineComponent({
  name: "CartPage",
  components: {
    SfBreadcrumbs,
    SfLoader,
    SfNotification,
    SfButton,
    SfHeading,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfQuantitySelector,
    SfBadge,
    CouponCode,
    SvgImage,
    SfImage,
    SfIcon,
  },
  setup() {
    const cartView = useCartView();
    const {
      localePath,
      app: { i18n },
    } = useContext();
    const router = useRouter();

    const breadcrumbs = ref<Breadcrumb[]>([
      {
        text: i18n.t("Home") as string,
        link: localePath("/"),
      },
      {
        text: i18n.t("My Cart") as string,
        link: localePath("/cart"),
      },
    ]);

    const handleHomeClick = async () => {
      await router.push(localePath("/"));
    };

    return {
      ...cartView,
      breadcrumbs,
      handleHomeClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.cart-summary {
  padding-bottom: var(--spacer-sm);
}

.container {
  padding-left: var(--spacer-sm);
  padding-right: var(--spacer-sm);
}

.content {
  flex: 1;

  @include for-desktop {
    padding-right: var(--spacer-sm);
  }

  .sf-heading__title.h4 {
    font-size: 24px;
    font-weight: 600;
  }
}

.sidebar {
  @include for-desktop {
    padding-left: var(--spacer-sm);
    max-width: 25rem;
    width: 100%;
    margin-top: 3.5rem;
  }
  .sidebar-summary {
    background-color: #f2f1f1;
    padding: var(--spacer-base);
    margin-bottom: var(--spacer-xl);

    .sf-heading__title.h4 {
      font-family: "IBM Plex Sans";
      font-weight: 600;
    }
  }
  .sf-property--small {
    border-bottom: 1px solid #bab5b3;
    margin: var(--spacer-sm) 0;
    .sf-property__name,
    .sf-price__regular {
      font-family: "IBM Plex Sans";
      padding: 1rem 0;
    }
    .sf-property__name::after {
      content: none;
    }
  }
}

.breadcrumbs {
  @include for-mobile {
    margin-top: var(--spacer-lg);
  }
}

.sf-collected-product {
  --collected-product-width: 100%;
}

.notifications {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;

  .sf-notification {
    padding: 20px;

    .button-wrap {
      margin-top: 15px;
      display: flex;
      column-gap: 15px;
    }
  }
}

.cart-summary {
  @include for-mobile {
    margin-top: var(--spacer-xl);
  }
}

.my-cart {
  flex: 1;
  display: flex;

  @include for-mobile {
    flex-direction: column;
  }

  @include for-desktop {
    margin-top: var(--spacer-sm);
  }

  &__total-items {
    margin: 0;
  }

  &__subtotal,
  &__discount {
    --price-font-weight: var(--font-weight--light);
  }

  &__total-price {
    .sf-property__name,
    .sf-price__regular {
      font-family: "IBM Plex Sans";
      font-size: 18px;
      font-weight: 600;
    }
    .sf-property__name::after {
      content: none;
    }
  }
}

.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  height: 100%;

  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  &__heading {
    padding: 0 var(--spacer-base);
  }

  &__image {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }

  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}

.collected-product-list {
  flex: 1;
}

.collected-product {
  margin: var(--spacer-lg) 0 var(--spacer-sm) 0;
  border-bottom: 1px solid #bab5b3;
  padding: 1.5rem 0;

  ::v-deep .sf-collected-product__title {
    font-family: var(--font-family--primary);
    font-weight: var(--font-weight--bold);
  }
  ::v-deep .sf-price {
    .sf-price__old,
    .sf-price__special {
      font-family: var(--font-family--primary);
      font-weight: 600;
      font-size: 16px;
    }

    .sf-price__old::before,
    .sf-price__special::before {
      content: "\20B9";
    }
  }
  ::v-deep .sf-property {
    font-family: var(--font-family--primary);
  }

  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;

    &:first-child {
      margin-bottom: 8px;
    }
  }

  .sf-collected-product__actions .collected-product__fav {
    font-family: var(--font-family--primary);
    color: #f8470a;
  }

  &:hover {
    --collected-product-configuration-display: initial;

    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
  .sf-collected-product__quantity-wrapper {
    left: 0;
    margin-left: 1rem;
    padding: 0;
    .sf-collected-product__quantity-selector {
      background-color: white;
      border: 1px solid #756a67;
      .sf-quantity-selector__input {
        border-width: 0 1px 0px 1px;
        border-color: #756a67;
        border-style: solid;
      }
    }
  }
  .sf-badge__absolute {
    position: absolute;
    left: 0;
    padding: 1rem;
  }
}
</style>
