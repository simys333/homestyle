<template #prev="prevArrow">
  <SfButton aria-label="previous" class="sf-arrow">
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
.slick-prev:before {
  opacity: 0;
}

.slick-prev {
  color: black;
}

  span {
    color: #190701;
  }
  .slick-disabled {
  color: lightgray;
  cursor: auto;
}
</style>
