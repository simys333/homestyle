<template>
  <SfLink class="sf-header-navigation-item__link" :link="link">
    <SaleIcon class="sale-icon" v-if="label === 'Sale'" />
    {{ label }}
  </SfLink>
</template>
<script lang="ts">
import { SfLink, SfIcon } from '@storefront-ui/vue';
import { defineComponent } from '@nuxtjs/composition-api';
import SaleIcon from '~/components/Icons/SaleIcon.vue';

export default defineComponent({
  name: 'HeaderNavigationItem',
  components: {
    SfLink,
    SfIcon,
    SaleIcon
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    link: {
      type: [String, Object],
      default: '',
    },
    hasChildren: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style lang="scss">
.sf-header-navigation-item__link {
  display: flex;

  .sf-icon {
    display: inline-flex;
    margin: 0 var(--spacer-xs);
    width: 18px;
    height: 18px;
  }

  .sale-icon svg {
    fill: var(--c-primary);
    width:18px;
  }
}

.sf-header-navigation-item__link:hover {
  .sale-icon svg {
    fill: #FFF;
  }
}
</style>
