import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null);
  const users = ref<User[]>([]);

  // Load users from localStorage on init
  const loadUsers = () => {
    const stored = localStorage.getItem('tripventure_users');
    if (stored) {
      users.value = JSON.parse(stored);
    } else {
      // Create demo user
      const demoUser: User = {
        id: 'demo-user-001',
        email: 'demo@example.com',
        password: 'demo123', // For demo purposes only
      };
      users.value = [demoUser];
      localStorage.setItem('tripventure_users', JSON.stringify(users.value));
    }
  };

  // Load current user from localStorage on init
  const loadCurrentUser = () => {
    const stored = localStorage.getItem('tripventure_current_user');
    if (stored) {
      currentUser.value = JSON.parse(stored);
    }
  };

  // Initialize
  loadUsers();
  loadCurrentUser();

  const isAuthenticated = computed(() => currentUser.value !== null);

  const register = (email: string, password: string): { success: boolean; error?: string } => {
    // Check if user already exists
    if (users.value.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password, // In production, hash this!
    };

    users.value.push(newUser);
    localStorage.setItem('tripventure_users', JSON.stringify(users.value));

    // Auto login after registration
    currentUser.value = newUser;
    localStorage.setItem('tripventure_current_user', JSON.stringify(newUser));

    return { success: true };
  };

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const user = users.value.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    currentUser.value = user;
    localStorage.setItem('tripventure_current_user', JSON.stringify(user));
    return { success: true };
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem('tripventure_current_user');
  };

  return {
    currentUser,
    isAuthenticated,
    register,
    login,
    logout,
  };
});

