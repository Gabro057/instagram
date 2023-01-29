<script setup>
import { ref } from "vue";

const props = defineProps(["isLogin"]);
const visible = ref(false);
const showModal = () => (visible.value = true);
const handleOk = (e) => (visible.value = false);
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
      <a-input
        class="inp"
        v-if="!isLogin"
        v-model:value="username"
        placeholder="Username"
      />
      <a-input class="inp" v-model:value="email" placeholder="Email" />
      <a-input class="inp" v-model:value="password" placeholder="Password" />
    </a-modal>
  </div>
</template>

<style scoped>
.modal-wrapper .inp {
  margin-bottom: 0.5rem;
}
</style>
