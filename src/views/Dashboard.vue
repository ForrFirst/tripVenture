<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>My Dashboard</h1>
      <button @click="showCreateForm = true" class="create-button">
        + Create New Trip
      </button>
    </div>

    <div v-if="showCreateForm || editingTrip" class="trip-form-container">
      <TripForm
        :trip="editingTrip"
        @save="handleSave"
        @cancel="handleCancel"
      />
    </div>

    <div v-if="userTrips.length === 0" class="empty-state">
      <p>You don't have any trips yet</p>
      <button @click="showCreateForm = true" class="create-button">
        Create Your First Trip
      </button>
    </div>

    <div v-else class="trips-grid">
      <div
        v-for="trip in userTrips"
        :key="trip.id"
        class="dashboard-trip-card"
      >
        <img
          :src="trip.images[0] || 'https://via.placeholder.com/300x200'"
          :alt="trip.name"
          class="trip-card-image"
        />
        <div class="trip-card-content">
          <h3>{{ trip.name }}</h3>
          <p class="trip-card-province">{{ trip.province }}</p>
          <p class="trip-card-description">{{ trip.shortDescription }}</p>
          <div class="trip-card-actions">
            <router-link :to="`/trip/${trip.id}`" class="view-button">
              View Details
            </router-link>
            <button @click="handleEdit(trip)" class="edit-button">
              Edit
            </button>
            <button @click="handleDelete(trip.id)" class="delete-button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTripsStore } from '../stores/trips';
import { useAuthStore } from '../stores/auth';
import type { Trip } from '../types';
import TripForm from '../components/TripForm.vue';

const tripsStore = useTripsStore();
const authStore = useAuthStore();

const showCreateForm = ref(false);
const editingTrip = ref<Trip | null>(null);

const userTrips = computed(() => {
  if (!authStore.currentUser) return [];
  return tripsStore.getUserTrips(authStore.currentUser.id);
});

const handleSave = () => {
  showCreateForm.value = false;
  editingTrip.value = null;
};

const handleCancel = () => {
  showCreateForm.value = false;
  editingTrip.value = null;
};

const handleEdit = (trip: Trip) => {
  editingTrip.value = trip;
  showCreateForm.value = true;
};

const handleDelete = (tripId: string) => {
  if (confirm('Are you sure you want to delete this trip?')) {
    try {
      tripsStore.deleteTrip(tripId);
    } catch (error: any) {
      alert(error.message || 'An error occurred while deleting the trip');
    }
  }
};
</script>
<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  color: #333;
}

.create-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
}

.create-button:hover {
  transform: translateY(-2px);
}

.trip-form-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.empty-state p {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.trips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.dashboard-trip-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.dashboard-trip-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.trip-card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.trip-card-content {
  padding: 1.5rem;
}

.trip-card-content h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.25rem;
}

.trip-card-province {
  color: #667eea;
  font-weight: 500;
  margin: 0 0 0.75rem 0;
}

.trip-card-description {
  color: #666;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.trip-card-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.view-button,
.edit-button,
.delete-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s;
}

.view-button {
  background: #667eea;
  color: white;
}

.edit-button {
  background: #f59e0b;
  color: white;
}

.delete-button {
  background: #ef4444;
  color: white;
}

.view-button:hover,
.edit-button:hover,
.delete-button:hover {
  transform: translateY(-2px);
}
</style>


