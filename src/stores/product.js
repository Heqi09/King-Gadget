import { defineStore } from 'pinia'
import { fetchProducts } from '@/services/api'

const PAGE_SIZE = 10

export const useProductStore = defineStore('product', {
  state: () => ({
    items: [],
    page: 1,
    limit: PAGE_SIZE,
    totalItems: 0,
    hasMore: true,
    loading: false,
    error: null,
    filters: {
      search: '',
      brandId: null,
      categoryId: null,
    },
  }),

  actions: {
    async fetchFirstPage() {
      this.page = 1
      this.items = []
      this.hasMore = true
      await this._fetchPage(false)
    },

    async loadMore() {
      if (!this.hasMore || this.loading) return
      this.page += 1
      await this._fetchPage(true)
    },

    setSearch(value) {
      this.filters.search = value
      this.fetchFirstPage()
    },

    setBrand(brandId) {
      this.filters.brandId = brandId
      this.fetchFirstPage()
    },

    setCategory(categoryId) {
      this.filters.categoryId = categoryId
      this.fetchFirstPage()
    },

    resetFilters() {
      this.filters = { search: '', brandId: null, categoryId: null }
      this.fetchFirstPage()
    },

    async _fetchPage(append) {
      this.loading = true
      this.error = null
      try {
        const res = await fetchProducts({
          search: this.filters.search || undefined,
          brand_id: this.filters.brandId || undefined,
          category_id: this.filters.categoryId || undefined,
          page: this.page,
          limit: this.limit,
        })
        this.items = append ? [...this.items, ...res.data] : res.data
        this.totalItems = res.meta.total_items
        this.hasMore = res.meta.has_more
      } catch (err) {
        this.error = 'Gagal memuat produk. Coba lagi beberapa saat.'
      } finally {
        this.loading = false
      }
    },
  },
})