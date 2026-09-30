<template>
  <div class="load-more">
    <button type="button" :disabled="loading" @click="$emit('click')">
      {{ loading ? 'Memuat...' : 'Muat 10 Produk Lagi' }}
    </button>
  </div>
</template>

<script setup>
defineProps({ loading: { type: Boolean, default: false } })
defineEmits(['click'])
</script>

<style scoped>
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
.load-more button {
  padding: 0.75rem 2rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  font-weight: 700;
  cursor: pointer;
}
.load-more button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>