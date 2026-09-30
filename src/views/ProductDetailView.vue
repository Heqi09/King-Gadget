<template>
  <div v-if="loading" class="state">Memuat produk...</div>
  <div v-else-if="error" class="state error">{{ error }}</div>
  <div v-else-if="product" class="detail">
    <div class="detail__gallery">
      <img :src="activeImage" :alt="product.name" class="detail__main-img" />
      <div class="detail__thumbs" v-if="product.images?.length">
        <button
          v-for="img in product.images"
          :key="img.id"
          class="detail__thumb"
          :class="{ 'detail__thumb--active': img.image_url === activeImage }"
          @click="activeImage = img.image_url"
        >
          <img :src="img.image_url" :alt="product.name" />
        </button>
      </div>
    </div>

    <div class="detail__info">
      <p class="detail__brand">{{ product.brand?.name }} · {{ product.category?.name }}</p>
      <h1>{{ product.name }}</h1>
      <p v-if="product.price_min" class="detail__price">
        Rp {{ formatPrice(product.price_min) }}<span v-if="product.price_max"> – Rp {{ formatPrice(product.price_max) }}</span>
      </p>
      <p class="detail__desc">{{ product.full_description }}</p>

      <div class="detail__actions">
        <button class="btn btn--primary" @click="showContactModal = true">
          Minta Info Harga &amp; Ketersediaan
        </button>
        <label class="detail__compare">
          <input
            type="checkbox"
            :checked="compareStore.isSelected(product.id)"
            :disabled="compareStore.isFull && !compareStore.isSelected(product.id)"
            @change="compareStore.toggle(product.id)"
          />
          Tambahkan ke perbandingan
        </label>
      </div>

      <SpecTable :specifications="product.specifications" />
    </div>

    <ContactGateModal
      v-if="showContactModal"
      :product-id="product.id"
      :product-name="product.name"
      @close="showContactModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { fetchProductBySlug } from '@/services/api'
import { useCompareStore } from '@/stores/compare'
import SpecTable from '@/components/product/SpecTable.vue'
import ContactGateModal from '@/components/leads/ContactGateModal.vue'

const props = defineProps({ slug: { type: String, required: true } })
const compareStore = useCompareStore()

const product = ref(null)
const loading = ref(true)
const error = ref(null)
const activeImage = ref('')
const showContactModal = ref(false)

async function loadProduct() {
  loading.value = true
  error.value = null
  try {
    const res = await fetchProductBySlug(props.slug)
    product.value = res.data
    activeImage.value =
      res.data.images?.find((i) => i.is_primary)?.image_url || res.data.images?.[0]?.image_url || ''
  } catch (err) {
    error.value = 'Produk tidak ditemukan.'
  } finally {
    loading.value = false
  }
}

function formatPrice(value) {
  return new Intl.NumberFormat('id-ID').format(value)
}

onMounted(loadProduct)
watch(() => props.slug, loadProduct)
</script>

<style scoped>
.state {
  padding: 3rem 0;
  text-align: center;
  color: var(--slate);
}
.error {
  color: var(--danger);
}
.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}
.detail__main-img {
  width: 100%;
  height: 360px;
  object-fit: contain;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
}
.detail__thumbs {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.detail__thumb {
  width: 60px;
  height: 60px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  padding: 0;
  cursor: pointer;
}
.detail__thumb--active {
  border-color: var(--indigo);
}
.detail__thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.detail__brand {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--indigo);
}
.detail__info h1 {
  font-family: var(--font-display);
  margin: 0.25rem 0 0.5rem;
}
.detail__price {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}
.detail__desc {
  color: var(--slate);
  margin-bottom: 1.5rem;
}
.detail__actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.btn--primary {
  background: var(--indigo);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.detail__compare {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--slate);
  cursor: pointer;
}
@media (max-width: 768px) {
  .detail {
    grid-template-columns: 1fr;
  }
}
</style>