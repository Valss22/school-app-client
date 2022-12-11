import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          admin: [
            "./src/views/Admin/Degrees/DegreeCreateView.vue",
            "./src/views/Admin/Degrees/DegreeForm.vue",
            "./src/views/Admin/Degrees/DegreeListView.vue",
            "./src/views/Admin/Degrees/DegreeUpdateView.vue",
            "./src/views/Admin/Projects/Categories/CategoryCreateView.vue",
            "./src/views/Admin/Projects/Categories/CategoryForm.vue",
            "./src/views/Admin/Projects/Categories/CategoryListView.vue",
            "./src/views/Admin/Projects/Categories/CategoryUpdateView.vue",
            "./src/views/Admin/Ranks/RankCreateView.vue",
            "./src/views/Admin/Ranks/RankForm.vue",
            "./src/views/Admin/Ranks/RankListView.vue",
            "./src/views/Admin/Ranks/RankUpdateView.vue",
            "./src/views/Admin/RegistrationKeys/RegistrationKeyListView.vue",
            "./src/views/Admin/ScientificDirections/ScientificDirectionListView.vue",
            "./src/views/Admin/ScientificDirections/ScientificDirectionCreateView.vue",
            "./src/views/Admin/ScientificDirections/ScientificDirectionUpdateView.vue",
            "./src/views/Admin/Users/UserListView.vue",
          ],
          projects: [
            "./src/views/Projects/Components/AddInternalMember.vue",
            "./src/views/Projects/Components/InternalMemberItem.vue",
            "./src/views/Projects/Components/ExternalMemberItem.vue",
            "./src/views/Projects/ProjectCreateView.vue",
            "./src/views/Projects/ProjectDetailsView.vue",
            "./src/views/Projects/ProjectForm.vue",
            "./src/views/Projects/ProjectUpdateView.vue",
            "./src/views/Projects/UserProjectListView.vue",
          ],
          users: [
            "./src/views/Users/Me/Update/UserPasswordForm.vue",
            "./src/views/Users/Me/Update/UserUpdateForm.vue",
            "./src/views/Users/Me/Update/UserUpdateView.vue",
          ],
        },
      },
    },
  },
});
