<template>
  <UCard class="release-card w-full backdrop-blur-md bg-white/60 border border-white/20 shadow-lg">
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <UBadge color="primary" variant="subtle">Release</UBadge>
            <UBadge :label="`v${item.version}`" variant="soft" class="font-mono tracking-tight" />
          </div>
          <h3 class="mt-1 text-lg font-semibold truncate">{{ item.title }}</h3>
          <div class="mt-1 text-xs text-gray-500 flex items-center gap-1">
            <UIcon name="i-heroicons-calendar-days-20-solid" class="opacity-70" />
            {{ formatDate(item.date) }}
          </div>
        </div>
        <div class="shrink-0 relative">
          <UAvatar :src="item.author?.avatar" :alt="item.author?.name" size="md" class="ring-2 ring-blue-200" />
          <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 bg-white/80 backdrop-blur px-1.5 py-0.5 rounded-full border">{{ item.author?.name || 'Team' }}</span>
        </div>
      </div>
    </template>

    <p class="text-gray-700 leading-relaxed">{{ item.summary }}</p>

    <div v-if="item.highlights?.length" class="mt-4">
      <h4 class="text-sm font-medium mb-2">Highlights</h4>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <li v-for="(h, idx) in item.highlights" :key="idx" class="flex items-start gap-2 text-sm">
          <UIcon name="i-heroicons-check-circle-20-solid" class="mt-0.5" />
          <span>{{ h }}</span>
        </li>
      </ul>
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-2">
      <UBadge v-for="t in item.tags || []" :key="t" variant="soft" class="capitalize">{{ t }}</UBadge>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-2">
        <div class="text-xs text-gray-500 flex items-center gap-1">
          <UIcon name="i-heroicons-command-line-20-solid" class="opacity-70" />
          Build {{ item.version }}
        </div>
        <div class="flex items-center gap-2">
          <UButton icon="i-heroicons-clipboard-document" variant="soft" @click="copyVersion" :ui="{ rounded: 'rounded-full' }">Copy version</UButton>
          <UButton icon="i-heroicons-document-text" variant="solid" color="primary" :ui="{ rounded: 'rounded-full' }">Release notes</UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  item: { type: Object, required: true }
})
const { item } = toRefs(props)

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  })
}

async function copyVersion() {
  try {
    await navigator.clipboard.writeText(item.value?.version || '')
  } catch {}
}
</script>

<style scoped>
</style>