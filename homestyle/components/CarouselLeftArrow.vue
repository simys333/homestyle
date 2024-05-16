<template #prev="prevArrow">
  <SfButton aria-label="previous" class="sf-arrow" @click="$emit('click')">
    <SvgImage icon="chevron_left" width="20" height="20" />
  </SfButton>
</template>
<script>
import { SfButton } from "@storefront-ui/vue";
import SvgImage from "~/components/General/SvgImage.vue";

export default {
  name: "CarouselLeftArrow",
  components: {
    SfButton,
    SvgImage,
  },
};
</script>
<style lang="scss" scoped>
.sf-carousel__controls {
  button {
    background-color: transparent;
  }

  button::before {
    box-shadow: none;
  }

  span {
    color: #190701;
  }
}
</style>
