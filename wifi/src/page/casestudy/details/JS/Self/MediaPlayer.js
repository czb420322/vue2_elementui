var player = {};
window.onload = function(){
	"use strict";
	player.width = $("video").width();
	player.height = $("video").height();
	$(".Progress-Bar").css("width",$("video").width()-68+"");
	};

// window.onresize = function(){
// 	"use strict";
// 	player.width = $("video").width();
// 	player.height = $("video").height();
// 	$(".Progress-Bar").css("width",$("video").width()-68+"");
// 	};
/*播放方法*/
/*屏幕按钮点击*/
$(function(){
	"use strict";
	var video = $("video");
	var timeDrag = false; /* 初始默认的拖动状态为false */
	var voiceDrag = false; /* 初始默认的拖动状态为false */

	video.on("timeupdate",function() {
　　		var currentPos = video[0].currentTime; //获得当前播放时间
　　		var maxduration = video[0].duration; //获得影片播放时间
　		var percentage = (currentPos / maxduration) * 100;
　　		$('.timebar-start').css('width', percentage+'%');

		var curHour = Math.floor(currentPos/3600);
		var curMin = Math.floor((currentPos%3600)/60);
		var curMinDec = Math.floor(curMin/10);
		var curMinUni = Math.floor(curMin%10);
		var curSec = Math.floor((currentPos%3600)%60);
		var curSecDec = Math.floor(curSec/10);
		var curSecUni = Math.floor(curSec%10);

		var maxHour = Math.floor(maxduration/3600);
		var maxMin = Math.floor((maxduration%3600)/60);
		var maxMinDec = Math.floor(maxMin/10);
		var maxMinUni = Math.floor(maxMin%10);
		var maxSec = Math.floor((maxduration%3600)%60);
		var maxSecDec = Math.floor(maxSec/10);
		var maxSecUni = Math.floor(maxSec%10);
		$(".controls-time").html(curHour+":"+curMinDec+""+curMinUni+":"+curSecDec+""+curSecUni+"/"+maxHour+":"+maxMinDec+""+maxMinUni+":"+maxSecDec+""+maxSecUni);
　　		});

	/*时间轴*/
	$('.timebar').mousedown(function(e) {
		timeDrag = true;
	　　	updatebar(e.pageX);
	});

	$(document).mouseup(function(e) {
	　　	if(timeDrag) {
	　　		timeDrag = false; //停止拖动，设置timeDrag为false
	　　		updatebar(e.pageX);
	　　	}
	});

	$(document).mousemove(function(e) {
	　　	if(timeDrag) {
	　　		updatebar(e.pageX);
	　　	}
	});

	var updatebar = function(x) {
		var progress = $('.timebar');
		var maxduration = video[0].duration;
		var position = x - progress.offset().left;
		var percentage = 100 * position / parseFloat(progress.css("width"));
	　　	//检查拖动进度条的范围是否合法
	　　	if(percentage > 100) {
	　　		percentage = 100;
	　　	}
	　　	if(percentage < 0) {
	　　		percentage = 0;
	　　	}
	　　	$('.timebar-start').css('width', percentage+'%');
	　　	video[0].currentTime = maxduration * percentage / 100;
	};
	//停止
	$(".controls-stop").click(function(){
		var root = $(this).parent().parent().parent();
		if(root.find("video")[0].play){
			root.find(".Cover").fadeIn("normal");
			root.find("video")[0].currentTime = 0;
			root.find("video")[0].pause();
			root.find(".controls-btn").removeClass("controls-pause").addClass("controls-play");
		} else {
			return;
			}
		});

	//快退十秒
	$(".controls-back").click(function(){
		var root = $(this).parent().parent().parent();
		root.find("video")[0].currentTime -= 10;
		});

	//快进十秒
	$(".controls-front").click(function(){
		var root = $(this).parent().parent().parent();
		root.find("video")[0].currentTime += 10;
		//video[0].currentTime += 10;
		});

	//全屏
	$(".FullScreen").click(function () {
		if (video[0].requestFullscreen) {
			video[0].requestFullscreen();
		} else if (video[0].webkitRequestFullscreen) {
			video[0].webkitRequestFullscreen();
		} else if (video[0].mozRequestFullScreen) {
			video[0].mozRequestFullScreen();
		} else if (video[0].msRequestFullscreen) {
			video[0].msRequestFullscreen();
		}
		/*
		video[0].webkitEnterFullscreen();//webkit类型的浏览器
		video[0].mozRequestFullScreen();//支持火狐浏览器
		video[0].msRequestFullscreen();//支持IE8以上
		video[0].requestFullscreen();//欧朋浏览器
		*/
		return false;
		});

	//控制音量大小
	$('.controls-voice-progress').on('mousedown', function(e) {
		voiceDrag = true;
		var volume = $(this);
		var position = e.pageX - volume.offset().left;
		var percentage = 100 * position / volume.width();
		$('.voice').css('width', percentage+'%');
		video[0].volume = percentage / 100;
		});

	$(document).mouseup(function(e) {
	　　	if(voiceDrag) {
	　　		voiceDrag = false; //停止拖动，设置timeDrag为false
	　　		updateVoice(e.pageX);
	　　	}
	});

	$(document).mousemove(function(e) {
	　　	if(voiceDrag) {
	　　		updateVoice(e.pageX);
	　　	}
	});

	var updateVoice = function(x) {
		var progress = $('.voice');
		var position = x - progress.offset().left;
		var percentage = 100 * position / parseFloat($(".controls-voice-progress").css("width"));
	　　	//检查拖动进度条的范围是否合法
	　　	if(percentage > 100) {
	　　		percentage = 100;
	　　	}
	　　	if(percentage < 0) {
	　　		percentage = 0;
	　　	}
	　　	$('.voice').css('width', percentage+'%');
	　　	video[0].volume = percentage / 100;
	};

	//静音
	$(".controls-voice").click(function(){
		video[0].muted = !video[0].muted;
		if(video[0].muted){
				$(this).attr("class","controls-voice mute");
			} else {
				$(this).attr("class","controls-voice muted");
				}
		return false;
		});


	//双击全屏
	$("video").dblclick(function(){
		if (video[0].requestFullscreen) {
			video[0].requestFullscreen();
		} else if (video[0].webkitRequestFullscreen) {
			video[0].webkitRequestFullscreen();
		} else if (video[0].mozRequestFullScreen) {
			video[0].mozRequestFullScreen();
		} else if (video[0].msRequestFullscreen) {
			video[0].msRequestFullscreen();
		}

		/*兼容性退出全屏*/
		/*
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		*
		/*
		video[0].webkitEnterFullscreen();//webkit类型的浏览器
		video[0].mozRequestFullScreen();//支持火狐浏览器
		*/return false;
		});


	$(".Cover").click(function(event){
		var player =  $(this).prev("video")[0];
		var root = $(this).parent();

		playerPlay(root,player);
		event.stopPropagation();
		});

	/*控制条按钮点击*/
	$(".controls-btn").click(function(event){
		var playClass = $(this).attr("class").split(" ");
		var player = $(this).parent().parent().prev().prev("video")[0];
		var root = $(this).parent().parent().parent();

		if("controls-pause" === playClass[1]){
			$(this).removeClass("controls-pause").addClass("controls-play");
			playerPause(root,player);
			} else {
				playerPlay(root,player);
				}
		event.stopPropagation();
		});

	$(".speedUpBtn").click(function(){
		if("none" === $(this).children(".speedPanel").css("display")){
			$(this).children(".speedPanel").fadeIn("fast");
		} else {
			$(this).children(".speedPanel").fadeOut("fast");
			}
		});

	$(".speedPanel").click(function(event){
		event.stopPropagation();
		});
	$(".speedUpRate").click(function(){
		video[0].playbackRate = 1;
		var rate = $(this).attr("data-rate");
		$(this).parent().children(".speedUpRate").attr("class","speedUpRate");
		$(this).addClass("rate-check");
		video[0].playbackRate = rate;
		$(".SpeedUp").html("x"+rate);
		});

	function playerPlay(root,player){
		player.play();
		root.find(".Cover").fadeOut("normal");
		root.find(".controls-btn").removeClass("controls-play").addClass("controls-pause");
		}

	function playerPause(root,player){
		player.pause();
		root.find(".Cover").fadeIn("normal");
		root.find(".controls-btn").removeClass("controls-pause").addClass("controls-play");
		}
});
