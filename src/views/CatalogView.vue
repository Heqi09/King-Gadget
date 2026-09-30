<template>
  <div class="catalog">
    <div class="catalog__header">
      <h1>Katalog Produk</h1>
      <ProductSearchBar v-model="searchInput" @search="onSearch" />
    </div>

    <div class="catalog__body">
      <ProductFilterSidebar
        :brands="brandStore.items"
        :categories="categoryStore.items"
        :active-brand-id="productStore.filters.brandId"
        :active-category-id="productStore.filters.categoryId"
        @select-brand="productStore.setBrand"
        @select-category="productStore.setCategory"
        @reset="productStore.resetFilters"
      />

      <div class="catalog__results">
        <p class="catalog__count" v-if="!productStore.loading">
          Menampilkan {{ productStore.items.length }} dari {{ productStore.totalItems }} produk
        </p>

        <p v-if="productStore.error" class="error">{{ productStore.error }}</p>

        <ProductGrid :products="productStore.items" />

        <p v-if="!productStore.loading && productStore.items.length === 0" class="empty">
          Produk tidak ditemukan. Coba ubah kata kunci atau filter.
        </p>

        <LoadMoreButton
          v-if="productStore.hasMore"
          :loading="productStore.loading"
          @click="productStore.loadMore"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product'
import { useBrandStore } from '@/stores/brand'
import { useCategoryStore } from '@/stores/category'
import ProductSearchBar from '@/components/product/ProductSearchBar.vue'
import ProductFilterSidebar from '@/components/product/ProductFilterSidebar.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import LoadMoreButton from '@/components/product/LoadMoreButton.vue'

const productStore = useProductStore()
const brandStore = useBrandStore()
const categoryStore = useCategoryStore()
const searchInput = ref('')

function onSearch(value) {
  productStore.setSearch(value)
}

onMounted(() => {
  brandStore.fetchAll()
  categoryStore.fetchAll()
  productStore.fetchFirstPage()
})
</script>

<style scoped>
.catalog__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.catalog__header h1 {
  font-family: var(--font-display);
  margin: 0;
}
.catalog__body {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2rem;
  align-items: start;
}
.catalog__count {
  color: var(--slate);
  font-size: 0.85rem;
  margin: 0 0 1rem;
}
.empty {
  color: var(--slate);
  padding: 2rem 0;
  text-align: center;
}
.error {
  color: var(--danger);
}
@media (max-width: 768px) {
  .catalog__body {
    grid-template-columns: 1fr;
  }
}
</style>