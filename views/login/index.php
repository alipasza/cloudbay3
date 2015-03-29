<!-- mvc3/views/login/index.php -->
<link rel="stylesheet" type="text/css" href="<?php echo URL; ?>public/css/CoreCss.css"/>

<section class="wa-section wa-sectionHero wa-sectionHero-clouds-2">
    <form id="login_id" method="POST" action="<?php echo URL; ?>login/index">
        <div class="wa-content">
            <h1>Zaloguj</h1>
            <h3>Wpisz niezbędne dane:</h3> 
            <div class="wa-content">
                <div id="login" class="wa-text">
                    <input type="text" placeholder="your email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required title="poprawny adres email" name="email" style="width: 250px">
                </div>
                <div id="passwd" class="wa-text wa-textSearch"> <!-- style="width: 20px">-->
                    <input type="text" placeholder="password" required name="passwd" style="width: 250px">
                </div>
                <div style="color:red;"><?php echo $msg; ?></div>
                <input type="submit" value="  Log in  " class="wa-button-primary" width="250px"/>
            </div>
        </div>
    </form>
    <svg class="wa-svg-cloud wa-svg-cloud-2" x="0px" y="0px" viewBox="-4 0 40 32" xml:space="preserve">
        <filter id="drop-shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>
            <feOffset dx="0" dy="0"></feOffset>
            <feComponentTransfer xmlns="http://www.w3.org/2000/svg">
                <feFuncA type="linear" slope=".2"></feFuncA>
            </feComponentTransfer>
            <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
        <path filter="url(#drop-shadow)" d="M20.7,14.8c0.8-0.7,2-1.2,3.1-1.2c1.9,0,3.6,1.3,4.2,3c0.3-0.1,0.6-0.2,1-0.2c1.7,0,3,1.3,3,3 c0,1.7-1.3,3-3,3c0,0,0,0,0,0l0,0H2.1c-1.2,0-2.1-1-2.1-2.1c0-1.2,1-2.1,2.1-2.1c0,0,0,0,0.1,0C2.1,17.8,2,17.4,2,17 c0-2.4,2-4.4,4.4-4.4c1.1,0,2.2,0.4,3,1.2c0.7-2.5,2.9-4.3,5.6-4.3C18,9.5,20.5,11.8,20.7,14.8z"></path>
    </svg>
    <svg class="wa-svg-cloud wa-svg-cloud-4" x="0px" y="0px" viewBox="-4 0 40 32" xml:space="preserve">
        <filter id="drop-shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1"></feGaussianBlur>
            <feOffset dx="0" dy="0"></feOffset>
            <feComponentTransfer xmlns="http://www.w3.org/2000/svg">
                <feFuncA type="linear" slope=".2"></feFuncA>
            </feComponentTransfer>
            <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
        <path filter="url(#drop-shadow)" d="M20.7,14.8c0.8-0.7,2-1.2,3.1-1.2c1.9,0,3.6,1.3,4.2,3c0.3-0.1,0.6-0.2,1-0.2c1.7,0,3,1.3,3,3 c0,1.7-1.3,3-3,3c0,0,0,0,0,0l0,0H2.1c-1.2,0-2.1-1-2.1-2.1c0-1.2,1-2.1,2.1-2.1c0,0,0,0,0.1,0C2.1,17.8,2,17.4,2,17 c0-2.4,2-4.4,4.4-4.4c1.1,0,2.2,0.4,3,1.2c0.7-2.5,2.9-4.3,5.6-4.3C18,9.5,20.5,11.8,20.7,14.8z"></path>
    </svg>
</section>


