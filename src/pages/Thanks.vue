<template>
  <div class="page">
    <header class="header"></header>
    <div class="tips">
      <img src="../assets/image/right.png" height="64" width="64"/>
      <h1>your answer has been successfully submitted!</h1>
      <h2>Thanks for your time!</h2>
      <h2>we will contact you as soon as possible.</h2>
    </div>
    <footer></footer>
  </div>
</template>

<script>
  export default {
    name: "Thanks"
  }
</script>

<style scoped>
  .page{
    text-align: center;
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
  }

  header{
    -moz-opacity:0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
    background-color:  #62bb47;
    width: 100%;
    height: 50px;
  }

  footer{
    opacity: 0.5;
    background-color: #62bb47;
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .tips{
    padding-top: 100px;
  }

</style>
