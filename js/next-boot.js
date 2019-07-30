/* global NexT, CONFIG */

$(document).ready(function() {
  var backgroundImgUrls = [
    "/919/26726795467_835b323f5a",
    "/790/26726795377_60c6023b50",
    "/849/26726795237_9e8c57fd5f",
    "/783/26726795137_2ba902c7fb",
    "/839/26726794947_025bca6a4f",
    "/836/26726794827_6616e76cca",
    "/900/26726794497_7dab3c45b0",
    "/864/26726794397_8422c49a4c",
    "/803/26726794277_4c35382b4e",
    "/861/26726793987_b865f8c875",
    "/905/26726793597_a0a9b3acb8",
    "/938/26726793427_7bd6949c6f",
    "/864/26726793267_1a4fa661f4",
    "/841/26726792997_dcf6932b24",
    "/930/26726795687_5678abfb51",
    "/903/26726792897_7d0fab2985",
    "/847/26726792787_89f234b20c",
    "/841/26726792687_284439943c",
    "/936/26726792577_39764b7e9e",
    "/856/26726792397_0c39d4e6ed",
    "/923/26726792527_edec4c78a7",
    "/822/26726792347_246b660217"
  ];
  var randomIndex = Math.floor(Math.random() * (backgroundImgUrls.length + 1));
  if (randomIndex == backgroundImgUrls.length) {
    $("body").css({"background-color":"white"});
  } else {
    var background_image = "url(https://farm1.staticflickr.com" + backgroundImgUrls[randomIndex] + "_o.jpg" + ")";
    $("body").css({"background":background_image, "background-attachment":"fixed", "background-size":"cover"});
  }

  /**
   * Register JS handlers by condition option.
   * Need to add config option in Front-End at 'layout/_partials/head.swig' file.
   */
  CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();
  CONFIG.mediumzoom && window.mediumZoom('.post-body img');
  CONFIG.fastclick && NexT.utils.isMobile() && window.FastClick.attach(document.body);
  CONFIG.lazyload && window.lozad('.post-body img').observe();
  CONFIG.pangu && window.pangu.spacingPage();

  CONFIG.copycode.enable && NexT.utils.registerCopyCode();
  CONFIG.tabs && NexT.utils.registerTabsTag();
  NexT.utils.registerESCKeyEvent();
  CONFIG.back2top.enable && NexT.utils.registerBackToTop();
  NexT.utils.embeddedVideoTransformer();

  // Mobile top menu bar.
  $('.site-nav-toggle button').on('click', function() {
    var $siteNav = $('.site-nav');
    var ON_CLASS_NAME = 'site-nav-on';
    var isSiteNavOn = $siteNav.hasClass(ON_CLASS_NAME);
    var animateAction = isSiteNavOn ? 'slideUp' : 'slideDown';
    var animateCallback = isSiteNavOn ? 'removeClass' : 'addClass';

    $siteNav.stop()[animateAction]('fast', function() {
      $siteNav[animateCallback](ON_CLASS_NAME);
    });
  });

  /**
   * Init Sidebar & TOC inner dimensions on all pages and for all schemes.
   * Need for Sidebar/TOC inner scrolling if content taller then viewport.
   */
  function updateSidebarHeight(height) {
    height = height || 'auto';
    $('.site-overview, .post-toc').css('max-height', height);
  }

  function initSidebarDimension() {
    var updateSidebarHeightTimer;

    $(window).on('resize', function() {
      updateSidebarHeightTimer && clearTimeout(updateSidebarHeightTimer);

      updateSidebarHeightTimer = setTimeout(function() {
        var sidebarWrapperHeight = document.body.clientHeight - NexT.utils.getSidebarSchemePadding();

        updateSidebarHeight(sidebarWrapperHeight);
      }, 0);
    });

    // Initialize Sidebar & TOC Width.
    var scrollbarWidth = NexT.utils.getScrollbarWidth();
    if ($('.site-overview-wrap').height() > (document.body.clientHeight - NexT.utils.getSidebarSchemePadding())) {
      $('.site-overview').css('width', 'calc(100% + ' + scrollbarWidth + 'px)');
    }
    if ($('.post-toc-wrap').height() > (document.body.clientHeight - NexT.utils.getSidebarSchemePadding())) {
      $('.post-toc').css('width', 'calc(100% + ' + scrollbarWidth + 'px)');
    }

    // Initialize Sidebar & TOC Height.
    updateSidebarHeight(document.body.clientHeight - NexT.utils.getSidebarSchemePadding());
  }
  initSidebarDimension();

  function wrapTable() {
    $('table').not('.gist table').wrap('<div class="table-container"></div>');
  }
  wrapTable();

  // Define Motion Sequence & Bootstrap Motion.
  CONFIG.motion.enable && NexT.motion.integrator
    .add(NexT.motion.middleWares.logo)
    .add(NexT.motion.middleWares.menu)
    .add(NexT.motion.middleWares.postList)
    .add(NexT.motion.middleWares.sidebar)
    .bootstrap();
});
