<template>
  <div>
    <SfFooter :column="5" multiple class="footer">
      <div class="footer-left">
        <SfImage src="/logo.svg" alt="homstyle" title="homstyle" width="133" height="32" />
        <p class="footer-text">
          When you choose Homstyle, you're choosing homeware that not only adds
          functionality to your daily life but also brings a touch of enduring
          elegance to your home.
        </p>
        <h4>Contact Us</h4>
        <span>info@homstyle.com</span>
        <span>+91 944 679 4741</span>
      </div>
      <SfFooterColumn :title="$t('Categories')">
        <SfList>
          <SfListItem v-for="item in aboutUs" :key="item">
            <SfMenuItem :label="$t(item)" :link="localeRoute(item.link)" v-on="{ click: getHandler(item.id) }" />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
      <SfFooterColumn :title="$t('About us')">
        <SfList>
          <SfListItem v-for="item in aboutUs" :key="item">
            <SfMenuItem :label="$t(item)" />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
      <SfFooterColumn :title="$t('Quick Links')">
        <SfList>
          <SfListItem v-for="item in departments" :key="item">
            <SfMenuItem :label="$t(item)" />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
      <SfFooterColumn :title="$t('Help')">
        <SfList>
          <SfListItem v-for="item in help" :key="item">
            <SfMenuItem :label="$t(item)" />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
    </SfFooter>
    <SfFooter :column="5" multiple class="footer footer-2">
      <div class="footer-left"></div>
      <SfFooterColumn :title="$t('Useful Links')">
        <SfList>
          <SfListItem v-for="item in paymentsDelivery" :key="item">
            <SfMenuItem :label="$t(item)" />
          </SfListItem>
        </SfList>
      </SfFooterColumn>
    </SfFooter>
    <div class="sf-footer footer-2">
      <div class="copyright">
        <span> Copyright © 2024. Homstyle. All Rights Reserved. </span>
        <span class="payment-right">
          <img src="/master_icon.png" alt="" />
          <img src="/visa_icon.png" alt="" />
          <img src="/rupay_icon.png" alt="" />
          <img src="/paytm_icon.png" alt="" />
          <img src="/gpay_icon.png" alt="" />
          <span>&amp; more</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SfFooter, SfList, SfImage, SfMenuItem } from "@storefront-ui/vue";
import { defineComponent } from "@nuxtjs/composition-api";
import { addBasePath } from "~/helpers/addBasePath";

export default defineComponent({
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem,
  },
  setup() {
    return {
      addBasePath,
    };
  },
  data() {
    return {
      aboutUs: ["Who we are", "Quality in the details", "Customer Reviews"],
      departments: ["Women fashion", "Men fashion", "Kidswear", "Home"],
      help: ["Customer service", "Size guide", "Contact us"],
      paymentsDelivery: ["Purchase terms", "Guarantee"],
      social: ["facebook", "pinterest", "google", "twitter", "youtube"],
      isMobile: false,
      desktopMin: 1024,
    };
  },
});
</script>

<style lang="scss">
.footer {
  @include for-desktop {
    margin-bottom: 0;
  }

  &__socials {
    display: flex;
    justify-content: space-between;
    margin: 0 auto var(--spacer-lg);
    padding: var(--spacer-base) var(--spacer-xl);

    @include for-desktop {
      justify-content: flex-start;
      padding: var(--spacer-xs) 0;
      margin: 0 auto;
    }
  }

  &__social-image {
    margin: 0 var(--spacer-2xs) 0 0;
    background-color: #fff;
    border-radius: 100%;
  }
}

.sf-footer {
  background-color: #190701;
  display: flex;
  margin-top: var(--spacer-lg);

  @include for-desktop {
    padding-bottom: 0;
    margin-top: var(--spacer-2xl);
  }

  &__container {
    @include for-desktop {
      margin: var(--spacer-sm);
      max-width: 69rem;
      margin: 0 auto;
    }
  }

  .sf-footer-column,
  .sf-footer-column__title {
    background-color: transparent;

    h5 {
      text-transform: capitalize;
      font-size: 18px;
    }
  }

  @include for-mobile {

    .sf-footer-column,
    .sf-footer-column__content .sf-list {
      margin-left: 1rem;
    }
  }

  .sf-menu-item span {
    font-size: 14px;
  }

  .sf-menu-item:hover {
    --menu-item-label-color: #f8470a;
  }

  .footer-left {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    font-family: var(--font-family--primary);
    min-width: 300px;
    margin: var(--spacer-base);
    margin-left: 0;

    @include for-mobile {
      align-items: center;
    }

    h4 {
      font-size: 18px;
      font-family: var(--font-family--secondary);
    }

    span {
      font-size: 14px;
      line-height: 1.6;
    }

    .footer-text {
      font-size: 15px;

      @include for-mobile {
        text-align: center;
      }
    }
  }
}

.footer-2 {
  margin-top: 0;
  padding-top: 0;

  @include for-mobile {
    .footer-left {
      display: none;
    }
  }
}

.copyright {
  color: #ffffff;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  font-size: 14px;
  padding: 1rem 0;
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-bottom: var(--spacer-xl);

  @include for-mobile {
    flex-direction: column-reverse;
    margin-bottom: 4rem;
    text-align: center;
  }

  .payment-right {
    align-items: center;
    display: inline-flex;

    @include for-mobile {
      justify-content: center;
      margin-bottom: 10px;
    }

    img {
      margin-right: 10px;
    }
  }
}
</style>
