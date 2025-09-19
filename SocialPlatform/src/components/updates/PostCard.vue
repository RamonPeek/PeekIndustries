<template>
  <UCard class="post-card w-full backdrop-blur-md bg-white/60 border border-white/20 shadow-lg">
    <!-- Media header -->
    <div class="relative">
      <img v-if="item.cover" :src="item.cover" :alt="item.title" class="w-full h-48 object-cover rounded-t-md">
      <div v-else class="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200" />

      <!-- Overlay gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      <!-- Top-left badges -->
      <div class="absolute top-3 left-3 flex items-center gap-2">
        <UBadge color="primary" variant="solid">Post</UBadge>
        <UBadge v-if="item.tags?.length" variant="soft" class="capitalize">{{ item.tags[0] }}</UBadge>
      </div>

      <!-- Title / meta -->
      <div class="absolute bottom-3 left-3 right-3">
        <h3 class="text-white text-lg font-semibold line-clamp-2 drop-shadow-sm">{{ item.title }}</h3>
        <div class="mt-1 text-[12px] text-white/90 flex items-center gap-3">
          <span class="flex items-center gap-1"><UIcon name="i-heroicons-calendar-days-20-solid" /> {{ formatDate(item.date) }}</span>
          <span class="opacity-80">•</span>
          <span class="flex items-center gap-1"><UIcon name="i-heroicons-clock-20-solid" /> {{ readTime }} min read</span>
        </div>
      </div>

      <!-- Author pill -->
      <div class="absolute -bottom-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border shadow-sm">
        <UAvatar :src="item.author?.avatar" :alt="item.author?.name" size="xs" />
        <span class="text-xs text-gray-700">{{ item.author?.name || 'Anonymous' }}</span>
      </div>
    </div>

    <!-- Body -->
    <div class="p-4 pt-6">
      <p class="text-gray-700 leading-relaxed line-clamp-3">{{ item.summary }}</p>

      <div class="mt-4 flex flex-wrap items-center gap-2">
        <UBadge v-for="t in item.tags || []" :key="t" variant="soft" class="capitalize">{{ t }}</UBadge>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between px-4 py-2">
        <div class="text-xs text-gray-500 flex items-center gap-1">
          <UIcon name="i-heroicons-user-circle-20-solid" class="opacity-70" />
          By {{ item.author?.name || 'Anonymous' }}
        </div>
        <div class="flex items-center gap-2">
          <UButton :to="item.link || '#'" icon="i-heroicons-arrow-top-right-on-square" color="primary" variant="solid" :ui="{ rounded: 'rounded-full' }">
            Read post
          </UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>

<script>
export default {
  name: 'PostCard',
  components: {},
  props: {
    item: { 
      type: Object, 
      required: true 
    }
  },
  methods: {
    formatDate(iso) {
      const d = new Date(iso)
      return d.toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      })
    }
  },
  computed: {
    readTime() {
      const text = (this.item?.summary || '').trim()
      const words = text ? text.split(/\s+/).length : 120 // assume 120 if unknown
      return Math.max(1, Math.round(words / 200)) // 200 wpm
    }
  }
}
</script>

<style scoped>
</style>