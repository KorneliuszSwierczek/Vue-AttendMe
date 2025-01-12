<template>
    <div class="student-dashboard">
      <h1>Student Dashboard</h1>
      <div class="actions">
        <button @click="scanQRCode">Scan QR Code</button>
        <button @click="viewAttendanceHistory">View Attendance History</button>
      </div>
      <div v-if="attendanceHistory.length" class="history">
        <h2>Attendance History</h2>
        <ul>
          <li v-for="record in attendanceHistory" :key="record.id">
            {{ record.date }} - {{ record.status }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'StudentDashboard',
    setup() {
      const attendanceHistory = ref([
        { id: 1, date: '2025-01-10', status: 'Present' },
        { id: 2, date: '2025-01-09', status: 'Absent' },
      ]);
  
      const scanQRCode = () => {
        console.log('Scan QR Code');
        alert('Scanning QR Code...');
      };
  
      const viewAttendanceHistory = () => {
        console.log('Viewing Attendance History');
      };
  
      return {
        attendanceHistory,
        scanQRCode,
        viewAttendanceHistory,
      };
    },
  });
  </script>
  
  <style scoped>
  .student-dashboard {
    padding: 20px;
  }
  .actions button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  .history {
    margin-top: 20px;
  }
  </style>
  