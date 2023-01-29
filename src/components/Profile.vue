<script setup>
import Container from "./Container.vue";
import ImageGallery from "./ImageGallery.vue";
import UserBar from "./UserBar.vue";
</script>

<template>
  <Container>
    <div class="profile-container">
      <UserBar
        userName="Gabro"
        :userInfo="{
          posts: 0,
          followers: 200,
          following: 2142,
        }"
      />

      <ImageGallery
        :posts="[
          {
            id: 1,
            image:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80',
          },
          {
            id: 2,
            image:
              'https://www.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg',
          },
          {
            id: 3,
            image:
              'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
          },
        ]"
      />
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
</style>
