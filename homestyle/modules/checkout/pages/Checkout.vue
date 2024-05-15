<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps
          v-if="!isThankYou"
          :active="currentStepIndex"
          :class="{ checkout__steps: true }"
          @change="handleStepClick"
        >
          <SfStep
            v-for="(step, key) in STEPS"
            :key="key"
            :name="$t(step.title)"
            :active="1"
            can-go-back
          >
            <nuxt-child />
          </SfStep>
        </SfSteps>
        <nuxt-child v-else />
      </div>
      <div v-if="!isThankYou" class="checkout__aside desktop-only">
        <transition name="fade">
          <CartPreview key="order-summary" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { SfSteps } from "@storefront-ui/vue";
import {
  computed,
  defineComponent,
  ref,
  useRoute,
  useRouter,
  useContext,
  onMounted,
} from "@nuxtjs/composition-api";
import cartGetters from "~/modules/checkout/getters/cartGetters";
import useCart from "~/modules/checkout/composables/useCart";
import CartPreview from "~/modules/checkout/components/CartPreview.vue";

export default defineComponent({
  name: "CheckoutPage",
  components: {
    SfSteps,
    CartPreview,
  },
  setup() {
    const route = useRoute();
    const { app } = useContext();
    const { path } = route.value;
    const router = useRouter();
    const { cart, load } = useCart();
    const products = computed(() => cartGetters.getItems(cart.value));
    const currentStep = computed(() => path.split("/").pop());

    const STEPS = ref([
      {
        title: "User Account",
        url: "user-account",
      },
      {
        title: "Shipping",
        url: "shipping",
      },
      {
        title: "Billing",
        url: "billing",
      },
      {
        title: "Payment",
        url: "payment",
      },
    ]);

    const currentStepIndex = computed(() =>
      STEPS.value.findIndex((step) => step.url === currentStep.value)
    );
    const isThankYou = computed(() => currentStep.value === "thank-you");

    const handleStepClick = async (stepIndex: number) => {
      if (stepIndex <= currentStepIndex.value) {
        const { url } = STEPS.value[stepIndex];
        await router.push(`${app.localePath(`/checkout/${url}`)}`);
      }
    };

    onMounted(async () => {
      await load();
      if (products.value.length === 0 && currentStep.value !== 'thank-you') {
        await router.push(app.localePath('/'));
      }
    });

    return {
      handleStepClick,
      STEPS,
      currentStepIndex,
      isThankYou,
      currentStep,
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep * {
  font-family: var(--font-family--primary);
  --input-label-font-size: 1rem;
  --input-label-color: rgb(95, 99, 104);
}
#checkout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }
  ::v-deep .sf-button {
    text-transform: capitalize;
  }
}

.checkout {
  @include for-desktop {
    display: flex;
  }

  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
    }
  }

  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin: 4.25rem 0 0 4.25rem;
    }
  }

  &__steps {
    --steps-content-padding: 0 var(--spacer-base);
    @include for-desktop {
      --steps-content-padding: 0;
    }

    &-auth::v-deep .sf-steps__step:first-child {
      --steps-step-color: #e8e4e4;
    }
  }
  ::v-deep .sf-heading__title {
    font-size: var(--h4-font-size);
    font-weight: normal;
    color: #5f6368;
  }
  ::v-deep .sf-input__wrapper input {
    border: 1px solid #989898;
  }
  ::v-deep .sf-input__label {
    padding: 0 0 5px 6px;
  }
  ::v-deep .sf-select {
    padding-top: 0;
    select {
      border: 1px solid #989898;
      min-height: var(
        --input-height,
        calc(
          var(--spacer-base) + var(--spacer-2xs) +
            var(--input-label-font-size, var(--font-size--lg))
        )
      );
    }
    .sf-select__label {
      display: flex;
      align-items: center;
    }
  }
}
</style>
