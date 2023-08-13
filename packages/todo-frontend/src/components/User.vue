<template>
  <div>
    <h1>{{ user.name }}</h1>
    <div v-for="project in projects" :key="project.id">
      <router-link :to="`/projects/${project.id}`">{{
        project.name
      }}</router-link>
    </div>
    <form @submit.prevent="createProject">
      <input v-model="newProject.name" placeholder="Project name" />
      <button type="submit">Create Project</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "UserDetails",
  setup() {
    const user = ref({});
    const projects = ref([]);
    const newProject = ref({
      name: "",
    });
    const route = useRoute();

    const fetchUserData = async () => {
      const id = route.path.split("/").pop();
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      user.value = response.data[0];
    };

    const fetchProjects = async () => {
      const id = route.path.split("/").pop();
      const projectResponse = await axios.get(
        `http://localhost:3000/projects?userId=${id}`
      );
      projects.value = projectResponse.data;
    };

    const createProject = async () => {
      const response = await axios.post("http://localhost:3000/projects", {
        ...newProject.value,
        userId: user.value.id,
      });
      projects.value.push(response.data);
      newProject.value.name = "";
    };

    onMounted(async () => {
      await fetchUserData();
      await fetchProjects();
    });

    return {
      user,
      projects,
      newProject,
      createProject,
    };
  },
};
</script>
