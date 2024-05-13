<template>
  <SfAccordion open="Description" :multiple="false" transition="" showChevron>
    <SfAccordionItem header="Description">
      <HTMLContent
        v-if="productDescription"
        :content="productDescription"
        tag="div"
        class="product__description"
      />
    </SfAccordionItem>
    <hr class="sf-divider" />
    <SfAccordionItem header="Size Details">
      <HTMLContent
        v-if="productDescription"
        :content="productDescription"
        tag="div"
        class="product__description"
      />
    </SfAccordionItem>
    <hr class="sf-divider" />
    <SfAccordionItem header="Features">
      <HTMLContent
        v-if="productDescription"
        :content="productDescription"
        tag="div"
        class="product__description"
      />
    </SfAccordionItem>
    <hr class="sf-divider" />
    <SfAccordionItem header="Products Included">
      <HTMLContent
        v-if="productDescription"
        :content="productDescription"
        tag="div"
        class="product__description"
      />
    </SfAccordionItem>
    <hr class="sf-divider" />
    <SfAccordionItem header="More Info">
      <HTMLContent
        v-if="productDescription"
        :content="productDescription"
        tag="div"
        class="product__description"
      />
    </SfAccordionItem>
  </SfAccordion>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from "@nuxtjs/composition-api";
import { SfReview, SfTabs, SfLoader, SfAccordion } from "@storefront-ui/vue";
import ProductAddReviewForm from "~/modules/catalog/product/components/ProductAddReviewForm.vue";
import HTMLContent from "~/components/HTMLContent.vue";
import reviewGetters, {
  getReviewId,
  getReviewAuthor,
  getReviewDate,
  getReviewMessage,
  getReviewRating,
} from "~/modules/review/getters/reviewGetters";
import {
  useReview,
  UseReviewAddReviewParams,
} from "~/modules/review/composables/useReview";
import { Product } from "~/modules/catalog/product/types";
import { TabsConfig } from "~/modules/catalog/product/composables/useProductTabs";
import { usePageStore } from "~/stores/page";

export default defineComponent({
  name: "ProductTabs",
  components: {
    ProductAddReviewForm,
    HTMLContent,
    SfReview,
    SfTabs,
    SfLoader,
    SfAccordion,
  },
  props: {
    product: {
      type: [Object, null] as PropType<Product | null>,
      default: null,
    },
    openTab: {
      type: Number,
      default: TabsConfig.description.ID,
    },
  },
  setup(props, { emit }) {
    const { routeData } = usePageStore();
    const reviews = ref(null);
    const isReviewsLoading = ref(true);

    const { search: searchReviews, addReview } = useReview();

    const getSearchQuery = () => ({
      filter: {
        sku: {
          eq: routeData.sku,
        },
      },
    });

    const fetchReviews = async (query = getSearchQuery()) => {
      const productReviews = await searchReviews(query);
      const baseReviews = Array.isArray(productReviews)
        ? productReviews[0]
        : productReviews;

      reviews.value = reviewGetters.getItems(baseReviews);
    };

    let lastReviewsQuery = "";
    const changeTab = (tabNumber: number) => {
      if (!process.client) return props.openTab;
      const tabs = document.querySelector("#tabs");

      if (!tabs) return props.openTab;
      tabs.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });

      if (tabNumber === TabsConfig.reviews.ID) {
        const newQuery = getSearchQuery();
        const stringNewQuery = JSON.stringify(newQuery);
        if (lastReviewsQuery !== stringNewQuery) {
          lastReviewsQuery = stringNewQuery;
          fetchReviews(newQuery);
          isReviewsLoading.value = false;
        }
      }
      emit("changeTab", tabNumber);
      return tabNumber;
    };

    const activeTab = computed(() => changeTab(props.openTab));

    const productDescription =
    computed(
      () => props.product?.description?.html || ""
    );

    const successAddReview = async (reviewData: UseReviewAddReviewParams) => {
      await addReview(reviewData);
      document.querySelector("#tabs").scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };

    return {
      reviews,
      activeTab,
      changeTab,
      isReviewsLoading,
      getReviewId,
      getReviewAuthor,
      getReviewDate,
      getReviewMessage,
      getReviewRating,
      productDescription,
      successAddReview,
    };
  },
});
</script>
