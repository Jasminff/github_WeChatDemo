//index.js
//获取应用实例
let timer;
let numAi = 0;
Page({
  data: {
    btnState:false,
    winNum: 0 ,
    imageAiScr:'',
    imageUserScr:'/pages/image/wenhao.png',
    gameResult:'',
    srcs:[
      '/pages/image/jiandao.png',
      '/pages/image/shitou.png',
      '/pages/image/bu.png'
    ]
  },
  onLoad: function (options) {
    // let oldWinNum = wx.getStorage('winNum');
    // if (oldWinNum != null && oldWinNum != ''){
    //   this.setData({ winNum: oldWinNum})
    // }
    this.timerGo();
  },
  changeForChoose(e){
    if (this.data.btnState) {
      return;
    }
     console.log(e);
     this.setData({ imageUserScr:this.data.srcs[e.currentTarget.id]});
     clearInterval(timer);
     let user = this.data.imageUserScr;
     let ai = this.data.imageAiScr;
     let num = this.data.winNum;
     let str = '你输了';
     if (user == '/pages/image/shitou.png' && ai == '/pages/image/jiandao.png'){
       num ++ ;
       str = '你赢了';   
       wx.setStorageSync('winNum',num )
     }

     if (user == '/pages/image/bu.png' && ai == '/pages/image/shitou.png') {
       num++;
       str = '你赢了';
       wx.setStorageSync( 'winNum',num )
     }

     if (user == '/pages/image/jiandao.png' && ai == '/pages/image/bu.png') {
       num++;
       str = '你赢了';
       wx.setStorageSync( 'winNum',num )
     }
     if (user == ai){
       str = '平局';
     }
    this.setData({
      winNum:num,
      gameResult:str,
      btnState:true
    })
  },
  timerGo(){
    timer = setInterval(this.move,150)
  },
  move(){
  //  if(numAi >= 3){
  //     numAi = 0;
  //   }
    numAi = parseInt(Math.floor(Math.random()*3));
    this.setData({ imageAiScr: this.data.srcs[numAi] })
    // numAi++;
    },
    again(){
      if(this.data.btnState == false){
        return;
      }
      this.timerGo();
      this.setData({
        btnState: false,
        gameResult: '',
        imageUserScr: '/pages/image/wenhao.png'
      })
    }
  })
