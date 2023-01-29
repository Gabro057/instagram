<script setup>
const { userName, userInfo } = defineProps(["userName", "userInfo"]);
</script>

<template>
  <div class="userbar-container">
    <div class="top-content">
      <a-typografy-title :level="2">{{ userName }}</a-typografy-title>
    </div>
    <div class="bottom-content">
      <a-typografy-title :level="5">{{ userInfo.posts }} posts</a-typografy-title>
      <a-typografy-title :level="5">{{ userInfo.followers }} followers</a-typografy-title>
      <a-typografy-title :level="5">{{ userInfo.following }} following</a-typografy-title>
    </div>
  </div>
</template>

<style scoped>
.userbar-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 75px;
}

.bottom-content {
  display: flex;
  gap: 2rem;
  align-items: center;
}
</style>
