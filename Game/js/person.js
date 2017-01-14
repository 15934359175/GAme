



function person(canvas,cobj,jumps,runs){
    this.canvas=canvas;
    this.cobj=cobj;
    this.jumps=jumps;
    this.runs=runs;
    this.width=270;
    this.height=227;
    this.cliW=canvas.width;
    this.cliH=canvas.height;
    this.status="runs";
    this.state=0;
    this.x=0;
    this.y=370;
    this.speedx=5;
    this.speedy=5;
    this.zhongli=0.4;
    this.back=0;
    this.backSpeed=5;
    }
person.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this[this.status][this.state],0,0,270,227,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
















//障碍物
function binder(canvas,cobj,bindImage){
    this.cobj=cobj;
    this.canvas=canvas;
    this.width=70;
    this.height=50;
    this.x=1200;
    this.y=475;
    this.bindImage=bindImage;
    this.speedb=15;
    this.state=0;

}
binder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.bindImage[this.state],0,0,564,400,0,0,this.width,this.height);
        this.cobj.restore();

    }
}















//流血
function lizi(cobj){
    this.cobj=cobj;
    this.x=0;
    this.y=0;
    this.r=1+3*Math.random();
    this.color="red";
    this.speedx=3+(Math.random()*6-3);
    this.speedy=3+(Math.random()*6-3);
    this.zhongli=0.3;
    this.speedr=0.3;
}

lizi.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.beginPath();
        cobj.fillStyle = this.color;
        cobj.arc(0,0,this.r,0,2*Math.PI);
        cobj.fill();
        cobj.restore();
    },
    update:function(){
        this.x+=this.speedx;
        this.speedy+=this.zhongli;
        this.y+=this.speedy;
        this.r-=this.speedr;
    }
}

function xue(cobj,x,y){
    var arr=[];

    for(var i=0;i<20;i++){
        var obj=new lizi(cobj);
        obj.x=x;
        obj.y=y;
        arr.push(obj);
    }
    var t2=setInterval(function(){
        for(var j=0;j<arr.length;j++){
            arr[j].draw();
            arr[j].update();
            if(arr[j].r<0){
                arr.splice(j,1);
            }
        }

        if(arr.length==0){
            clearInterval(t2);
        }
    },50)
}





function zidan(canvas,cobj){
    this.cobj=cobj;
    this.canvas=canvas;
    this.width=50;
    this.height=15;
    this.color="white";
    this.x=0;
    this.y=0;
    this.speedz=2;
    this.speeds=10;
}
zidan.prototype={
    draw:function(){
       var  cobj=this.cobj;
        cobj.save();
        cobj.beginPath();
        cobj.fillStyle=this.color;
        cobj.translate(this.x,this.y);
        cobj.fillRect(0,0,this.width,this.height);
        cobj.restore();
    }
}













//游戏开始
function game(canvas,cobj,jumps,runs,bindImage,jump3,run3,hit,eat,zidan,life,fenshu){
    this.person=new person(canvas,cobj,jumps,runs);
    this.canvas=canvas;
    this.bindImage=bindImage;
    this.cobj=cobj;
    this.jump3=jump3;
    this.run3=run3;
    this.lift=life;
    this.fenshu=fenshu;
    this.hit=hit;
    this.eat=eat;
    this.life=1;
    this.grade=0;
    this.back=0;
    this.fire=false;
    this.arr=[];
    this.backSpeed=5;
    this.binder=new binder(canvas,cobj,bindImage);
    this.zidan=zidan;
}
game.prototype={
    play:function(start,mask){
        this.key();
        this.run();
        this.move();
        start.css("animation","start1 2s ease forwards");
        mask.css("animation","mask1 2s ease forwards");
},
    run:function(){
        this.run3.play();
        var num=0;
        var that=this;
        var rand=parseInt(4+6*Math.random())*1000;
        var time=0;
       var t2=setInterval(function(){
            that.cobj.clearRect(0,0,that.person.cliW,that.person.cliH);
            num++;
            time+=50;
            if(that.person.status=="runs"){
                that.person.state=num%8;
            }else if(that.person.status=="jumps"){
                that.person.state=0;
            }
            that.canvas.style.backgroundPositionX=that.person.back+"px";
            that.person.x+=that.person.speedx;
            that.person.back-=that.person.backSpeed;
            if(that.person.x>500){
                that.person.x=500;
            }
            that.person.draw();
            if(time%rand==0){
                var obj=new binder(that.canvas,that.cobj,that.bindImage);
                rand=parseInt(2+6*Math.random())*1000;
                obj.state=Math.floor(7*Math.random());
                that.arr.push(obj);
            }
            if(that.fire){
                if(that.zd.x>1500){
                    that.fire=false;
                }
                that.zd.x+=that.zd.speedz;
                that.zd.speedz+=that.zd.speeds;
                that.zd.draw();
            }

            for(var i=0;i<that.arr.length;i++){
                that.arr[i].x-=that.arr[i].speedb;
                that.arr[i].draw();
                if(hitPix(that.canvas,that.cobj,that.person,that.arr[i])){
                   if(!that.arr[i].flag){
                       xue(that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                       that.hit.play();
                       that.life--;
                       that.lift.innerHTML=that.life;
                       that.arr[i].flag=true;
                   }
                    if(that.life<0){
                        $(".over").css("animation","over 2s ease forwards");
                        $(".mask").css("animation","mask 2s ease forwards");
                        clearInterval(t2);
                    }
                }
                if(that.person.x>that.arr[i].x+that.arr[i].width){
                    if(!that.arr[i].flag&&!that.arr[i].flag1){
                        that.grade++;
                        that.fenshu.innerHTML=that.grade;
                        that.arr[i].flag1=true;
                    }

                }

                if(hitPix(that.canvas,that.cobj,that.zd,that.arr[i])){
                    that.arr.splice(i,1);
                }
            }

        },100);
    },
    key:function(){
        var that=this;
        var flag=true;
        document.onkeydown=function(e){
            if(!flag){
               return;
            }
            flag=false;
            if(e.keyCode==32){
                that.run3.pause();
                that.jump3.play();
              var inita=0;
              var speeda=2;
              var r=150;
              var y=that.person.y;
              that.person.status="jumps";
              var t2=setInterval(function(){
                    inita+=speeda;
                  if(inita>180){
                      flag=true;
                      clearInterval(t2);
                      that.person.y=y;
                      that.person.status="runs";
                      that.run3.play();

                  }else{
                      var top=Math.sin(inita*Math.PI/180)*r;
                      that.person.y=y-top;
                  }
                },20)
            }
        }
    },
    move:function(){
        var that=this;
        document.querySelector(".mask").onclick=function(){
            that.zidan.play();
            that.fire=true;
            that.zd=new zidan(that.canvas,that.cobj);
            that.zd.x=that.person.x+that.person.width/2;
            that.zd.y=that.person.y+that.person.height/2;
        }
    }
}