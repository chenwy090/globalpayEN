<template>
<div class="home">
     <!-- <img class="bgvid1" :src="bgdiv"> -->
  <div class="container">
  <lang-select class="set-language"></lang-select>
  <div class="goble">{{$t('doc.goble')}}</div>
    <div class="top-box">
      <div class="top-box-left">
        <div class="title">{{$t('doc.wallet')}}</div>
        <div class="descDeatil">{{$t('doc.walletDetail')}}</div>
        <div class="download">
        <div> 
          <span class="ios">IOS Download</span> 
          <img :src="iosImg" alt="" class="iosImg">
        </div>
       
        <div> 
          <span class="andriod">Andriod Download</span>
          <img :src="andriodImg" alt="" class="andriodImg">
        </div>
        
      </div> 
      <!-- <div class="img-icon"> <img :src="icon" alt=“” class="icon"/></div> -->
      
      </div>
      <div class="top-box-right">
        <div class="img-phone"> <img alt="" :src="phone" class="phone-bg"/></div>
       
      <!-- <div class="img-orange"> <img alt="" :src="orange" class="orange-bg"/></div> -->
      </div>
      </div>
      <div class="mid-box">
        <div class="mid-box-left">
          <div class="mid-title mid-title1">{{$t('doc.midtitle')}}</div>
           <div class="middescDeatil">{{$t('doc.middescDetail1')}}</div>
            <div class="middescDeatil">{{$t('doc.middescDetail2')}}</div>
        </div>
         <div class="mid-box-right">
           <div class="eos-box">
          <img alt="" class="eos" :src="eos"/>
           </div>
          <div class=" ethereum-box">   
            <img alt="" class="ethereum" :src="ethereum"/>
            <br/>
             <img alt="" class="lisk" :src="lisk"/>           
          </div>
         <div class="bitcoin-box">
          <img alt="" class="bitcoin" :src="bitcoin"/>
          <br/>      
          <img alt="" class="qtum" :src="qtum"/>
          </div>
         </div>
      </div>
        <div class="mid-box">
        <div class="mid-box-left  baseInfo-wrapper">   
          <ul class="baseInfo-box">
            <li>{{$t('doc.baseInfo')}}</li>
            <li><div><span>Remarks</span><span>Allen 3</span></div></li>
            <li><div><span>Address</span><span>1GjY8...xmFS</span></div></li>
            <li><div><span>Currency</span><span>BTC</span></div></li>
            <li>Modification records</li>
            <li class="previos">Previous</li>
            <li><div><span>Allen 3</span><span>04/22 16</span></div></li>
            <li><div><span>Allen 2</span><span>04/18 16</span></div></li>
            <li><div><span>Allen 1</span><span>04/01 16</span></div></li>
            </ul>  
             <ul class="baseInfoDetail-box">
              <!-- <li class="search">Search</li> -->
            <li class="A">A</li>
            <li>
              <div><span>Andy</span><span>0x687…fc85</span></div>
              <div>BTC</div>
            </li>
             <li>
              <div><span>Allen</span><span>0x687…fc85</span></div>
              <div>BTC</div>
            </li>
             <li>
              <div><span>Amanda</span><span>0x687…fc85</span></div>
              <div>BTC</div>
            </li>
            <li class="A">D</li>
              <li>
              <div><span>David</span><span>0x687…fc85</span></div>
              <div>EOS</div>
            </li>
              <li>
              <div><span>Elizabeth</span><span>0x687…fc85</span></div>
              <div>EOS</div>
            </li>
              <li class="A">J</li>
              <li>
              <div><span>Joyce</span><span>0x687…fc85</span></div>
              <div>BTC</div>
            </li>
            <li>
              <div><span>Jacob</span><span>0x687…fc85</span></div>
              <div>BTC</div>
            </li>
            </ul>
             <ul class="baseInfo-layer">
              <li>
              <div><span>Bruce</span><span>0x687…fc85</span></div>
              <div>ETH</div>
               </li>
                 <li>
              <div><span>Bruce</span><span>0x687…fc85</span></div>
              <div>EOS</div></li>
            </ul>           
        </div>
         <div class="mid-box-right-better">
         <div class="mid-title multiple mid-title2">{{$t('doc.middescBetter')}}</div>
           <div class="middescDeatil multiple">{{$t('doc.middescBetterContent1')}}</div>
            <div class="middescDeatil">{{$t('doc.middescBetterContent2')}}</div>
         </div>
      </div>
        <div class="mid-box mid-box-more">
        <div class="mid-box-left">

          <div class="mid-title mid-title-more mid-title3">{{$t('doc.middescFree')}}</div>
           <div class="middescDeatil mid-title-moreDetail">{{$t('doc.middescFreeContent1')}}</div>
            <div class="middescDeatil">{{$t('doc.middescFreeContent2')}}</div>
        </div>
         <div class="mid-box-right-free">
          <ul class=" free free-orange ">
              <li>
              <div><span>Notice</span><span>ETH slugglish announcement </span></div>
              <div>2018-01-19</div>
             </li>
               <p class="more">More</p>
            </ul> 
            <ul class="free free-green">
              <li>
              <div><span>Notice</span><span>ETH slugglish announcement</span></div>
              <div>2018-01-19</div>
               </li>
                 <p class="more">More</p>
            </ul> 
             <ul class="free free-purple">
              <li>
              <div><span>Notice</span><span>ETH slugglish announcement</span></div>
              <div>ETH</div>
               </li>
                <p class="more">More</p>
            </ul>   
             <ul class="free freelist-box">
            <li>
              <div><span>Notice</span><span>ETH slugglish announcement</span></div>
              <div>2018-01-19</div>
            </li>              
             <li class="more1li"> <p class="more1">More</p></li> 
             <li>
              <div class="gray"><span >Notice</span><span>ETH slugglish announcement</span></div>
              <div>2018-01-19</div>
            </li>
               <li class="more1li"> <p class="more1">More</p></li>
             <li>
              <div><span>Notice</span><span>ETH slugglish announcement</span></div>
              <div>2018-01-19</div>
            </li>
               <li class="more1li"> <p class="more1">More</p></li>
              <li>
              <div><span>Notice</span><span>ETH slugglish announcement</span></div>
              <div>2018-01-19</div>
            </li>
                <li class="more1li"> <p class="more1">More</p></li>
              <li>
              <div><span>Notice</span><span>ETH slugglish announcement</span></div>
              <div>2018-01-19</div>
            </li>
                <li class="more1li"> <p class="more1">More</p></li>
            </ul>
         </div>
      </div>
     
</div> 
<footer class="foot">     
            <p><img :src="iconfoot" alt=“” class="iconfoot"/></p>
            <p>Copyright 2018 All rights reserved</p>
      </footer>
</div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
export default {
   components: { LangSelect },
  computed: {
    
  },
  data(){
   return {
     orange: require('../assets/img/1.png'),
     phone:require('../assets/img/phone.png'),
     icon:require('../assets/img/icon.png'),
      iconfoot:require('../assets/img/icon-1.png'),
     bgdiv:require('../assets/img/Background.png'),
     eos:require('../assets/img/EOS.png'),
     ethereum:require('../assets/img/Ethereum.png'),
      lisk:require('../assets/img/LISK.png'),
      bitcoin:require('../assets/img/BITCOIN.png'),
      qtum:require('../assets/img/QTUM.png'),
      andriodImg:require('../assets/img/site.png'),
      iosImg:require('../assets/img/site.png'),
   }
  },
  methods: {
    
}
}
</script>

<style scoped>
@import  'index.css';
@import '../assets/css/_reset.css';

</style>


