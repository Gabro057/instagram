<script setup>
const props = defineProps(["posts"]);
</script>

<template>
  <div class="image-gallery-container">
    <img :key="post.id" :src="post.image" alt="" v-for="post in props.posts" />
  </div>
</template>

<style scoped>
.image-gallery-container {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}

img {
  margin: 5px;
  width: 200px;
}
</style>
