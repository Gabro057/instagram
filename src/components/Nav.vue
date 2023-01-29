<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";

const router = useRouter();
const searchUserName = ref("");
const isAutenticated = ref(false);
const onSearch = () => {
  if (searchUserName.value) {
    console.log("search", searchUserName);
    router.push(`/profile/${searchUserName.value}`);
    searchUserName.value = "";
  }
};
</script>

<template>
  <a-layout-header class="header">
    <Container>
      <div class="logo-search-wrapper">
        <RouterLink to="/">Instagram</RouterLink>
        <a-input-search
          v-model:value="searchUserName"
          placeholder="username ..."
          style="width: 200px"
          @search="onSearch"
        />
      </div>
      <div class="btn-wrapper">
        <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>

        <!-- <a-button type="primary">Signup</a-button> -->
        <div v-if="!isAutenticated" class="auth-wrapper">
          <AuthModal :isLogin="false" />
          <AuthModal :isLogin="true" />
        </div>
        <div v-else class="auth-wrapper">
          <a-button class="primary">Profile</a-button>
          <a-button class="primary">Logout</a-button>
        </div>
      </div>
    </Container>
  </a-layout-header>
</template>

<style scoped>
.logo-search-wrapper,
.btn-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-wrapper {
  gap: 0.5rem;
}

.auth-wrapper {
  display: flex;
  gap: 0.5rem;
}
</style>
