<template>
  <div class="load-overlay">
    <div class="load20">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
.load-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.load20 {
  position: relative;
}
.load20 > div:nth-child(2) {
  -webkit-animation: pacman-balls 1s -0.99s infinite linear;
  animation: pacman-balls 1s -0.99s infinite linear;
}
.load20 > div:nth-child(3) {
  -webkit-animation: pacman-balls 1s -0.66s infinite linear;
  animation: pacman-balls 1s -0.66s infinite linear;
}
.load20 > div:nth-child(4) {
  -webkit-animation: pacman-balls 1s -0.33s infinite linear;
  animation: pacman-balls 1s -0.33s infinite linear;
}
.load20 > div:nth-child(5) {
  -webkit-animation: pacman-balls 1s 0s infinite linear;
  animation: pacman-balls 1s 0s infinite linear;
}
@-webkit-keyframes pacman-balls {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate(-100px, 0);
    transform: translate(-100px, 0);
    opacity: 0;
  }
}
@keyframes pacman-balls {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translate(-100px, 0);
    transform: translate(-100px, 0);
    opacity: 0;
  }
}
</style>
