<template>
  <UStepper :items="items" class="w-full" :value="5" v-model="step" />
</template>

<script>
export default {
  name: 'PostCard',
  components: {},
  data() {
    return {
      step: 2,
      items: [
        {
          title: 'Naam registratie',
          description: 'Vastleggen van de (domein)naam.'
        },
        {
          title: 'Social Hub Website',
          description: 'Opzetten van een social hub webpagina voor het posten van progressie updates en blogposts.',
        },
        {
          title: 'Concepting',
          description: 'Bedenken wat we met het bedrijf willen doen, ondernemingsplan opstellen etc.',
          icon: 'i-lucide-house'
        },
        {
          title: 'KVK Registratie',
          description: 'Het bedrijf officieel registreren bij de Kamer van Koophandel.',
          icon: 'i-lucide-truck'
        },
        {
          title: 'Lancering!',
          description: 'Officiële lancering van Peek Industries!',
        }
      ]
    }
  }
}
</script>