import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 10000,
})

export function fetchProducts(params) {
  return api.get('/products', { params }).then((res) => res.data)
}

export function fetchProductBySlug(slug) {
  return api.get(`/products/${slug}`).then((res) => res.data)
}

export function fetchBrands() {
  return api.get('/brands').then((res) => res.data)
}

export function fetchCategories() {
  return api.get('/categories').then((res) => res.data)
}

export function fetchCompareProducts(ids) {
  return api.get('/products/compare', { params: { ids: ids.join(',') } }).then((res) => res.data)
}

export function fetchStores(params) {
  return api.get('/stores', { params }).then((res) => res.data)
}

export function submitLead(payload) {
  return api.post('/leads', payload).then((res) => res.data)
}

export default api