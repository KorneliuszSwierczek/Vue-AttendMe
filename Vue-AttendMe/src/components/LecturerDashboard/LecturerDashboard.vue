<template>
    <div class="lecturer-dashboard">
      <h1>Lecturer Dashboard</h1>
      <div class="actions">
        <button @click="generateQRCode">Generate QR Code</button>
        <button @click="viewAttendanceRecords">View Attendance Records</button>
      </div>
      <div v-if="attendanceRecords.length" class="records">
        <h2>Attendance Records</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Class</th>
              <th>Present Students</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in attendanceRecords" :key="record.id">
              <td>{{ record.date }}</td>
              <td>{{ record.class }}</td>
              <td>{{ record.present }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'LecturerDashboard',
    setup() {
      const attendanceRecords = ref([
        { id: 1, date: '2025-01-10', class: 'Math 101', present: 25 },
        { id: 2, date: '2025-01-09', class: 'Physics 201', present: 22 },
      ]);
  
      const generateQRCode = () => {
        console.log('Generate QR Code');
        alert('Generating QR Code...');
      };
  
      const viewAttendanceRecords = () => {
        console.log('Viewing Attendance Records');
      };
  
      return {
        attendanceRecords,
        generateQRCode,
        viewAttendanceRecords,
      };
    },
  });
  </script>
  
  <style scoped>
  .lecturer-dashboard {
    padding: 20px;
  }
  .actions button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  .records table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .records th, .records td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  </style>
  