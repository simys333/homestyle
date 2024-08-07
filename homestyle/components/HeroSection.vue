<template>
  <div class="hero">
    <SfImage
      :image-tag="imageTag"
      :src="imageSrc"
      :alt="title"
      :width="imageWidth"
      :height="imageHeight"
      :nuxt-img-config="nuxtImgConfig"
      placeholder
      class="hero__image"
    />
    <div class="hero__wrapper">
      <slot name="subtitle" v-bind="{ subtitle }"
        ><span v-show="subtitle" class="hero__subtitle"> {{ subtitle }} </span>
      </slot>
      <slot name="title" v-bind="{ title }"
        ><span v-show="title" class="hero__title"> {{ title }} </span>
      </slot>
      <slot name="description" v-bind="{ description }"
        ><span v-show="description" class="hero__description">
          {{ description }}
        </span>
      </slot>
      <slot name="call-to-action" v-bind="{ buttonText, link }">
        <SfButton
          v-if="buttonText && link"
          :link="localePath(link)"
          class="hero__button"
        >
          {{ buttonText }}
        </SfButton>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { ImageModifiers } from "@nuxt/image";
import { SfButton, SfImage } from "@storefront-ui/vue";

export default defineComponent({
  name: "HeroSection",
  components: {
    SfButton,
    SfImage,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    imageHeight: {
      type: [Number, String],
      default: "",
    },
    imageSrc: {
      type: String,
      default: "",
    },
    imageTag: {
      type: String,
      default: "",
    },
    imageWidth: {
      type: [Number, String],
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    nuxtImgConfig: {
      type: Object as PropType<ImageModifiers | {}>,
      default: () => ({}),
    },
  },
});
</script>
<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: flex-start;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 577px;
  color: var(--c-text);

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    ::v-deep img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: absolute;
    width: 100%;
    text-decoration: none;
    background-color: #ffffff;
   // border: 1px solid #000000;
    max-width: 20rem;
    top: 20%;
    left: 14%;
  /*  box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.85),
      0 0 0 30px rgba(255, 255, 255, 0.3);*/
      padding: 30px;
  }
  &__wrapper::before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: -3%;
    border: 1px solid white;
   padding: 10px;
  }

  &__title {
    margin: var(--spacer-xs) 0 0 0;
    color: var(--c-text);
    width: 60%;
    @include font(
      --hero-title-font,
      var(--font-weight--semibold),
      3rem,
      1.2,
      var(--font-family--secondary)
    );
    letter-spacing: 0.1px;
    text-transform: none;
  }

  &__description {
    width: 60%;
    color: var(--c-text);
    margin-bottom: var(--spacer-base);
    @include font(
      --hero-title-font,
      var(--font-weight--normal),
      1.5rem,
      1.2,
      var(--font-family--primary)
    );
  }

  &__subtitle {
    margin: 0;
    color: #190701;
    width: 60%;
    @include font(
      --hero-subtitle-font,
      var(--font-weight--normal),
      2rem,
      1.4,
      var(--font-family--secondary)
    );
  }

  &__button {
    display: none;
    font-size: 0.875rem;
  }

  @include for-desktop {
    min-height: 577px;

    &__title {
      --hero-font-size: var(--h1-font-size);
      width: 100%;
      margin-top: var(--spacer-base);
    }

    &__subtitle {
      width: 100%;
    }

    &__button {
      display: block;
    }
  }
}
</style>
