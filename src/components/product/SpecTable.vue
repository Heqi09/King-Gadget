<template>
  <div class="spec-table">
    <div v-for="group in groupedSpecs" :key="group.name" class="spec-table__group">
      <h4>{{ group.name }}</h4>
      <table>
        <tbody>
          <tr v-for="item in group.items" :key="item.spec_key">
            <th>{{ item.spec_key }}</th>
            <td>{{ item.spec_value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ specifications: { type: Array, default: () => [] } })

const groupedSpecs = computed(() => {
  const groups = {}
  for (const spec of props.specifications) {
    if (!groups[spec.spec_group]) groups[spec.spec_group] = []
    groups[spec.spec_group].push(spec)
  }
  return Object.entries(groups).map(([name, items]) => ({ name, items }))
})
</script>

<style scoped>
.spec-table__group {
  margin-bottom: 1.5rem;
}
.spec-table h4 {
  font-family: var(--font-display);
  font-size: 0.95rem;
  margin: 0 0 0.5rem;
}
.spec-table table {
  width: 100%;
  border-collapse: collapse;
}
.spec-table th,
.spec-table td {
  text-align: left;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.85rem;
}
.spec-table th {
  color: var(--slate);
  font-weight: 500;
  width: 40%;
}
.spec-table td {
  font-family: var(--font-mono);
}
</style>