<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange'
}>()
</script>

<template>
  <div class="stat-card" :class="color">
    <div class="stat-content">
      <h3 class="stat-title">{{ title }}</h3>
      <p class="stat-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--primary);
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.stat-subtitle {
  font-size: 1rem;
  color: var(--gray-600);
  margin: 0;
}

.stat-card.blue::before {
  background-color: var(--primary);
}

.stat-card.green::before {
  background-color: var(--success);
}

.stat-card.red::before {
  background-color: var(--danger);
}

.stat-card.purple::before {
  background-color: #9C27B0;
}

.stat-card.orange::before {
  background-color: var(--accent);
}

@media (prefers-color-scheme: dark) {
  .stat-card {
    background-color: var(--gray-700);
  }
  
  .stat-subtitle {
    color: var(--gray-400);
  }
}
</style>