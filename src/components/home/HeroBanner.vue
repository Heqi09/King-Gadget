<template>
  <section class="hero">
    <div class="hero__content">
      <p class="hero__eyebrow">Toko Gadget Terpercaya</p>
      <h1>Bandingkan spesifikasi.<br /><span class="hero__accent">Baru putuskan.</span></h1>
      <p class="hero__lead">
        Ratusan HP dari berbagai brand, lengkap dengan spesifikasi detail dan fitur
        perbandingan langsung — biar kamu nggak salah pilih.
      </p>
      <div class="hero__actions">
        <router-link class="btn btn--primary" to="/katalog">Lihat Katalog</router-link>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.hero {
  background: var(--ink);
  color: white;
  padding: 5rem 1.5rem;
  margin: -2rem -1.5rem 0;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  margin-top: -2rem;
}
.hero__content {
  max-width: 1200px;
  margin: 0 auto;
}
.hero__eyebrow {
  font-family: var(--font-mono);
  color: var(--teal);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.1;
  margin: 0.5rem 0 1rem;
}
.hero__accent {
  color: var(--indigo);
}
.hero__lead {
  color: rgba(255, 255, 255, 0.7);
  max-width: 520px;
  margin-bottom: 2rem;
}
.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.btn {
  display: inline-block;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  font-size: 0.95rem;
}
.btn--primary {
  background: var(--indigo);
  color: white;
}
.btn--ghost {
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}
</style>