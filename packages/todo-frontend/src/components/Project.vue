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
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "ProjectDetails",
  setup(props, { root }) {
    const project = ref({});
    const todos = ref([]);
    const newTodo = ref({
      title: "",
    });

    const fetchProjectData = async () => {
      const response = await axios.get(
        `http://localhost:3000/projects/${root.$route.params.id}`
      );
      project.value = response.data;
    };

    const fetchTodos = async () => {
      const todoResponse = await axios.get(
        `http://localhost:3000/todos?projectId=${root.$route.params.id}`
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
