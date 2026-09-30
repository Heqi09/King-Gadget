<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal" role="dialog" aria-modal="true">
      <button class="modal__close" @click="$emit('close')" aria-label="Tutup">×</button>

      <template v-if="!submitted">
        <h3>Minta Info: {{ productName }}</h3>
        <p class="modal__lead">
          Isi data di bawah, tim sales kami akan kirim info harga &amp; ketersediaan lewat email.
        </p>
        <form @submit.prevent="handleSubmit">
          <label>
            Nama
            <input v-model="form.name" type="text" required />
          </label>
          <label>
            Email
            <input v-model="form.email" type="email" required />
          </label>
          <label>
            No. HP
            <input v-model="form.phone" type="tel" required />
          </label>
          <label>
            Pesan (opsional)
            <textarea v-model="form.message" rows="3"></textarea>
          </label>

          <p v-if="error" class="error">{{ error }}</p>

          <button type="submit" class="btn btn--primary" :disabled="loading">
            {{ loading ? 'Mengirim...' : 'Kirim Permintaan' }}
          </button>
        </form>
      </template>

      <template v-else>
        <h3>Terima kasih!</h3>
        <p>Permintaan kamu sudah kami terima. Tim sales akan menghubungi lewat email dalam 1x24 jam.</p>
        <button class="btn btn--primary" @click="$emit('close')">Tutup</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { submitLead } from '@/services/api'

const props = defineProps({
  productId: { type: [Number, String], required: true },
  productName: { type: String, required: true },
})
defineEmits(['close'])

const form = reactive({ name: '', email: '', phone: '', message: '' })
const loading = ref(false)
const error = ref(null)
const submitted = ref(false)

async function handleSubmit() {
  loading.value = true
  error.value = null
  try {
    await submitLead({ product_id: props.productId, ...form })
    submitted.value = true
  } catch (err) {
    error.value = 'Gagal mengirim permintaan. Coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(18, 21, 28, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}
.modal {
  background: var(--surface);
  border-radius: 12px;
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  position: relative;
}
.modal__close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--slate);
}
.modal h3 {
  font-family: var(--font-display);
  margin: 0 0 0.5rem;
}
.modal__lead {
  color: var(--slate);
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
}
form label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}
form input,
form textarea {
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-family: inherit;
}
.btn--primary {
  background: var(--indigo);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
}
.error {
  color: var(--danger);
  font-size: 0.85rem;
}
</style>