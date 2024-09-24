<template>
  <SfButton aria-label="next" class="sf-arrow" @click="$emit('click')">
    <SvgImage icon="chevron_right" width="20" height="20" />
  </SfButton>
</template>
<script>
import { SfButton } from "@storefront-ui/vue";
import SvgImage from "~/components/General/SvgImage.vue";
export default {
  name: "CarouselRightArrow",
  components: {
    SfButton,
    SvgImage,
  },
};
</script>
<style lang="scss" scoped>
.slick-next:before {
  opacity: 0;
}

.slick-next {
  color: black;
}

.slick-disabled {
  color: lightgray;
  cursor: auto;
}
</style>
