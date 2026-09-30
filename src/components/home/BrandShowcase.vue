<template>
  <div class="brand-showcase">
    <p v-if="brandStore.loading">Memuat brand...</p>
    <p v-else-if="brandStore.error" class="error">{{ brandStore.error }}</p>
    <ul v-else class="brand-grid">
      <li v-for="brand in brandStore.items" :key="brand.id">
        <router-link :to="{ path: '/katalog', query: { brand_id: brand.id } }" class="brand-chip">
          <img v-if="brand.logo_url" :src="brand.logo_url" :alt="brand.name" />
          <span>{{ brand.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBrandStore } from '@/stores/brand'

const brandStore = useBrandStore()
onMounted(() => brandStore.fetchAll())
</script>

<style scoped>
.brand-grid {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0;
  margin: 0;
}
.brand-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  text-decoration: none;
  color: var(--ink);
  font-weight: 600;
  background: var(--surface);
}
.brand-chip img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.error {
  color: var(--danger);
}
</style>