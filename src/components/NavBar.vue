<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <span class="logo-icon">✈️</span>
        <span class="logo-text">TripVenture</span>
      </router-link>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        
        <template v-if="authStore.isAuthenticated">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          <span class="nav-user">{{ authStore.currentUser?.email }}</span>
          <button @click="handleLogout" class="nav-button">Logout</button>
        </template>
        
        <template v-else>
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/register" class="nav-button">Sign Up</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  color: var(--text-primary);
  padding: 1.25rem 0;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
}

.navbar:hover {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  border-bottom-color: rgba(96, 165, 250, 0.4);
}

.navbar:hover::before {
  opacity: 1;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 0.625rem 1rem;
  border-radius: 14px;
  margin: -0.625rem 0;
}

.nav-logo::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.nav-logo:hover {
  transform: translateY(-2px);
}

.nav-logo:hover::before {
  opacity: 1;
}

.logo-icon {
  font-size: 2.25rem;
  display: inline-block;
  animation: planeFloat 4s ease-in-out infinite;
  filter: drop-shadow(0 3px 6px rgba(37, 99, 235, 0.25));
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

@keyframes planeFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-5px) rotate(-8deg) scale(1.05);
  }
  50% {
    transform: translateY(-3px) rotate(0deg) scale(1);
  }
  75% {
    transform: translateY(-5px) rotate(8deg) scale(1.05);
  }
}

.nav-logo:hover .logo-icon {
  animation: planeFly 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  filter: drop-shadow(0 6px 12px rgba(37, 99, 235, 0.4));
}

@keyframes planeFly {
  0% {
    transform: translateX(0) translateY(0) rotate(0deg) scale(1);
  }
  30% {
    transform: translateX(6px) translateY(-4px) rotate(12deg) scale(1.1);
  }
  60% {
    transform: translateX(10px) translateY(-6px) rotate(18deg) scale(1.15);
  }
  100% {
    transform: translateX(8px) translateY(-5px) rotate(15deg) scale(1.12);
  }
}

.logo-text {
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.4px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 800;
}

.nav-logo:hover .logo-text {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transform: translateX(2px);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 0.75rem 1rem;
  border-radius: 12px;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);
}

.nav-link:hover {
  color: #2563eb;
  transform: translateY(-2px);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link:hover::after {
  width: calc(100% - 2rem);
}

.nav-user {
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-radius: 14px;
  border: 1.5px solid rgba(96, 165, 250, 0.4);
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nav-user::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.nav-user:hover {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-color: rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.nav-user:hover::before {
  opacity: 1;
}

.nav-button {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 40%, #2563eb 80%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.75rem;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3), 0 2px 10px rgba(37, 99, 235, 0.2);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.7s ease;
}

.nav-button::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.nav-button:hover::before {
  left: 100%;
}

.nav-button:hover::after {
  opacity: 1;
}

.nav-button:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 32px rgba(37, 99, 235, 0.4), 0 6px 16px rgba(37, 99, 235, 0.3);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-logo {
    font-size: 1.5rem;
  }
  
  .logo-text {
    display: none;
  }
}
</style>

