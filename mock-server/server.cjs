const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const dbPath = path.join(__dirname, '..', 'db.json')

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

function toSummary(product, db) {
  const brand = db.brands.find((b) => b.id === product.brand_id)
  const category = db.categories.find((c) => c.id === product.category_id)
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null,
    category: category ? { id: category.id, name: category.name, slug: category.slug } : null,
    short_description: product.short_description,
    price_min: product.price_min,
    price_max: product.price_max,
    thumbnail_url: product.images?.[0]?.image_url || null,
  }
}

// GET /products?search=&brand_id=&category_id=&page=&limit=
app.get('/api/v1/products', (req, res) => {
  const db = readDb()
  const { search, brand_id, category_id } = req.query
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  let filtered = db.products.filter((p) => p.status === 'active')

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q))
  }
  if (brand_id) {
    filtered = filtered.filter((p) => p.brand_id === parseInt(brand_id))
  }
  if (category_id) {
    filtered = filtered.filter((p) => p.category_id === parseInt(category_id))
  }

  const totalItems = filtered.length
  const totalPages = Math.ceil(totalItems / limit)
  const start = (page - 1) * limit
  const pageItems = filtered.slice(start, start + limit).map((p) => toSummary(p, db))

  res.json({
    data: pageItems,
    meta: {
      page,
      limit,
      total_items: totalItems,
      total_pages: totalPages,
      has_more: page < totalPages,
    },
  })
})

// --- PERBAIKAN: RUTE COMPARE HARUS DI ATAS RUTE SLUG ---

// GET /products/compare?ids=1,2,3
app.get('/api/v1/products/compare', (req, res) => {
  const db = readDb()
  const ids = String(req.query.ids || '')
    .split(',')
    .map(Number)
    .filter(Boolean)

  const products = db.products.filter((p) => ids.includes(p.id))
  const productSummaries = products.map((p) => ({
    id: p.id,
    name: p.name,
    thumbnail_url: p.images?.[0]?.image_url || null,
  }))

  // Kumpulkan semua kombinasi spec_group + spec_key unik dari produk yang dipilih
  const specMap = new Map()
  for (const product of products) {
    for (const spec of product.specifications) {
      const key = `${spec.spec_group}|${spec.spec_key}`
      if (!specMap.has(key)) {
        specMap.set(key, { spec_group: spec.spec_group, spec_key: spec.spec_key, values: {} })
      }
      specMap.get(key).values[product.id] = spec.spec_value
    }
  }

  res.json({
    data: {
      products: productSummaries,
      specifications: Array.from(specMap.values()),
    },
  })
})

// GET /products/:slug
app.get('/api/v1/products/:slug', (req, res) => {
  const db = readDb()
  const product = db.products.find((p) => p.slug === req.params.slug)
  if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' })

  const brand = db.brands.find((b) => b.id === product.brand_id)
  const category = db.categories.find((c) => c.id === product.category_id)

  res.json({
    data: {
      ...product,
      brand: brand ? { id: brand.id, name: brand.name } : null,
      category: category ? { id: category.id, name: category.name } : null,
    },
  })
})

// --- AKHIR PERBAIKAN ---

// GET /brands
app.get('/api/v1/brands', (req, res) => {
  const db = readDb()
  res.json({ data: db.brands })
})

// GET /categories
app.get('/api/v1/categories', (req, res) => {
  const db = readDb()
  res.json({ data: db.categories })
})

// GET /stores?city=
app.get('/api/v1/stores', (req, res) => {
  const db = readDb()
  let stores = db.stores
  if (req.query.city) {
    stores = stores.filter((s) => s.city.toLowerCase() === String(req.query.city).toLowerCase())
  }
  res.json({ data: stores })
})

// POST /leads
app.post('/api/v1/leads', (req, res) => {
  const db = readDb()
  const lead = {
    id: db.leads.length + 1,
    ...req.body,
    status: 'new',
    created_at: new Date().toISOString(),
  }
  db.leads.push(lead)
  writeDb(db)
  console.log('Lead baru diterima:', lead)
  res.json({ message: 'Permintaan berhasil dikirim, tim kami akan menghubungi Anda.' })
})

app.post('/api/v1/products/create', (req, res) => {
  const db = readDb()
  
  const channelId = req.query.channelId
  const clientId = req.query.clientId

  const {
    name, brand_id, category_id, slug,
    short_description, full_description,
    price_min, price_max, release_date, status
  } = req.body

  const newProduct = {
    id: db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) + 1 : 1,
    brand_id,
    category_id,
    name,
    slug,
    short_description,
    full_description,
    price_min,
    price_max,
    release_date,
    status,
    images: [], 
    specifications: [] 
  }

  db.products.push(newProduct)
  writeDb(db)

  console.log(`[${channelId}] Produk baru ditambahkan: ${name}`)

  res.status(200).json({
    status: "success",
    message: "Product successfully created",
    data: {
      ...newProduct,
      created_at: new Date().toISOString()
    }
  })
})

const PORT = 8000
app.listen(PORT, () => {
  console.log(`Mock API jalan di http://localhost:${PORT}/api/v1`)
})