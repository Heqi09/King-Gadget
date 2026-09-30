<template>
  <div class="stores">
    <h1>Lokasi Toko</h1>
    <p v-if="loading" class="state">Memuat lokasi toko...</p>
    <p v-else-if="error" class="state error">{{ error }}</p>
    <div v-else class="stores__grid">
      <div v-for="store in stores" :key="store.id" class="store-card">
        <h3>{{ store.name }}</h3>
        <p>{{ store.address }}, {{ store.city }}</p>
        <p>{{ store.phone }}</p>
        <p v-if="store.operational_hours">{{ store.operational_hours }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import { fetchStores } from '@/services/api' // Kita matikan pemanggilan API ke backend

const stores = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(() => {
  try {
    // SEKARANG KAMU BISA MENGUBAH ATAU MENAMBAH DATA TOKO DI SINI SECARA MANUAL
    stores.value = [
      {
        id: 1,
        name: "KingGadget - Surabaya",
        address: "Jl. Basuki Rahmat No. 12",
        city: "Surabaya",
        phone: "031-5551234",
        operational_hours: "Senin - Sabtu, 09.00 - 20.00"
      },
      {
        id: 2,
        name: "KingGadget - Jakarta",
        address: "Jl. Sudirman Kav. 25",
        city: "Jakarta",
        phone: "021-5559876",
        operational_hours: "Senin - Minggu, 10.00 - 21.00"
      },
      {
        id: 3,
        name: "KingGadget - Bangkalan",
        address: "Jl. Raya Telang (Dekat Kampus UTM)",
        city: "Bangkalan",
        phone: "031-3091515",
        operational_hours: "Senin - Sabtu, 08.00 - 17.00"
      }
    ]
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.stores h1 {
  font-family: var(--font-display);
  margin-bottom: 1.5rem;
}
.stores__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}
.store-card {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1.25rem;
  background: var(--surface);
}
.store-card h3 {
  font-family: var(--font-display);
  margin: 0 0 0.5rem;
}
.store-card p {
  font-size: 0.85rem;
  color: var(--slate);
  margin: 0.2rem 0;
}
.state {
  color: var(--slate);
}
.error {
  color: var(--danger);
}
</style>