<template>
  <aside class="filters">
    <div class="filters__group">
      <div class="filters__header">
        <h3>Brand</h3>
        <button v-if="activeBrandId || activeCategoryId" class="filters__reset" @click="$emit('reset')">
          Reset
        </button>
      </div>
      <ul>
        <li v-for="brand in brands" :key="brand.id">
          <label>
            <input
              type="radio"
              name="brand"
              :checked="activeBrandId === brand.id"
              @change="$emit('select-brand', brand.id)"
            />
            {{ brand.name }}
          </label>
        </li>
      </ul>
    </div>

    <div class="filters__group">
      <h3>Kategori</h3>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <label>
            <input
              type="radio"
              name="category"
              :checked="activeCategoryId === category.id"
              @change="$emit('select-category', category.id)"
            />
            {{ category.name }}
          </label>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  brands: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  activeBrandId: { type: [Number, String], default: null },
  activeCategoryId: { type: [Number, String], default: null },
})
defineEmits(['select-brand', 'select-category', 'reset'])
</script>

<style scoped>
.filters {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1.25rem;
}
.filters__group + .filters__group {
  margin-top: 1.5rem;
}
.filters__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filters h3 {
  font-family: var(--font-display);
  font-size: 0.95rem;
  margin: 0 0 0.75rem;
}
.filters__reset {
  background: none;
  border: none;
  color: var(--indigo);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0;
}
.filters ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.filters label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>