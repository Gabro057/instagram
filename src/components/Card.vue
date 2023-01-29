<script setup>
const { post } = defineProps(["post"]);
</script>

<template>
  <a-card hoverable style="width: 320px">
    <template #cover>
      <img alt="example" :src="post.url" />
    </template>
    <a-card-meta :title="post.username">
      <template #description>{{ post.caption }}</template>
    </a-card-meta>
  </a-card>
</template>
