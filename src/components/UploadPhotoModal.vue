<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const props = defineProps(["addNewPost"]);
const loading = ref(false);
const errorMsg = ref("");
const visible = ref(false);
const caption = ref("");
const file = ref(null);

const showModal = () => (visible.value = true);
const handleOk = async () => {
  loading.value = true;
  const fileName = Math.floor(Math.random() * 1000000000000000000);
  let filePath;

  if (file.value) {
    // ulozeni souboru do DB
    const { data, error } = await supabase.storage
      .from("images")
      .upload("public/" + fileName, file.value);

    if (error) {
      loading.value = false;
      return (errorMsg.value = "Unable to upload image");
    }
    filePath = data.path;
    // Ulozeni zaznamu o ulozeni do tabulky POSTS
    await supabase.from("posts").insert({
      url: filePath,
      caption: caption.value,
      owner_id: user.value.id,
    });
  }
  visible.value = false;
  loading.value = false;
  caption.value = "";

  props.addNewPost({
    url: filePath,
    caption: caption.value,
  });
};
const handleUploadChange = (e) => {
  if (e.target.files[0]) file.value = e.target.files[0];
};
</script>

<template>
  <div>
    <a-button @click="showModal">Upload photo</a-button>

    <a-modal v-model:visible="visible" :title="'Upload photo'" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" accept=".jpeg,.png,.webp" @change="handleUploadChange" />
        <a-input v-model:value="caption" placeholder="Caption ..." :maxLength="50" />
        <a-typography-text v-if="errorMsg" type="danger">
          {{ errorMsg }}
        </a-typography-text>
      </div>
      <div v-else class="spinner">
        <a-spin />
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
input {
  margin-top: 0.5rem;
}
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
