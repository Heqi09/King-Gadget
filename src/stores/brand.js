import { defineStore } from 'pinia'
import { fetchBrands } from '@/services/api'

export const useBrandStore = defineStore('brand', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
    loaded: false,
  }),
  actions: {
    async fetchAll() {
      if (this.loaded) return
      this.loading = true
      try {
        const res = await fetchBrands()
        this.items = res.data
        this.loaded = true
      } catch (err) {
        this.error = 'Gagal memuat daftar brand.'
      } finally {
        this.loading = false
      }
    },
  },
})