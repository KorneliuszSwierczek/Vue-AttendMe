<template>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input type="text" v-model="username" placeholder="Username" />
        <input type="password" v-model="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        // Placeholder logic for login
        console.log('Login attempt', this.username, this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  .login {
    text-align: center;
    margin: 20px;
  }
  </style>
  