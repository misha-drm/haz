// Анимация при наведении
const clip = document.querySelectorAll(".clip");
const box = document.querySelectorAll(".works-item");
for (let i = 0; i < clip.length; i++) {
   // clip[i].addEventListener("mouseenter", function (e) {
   box[i].addEventListener("mouseenter", function (e) {
      clip[i].play();
   });
   // clip[i].addEventListener("mouseout", function (e) {
   //    clip[i].pause();
   // });
};






const body = document.querySelector('body');
const btns = document.querySelectorAll('.btn');
const modalClose = document.querySelectorAll('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');


// console.log(modalClose);

btns.forEach((el) => {
   el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');

      modals.forEach((el) => {
         el.classList.remove('modal--visible');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
      modalOverlay.classList.add('modal-overlay--visible');
      body.classList.add('noscroll');
      // $('body').css('top', -(document.documentElement.scrollTop) + 'px')
      //    .addClass('noscroll');
   });
});

modalOverlay.addEventListener('click', (e) => {
   // console.log(e.target);

   if (e.target == modalOverlay || e.target == modalClose) {
      modalOverlay.classList.remove('modal-overlay--visible');
      body.classList.remove('noscroll');

      modals.forEach((el) => {
         el.classList.remove('modal--visible');

      });


   }
});



modalClose.forEach((cl) => {
   // console.log(cl);
   cl.addEventListener('click', (e) => {

      modalOverlay.classList.remove('modal-overlay--visible');
      body.classList.remove('noscroll');

      modals.forEach((cl) => {
         cl.classList.remove('modal--visible');
      });
   });
});





// var swiper = new Swiper(".swiper-container", {
//    // spaceBetween: 30,
//    // effect: "fade",
//    hashNavigation: {
//       watchState: true
//    },
//    pagination: false,
//    pagination: {
//       el: ".swiper-pagination",
//       clickable: true
//    },
//    navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev"
//    }
// });





// Autoplay YouTub
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var yt = [];
function onYouTubeIframeAPIReady() {

   let w = '100%';
   let h = '100%';

   yt['player1'] = new YT.Player('player1', {
      width: w,
      height: h,
      videoId: '4d118fHF8QE',
      events: {
         'onReady': onPlayerReady,
      },
   });
   yt['player2'] = new YT.Player('player2', {
      width: w,
      height: h,
      videoId: 'HzUDAaYMNsA',
   });
   // yt['player3'] = new YT.Player('player3', {
   //    width: w,
   //    height: h,
   //    videoId: '5LI1PysAlkU',
   // });

   yt['player4'] = new YT.Player('player4', {
      width: w,
      height: h,
      videoId: '5LI1PysAlkU',
   });
}

function onPlayerReady(event) {
   event.target.mute();
   event.target.playVideo();
}




const swiper = new Swiper('.swiper-container', {
   // pagination: {
   //    el: '.swiper-pagination',
   // },
   allowTouchMove: false,
   keyboard: {
      enabled: true,
      // onlyInViewport: false,
   },
   navigation: {
      nextEl: '.case-button-next',
      prevEl: '.case-button-prev',
   },
});

swiper.on('transitionStart', function () {
   yt['player1'].pauseVideo();
   yt['player2'].pauseVideo();
   // yt['player3'].pauseVideo();
   yt['player4'].pauseVideo();
});




modalClose.forEach((cl) => {
   cl.addEventListener('click', (e) => {
      yt['player1'].pauseVideo();
      yt['player2'].pauseVideo();
      // yt['player3'].pauseVideo();
      yt['player4'].pauseVideo();
   });
});

modalOverlay.addEventListener('click', (e) => {
   if (e.target == modalOverlay || e.target == modalClose) {
      yt['player1'].pauseVideo();
      yt['player2'].pauseVideo();
      // yt['player3'].pauseVideo();
      yt['player4'].pauseVideo();

   }
});

swiper.on('transitionEnd', function () {

   var index = this.realIndex;
   var slide = document.getElementsByClassName('swiper-slide')[index];
   var slideVideo = slide.getElementsByTagName('iframe')[0];
   var slideVideoId = slideVideo.getAttribute('id');


   if (slideVideo != null || slideVideo != undefined) {
      yt[slideVideoId].mute();
      yt[slideVideoId].playVideo();


   }
});
// Autoplay YouTub




















// Сркытие текста в модалке
// if (document.documentElement.clientWidth > 1440) {
// js-toggleText [read more]

/**
 *  Read More JS
 *  truncates text via specfied character length with more/less actions.
 *  Maintains original format of pre truncated text.
 *  @author stephen scaff
 *  @todo   Add destroy method for ajaxed content support.
 *
 */
var ReadMore = function () {
   var s;

   return {

      settings: function () {
         return {
            content: document.querySelectorAll('.js-read-more'),
            originalContentArr: [],
            truncatedContentArr: [],
            moreLink: "Подробнее",
            lessLink: "Свернуть",
         }
      },

      init: function () {
         s = this.settings();
         this.bindEvents();
      },

      bindEvents: function () {
         ReadMore.truncateText();
      },

      /**
       * Count Words
       * Helper to handle word count.
       * @var {string} str - Target content string.
       */
      countWords: function (str) {
         return str.split(/\s+/).length;
      },

      /**
       * Ellpise Content
       * @var {string} str - content string.
       * @var {number} wordsNum - Number of words to show before truncation.
       */
      ellipseContent: function (str, wordsNum) {
         return str.split(/\s+/).slice(0, wordsNum).join(' ') + '...';
      },

      /**
       * Truncate Text
       * Truncate and ellipses contented content
       * based on specified word count.
       * Calls createLink() and handleClick() methods.
       *
       */
      truncateText: function () {

         for (var i = 0; i < s.content.length; i++) {
            //console.log(s.content)
            var originalContent = s.content[i].innerHTML;
            var numberOfWords = s.content[i].dataset.rmWords;
            var truncateContent = ReadMore.ellipseContent(originalContent, numberOfWords);
            var originalContentWords = ReadMore.countWords(originalContent);

            s.originalContentArr.push(originalContent);
            s.truncatedContentArr.push(truncateContent);

            if (numberOfWords < originalContentWords) {
               s.content[i].innerHTML = s.truncatedContentArr[i];
               var self = i;
               ReadMore.createLink(self)
            }
         }
         ReadMore.handleClick(s.content);
      },

      /**
       * Create Link
       * Creates and Inserts Read More Link
       * @var {number} index - index reference of looped item
       */
      createLink: function (index) {
         var linkWrap = document.createElement('span');

         linkWrap.className = 'read-more__link-wrap';

         linkWrap.innerHTML = '<a id="read-more_' +
            index +
            '" class="read-more__link" style="cursor:pointer;">' +
            s.moreLink +
            '</a>';

         // Inset created link
         s.content[index].parentNode.insertBefore(linkWrap, s.content[index].nextSibling);

      },

      /**
       * Handle Click
       * Toggle Click eve
       */
      handleClick: function (el) {
         var readMoreLink = document.querySelectorAll('.read-more__link');

         for (var j = 0, l = readMoreLink.length; j < l; j++) {

            readMoreLink[j].addEventListener('click', function () {

               var moreLinkID = this.getAttribute('id');
               var index = moreLinkID.split('_')[1];

               el[index].classList.toggle('is-expanded');

               if (this.dataset.clicked !== 'true') {
                  el[index].innerHTML = s.originalContentArr[index];
                  this.innerHTML = s.lessLink;
                  this.dataset.clicked = true;
               } else {
                  el[index].innerHTML = s.truncatedContentArr[index];
                  this.innerHTML = s.moreLink;
                  this.dataset.clicked = false;
               }
            });
         }
      },

      /**
       * Open All
       * Method to expand all instances on the page.
       */
      openAll: function () {
         el = document.querySelectorAll('.read-more__link');
         for (var i = 0; i < el.length; i++) {
            content[i].innerHTML = s.truncatedContentArr[i];
            el[i].innerHTML = s.moreLink;
         }
      }
   }
}();

if (document.querySelector('.js-read-more')) {
   ReadMore.init();
}
// }
// Сркытие текста в модалке














// Привязка номера кнопки к номеру слайда
document.querySelector('.slide-1').addEventListener('click', function (e) {
   e.preventDefault();
   swiper.slideTo(0, 0);
});


document.querySelector('.slide-2').addEventListener('click', function (e) {
   e.preventDefault();
   swiper.slideTo(1, 0);
});


document.querySelector('.slide-3').addEventListener('click', function (e) {
   e.preventDefault();
   swiper.slideTo(2, 0);
});


document.querySelector('.slide-4').addEventListener('click', function (e) {
   e.preventDefault();
   swiper.slideTo(3, 0);
});


document.querySelector('.slide-5').addEventListener('click', function (e) {
   e.preventDefault();
   swiper.slideTo(4, 0);
});
   // Привязка номера кнопки к номеру слайда

