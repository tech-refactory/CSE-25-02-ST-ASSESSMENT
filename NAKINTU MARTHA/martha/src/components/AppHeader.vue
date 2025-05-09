<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header">
    <div class="container header-container">
      <div class="logo">
        <router-link to="/">
          <h1>ProductHub</h1>
        </router-link>
      </div>
      
      <button class="menu-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav class="nav" :class="{ 'is-open': isMenuOpen }">
        <ul>
          <li><router-link to="/">Dashboard</router-link></li>
          <li><router-link to="/add-product">Add Product</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--primary);
}

.logo a {
  text-decoration: none;
  color: inherit;
}

.nav ul {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.nav a {
  text-decoration: none;
  color: var(--gray-700);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav a:hover {
  color: var(--primary);
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav a:hover::after,
.nav a.router-link-active::after {
  width: 100%;
}

.nav a.router-link-active {
  color: var(--primary);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.menu-toggle span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: var(--gray-700);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }
  
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .nav.is-open {
    max-height: 200px;
  }
  
  .nav ul {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
}

@media (prefers-color-scheme: dark) {
  .header {
    background-color: var(--gray-800);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .nav a {
    color: var(--gray-300);
  }
  
  .menu-toggle span {
    background-color: var(--gray-300);
  }
  
  @media (max-width: 768px) {
    .nav {
      background-color: var(--gray-800);
    }
  }
}
</style>