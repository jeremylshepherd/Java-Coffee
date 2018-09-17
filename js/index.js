var $ = function $(tag) {return document.querySelector(tag);};

var vid = $('#video');
var play = $('#play');
var playIcon = $('#play i');
var stop = $('#stop');
var progress = document.getElementById('progress');
var bar = $('#bar');
var vol = $('#vol');
var mute = $('#mute');
var muteIcon = $('#mute i');
var full = $('#full');

vid.controls = false;

var playPause = function playPause(e, ve, pb) {
  if (ve.paused || ve.ended) {
    ve.play();
    pb.setAttribute('class', 'fa fa-pause');
  } else {
    ve.pause();
    pb.setAttribute('class', 'fa fa-play');
  }
};

var stopPlay = function stopPlay(e, ve, pb, prog) {
  pb.setAttribute('class', 'fa fa-play');
  ve.pause();
  ve.currentTime = 0;
  prog.value = 0;
};

var volChange = function volChange(e, vol, ve, mi) {
  ve.volume = vol.value;
  if (ve.volume === 0) mi.setAttribute('class', 'fa fa-volume-off');else
  mi.setAttribute('class', 'fa fa-volume-up');
};

var muteVolume = function muteVolume(e, ve, mi) {
  ve.muted = !ve.muted;
  var state = ve.muted ? 'off' : ve.volume <= 0 ? 'off' : 'up';
  mi.setAttribute('class', 'fa fa-volume-' + state);
};

var setMax = function setMax(e, ve, progress) {
  progress.setAttribute('max', ve.duration);
};

var updateBar = function updateBar(e, ve, progress, bar) {
  if (!progress.getAttribute('max')) progress.setAttribute('max', ve.duration);
  progress.value = ve.currentTime;
  bar.style.width = Math.floor(ve.currentTime / ve.duration * 100) + '%';
};

var detectEnd = function detectEnd(e, ve, pb) {
  pb.setAttribute('class', 'fa fa-play');
  ve.currentTime = 0;
};

var goToTime = function goToTime(e, progress, ve) {
  var posX = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
  ve.currentTime = posX * ve.duration;
};

var fullScreen = function fullScreen(e, ve) {
  if (ve.requestFullscreen) ve.requestFullscreen();else
  if (ve.mozRequestFullScreen) ve.mozRequestFullScreen();else
  if (ve.webkitRequestFullScreen) ve.webkitRequestFullScreen();else
  if (ve.msRequestFullscreen) ve.msRequestFullscreen();
};

play.addEventListener('click', function (e) {return playPause(e, vid, playIcon);});
stop.addEventListener('click', function (e) {return stopPlay(e, vid, playIcon, progress);});
vol.addEventListener('change', function (e) {return volChange(e, vol, vid, muteIcon);});
mute.addEventListener('click', function (e) {return muteVolume(e, vid, muteIcon);});
vid.addEventListener('loadedmetadata', function (e) {return setMax(e, vid, progress);});
vid.addEventListener('timeupdate', function (e) {return updateBar(e, vid, progress, bar);});
vid.addEventListener('ended', function (e) {return detectEnd(e, vid, playIcon);});
progress.addEventListener('click', function (e) {return goToTime(e, progress, vid);});
full.addEventListener('click', function (e) {return fullScreen(e, vid);});