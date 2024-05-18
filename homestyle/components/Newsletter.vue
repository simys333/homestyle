<template>
  <div id="e-mail">
    <div class="section">
      <SfHeading title="Sign Up For Our Email List And Receive 10% Off On Your First Order"
        class="heading sf-heading--left" :level="4" />
      <div class="input-wrapper">
        <SfInput class="sf-input--filled" label="" name="email" type="text" valid
          errorMessage="Error message value of form input. It appears if `valid` is `false`." :required="false"
          placeholder="Your Email Address" />
        <SfButton>Submit</SfButton>
      </div>
    </div>
  </div>
</template>
<script>
import { SfHeading, SfButton, SfInput } from "@storefront-ui/vue";
export default {
  name: "Newsletter",
  components: {
    SfHeading,
    SfButton,
    SfInput,
  },
  data() {
    return {
      address: {
        name: "Divante Headquarter",
        street: "St. Dmowskiego 17, 53-534",
        city: "Wroclaw, Poland",
        email: "demo@vuestorefront.io",
      },
      order: {
        number: "#80932031-030-00",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
#e-mail {
  box-sizing: border-box;

  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }

  .heading {
    @include for-desktop {
      --heading-padding: var(--spacer-sm) 0 var(--spacer-xs) 0;
    }
  }

  .section {
    display: flex;
    margin: 0 auto;
    padding: 1rem;
    background: var(--c-light);

    @include for-desktop {
      flex-direction: row;
      padding: 1.5rem;
    }

    @include for-mobile {
      flex-direction: column;

      h4 {
        font-size: 15px;
      }
    }
  }

  .sf-heading {
    @include for-desktop {
      width: 45%;
    }
  }

  .sf-heading__title.h4 {
    font-family: var(--font-family--secondary);
    padding-left: 15px;
    line-height: 1.2;

    @include for-desktop {
      font-size: 30px;
    }
  }

  .input-wrapper {
    @include for-desktop {
      width: 55%;
    }

    display: flex;
    align-items: center;
  }

  .sf-input--filled {
    --input-background: #fff;
    display: flex;
    align-items: center;
  }

  ::v-deep .sf-input__wrapper {
    height: 40px;
    margin: 0 10px;
  }

  .sf-input {
    width: 100%;
  }

  .sf-button {
    padding: 10px 20px;
    background-color: #f8470a;
  }
}
</style>
