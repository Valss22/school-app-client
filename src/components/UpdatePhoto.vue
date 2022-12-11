<script setup>
import FileUpload from "primevue/fileupload/sfc";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores/auth";
import UserService from "@/services/users";

const authStore = useAuthStore();
const toast = useToast();

function updatePhoto(event) {
  const newPhoto = event.files[0];
  UserService.updatePhoto(newPhoto)
    .then((response) => {
      authStore.user.photo = response.data.photo;
      toast.add({
        severity: "success",
        detail: "Фото успешно обновлено",
        life: 3000,
      });
    })
    .catch((e) => console.log(e));
}
</script>

<template>
  <div class="user__profile__avatar">
    <div class="upload__interface">
      <FileUpload
        mode="basic"
        name="newPhoto"
        chooseLabel="Загрузить новое фото"
        :customUpload="true"
        @uploader="updatePhoto"
        :auto="true"
        accept="image/*"
      />
    </div>
    <img :src="authStore.user.photo" />
  </div>
</template>

<style>
.user__profile__avatar {
  display: inline-block;
  position: relative;
  width: auto;
}
.user__profile__avatar .upload__interface {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: auto;
  background: rgba(0, 0, 0, 0.35) !important;
  border-radius: 50%;
  opacity: 0;
  transition: 0.3s ease-in-out;
}
.user__profile__avatar:hover .upload__interface {
  opacity: 1;
}
.user__profile__avatar .upload__interface .p-button {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0) !important;
}
.user__profile__avatar .upload__interface .p-button-label {
  flex: none;
}
.user__profile__avatar img {
  width: 100%;
  height: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
}
</style>
