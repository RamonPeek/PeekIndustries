<template>
  <UCard class="announcement-card w-full backdrop-blur-md bg-white/60 border border-white/20 shadow-lg">
    <div class="flex items-start gap-3">
      <!-- Avatar -->
      <UAvatar :src="item.author?.avatar" :alt="item.author?.name" size="md" class="ring-2 ring-primary-200" />
      
      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <span class="font-medium text-gray-900 truncate">{{ item.author?.name || 'Admin' }}</span>
          <UBadge color="primary" variant="subtle">Announcement</UBadge>
          <span class="text-xs text-gray-500">· {{ formatDate(item.date) }}</span>
        </div>

        <p class="mt-2 text-gray-800 leading-relaxed whitespace-pre-line">{{ item.text }}</p>

        <div class="mt-3 flex flex-wrap items-center gap-2">
          <UBadge v-for="t in item.tags || []" :key="t" variant="soft" class="capitalize">{{ t }}</UBadge>
        </div>

        <!-- Reactions / actions -->
        <div class="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <button class="flex items-center gap-1 hover:text-primary-600 transition-colors">
            <UIcon name="i-heroicons-heart-20-solid" class="w-4 h-4" /> 12
          </button>
          <button class="flex items-center gap-1 hover:text-primary-600 transition-colors">
            <UIcon name="i-heroicons-chat-bubble-left-20-solid" class="w-4 h-4" /> 3
          </button>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true }
})

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  })
}
</script>

<style scoped>
</style>