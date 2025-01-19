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
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button type="submit" class="btn btn-primary">Zaloguj</button>
      </form>
      <footer>
        <small>&copy; 2025 true-vue</small>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AttendMeBackendClient } from '../../backend/AttendMeBackendClient';

export default defineComponent({
  name: 'LoginPanel',
  setup() {
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const client = new AttendMeBackendClient('http://localhost:5173'); // Ustaw właściwy URL

    const handleLogin = async () => {
      try {
        errorMessage.value = ''; // Reset błędu

        // Logowanie użytkownika
        const tokenResult = await client.userLogin(username.value, password.value);
        console.log('Zalogowano:', tokenResult);

        // Sprawdzenie roli użytkownika na podstawie loginu
        if (username.value === 'su') {
          alert('Zalogowano jako Admin!');
          // Przekierowanie na odpowiedni dashboard (jeśli istnieje)
          await router.push('/admin-dashboard');
        } else if (username.value === 'pk') {
          alert('Zalogowano jako Wykładowca!');
          await router.push('/lecturer-dashboard');
        } else if (username.value.startsWith('stu')) {
          alert('Zalogowano jako Student!');
          await router.push('/student-dashboard');
        } else {
          alert('Rola użytkownika nieznana!');
        }
      } catch (error) {
        console.error('Błąd logowania:', error);
        errorMessage.value = 'Nieprawidłowy login lub hasło.';
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin,
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

button:hover {
  opacity: 0.9;
}

footer {
  margin-top: 20px;
  font-size: 12px;
  color: #aaa;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
