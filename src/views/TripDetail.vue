<template>
  <div class="trip-detail">
    <div v-if="trip" class="detail-container">
      <button @click="$router.back()" class="back-button">← Back to Home</button>
      
      <div class="detail-header">
        <h1 class="detail-title">{{ trip.name }}</h1>
        <div class="detail-meta">
          <span class="province-badge">{{ trip.province }}</span>
          <template v-if="trip.tags && trip.tags.length > 0">
            <span
              v-for="(tag, index) in trip.tags"
              :key="index"
              class="tag-badge"
            >
              {{ tag }}
            </span>
          </template>
        </div>
      </div>

      <div class="detail-images">
        <img
          v-for="(image, index) in trip.images"
          :key="index"
          :src="image"
          :alt="`${trip.name} ${index + 1}`"
          class="detail-image"
        />
      </div>

      <div class="detail-content">
        <div class="detail-description">
          <h2>Description</h2>
          <p>{{ trip.description }}</p>
        </div>

        <div v-if="trip.mapLocation" class="detail-map">
          <h2>Location</h2>
          <div class="map-container">
            <iframe
              :src="`https://www.google.com/maps?q=${trip.mapLocation.lat},${trip.mapLocation.lng}&hl=en&z=14&output=embed`"
              width="100%"
              height="400"
              style="border:0; border-radius: 8px;"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <p>Trip not found</p>
      <router-link to="/" class="home-link">Back to Home</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTripsStore } from '../stores/trips';

const route = useRoute();
const tripsStore = useTripsStore();

const trip = computed(() => {
  const id = route.params.id as string;
  return tripsStore.getTripById(id);
});

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<style scoped>
.trip-detail {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.back-button {
  background: linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%);
  color: white;
  border: none;
  padding: 0.875rem 1.75rem;
  border-radius: 14px;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.25), 0 2px 8px rgba(14, 165, 233, 0.15);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.back-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.back-button:hover::before {
  left: 100%;
}

.back-button:hover {
  background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.35), 0 4px 12px rgba(14, 165, 233, 0.2);
}

.detail-container {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
  animation: fadeIn 0.6s ease-out;
  border: 1px solid var(--border);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-header {
  margin-bottom: 2rem;
}

.detail-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
}

.province-badge {
  background: var(--bg-tertiary);
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border);
}

.province-badge::before {
  content: '📍';
  font-size: 1rem;
}

.tag-badge {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.375rem 0.875rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--border);
  transition: all 0.2s ease;
}

.tag-badge:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.detail-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.detail-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.detail-image:hover {
  transform: scale(1.02);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-description h2,
.detail-map h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.75rem;
}

.detail-description h2::after,
.detail-map h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: var(--primary);
  border-radius: 2px;
}

.detail-description p {
  color: #666;
  line-height: 1.9;
  font-size: 1.15rem;
  white-space: pre-line;
}

.map-container {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.not-found {
  text-align: center;
  padding: 3rem;
}

.home-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.home-link:hover {
  text-decoration: underline;
}
</style>

