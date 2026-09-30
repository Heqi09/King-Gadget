import { defineStore } from 'pinia'
import { fetchCategories } from '@/services/api'

export const useCategoryStore = defineStore('category', {
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
        const res = await fetchCategories()
        this.items = res.data
        this.loaded = true
      } catch (err) {
        this.error = 'Gagal memuat daftar kategori.'
      } finally {
        this.loading = false
      }
    },
  },
})