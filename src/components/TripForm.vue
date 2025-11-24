<template>
  <div class="trip-form">
    <h2>{{ trip ? 'Edit Trip' : 'Create New Trip' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="name">Trip Name *</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="form-input"
          placeholder="Enter trip name"
        />
      </div>

      <div class="form-group">
        <label for="shortDescription">Short Description *</label>
        <textarea
          id="shortDescription"
          v-model="formData.shortDescription"
          required
          class="form-textarea"
          rows="3"
          placeholder="Enter short description"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="description">Description *</label>
        <textarea
          id="description"
          v-model="formData.description"
          required
          class="form-textarea"
          rows="5"
          placeholder="Enter full description"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="province">Province/Country *</label>
        <input
          id="province"
          v-model="formData.province"
          type="text"
          required
          class="form-input"
          placeholder="Enter province or country"
        />
      </div>

      <div class="form-group">
        <label for="images">Images (URLs separated by new lines) *</label>
        <textarea
          id="images"
          v-model="imagesText"
          required
          class="form-textarea"
          rows="4"
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
        ></textarea>
        <small class="form-hint">Enter image URLs, one per line</small>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="lat">ละติจูด (Latitude)</label>
          <input
            id="lat"
            v-model.number="formData.mapLocation.lat"
            type="number"
            step="any"
            class="form-input"
            placeholder="13.7563"
          />
        </div>

        <div class="form-group">
          <label for="lng">ลองจิจูด (Longitude)</label>
          <input
            id="lng"
            v-model.number="formData.mapLocation.lng"
            type="number"
            step="any"
            class="form-input"
            placeholder="100.5018"
          />
        </div>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="form-actions">
        <button type="button" @click="handleCancel" class="cancel-button">
          Cancel
        </button>
        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? 'Saving...' : (trip ? 'Update' : 'Create') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useTripsStore } from '../stores/trips';
import type { Trip } from '../types';

const props = defineProps<{
  trip?: Trip | null;
}>();

const emit = defineEmits<{
  save: [];
  cancel: [];
}>();

const tripsStore = useTripsStore();

const formData = ref({
  name: '',
  shortDescription: '',
  description: '',
  province: '',
  images: [] as string[],
  mapLocation: {
    lat: 0,
    lng: 0,
  },
});

const imagesText = ref('');
const error = ref('');
const loading = ref(false);

// Convert images array to text
const updateImagesText = () => {
  imagesText.value = formData.value.images.join('\n');
};

// Convert text to images array
watch(imagesText, (newVal) => {
  formData.value.images = newVal
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0);
});

// Load trip data if editing
onMounted(() => {
  if (props.trip) {
    formData.value = {
      name: props.trip.name,
      shortDescription: props.trip.shortDescription,
      description: props.trip.description,
      province: props.trip.province,
      images: [...props.trip.images],
      mapLocation: props.trip.mapLocation
        ? { ...props.trip.mapLocation }
        : { lat: 0, lng: 0 },
    };
    updateImagesText();
  }
});

const handleSubmit = async () => {
  error.value = '';
  loading.value = true;

  try {
    const tripData = {
      ...formData.value,
      mapLocation: formData.value.mapLocation.lat && formData.value.mapLocation.lng
        ? formData.value.mapLocation
        : undefined,
    };

    if (props.trip) {
      tripsStore.updateTrip(props.trip.id, tripData);
    } else {
      tripsStore.createTrip(tripData);
    }

    emit('save');
  } catch (err: any) {
    error.value = err.message || 'An error occurred';
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  emit('cancel');
};
</script>
<style scoped>
.trip-form {
  width: 100%;
}

.trip-form h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #666;
  font-weight: 500;
}

.form-input,
.form-textarea {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-textarea {
  resize: vertical;
}

.form-hint {
  color: #999;
  font-size: 0.85rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.cancel-button,
.submit-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
}

.cancel-button {
  background: #e0e0e0;
  color: #333;
}

.cancel-button:hover {
  background: #d0d0d0;
}

.submit-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>


