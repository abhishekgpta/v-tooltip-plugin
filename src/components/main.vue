<template>
    <div>
        <button class="class1" v-my-tooltip="{text:'Sample text1'}">Test1</button>
        
        <div class="container">
          <div v-my-tooltip="{text:'Sample text3',position:'right'}" class="test_element3"></div>
          <div v-my-tooltip="{text:'Sample text4',position:'right'}" class="test_element4"></div>
        </div>
        <!-- <div class="container2">
          <div class="container2_element1" v-my-tooltip="{text:'Sample text5 kfdjlkdjs sdfjskgjdf sdklfsldfdfk werwe'}"></div>
          <div class="container2_element2" v-my-tooltip="{text:'Sample text6'}"></div>
        </div> -->
          <div v-my-tooltip="{text:'Sample text6',position:'left'}" class="test_element6"></div>
        <button v-my-tooltip="{text:'Sample text2'}">Test2</button>

    </div>
</template>
<script>
import Vue from 'vue';
import Tooltop from './index';
Vue.use(Tooltop,{ someOption: true });

new Vue({
  data: {
    msg: 'This is a button.'
  }
});
export default {
    name:"Main",
}
</script>
<style>
.container2{
  width: 350px;
  height: 300px;
  margin: auto;
     /* overflow: auto; */

  /* display: flex; */
  /* flex-direction: row; */
  border: 1px solid;
}
.test_element6{
  margin-left: auto;
   width: 50px;
   height: 50px;
   border: 1px solid;
   background-color:aliceblue;     
}
.container2_element1{
  /* margin: auto; */
     /* width: 50px; */
     width: 100%;
   height: 350px;
   border: 1px solid;
   background-color: blue;
}
.container2_element2{
  /* margin: auto; */
     /* width: 50px; */
   height: 350px;
     width: 100%;
   border: 1px solid;
   background-color: coral;
}
.container{
  display: flex;
}
  .test_element4{
   width: 50px;
   height: 50px;
   border: 1px solid;
   background-color:aliceblue;      
  }
  .test_element3{
   width: 50px;
   height: 50px;
   border: 1px solid;
   background-color: aqua; 
  }
  .class1{
      margin-right: 1px;
  }
  /**TODO:: Tooltip plugin css to be moved to seperate file */
  .tooltip-plugin{
    position: absolute;
    color: white;
    background-color: black;
    max-width: 200px;
    
  }
  .tooltip-plugin_content{
    border: 1px solid;
    border:5px;
    padding: 7px;
  }
  .tooltip-plugin_arrow_top {
  content: "";
  position: absolute;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}
.tooltip-plugin_arrow_bottom{
  content: " ";
  position: absolute;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
.tooltip-plugin_arrow_left{
  content: " ";
  position: absolute;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}
.tooltip-plugin_arrow_right{
  content: " ";
  position: absolute;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent black;
}
</style>