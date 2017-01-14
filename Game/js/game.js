$(function(){
    var clientW=$(window).width();
    var clientH=$(window).height();
    var starts=$(".start");

    var mask=$(".mask");
    var canvas=document.getElementsByTagName("canvas")[0];
    canvas.width=clientW;canvas.height=clientH;
    var runs=document.querySelectorAll(".run");
    var jumps=document.querySelectorAll(".jump");
    var bindImage=document.querySelectorAll(".binder");
    var eat=document.querySelector(".vdio_eat");
    var hit=document.querySelector(".vdio_hit");
    var jump3=document.querySelector(".vdio_jump");
    var run3=document.querySelector(".vdio_run");
    var zidan=document.querySelector(".vdio_zidan");
    var cobj=canvas.getContext("2d");
    var life=document.getElementsByTagName("strong")[0];
    var fenshu=document.getElementsByTagName("strong")[1];
    var gameObj=new game(canvas,cobj,jumps,runs,bindImage,jump3,run3,hit,eat,zidan,life,fenshu);
    $(".btn:eq(1)").one("click",function(){
        gameObj.play(starts,mask);
    })
    $(".btn:eq(0)").one("click",function(){
        setTimeout(function(){
            $(".over").css("animation","start1 2s ease forwards");
            mask.css("animation","mask1 2s ease forwards");
        },2000);

        location.reload();
    })
})
