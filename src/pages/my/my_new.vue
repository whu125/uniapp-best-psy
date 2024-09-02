<template>
  <div class="profile-container">
    <div class="user-info">
      <div class="avatar">
        <!-- <img src="@/static/" alt="User avatar" /> -->
      </div>
      <h2 class="username">Anne</h2>
    </div>

    <div class="stats">
      <div class="stat-item">
        <span class="stat-value">2</span>
        <span class="stat-label">已解锁单元</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">10</span>
        <span class="stat-label">已获得金币</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">40</span>
        <span class="stat-label">待解锁金币</span>
      </div>
    </div>

    <div class="menu-items">
      <div class="menu-item">
        <span class="icon">🧭</span>
        <span class="label">新手指南</span>
        <span class="arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="icon">📞</span>
        <span class="label">心理危机热线</span>
        <span class="arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="icon">💌</span>
        <span class="label">咨询师信箱</span>
        <span class="arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="icon">📝</span>
        <span class="label">意见反馈</span>
        <span class="arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="icon">ℹ️</span>
        <span class="label">关于我们</span>
        <span class="arrow">›</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这里可以添加任何需要的逻辑
</script>

<style scoped>
.profile-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom right, #e6f7ff, #e6ffe6);
  border-radius: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  background-color: #d9d9d9;
  border-radius: 50%;
}

.avatar img {
  width: 50%;
  height: 50%;
}

.username {
  margin: 0;
  font-size: 18px;
}

.stats {
  display: flex;
  justify-content: space-around;
  padding: 15px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 10px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.menu-items {
  overflow: hidden;
  background-color: white;
  border-radius: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.icon {
  margin-right: 15px;
  font-size: 20px;
}

.label {
  flex-grow: 1;
}

.arrow {
  color: #ccc;
}
</style>
