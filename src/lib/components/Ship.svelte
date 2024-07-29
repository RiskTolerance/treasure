<script>
  import clouds from '$lib/img/clouds.webp';
  import sky from '$lib/img/sky.webp';
  import mary from '$lib/img/mary.webp';
  import waterBottom from '$lib/img/water-bottom.webp';
  import waterTop from '$lib/img/water-top.webp';
  import ship from '$lib/img/ship.webp';
</script>

<div class="w-full h-2/3 max-h-[600px] relative overflow-clip">
  
  <img class="bob-clouds absolute top-0 left-0 z-10 w-full max-h-[150px] object-cover object-center" src={clouds} alt="">
  <img class="bob-sky absolute top-0 left-0 z-0 h-full w-full object-cover object-center" src={sky} alt="">
  <img class="absolute bottom-0 w-full object-fit max-h-[150px] left-0 z-0" src={waterTop} alt="">
  <img class="sway-mary absolute left-[calc(20%)] top-[calc(4vw)] h-1/4" src={mary} alt="">
  <img class="sway-boat absolute bottom-[calc(2%)] min-h-[300px] h-2/5 max-h-[500px] max-w-1/3 left-1/3 -translate-x-1/2 z-0" src={ship} alt="">
  <img class="absolute bottom-0 left-0 z-0 max-h-[50px] w-full object-fit" src={waterBottom} alt="">
</div>

<style>
  .sway-boat {
      animation: sway 8s infinite;
      transform-origin: 50% 50% 0;
  }
  .sway-mary {
      animation: sway 4s infinite;
      transform-origin: 50% 50% 0;
  }
  .bob-sky {
    animation: bob-down 12s linear infinite;
  }
  .bob-clouds {
    animation: bob-up 12s linear infinite;
  }
  @keyframes bob-down {
    0%, 100% { transform: translateY(0) }
    50% { transform: translateY(20px)}
  }
  @keyframes bob-up {
    0%, 100% { transform: translateY(0) }
    50% { transform: translateY(-10px)}
  }
  @keyframes sway {
      0%, 100%{ transform: rotate(-6deg);}
      50%{ transform: rotate(6deg); }
}
</style>