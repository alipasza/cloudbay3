<!-- view/dashboard/index.php -->


<!-- 1sza niebieska szyba -->
<section class="wa-section wa-sectionHome wa-sectionHome-getStarted">

    <div class="wa-content">
        <h1>Simple Sidebar</h1>
        <p style="font-family: times, serif; font-size:14pt; font-style:italic">
            Sample text formatted with inline CSS.
        </p>
        <p><a href="<?php echo URL; ?>services/search/" class="wa-button wa-button-mini">Dowiedz się więcej</a></p>

        <p style="margin-top:0px;font-family: Arial, Helvetica, sans-serif;">
            Sample text formatted with inline CSS.
        </p>

        <span class="glyphicons glyphicons-beach-umbrella">Aaa</span>
        <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
        <a href="#menu-toggle" class="btn btn-default" id="menu-toggle">Toggle Menu</a>

    </div>

    <div class="wa-content wa-content-3up">
        <div class="wa-spacer">
            <h3>Rozpocznij</h3>
            <a href="<?php echo URL; ?>get-started/" class="wa-homeSprite wa-homeSprite-getStarted"> <img alt="" src="<?php echo URL; ?>public/images/cloud-friday-thumb1.jpg" style="margin: 21px 0 0 9px;"/> </a> 
            <p>Obejrzyj trzyminutowe wideo przedstawiające, jak szybko rozpocząć pracę z systemem cloudBay.</p>
            <p><a href="<?php echo URL; ?>get-started/" class="wa-arrowLink wa-arrowLink-light">Rozpocznij</a></p>
        </div>
        <div class="wa-spacer">
            <h3>Bezpłatne seminaria internetowe</h3>
            <a href="<?php echo URL; ?>overview/webinars/" class="wa-homeSprite wa-homeSprite-webinarTalks"> <img alt="" src="<?php echo URL; ?>public/images/cloud-friday-thumb2.jpg" style="margin: 21px 0 0 9px;"/> </a> 
            <p>Utwórz konto i oglądaj prezentacje online na żywo dotyczące najnowszych funkcji w systemie cloudBay.</p>
            <p><a href="<?php echo URL; ?>overview/webinars/" class="wa-arrowLink wa-arrowLink-light">Utw&#243;rz konto i weź udział</a></p>
        </div>
        <div class="wa-spacer">
            <h3>Piątek z Azure</h3>
            <a href="<?php echo URL; ?>documentation/videos/cloud-friday/" class="wa-homeSprite wa-homeSprite-cloudFridays"> <img alt="" src="<?php echo URL; ?>public/images/cloud-friday-thumb3.jpg" style="margin: 21px 0 0 9px;"/> </a> 
            <p>Obejrzyj serię cotygodniowych 10-minutowych wideo z udziałem Johna Waisenberga.</p>
            <p><a href="<?php echo URL; ?>documentation/videos/cloud-friday/" class="wa-arrowLink wa-arrowLink-light">Obejrzyj program z tego tygodnia</a></p>
        </div>
    </div>-->

    <svg class="wa-svg-cloud wa-svg-cloud-1 hide-shrink" x="0px" y="0px" viewBox="-4 0 40 32" xml:space="preserve">
    <filter id="drop-shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>
        <feOffset dx="0" dy="0"></feOffset>
        <feComponentTransfer xmlns="http://www.w3.org/2000/svg">
            <feFuncA type="linear" slope=".2"/>
        </feComponentTransfer>
        <feMerge>
            <feMergeNode></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
    </filter>
    <path filter="url(#drop-shadow)" d="M20.7,14.8c0.8-0.7,2-1.2,3.1-1.2c1.9,0,3.6,1.3,4.2,3c0.3-0.1,0.6-0.2,1-0.2c1.7,0,3,1.3,3,3 c0,1.7-1.3,3-3,3c0,0,0,0,0,0l0,0H2.1c-1.2,0-2.1-1-2.1-2.1c0-1.2,1-2.1,2.1-2.1c0,0,0,0,0.1,0C2.1,17.8,2,17.4,2,17 c0-2.4,2-4.4,4.4-4.4c1.1,0,2.2,0.4,3,1.2c0.7-2.5,2.9-4.3,5.6-4.3C18,9.5,20.5,11.8,20.7,14.8z"/>
    </svg>
</section>
