<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <button @click="scrollToTrips" class="hero-badge">
          <span class="badge-text">✈️ Start Your Journey</span>
        </button>
        <h1 class="hero-title">
          <span class="title-gradient">Discover Your</span>
          <span class="title-gradient title-accent">Adventure</span>
        </h1>
        <p class="hero-subtitle">
          with <span class="tripventure-brand">TripVenture</span>
        </p>
        <p class="hero-description">
          Explore amazing destinations from around the world.<br>
          Find the perfect trip for your next journey.
        </p>
        <div class="search-container">
          <div class="search-icon">🔍</div>
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Search trips, provinces, or destinations..."
            @input="handleSearch"
          />
        </div>
      </div>
      <div class="hero-decoration"></div>
    </div>

    <div id="trips-section" class="trips-container">
      <div v-if="filteredTrips.length === 0" class="no-results">
        <p>No results found</p>
      </div>

      <article
        v-for="(trip, index) in filteredTrips"
        :key="trip.id"
        class="trip-card"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <router-link :to="`/trip/${trip.id}`" class="trip-image-wrapper">
          <div class="trip-image-container">
            <img
              :src="trip.images[0] || 'https://via.placeholder.com/400x300'"
              :alt="trip.name"
              class="trip-main-image"
            />
            <div class="image-overlay-gradient"></div>
            <div class="trip-image-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{{ trip.province }}</span>
            </div>
            <div class="trip-image-count" v-if="trip.images.length > 1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="3" y1="9" x2="21" y2="9"></line>
              </svg>
              <span>{{ trip.images.length }}</span>
            </div>
          </div>
        </router-link>
        
        <div class="trip-content">
          <div class="trip-header">
            <h2 class="trip-title">
              <router-link :to="`/trip/${trip.id}`" class="trip-link">
                {{ trip.name }}
              </router-link>
            </h2>
          </div>
          
          <p class="trip-description">{{ trip.shortDescription }}</p>
          
          <div class="trip-tags">
            <template v-if="trip.tags && trip.tags.length > 0">
              <span
                v-for="(tag, tagIndex) in trip.tags.slice(0, 5)"
                :key="tagIndex"
                class="tag"
              >
                {{ tag }}
              </span>
            </template>
            <span v-else class="tag">{{ trip.province }}</span>
          </div>
          
          <div class="trip-footer">
            <div class="trip-gallery">
              <div
                v-for="(image, imgIndex) in trip.images.slice(0, 3)"
                :key="imgIndex"
                class="gallery-item"
                :style="{ backgroundImage: `url(${image})` }"
              ></div>
              <div v-if="trip.images.length > 3" class="gallery-item gallery-more">
                +{{ trip.images.length - 3 }}
              </div>
            </div>
            <router-link :to="`/trip/${trip.id}`" class="read-more-btn">
              <span>View Details</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </router-link>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTripsStore } from '../stores/trips';

const tripsStore = useTripsStore();
const searchQuery = ref('');

const filteredTrips = computed(() => {
  const trips = tripsStore.trips;
  if (!searchQuery.value.trim()) {
    return trips;
  }
  return tripsStore.searchTrips(searchQuery.value);
});

const handleSearch = () => {
  // Search is handled by computed property
};

const scrollToTrips = () => {
  const tripsSection = document.getElementById('trips-section');
  if (tripsSection) {
    const elementPosition = tripsSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 100;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
</script>

<style scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: #fafafa;
  padding: 2.5rem 2rem 2rem;
  margin-bottom: 2.5rem;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  width: 100vw;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 85% 75%, rgba(20, 184, 166, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(148, 163, 184, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.6) 100%);
  pointer-events: none;
}

.hero-decoration {
  position: absolute;
  top: -30%;
  right: -8%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, rgba(59, 130, 246, 0.03) 40%, transparent 70%);
  border-radius: 50%;
  animation: float 30s ease-in-out infinite;
  filter: blur(80px);
  opacity: 0.7;
}

.hero-decoration::before {
  content: '';
  position: absolute;
  bottom: -20%;
  left: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.05) 0%, rgba(20, 184, 166, 0.02) 40%, transparent 70%);
  border-radius: 50%;
  animation: float 35s ease-in-out infinite reverse;
  filter: blur(70px);
}

@keyframes float {
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  33% { 
    transform: translate(-40px, -40px) rotate(120deg) scale(1.1);
  }
  66% { 
    transform: translate(40px, -20px) rotate(240deg) scale(0.9);
  }
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(20, 184, 166, 0.08) 100%);
  border-radius: 50px;
  margin-bottom: 1rem;
  border: 1.5px solid rgba(59, 130, 246, 0.3);
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
}

.hero-badge:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(20, 184, 166, 0.12) 100%);
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.hero-badge:active {
  transform: translateY(0);
}

.badge-text {
  font-size: 1rem;
  font-weight: 600;
  color: #2563eb;
  letter-spacing: 0.3px;
}

.hero-title {
  margin-bottom: 0.5rem;
  line-height: 1.1;
  position: relative;
  animation: fadeInUp 0.8s ease-out 0.3s backwards;
}

.title-gradient {
  display: inline-block;
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  position: relative;
  line-height: 1.1;
  margin-right: 1.1rem;
}

.title-accent {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-right: 0;
}

.hero-subtitle {
  display: block;
  font-size: 1.4rem;
  font-weight: 500;
  color: #64748b;
  margin-bottom: 0.75rem;
  position: relative;
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.tripventure-brand {
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  position: relative;
  margin-left: 0.5rem;
}

.hero-description {
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  max-width: 550px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  font-weight: 400;
  animation: fadeInUp 0.8s ease-out 0.5s backwards;
}

.search-container {
  display: flex;
  align-items: center;
  background: white;
  padding: 1.125rem 1.75rem;
  border-radius: 16px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  max-width: 720px;
  margin: 0 auto;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1.5px solid rgba(226, 232, 240, 0.8);
  position: relative;
  z-index: 3;
  animation: fadeInUp 0.8s ease-out 0.6s backwards;
}

.search-container:focus-within {
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(37, 99, 235, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 1);
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-3px);
  background: #ffffff;
}

.search-icon {
  font-size: 1.25rem;
  margin-right: 1rem;
  opacity: 0.6;
  color: #64748b;
  transition: all 0.3s ease;
}

.search-container:focus-within .search-icon {
  opacity: 1;
  color: #2563eb;
  transform: scale(1.1);
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  outline: none;
  color: var(--text-primary);
}

.search-input::placeholder {
  color: var(--text-light);
}

/* Trips Container */
.trips-container {
  padding: 0 2rem 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 2.5rem;
}

@media (max-width: 768px) {
  .trips-container {
    grid-template-columns: 1fr;
    padding: 0 1rem 3rem;
    gap: 2rem;
  }
}

.trip-card {
  background: white;
  border-radius: 24px;
  padding: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out backwards;
  border: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
  height: 100%;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.trip-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.trip-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 30px 60px rgba(14, 165, 233, 0.18), 0 12px 30px rgba(0, 0, 0, 0.12);
  border-color: rgba(125, 211, 252, 0.5);
}

.trip-card:hover::before {
  transform: scaleX(1);
}

.trip-image-wrapper {
  text-decoration: none;
  display: block;
  position: relative;
  overflow: hidden;
}

.trip-image-container {
  width: 100%;
  height: 320px;
  position: relative;
  overflow: hidden;
}

.trip-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.trip-card:hover .trip-main-image {
  transform: scale(1.15);
}

.image-overlay-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
}

.trip-image-badge {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 0.625rem 1.25rem;
  border-radius: 16px;
  font-weight: 600;
  font-size: 0.875rem;
  color: #0ea5e9;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.trip-card:hover .trip-image-badge {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15);
}

.trip-image-badge svg {
  width: 16px;
  height: 16px;
  stroke-width: 2.5;
}

.trip-image-count {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  color: white;
  padding: 0.5rem 0.875rem;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.trip-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.25rem;
}

.trip-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.trip-title {
  margin: 0;
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.4;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.trip-link {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.trip-link:hover {
  color: var(--primary);
}


.trip-description {
  color: var(--text-secondary);
  line-height: 1.75;
  margin: 0;
  font-size: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.trip-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%);
  color: #0ea5e9;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(125, 211, 252, 0.4);
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1);
}

.tag:hover {
  background: linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.25);
}

.trip-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 1.25rem;
  gap: 1rem;
}

.trip-gallery {
  display: flex;
  gap: 0.625rem;
  align-items: center;
}

.gallery-item {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.gallery-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(125, 211, 252, 0.2) 0%, rgba(56, 189, 248, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.15) translateY(-2px);
  z-index: 1;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.gallery-item:hover::before {
  opacity: 1;
}

.gallery-more {
  background: linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.75rem;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.2);
}

.gallery-more::before {
  display: none;
}

.read-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  background: linear-gradient(135deg, #7dd3fc 0%, #38bdf8 50%, #0ea5e9 100%);
  color: white;
  padding: 0.875rem 1.75rem;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.25), 0 2px 8px rgba(14, 165, 233, 0.15);
  border: none;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.read-more-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.read-more-btn:hover::before {
  left: 100%;
}

.read-more-btn:hover {
  background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.35), 0 4px 12px rgba(14, 165, 233, 0.2);
}

.read-more-btn svg {
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.read-more-btn:hover svg {
  transform: translateX(4px);
}

.read-more-btn svg {
  transition: transform 0.3s ease;
}

.read-more-btn:hover svg {
  transform: translateX(4px);
}

.no-results {
  text-align: center;
  padding: 5rem 2rem;
  color: #999;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 1.5rem;
  }
  
  .title-gradient {
    font-size: 2.25rem;
  }
  
  .title-subtitle {
    font-size: 1.25rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .search-container {
    padding: 0.875rem 1.25rem;
  }
  
  .trip-image-container {
    height: 260px;
  }
  
  .trip-content {
    padding: 1.5rem;
  }
  
  .trip-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .read-more-btn {
    width: 100%;
    justify-content: center;
  }
  
  .trip-gallery {
    justify-content: center;
  }
}
</style>

