<script setup>
import { ref, reactive } from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user, errorMessage, successMessage, loading } = storeToRefs(userStore);

const props = defineProps(["isLogin"]);
const visible = ref(false);
const userCredentials = reactive({
  email: "",
  password: "",
  username: "",
});

const clearuserCredentialssInput = () => {
  userCredentials.email = "";
  userCredentials.password = "";
  userCredentials.username = "";
  userStore.clearErrorMessage();
  userStore.clearSuccessMessage();
};
const showModal = () => (visible.value = true);
const handleOk = async (e) => {
  await userStore.handleSignup(userCredentials);
  if (user.value) {
    visible.value = false;
    clearuserCredentialssInput();
  }
};
const handleCancel = () => {
  visible.value = false;
  clearuserCredentialssInput();
};
const title = props.isLogin ? "Login" : "Signup";
</script>

<template>
  <div>
    <a-button class="btn" type="primary" @click="showModal">{{ title }}</a-button>
    <a-modal
      v-model:visible="visible"
      :title="title"
      @ok="handleOk"
      wrapClassName="modal-wrapper"
    >
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button key="submit" type="primary" :disabled="loading" @click="handleOk">
          Submit
        </a-button>
      </template>
      <div v-if="!loading" class="input-container">
        <a-input
          class="inp"
          v-if="!isLogin"
          v-model:value="userCredentials.username"
          placeholder="Username"
        />
        <a-input class="inp" v-model:value="userCredentials.email" placeholder="Email" />
        <a-input
          type="password"
          class="inp"
          v-model:value="userCredentials.password"
          placeholder="Password"
        />
      </div>
      <div v-else class="spinner">
        <a-spin />
      </div>
      <a-typography-text v-if="errorMessage" type="danger">
        {{ errorMessage }}
      </a-typography-text>
      <a-typography-text v-if="successMessage" type="success">
        {{ successMessage }}
      </a-typography-text>
    </a-modal>
  </div>
</template>

<style scoped>
/*.input-container {
  height: 120px;
}*/
.modal-wrapper .inp {
  margin-bottom: 0.5rem;
}
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
</style>
