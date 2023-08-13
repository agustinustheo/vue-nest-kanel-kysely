<template>
  <div>
    <h1>{{ project.name }}</h1>
    <div v-for="todo in todos" :key="todo.id">
      <p>{{ todo.title }} - {{ todo.completed ? "Done" : "Not done" }}</p>
    </div>
    <form @submit.prevent="createTodo">
      <input v-model="newTodo.title" placeholder="Todo title" />
      <button type="submit">Create Todo</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "ProjectDetails",
  setup() {
    const project = ref({});
    const todos = ref([]);
    const newTodo = ref({
      title: "",
    });
    const route = useRoute();

    const fetchProjectData = async () => {
      const id = route.path.split("/").pop();
      const response = await axios.get(`http://localhost:3000/projects/${id}`);
      project.value = response.data[0];
    };

    const fetchTodos = async () => {
      const id = route.path.split("/").pop();
      const todoResponse = await axios.get(
        `http://localhost:3000/todos?projectId=${id}`
      );
      todos.value = todoResponse.data;
    };

    const createTodo = async () => {
      const response = await axios.post("http://localhost:3000/todos", {
        ...newTodo.value,
        completed: false,
        projectId: project.value.id,
      });
      todos.value.push(response.data);
      newTodo.value.title = "";
    };

    onMounted(async () => {
      await fetchProjectData();
      await fetchTodos();
    });

    return {
      project,
      todos,
      newTodo,
      createTodo,
    };
  },
};
</script>
