<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/users";
import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";

const userStore = useUserStore();

const { user, loadingUser } = storeToRefs(userStore);
const router = useRouter();
const searchUserName = ref("");

const onSearch = () => {
  if (searchUserName.value) {
    console.log("search", searchUserName);
    router.push(`/profile/${searchUserName.value}`);
    searchUserName.value = "";
  }
};

const handleLogout = async () => {
  await userStore.handleLogout();
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

        <div v-if="!loadingUser">
          <div v-if="!user" class="auth-wrapper">
            <AuthModal :isLogin="false" />
            <AuthModal :isLogin="true" />
          </div>
          <div v-else class="auth-wrapper">
            <a-button>Profile</a-button>
            <a-button @click="handleLogout">Logout</a-button>
          </div>
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
