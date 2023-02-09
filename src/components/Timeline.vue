<script setup>
import Cards from "./Cards.vue";
import LoginMessage from "./LoginMessage.vue";
import Container from "./Container.vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user, loadingUser } = storeToRefs(userStore);
</script>

<template>
  <Container>
    <div v-if="!loadingUser" class="loading-wrapper">
      <Cards v-if="user" />
      <LoginMessage v-else />
    </div>
    <div v-else class="spinner">
      <a-spin />
    </div>
  </Container>
</template>

<style scoped>
.loading-wrapper {
  width: inherit;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: 90vh;
}
</style>
