<template>
  <form class="search-bar" @submit.prevent="emitSearch">
    <input
      v-model="localValue"
      type="search"
      placeholder="Cari nama HP, misalnya 'Galaxy S25'"
      aria-label="Cari produk"
    />
    <button type="submit">Cari</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ modelValue: { type: String, default: '' } })
const emit = defineEmits(['update:modelValue', 'search'])

const localValue = ref(props.modelValue)
watch(() => props.modelValue, (v) => { localValue.value = v })

function emitSearch() {
  emit('update:modelValue', localValue.value)
  emit('search', localValue.value)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 0.5rem;
  max-width: 380px;
  width: 100%;
}
.search-bar input {
  flex: 1;
  padding: 0.65rem 1rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 0.9rem;
}
.search-bar button {
  padding: 0.65rem 1.2rem;
  background: var(--indigo);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
</style>