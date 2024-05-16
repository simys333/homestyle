<template>
    <div class="sf-banner-grid">
        <div class="sf-banner-grid__row">
            <div class="sf-banner-grid__col">
                <div class="sf-banner-grid__row">
                    <div class="sf-banner-grid__col">
                        <slot name="banner-A" />
                    </div>
                </div>
                <div class="sf-banner-grid__row">
                    <div class="sf-banner-grid__col">
                        <slot name="banner-B" />
                    </div>
                </div>
            </div>
            <div class="sf-banner-grid__col sf-banner-grid__col--medium">
                <slot name="banner-C" />
            </div>
            <div class="sf-banner-grid__col">
                <div class="sf-banner-grid__row">
                    <div class="sf-banner-grid__col">
                        <slot name="banner-D" />
                    </div>
                </div>
                <div class="sf-banner-grid__row">
                    <div class="sf-banner-grid__col">
                        <slot name="banner-E" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CustomBannerGrid"
};
</script>