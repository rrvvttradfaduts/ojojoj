(function ($) {
	"use strict";

/*=============================================
	=    		 Preloader			      =
=============================================*/
function preloader() {
	$('#preloader').delay(0).fadeOut();
};

$(window).on('load', function () {
	preloader();
	wowAnimation();
});

/*===========================================
	=    		Mobile Menu			      =
=============================================*/
//SubMenu Dropdown Toggle
if ($('.tgmenu__wrap li.menu-item-has-children ul').length) {
	$('.tgmenu__wrap .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="plus-line"></span></div>');
}

//Mobile Nav Hide Show
if ($('.tgmobile__menu').length) {

	var mobileMenuContent = $('.tgmenu__wrap .tgmenu__main-menu').html();
	$('.tgmobile__menu .tgmobile__menu-box .tgmobile__menu-outer').append(mobileMenuContent);

	//Dropdown Button
	$('.tgmobile__menu li.menu-item-has-children .dropdown-btn').on('click', function () {
		$(this).toggleClass('open');
		$(this).prev('ul').slideToggle(300);
	});
	//Menu Toggle Btn
	$('.mobile-nav-toggler').on('click', function () {
		$('body').addClass('mobile-menu-visible');
	});

	//Menu Toggle Btn
	$('.tgmobile__menu-backdrop, .tgmobile__menu .close-btn').on('click', function () {
		$('body').removeClass('mobile-menu-visible');
	});
};

/*----------- 22. One Page Nav ----------*/
function onePageNav(element) {
    if ($(element).length > 0) {
        $(element).each(function () {
        var link = $(this).find('a');
        $(this).find(link).each(function () {
            $(this).on('click', function () {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                scrollTop: target.offset().top - 10
                }, 1000);
            };

            });
        });
        })
    }
};
onePageNav('.onepage-nav');


/*===========================================
	=     Menu sticky & Scroll to top      =
=============================================*/
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$("#sticky-header").removeClass("sticky-menu");
		$('.scroll-to-target').removeClass('open');
        $("#header-fixed-height").removeClass("active-height");

	} else {
		$("#sticky-header").addClass("sticky-menu");
		$('.scroll-to-target').addClass('open');
        $("#header-fixed-height").addClass("active-height");
	}
});


/*=============================================
	=    		 Scroll Up  	         =
=============================================*/
if ($('.scroll-to-target').length) {
  $(".scroll-to-target").on('click', function () {
    var target = $(this).attr('data-target');
    // animate
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000);

  });
}


/*=============================================
	=    		 Wow Active  	         =
=============================================*/
function wowAnimation() {
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true
	});
	wow.init();
}


/*=============================================
	=           Counter Number       =
=============================================*/
$(".counter-number").counterUp({
	delay: 10,
	time: 1000,
});


/*=============================================
	=           Data Background             =
=============================================*/
$("[data-background]").each(function () {
	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})
$("[data-bg-color]").each(function () {
    $(this).css("background-color", $(this).attr("data-bg-color"));
});

/*=============================================
	=           Smooth Scroll             =
=============================================*/

/*=============================================
	=           GSAP Text Animation             =
=============================================*/
gsap.registerPlugin(ScrollTrigger);

function animateText(selector, config) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach((el) => {
        const split = new SplitText(el, { type: "chars, words" });
        gsap.from(split.chars, {
            duration: config.duration,
            delay: config.delay,
            x: config.x,
            autoAlpha: 0,
            stagger: config.stagger,
            ease: config.ease,
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
        });
    });
}

animateText(".text-anim", {
    duration: 1,
    delay: 0.5,
    x: 20,
    stagger: 0.05,
    ease: "power2.out",
});

animateText(".text-anim2", {
    duration: 1,
    delay: 0.1,
    x: 20,
    stagger: 0.03,
    ease: "power2.out",
});
document.querySelectorAll(".scroll-text-ani").forEach((line) => {
    gsap.to(line, {
    backgroundImage: "linear-gradient(to right, #7300ED 100%, #b7b7b7 100%)",
    ease: "none",
    scrollTrigger: {
        trigger: line,
        start: "top bottom",
        end: "center",
        scrub: true
    }
    });
});

gsap.utils.toArray(".gsap-text-right-to-left").forEach((el) => {
  gsap.fromTo(el,
    { x: "200px" },   // start position (offscreen right)
    {
      x: "-100px",   // end position (offscreen left)
      ease: "none",
      duration: 5,
      delay: 0.1,
      scrollTrigger: {
        trigger: el,
        start: "top bottom",   // animation starts when element enters
        end: "bottom top",     // ends when it leaves
        scrub: true            // links with scrollbar
      }
    }
  );
});

gsap.utils.toArray(".gsap-text-left-to-right").forEach((el) => {
  gsap.fromTo(el,
    { x: "-20px" },   // start offscreen left
    {
      x: "100px",     // move completely offscreen right
      ease: "none",
      duration: 5,
      delay: 0.1,
      scrollTrigger: {
        trigger: el,
        start: "top bottom",   // start when it enters viewport
        end: "bottom top",     // until it leaves
        scrub: true
      }
    }
  );
});

/*=============================================
	=           GSAP SVG             =
=============================================*/
(() => {
  const svg = document.querySelector('.chart-svg');
  if (!svg) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  let paths = Array.from(svg.querySelectorAll('path'));
  paths = paths.filter(p => {
    try {
      const b = p.getBBox();
      return b.width > 0 && b.height > 0;
    } catch (e) { return true; }
  });
  const MAX = 900;
  if (paths.length > MAX) {
    paths = paths.filter((_, i) => i % Math.ceil(paths.length / MAX) === 0);
  }
  paths.forEach(p => {
    p.style.transformBox = 'fill-box';
    p.style.transformOrigin = '50% 100%';
    gsap.set(p, { scaleY: 0.28, opacity: 0 });
  });
  const sorted = paths.slice().sort((a, b) => {
    const ax = a.getBBox ? a.getBBox().x + a.getBBox().width / 2 : 0;
    const bx = b.getBBox ? b.getBBox().x + b.getBBox().width / 2 : 0;
    return ax - bx;
  });
  const duration = 1.5;
  const staggerTime = 0.02;
  sorted.forEach((path, i) => {
    const delay = i * staggerTime;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
    tl.to(path, {
      opacity: 1,
      scaleY: 1.02,
      duration: duration,
      ease: "power2.out",
    })
    .to(path, {
      opacity: 0,
      scaleY: 0.28,
      duration: duration,
      delay: 3,
      ease: "power2.inOut",
    });
    tl.delay(delay);
  });
})();


})(jQuery);