<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../supabase";
import Container from "./Container.vue";
import ImageGallery from "./ImageGallery.vue";
import UserBar from "./UserBar.vue";

const route = useRoute();
const { username } = route.params;
const user = ref(null);
const posts = ref([]);
const loading = ref(false);

const addNewPost = (post) => {
  posts.value.unshift(post);
};
const fetchData = async () => {
  console.log("fetchData username", username);

  loading.value = true;
  // get username from supabase
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (!userData) {
    user.value = null;
    loading.value = false;
    return;
  }

  user.value = userData;
  console.log("userData", userData);
  console.log("user.value", user.value);
  console.log("user.value.username", user.value.username);

  // get all posts / images for user
  const { data: postsData } = await supabase
    .from("posts")
    .select()
    .eq("owner_id", user.value.id);

  console.log("postsData", postsData);
  posts.value = postsData;
  loading.value = false;
};

onMounted(() => fetchData());
</script>

<template>
  <Container>
    <div class="profile-container" v-if="!loading">
      <UserBar
        :key="$route.params.username"
        :username="'gGG'"
        :user="user"
        :userInfo="{
          posts: 0,
          followers: 200,
          following: 2142,
        }"
        :addNewPost="addNewPost"
      />

      <ImageGallery :posts="posts" />
    </div>
    <div v-else class="spinner">
      <a-spin />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: inherit;
  margin-top: 1rem;
  gap: 1rem;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
  width: inherit;
}
</style>
