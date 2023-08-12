<template>
  <div>
    <form @submit.prevent="createUser">
      <input v-model="newUser.name" placeholder="Name" />
      <input v-model="newUser.email" placeholder="Email" />
      <button type="submit">Create User</button>
    </form>
    <div v-for="user in users" :key="user.id">
      <router-link :to="`/users/${user.id}`">{{ user.name }}</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  name: "UserList",
  setup() {
    const users = ref([]);
    const newUser = ref({
      name: "",
      email: "",
    });

    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3000/users");
      users.value = response.data;
    };

    const createUser = async () => {
      const response = await axios.post(
        "http://localhost:3000/users",
        newUser.value
      );
      users.value.push(response.data);
      newUser.value.name = "";
      newUser.value.email = "";
    };

    onMounted(fetchUsers);

    return {
      users,
      newUser,
      createUser,
    };
  },
};
</script>
