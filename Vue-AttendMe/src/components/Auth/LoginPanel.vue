<template>
  <div class="login-container">
    <div class="login-card">
      <h2>AttendMe</h2>
      <p>Class Attendance</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="login">Login</label>
          <input
            id="login"
            type="text"
            v-model="username"
            placeholder="Podaj twój login"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Hasło</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Podaj hasło"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Zaloguj</button>
        <button type="button" class="btn btn-secondary" @click="scanQRCode">
          Skanuj obecność
        </button>
      </form>
      <footer>
        <small>&copy; 2025 true-vue</small>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LoginPanel',
  setup() {
    const username = ref('');
    const password = ref('');

    const handleLogin = () => {
      console.log('Logging in with', username.value, password.value);
      // Tu można dodać logikę do obsługi logowania
    };

    const scanQRCode = () => {
      console.log('Scanning QR Code');
      alert('Funkcja skanowania w przygotowaniu!');
    };

    return {
      username,
      password,
      handleLogin,
      scanQRCode,
    };
  },
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.login-card {
  width: 350px;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

p {
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-size: 14px;
  color: #666;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.btn-primary {
  background-color: #007bff;
  color: white;
}

button.btn-secondary {
  background-color: #28a745;
  color: white;
}

button:hover {
  opacity: 0.9;
}

footer {
  margin-top: 20px;
  font-size: 12px;
  color: #aaa;
}
</style>
