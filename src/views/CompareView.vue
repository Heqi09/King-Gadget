<template>
  <div class="compare">
    <h1>Bandingkan Produk</h1>

    <div v-if="loading" class="state">Memuat perbandingan...</div>
    <div v-else-if="error" class="state error">{{ error }}</div>
    <div v-else-if="!ids.length" class="state">
      Belum ada produk dipilih. Pilih produk di
      <router-link to="/katalog">halaman katalog</router-link> lalu centang "Bandingkan".
    </div>
    <CompareTable v-else-if="compareData" :data="compareData" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchCompareProducts } from '@/services/api'
import CompareTable from '@/components/product/CompareTable.vue'

const route = useRoute()
const compareData = ref(null)
const loading = ref(true)
const error = ref(null)

const ids = computed(() => {
  const raw = route.query.ids
  if (!raw) return []
  return String(raw).split(',').map(Number).filter(Boolean)
})

async function loadCompare() {
  if (!ids.value.length) return
  loading.value = true
  error.value = null
  try {
    const res = await fetchCompareProducts(ids.value)
    compareData.value = res.data
  } catch (err) {
    error.value = 'Gagal memuat data perbandingan.'
  } finally {
    loading.value = false
  }
}

onMounted(loadCompare)
watch(() => route.query.ids, loadCompare)
</script>

<style scoped>
.compare h1 {
  font-family: var(--font-display);
  margin-bottom: 1.5rem;
}
.state {
  padding: 3rem 0;
  text-align: center;
  color: var(--slate);
}
.state a {
  color: var(--indigo);
  font-weight: 600;
}
.error {
  color: var(--danger);
}
</style>