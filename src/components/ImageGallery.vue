<script setup>
const props = defineProps(["posts"]);
const { VITE_BASE_PHOTO_URL } = import.meta.env;
</script>

<template>
  <div class="image-gallery-container">
    <img
      :key="post.id"
      :src="`${VITE_BASE_PHOTO_URL}${post.url}`"
      alt=""
      v-for="post in props.posts"
    />
  </div>
</template>

<style scoped>
.image-gallery-container {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  width: inherit;
}

img {
  margin: 5px;
  width: 200px;
}
</style>
