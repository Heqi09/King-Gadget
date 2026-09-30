import { defineStore } from 'pinia'

const STORAGE_KEY = 'compare-products'
const MAX_ITEMS = 3

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const useCompareStore = defineStore('compare', {
  state: () => ({
    selectedIds: loadInitial(),
    maxItems: MAX_ITEMS,
  }),

  getters: {
    count: (state) => state.selectedIds.length,
    hasItems: (state) => state.selectedIds.length > 0,
    isSelected: (state) => (productId) => state.selectedIds.includes(productId),
    isFull: (state) => state.selectedIds.length >= state.maxItems,
  },

  actions: {
    toggle(productId) {
      const idx = this.selectedIds.indexOf(productId)
      if (idx >= 0) {
        this.selectedIds.splice(idx, 1)
      } else {
        if (this.isFull) this.selectedIds.shift()
        this.selectedIds.push(productId)
      }
      this._persist()
    },

    remove(productId) {
      this.selectedIds = this.selectedIds.filter((id) => id !== productId)
      this._persist()
    },

    clear() {
      this.selectedIds = []
      this._persist()
    },

    _persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.selectedIds))
    },
  },
})