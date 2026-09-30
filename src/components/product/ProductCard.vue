<template>
  <div class="card">
    <router-link :to="`/produk/${product.slug}`" class="card__link">
      <img :src="product.thumbnail_url" :alt="product.name" class="card__img" />
      <p class="card__brand">{{ product.brand?.name }}</p>
      <h3 class="card__name">{{ product.name }}</h3>
      <p class="card__desc">{{ product.short_description }}</p>
      <p v-if="product.price_min" class="card__price">
        Rp {{ formatPrice(product.price_min) }}<span v-if="product.price_max"> – Rp {{ formatPrice(product.price_max) }}</span>
      </p>
    </router-link>

    <label class="card__compare">
      <input
        type="checkbox"
        :checked="compareStore.isSelected(product.id)"
        :disabled="compareStore.isFull && !compareStore.isSelected(product.id)"
        @change="compareStore.toggle(product.id)"
      />
      Bandingkan
    </label>
  </div>
</template>

<script setup>
import { useCompareStore } from '@/stores/compare'

defineProps({ product: { type: Object, required: true } })
const compareStore = useCompareStore()

function formatPrice(value) {
  return new Intl.NumberFormat('id-ID').format(value)
}
</script>

<style scoped>
.card {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.card__link {
  text-decoration: none;
  color: var(--ink);
  padding: 1rem;
  display: block;
}
.card__img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  margin-bottom: 0.75rem;
}
.card__brand {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  color: var(--indigo);
  margin: 0 0 0.25rem;
}
.card__name {
  font-family: var(--font-display);
  font-size: 1rem;
  margin: 0 0 0.4rem;
}
.card__desc {
  font-size: 0.8rem;
  color: var(--slate);
  margin: 0 0 0.5rem;
}
.card__price {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 600;
}
.card__compare {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--line);
  font-size: 0.8rem;
  color: var(--slate);
  cursor: pointer;
}
</style>