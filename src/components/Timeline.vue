<script setup>
import Card from "./Card.vue";
import Container from "./Container.vue";

const data = [
  {
    id: 1,
    username: "Gabro",
    url: "https://www.stonegallery.cz/data/images-l/1114-gabro.jpg",
    caption: "",
  },
  {
    id: 2,
    username: "Jana",
    url: "https://i.pinimg.com/280x280_RS/51/bb/56/51bb5602973b563d8785295ce4e9cf95.jpg",
    caption: "Hello guys",
  },
  {
    id: 3,
    username: "Kacka",
    url: "https://pm1.narvii.com/5789/f4515c92d5fd9108fc9d9c4b6cccc6e0d12222fc_hq.jpg",
    caption: "Mnau",
  },
];
</script>

<template>
  <Container>
    <div class="timeline-container">
      <Card v-for="post in data" :key="post.id" :post="post" />
    </div>
  </Container>
</template>

<style scoped>
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: inherit;
  margin-top: 1rem;
  gap: 1rem;
}
</style>
