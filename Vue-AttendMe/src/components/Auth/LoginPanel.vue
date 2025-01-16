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

        <!-- Sekcja testowa -->
        <select v-model="exampleId" @change="result = undefined" style="margin-top: 1rem; padding: 0.5rem">
          <option :value="null">- Wybierz akcję testową -</option>
          <option :value="0">WYKŁADOWCA: Logowanie</option>
          <option :value="1">WYKŁADOWCA: Lista zajęć</option>
          <option :value="2">STUDENT: Logowanie</option>
          <option :value="3">STUDENT: Lista zajęć</option>
        </select>
        <button
          v-if="exampleId !== null"
          @click="callExample(exampleId)"
          style="padding: 0.5rem; margin-top: 1rem"
        >
          Wykonaj test
        </button>

        <div v-if="result" style="margin-top: 1rem">
          <p>Odpowiedź serwera:</p>
          <pre>{{ result }}</pre>
        </div>
      </form>
      <footer>
        <small>&copy; 2025 true-vue</small>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AttendMeBackendClient } from '../../backend/AttendMeBackendClient'; // Ustaw ścieżkę poprawnie

export default defineComponent({
  name: 'LoginPanel',
  setup() {
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const result = ref<unknown>(); // Bezpieczniejszy typ zamiast any

    const exampleId = ref<number | null>(null);

    const client = new AttendMeBackendClient('http://localhost:3000'); // Zmień URL na właściwy

    const handleLogin = async () => {
      try {
        errorMessage.value = ''; // Reset błędu
        const tokenResult = await client.userLogin(username.value, password.value);
        console.log('Zalogowano:', tokenResult);
        alert('Logowanie zakończone sukcesem!');
      } catch (error) {
        console.error('Błąd logowania:', error);
        errorMessage.value = 'Nieprawidłowy login lub hasło.';
      }
    };

    const examples = [
      () => client.userLogin('teacher', 'password123').then((r) => (result.value = r)),
      () =>
        client
          .courseTeacherSessionsGet({ pageNumber: 1, pageSize: 99999 })
          .then((r) => (result.value = r)),
      () => client.userLogin('student', '12345').then((r) => (result.value = r)),
      () =>
        client
          .courseStudentSessionsGet({ pageNumber: 1, pageSize: 99999 })
          .then((r) => (result.value = r)),
    ];

    const callExample = (id: number) => {
      examples[id]()
        .then(() => console.log('Test zakończony'))
        .catch((err) => {
          console.error('Błąd:', err);
          result.value = err;
        });
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin,
      result,
      exampleId,
      callExample,
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

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
