<template>
  <section class="max-w-4xl mx-auto mt-6">

    <StatusStepper class="mb-10 mt-8"/>
    <!-- Header / Actions -->
    <div class="mb-8">
      <div class="mb-4">
        <h1 class="text-3xl font-semibold">Company Updates</h1>
        <p class="text-gray-600">Releases, blog-posts and updates from the team!</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <UInput v-model="q" placeholder="Search updates…" icon="i-heroicons-magnifying-glass-20-solid" class="w-64" />
        <USelect v-model="type" :items="typeOptions" placeholder="Type" class="w-40" />
        <USelect v-model="sort" :items="sortOptions" class="w-40" />
        <UButton icon="i-heroicons-arrow-path" variant="soft" @click="resetFilters">Reset</UButton>
      </div>
    </div>

    <!-- updates -->
    <div class="relative">
      <!-- vertical line -->
    <div class="updates-line bg-gray-200" aria-hidden="true"></div>

      <ul class="space-y-6">
        <li v-for="item in paged" :key="item.id" class="relative flex gap-4">
          <!-- Dot -->
            <div class="updates-dot mt-2 bg-blue-600 ring-2 ring-blue-200"></div>

          <!-- Card by type -->
          <component :is="resolveComponent(item)" :item="item" />
        </li>
      </ul>

      <div v-if="paged.length === 0" class="text-center py-20 text-gray-500">
        No updates entries match your filters.
      </div>

      <div class="mt-8 flex justify-center" v-if="hasMore">
        <UButton @click="loadMore" icon="i-heroicons-chevron-down" :loading="loading">Load more</UButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
/**
 * Mock data — mix of types
 * type: 'post' | 'announcement' | 'release'
 */
const updates = ref([
  {
    id: 'r-0.1.0',
    type: 'release',
    title: 'Peek Social (alpha) — 0.1.0',
    summary: 'First public preview with updates feed, basic filters, and mock data.',
    date: '2025-09-10T09:00:00Z',
    tags: ['release', 'alpha'],
    version: '0.1.0',
    highlights: ['updates feed', 'Search + filters', 'Nuxt UI styling'],
    author: { name: 'Ramon', avatar: 'https://i.pravatar.cc/80?img=12' }
  },
  {
    id: 'p-design-draft',
    type: 'post',
    title: 'Design language exploration with Nuxt UI',
    summary: 'A quick look at component primitives, spacing scale, and tone.',
    date: '2025-09-12T14:25:00Z',
    tags: ['design', 'nuxt-ui'],
    author: { name: 'TestAdmin', avatar: 'https://i.pravatar.cc/80?img=32' },
    link: '/blog/design-language-exploration',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=60&auto=format'
  },
  {
    id: 'm-hiring-note',
    type: 'announcement',
    text: 'We\'re sketching the feature request flow. Thinking: public list → upvotes → status labels.',
    date: '2025-09-13T08:10:00Z',
    tags: ['roadmap'],
    author: { name: 'Ramon', avatar: 'https://i.pravatar.cc/80?img=14' }
  },
  {
    id: 'p-welcome',
    type: 'post',
    title: 'Hello from Peek Industries',
    summary: 'Why we\'re building an open, community-driven product process.',
    date: '2025-09-01T10:00:00Z',
    tags: ['company'],
    author: { name: 'TestAdmin', avatar: 'https://i.pravatar.cc/80?img=45' },
    link: '/blog/welcome',
    cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=60&auto=format'
  },
  {
    id: 'm-random',
    type: 'announcement',
    text: 'Dark mode or light mode as default? Leaning towards system preference.',
    date: '2025-09-14T18:40:00Z',
    tags: ['design'],
    author: { name: 'TestAdmin', avatar: 'https://i.pravatar.cc/80?img=23' }
  }
])

// Filters / UI state
const q = ref('')
const type = ref('all')
const sort = ref('newest')
const typeOptions = [
  { label: 'All types', value: 'all' },
  { label: 'Blog Posts', value: 'post' },
  { label: 'Announcements', value: 'announcement' },
  { label: 'Releases', value: 'release' }
]
const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' }
]

function resetFilters() {
  q.value = ''
  type.value = 'all'
  sort.value = 'newest'
}

// Derived list
const filtered = computed(() => {
  const term = q.value.toLowerCase().trim()
  let out = updates.value.filter((u) =>
    (type.value === 'all' || u.type === type.value) &&
    (!term ||
      (u.title && u.title.toLowerCase().includes(term)) ||
      (u.summary && u.summary.toLowerCase().includes(term)) ||
      (u.text && u.text.toLowerCase().includes(term)) ||
      (u.tags && u.tags.join(' ').toLowerCase().includes(term)))
  )

  out.sort((a, b) =>
    sort.value === 'newest'
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  )

  return out
})

// Pagination (Load more)
const pageSize = 4
const page = ref(1)
const loading = ref(false)

const paged = computed(() => filtered.value.slice(0, page.value * pageSize))
const hasMore = computed(() => filtered.value.length > paged.value.length)

async function loadMore() {
  loading.value = true
  await new Promise((r) => setTimeout(r, 400)) // mimic async
  page.value++
  loading.value = false
}

// Type → component mapping
import ReleaseCard from '../components/updates/ReleaseCard.vue'
import PostCard from '../components/updates/PostCard.vue'
import MicroCard from '../components/updates/AnnouncementCard.vue'
import StatusStepper from '../components/updates/StatusStepper.vue'

const map = {
  release: ReleaseCard,
  post: PostCard,
  micro: MicroCard
}

function resolveComponent(item) {
  return map[item.type] || MicroCard
}
</script>

<style scoped>
</style>
