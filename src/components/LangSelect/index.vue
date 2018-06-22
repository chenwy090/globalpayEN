<template>
  <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
    <div>
      <div class="lang-sel" >{{selLang}}</div>
      <!-- <svg-icon class-name='international-icon' icon-class="language" /> -->
    </div>
    <el-dropdown-menu slot="dropdown" class="drop">
      <el-dropdown-item command="zh" :disabled="language==='zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data(){
    return {
       selLang:"EN",
    }

  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang);
      if(lang==="zh"){
      this.selLang="中";
      }else{
        this.selLang="EN";
      }
      // this.$message({
      //   message: 'switch language success',
      //   type: 'success'
      // })
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
}
.lang-sel{
 position: absolute;
 right:1rem;
 top: 1rem;
 z-index: 2;
 font-family: ArialMT;
font-size: 0.4rem;
color: #FFFFFF;
letter-spacing: 0;
text-align: left;
line-height: 20px;
outline: none;
}
.lang-sel::after{
  position: absolute;
    right: -0.4rem;
    content: '';
    height: 0.2rem;
    width: 0.2rem;
    border: solid #fff;
    border-width: 0px  1px 1px 0px;
    top: 0.2rem;
    transform: translateY(-50%) rotateZ(45deg);
}
.lang-sel::before{
  position: absolute;
    content: '';  
    background: url('../../assets/img/global.png');
    height: 0.3rem;
    width: 0.3rem;
    background-size: cover;
    right: 0.7rem;
    top: 0.1rem;
 
}
ul li{
  list-style: none;
  outline: none;
}
.drop{
font-family: ArialMT;
font-size: 12px;
color: #666;
letter-spacing: 0;
text-align: center;
line-height: 20px;
position: absolute;
background: #fff;
padding: 0.3rem 0.5rem;
left: auto!important;
top: 1.5rem!important;
right:.5rem!important;
width: 2rem;

}
.international div{
  outline: none!important;
}
  @media  screen and (max-width: 500px){

    .lang-sel::before {
        height: 0.6rem;
        width: 0.7rem;
        background-size: cover;
        right: 1rem;
        top: 0.1rem;
    }
    .lang-sel:after{
        height: 0.3rem;
    width: 0.3rem;
    border: solid #fff;
    border-width: 0px 1px 1px 0px;
    top: 0.4rem;
    right: -0.5rem
    }
    }
</style>


