<script setup>
import UploadPhotoModal from "./UploadPhotoModal.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const route = useRoute();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { username: profileUserName } = route.params;

const props = defineProps(["user", "userInfo", "addNewPost"]);
</script>

<template>
  <div class="userbar-container" v-if="props.user">
    <div class="top-content">
      <ATypographyTitle :level="2">{{ props.user.username }}</ATypographyTitle>
      <UploadPhotoModal
        v-if="user && profileUsername === user.username"
        :addNewPost="addNewPost"
      />
    </div>
    <div class="bottom-content">
      <ATypographyTitle :level="5">{{ props.userInfo.posts }} posts</ATypographyTitle>
      <ATypographyTitle :level="5"
        >{{ props.userInfo.followers }} followers</ATypographyTitle
      >
      <ATypographyTitle :level="5"
        >{{ props.userInfo.following }} following</ATypographyTitle
      >
    </div>
  </div>
  <div class="userbar-container" v-else>
    <div class="top-content">
      <ATypographyTitle :level="2">User Not Found</ATypographyTitle>
    </div>
  </div>
</template>

<style scoped>
.userbar-container {
  display: flex;
  width: inherit;
  flex-direction: column;
  padding-bottom: 75px;
}

.bottom-content {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.bottom-content > * {
  margin: 0 !important;
}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
