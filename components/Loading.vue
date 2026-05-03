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
.load20 > div:first-of-type {
  width: 0px;
  height: 0px;
  border-right: 25px solid transparent;
  border-top: 25px solid #000;
  border-left: 25px solid #000;
  border-bottom: 25px solid #000;
  border-radius: 25px;
  -webkit-animation: rotate_pacman_half_up 0.5s 0s infinite;
  animation: rotate_pacman_half_up 0.5s 0s infinite;
  position: relative;
  left: -30px;
}
.load20 > div:nth-child(2) {
  width: 0px;
  height: 0px;
  border-right: 25px solid transparent;
  border-top: 25px solid #000;
  border-left: 25px solid #000;
  border-bottom: 25px solid #000;
  border-radius: 25px;
  -webkit-animation: rotate_pacman_half_down 0.5s 0s infinite;
  animation: rotate_pacman_half_down 0.5s 0s infinite;
  margin-top: -50px;
  position: relative;
  left: -30px;
}
.load20 > div:nth-child(3),
.load20 > div:nth-child(4),
.load20 > div:nth-child(5),
.load20 > div:nth-child(6) {
  background-color: #000;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  width: 10px;
  height: 10px;
  position: absolute;
  -webkit-transform: translate(0, -6.25px);
  transform: translate(0, -6.25px);
  top: 25px;
  left: 70px;
}
@-webkit-keyframes cube-transition {
  25% {
    -webkit-transform: translateX(50px) scale(0.5) rotate(-90deg);
    transform: translateX(50px) scale(0.5) rotate(-90deg);
  }
  50% {
    -webkit-transform: translate(50px, 50px) rotate(-180deg);
    transform: translate(50px, 50px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateY(50px) scale(0.5) rotate(-270deg);
    transform: translateY(50px) scale(0.5) rotate(-270deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@keyframes cube-transition {
  25% {
    -webkit-transform: translateX(50px) scale(0.5) rotate(-90deg);
    transform: translateX(50px) scale(0.5) rotate(-90deg);
  }
  50% {
    -webkit-transform: translate(50px, 50px) rotate(-180deg);
    transform: translate(50px, 50px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateY(50px) scale(0.5) rotate(-270deg);
    transform: translateY(50px) scale(0.5) rotate(-270deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@-webkit-keyframes pacman-balls {
  75% {
    opacity: 0.7;
  }
  100% {
    -webkit-transform: translate(-100px, -6.25px);
    transform: translate(-100px, -6.25px);
  }
}
@keyframes pacman-balls {
  75% {
    opacity: 0.7;
  }
  100% {
    -webkit-transform: translate(-100px, -6.25px);
    transform: translate(-100px, -6.25px);
  }
}
@-webkit-keyframes rotate_pacman_half_down {
  0% {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
}
@keyframes rotate_pacman_half_down {
  0% {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
}
@-webkit-keyframes rotate_pacman_half_up {
  0% {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }
  50% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  100% {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }
}
@keyframes rotate_pacman_half_up {
  0% {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }
  50% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  100% {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg);
  }
}
</style>
