<template>
  <div class="compare-table">
    <div class="compare-table__header">
      <div class="compare-table__label-col"></div>
      <div v-for="product in data.products" :key="product.id" class="compare-table__product">
        <img :src="product.thumbnail_url" :alt="product.name" />
        <p>{{ product.name }}</p>
      </div>
    </div>

    <div v-for="row in data.specifications" :key="row.spec_group + row.spec_key" class="compare-table__row">
      <div class="compare-table__label-col">
        <span class="compare-table__group">{{ row.spec_group }}</span>
        <span class="compare-table__key">{{ row.spec_key }}</span>
      </div>
      <div v-for="product in data.products" :key="product.id" class="compare-table__value">
        {{ row.values[product.id] ?? '-' }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ data: { type: Object, required: true } })
</script>

<style scoped>
.compare-table__header,
.compare-table__row {
  display: grid;
  grid-template-columns: 180px repeat(auto-fit, minmax(140px, 1fr));
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.compare-table__product {
  text-align: center;
  padding: 1rem 0.5rem;
}
.compare-table__product img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}
.compare-table__product p {
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.5rem;
}
.compare-table__label-col {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0.5rem;
}
.compare-table__group {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  color: var(--indigo);
}
.compare-table__key {
  font-size: 0.85rem;
  font-weight: 600;
}
.compare-table__value {
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 0.75rem 0.5rem;
}
</style>