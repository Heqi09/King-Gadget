<template>
  <div class="home">
    <HeroBanner />

    <section class="section">
      <p class="eyebrow">Merek Pilihan</p>
      <h2>Brand yang kami jual</h2>
      <BrandShowcase />
    </section>

    <section class="section section--split">
      <div>
        <p class="eyebrow">Kunjungi Kami</p>
        <h2>Lokasi Toko</h2>
        <p class="section__lead">
          Datang langsung ke toko kami untuk cek unit secara fisik dan konsultasi dengan sales kami.
        </p>
        <router-link class="btn btn--primary" to="/toko">Lihat semua lokasi</router-link>
      </div>
      <div>
        <p class="eyebrow">Kontak</p>
        <h2>Hubungi Kami</h2>
        <ul class="contact-list">
          <li>WhatsApp: <a href="https://wa.me/6285895888930">+62 858-9588-8930</a></li>
          <li>Email: <a href="mailto:halo@king-gadget.id">halo@king-gadget.id</a></li>
          <li>Jam Operasional: Senin – Sabtu, 09.00 – 20.00</li>
        </ul>
      </div>
    </section>

    <section class="section section--cta">
      <h2>Cari HP impianmu sekarang</h2>
      <p>Bandingkan spesifikasi dari puluhan brand di kami, KingGadget.</p>
      <router-link class="btn btn--primary" to="/katalog">Lihat Katalog Produk</router-link>
    </section>
  </div>
</template>

<script setup>
import HeroBanner from '@/components/home/HeroBanner.vue'
import BrandShowcase from '@/components/home/BrandShowcase.vue'
</script>

<style scoped>
.section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.section--split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--indigo);
  margin: 0 0 0.4rem;
}

.section h2 {
  font-family: var(--font-display);
  margin: 0 0 1rem;
}

.section__lead {
  color: var(--slate);
  margin-bottom: 1rem;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: var(--slate);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-list a {
  color: var(--indigo);
  text-decoration: none;
  font-weight: 600;
}

.section--cta {
  text-align: center;
  background: var(--ink);
  color: white;
  border-radius: 16px;
  padding: 3rem 2rem;
}

.section--cta h2 {
  margin: 0 0 0.5rem;
}

.section--cta p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
}

.btn--primary {
  background: var(--indigo);
  color: white;
}

@media (max-width: 768px) {
  .section--split {
    grid-template-columns: 1fr;
  }
}
</style>