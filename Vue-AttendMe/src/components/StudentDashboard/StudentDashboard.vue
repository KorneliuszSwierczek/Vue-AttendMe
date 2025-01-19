<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <div class="header-logo">
        <img src="/logo.png" alt="AttendMe Logo" />
      </div>
      <div class="header-actions">
        <select class="filter-dropdown">
          <option>Bieżący miesiąc</option>
          <option>Poprzedni miesiąc</option>
          <option>Następny miesiąc</option>
        </select>
        <input
          type="text"
          class="search-input"
          placeholder="Przedmiot, lokalizacja..."
        />
        <div class="user-profile">
          <button class="profile-button">KS</button>
        </div>
      </div>
    </header>

    <main class="dashboard-content">
      <button class="scan-button" @click="scanAttendance">Skanuj obecność</button>
      <div class="cards-container">
        <div class="card" v-for="session in sessions" :key="session.id">
          <div class="card-header">
            <span class="badge">{{ session.day }} {{ session.time }}</span>
          </div>
          <div class="card-body">
            <h3>{{ session.title }}</h3>
            <p>{{ session.location }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'StudentDashboard',
  setup() {
    const sessions = ref([
      {
        id: 1,
        day: 'NIEDZIELA',
        time: '13:00 - 14:30',
        title: 'Frameworki front-endowe',
        location: 'F Chicago',
      },
    ]);

    const scanAttendance = () => {
      alert('Obecny');
    };

    return {
      sessions,
      scanAttendance,
    };
  },
});
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.header-logo img {
  height: 40px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-dropdown {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 250px;
}

.user-profile {
  position: relative;
}

.profile-button {
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
}

.dashboard-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.scan-button {
  align-self: center;
  padding: 0.75rem 2rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.scan-button:hover {
  background-color: #218838;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}

.card {
  flex: 1 1 calc(33.333% - 1rem);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 300px;
  max-width: 350px;
}

.card-header {
  background: #ffcc00;
  color: #000;
  padding: 0.5rem 1rem;
  font-weight: bold;
  text-align: center;
}

.card-body {
  padding: 1rem;
}

.card-body h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.card-body p {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}
</style>
