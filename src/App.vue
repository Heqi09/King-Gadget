<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">Langsung ke konten</a>

    <header class="navbar">
      <div class="navbar__inner">
        <router-link to="/" class="brand" @click="closeMobileMenu">
          <span class="brand__mark" aria-hidden="true">👑</span>
          <span class="brand__text">
            <strong>King</strong><span class="brand__accent">Gadget</span>
          </span>
        </router-link>

        <button
          class="nav-toggle"
          type="button"
          :class="{ 'nav-toggle--active': mobileMenuOpen }"
          :aria-expanded="mobileMenuOpen"
          aria-controls="primary-navigation"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="sr-only">Buka menu navigasi</span>
        </button>

        <nav
          id="primary-navigation"
          class="nav-links"
          :class="{ 'nav-links--open': mobileMenuOpen }"
          @click="closeMobileMenu"
        >
          <router-link to="/">Beranda</router-link>
          <router-link to="/katalog">Katalog Produk</router-link>
          <router-link to="/toko">Lokasi Toko</router-link>

          <router-link
            :to="compareLinkTarget"
            class="compare-link"
            :class="{ 'compare-link--disabled': !hasCompareItems }"
            :aria-disabled="!hasCompareItems"
            @click="onCompareClick"
          >
            Bandingkan
            <span v-if="hasCompareItems" class="compare-badge">{{ compareCount }}</span>
          </router-link>
        </nav>
      </div>
    </header>

    <main id="main-content" class="main-content">
      <router-view></router-view>
    </main>

    <footer class="site-footer">
      <div class="site-footer__inner">
        <p>© {{ currentYear }} KingGadget. Semua hak cipta dilindungi.</p>
        <p class="site-footer__contact">
          Butuh bantuan? <a href="mailto:halo@king-gadget.id">halo@king-gadget.id</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCompareStore } from '@/stores/compare'

const router = useRouter()
const compareStore = useCompareStore()
const mobileMenuOpen = ref(false)
const currentYear = new Date().getFullYear()

const compareCount = computed(() => compareStore.count)
const hasCompareItems = computed(() => compareStore.hasItems)

const compareLinkTarget = computed(() =>
  hasCompareItems.value
    ? { path: '/compare', query: { ids: compareStore.selectedIds.join(',') } }
    : '/',
)

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function onCompareClick(event) {
  if (!hasCompareItems.value) {
    event.preventDefault()
    router.push('/katalog')
  }
}
</script>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  background: var(--indigo);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 0 0 8px 8px;
  z-index: 100;
  text-decoration: none;
  font-weight: 600;
}
.skip-link:focus {
  top: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.app-shell :focus-visible {
  outline: 2px solid var(--teal);
  outline-offset: 2px;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--ink);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.9rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
}
.brand__mark {
  color: var(--indigo);
  font-size: 1.5rem;
}
.brand__text {
  font-family: var(--font-display);
  font-size: 1.2rem;
  letter-spacing: -0.01em;
}
.brand__accent {
  color: var(--indigo);
  font-weight: 400;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}
.nav-links a {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  position: relative;
  padding: 0.35rem 0;
  transition: color 0.15s ease;
}
.nav-links a:hover {
  color: white;
}
.nav-links a.router-link-exact-active {
  color: white;
}
.nav-links a.router-link-exact-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--indigo);
  border-radius: 2px;
}

.compare-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.compare-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  background: var(--teal);
  color: var(--ink);
  font-weight: 700;
  min-width: 1.2rem;
  height: 1.2rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.3rem;
}
.compare-link--disabled {
  color: rgba(255, 255, 255, 0.35);
  cursor: not-allowed;
}
.compare-link--disabled:hover {
  color: rgba(255, 255, 255, 0.35);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}
.nav-toggle__bar {
  width: 22px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.nav-toggle--active .nav-toggle__bar:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.nav-toggle--active .nav-toggle__bar:nth-child(2) {
  opacity: 0;
}
.nav-toggle--active .nav-toggle__bar:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

.main-content {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.site-footer {
  background: var(--surface);
  border-top: 1px solid var(--line);
}
.site-footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  justify-content: space-between;
  color: var(--slate);
  font-size: 0.85rem;
}
.site-footer a {
  color: var(--indigo);
  text-decoration: none;
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    background: var(--ink);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease;
  }
  .nav-links--open {
    max-height: 260px;
  }
  .nav-links a {
    width: 100%;
    padding: 0.9rem 1.5rem;
  }
  .nav-links a.router-link-exact-active::after {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-links,
  .nav-toggle__bar {
    transition: none;
  }
}
</style>