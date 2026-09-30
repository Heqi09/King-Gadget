import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CatalogView from '@/views/CatalogView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CompareView from '@/views/CompareView.vue'
import StoresView from '@/views/StoresView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/katalog', name: 'catalog', component: CatalogView },
  { path: '/produk/:slug', name: 'product-detail', component: ProductDetailView, props: true },
  { path: '/compare', name: 'compare', component: CompareView },
  { path: '/toko', name: 'stores', component: StoresView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router