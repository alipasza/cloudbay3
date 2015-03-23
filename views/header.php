<!DOCTYPE html> 
<html class="no-js pl-pl t-" lang="pl">
    <!--<![endif]--> 
    <head id="Head1">
        <!-- NUP --> 
        <meta charset="utf-8"/>
        <link href="<?php echo URL; ?>public/images/cloudbay-favicon.png" rel="icon" type="image/x-icon"/>
        <link rel="stylesheet" type="text/css" href="<?php echo URL; ?>public/fonts/segoe-ui/west-european/normal/latest.css"/>
        <link rel="stylesheet" type="text/css" href="<?php echo URL; ?>public/fonts/segoe-ui/west-european/light/latest.css"/>
        <link rel="stylesheet" type="text/css" href="<?php echo URL; ?>public/fonts/segoe-ui/west-european/semibold/latest.css"/>
        <link rel="stylesheet" type="text/css" href="<?php echo URL; ?>public/fonts/segoe-ui/west-european/bold/latest.css"/>
        <meta name="description" content="CRM cloudBay"/>
        <meta name="keywords" content="CRM cloudBay"/>
        <link rel="canonical" href="<?php echo URL; ?>pl-pl/"/>
        <link rel="stylesheet" type="text/css" href="<?php echo URL; ?>public/css/HomeCss_268844BE.css"/>
        <link rel="stylesheet" type="text/css" href="<?php echo URL; ?>public/css/NonEnglishCss_85EDD707.css"/>
        
        <script>(function (n, t, i, r, u) {
                "use strict";
                function f(t, i, r) {
                    t = t || "";
                    var e = new RegExp("([?&])" + i + "=.*?(&|$)", "i"), f = t.indexOf("#"), u = f >= 0 ? t.substr(0, f) : t, s = f >= 0 ? t.substr(f) : "", o;
                    return(u.split("/").length === 3 && (u += "/"), i = n.encodeURIComponent(i), r = n.encodeURIComponent(r), u) ? (o = u.indexOf("?") !== -1 ? "&" : "?", u = u.match(e) ? u.replace(e, "$1" + i + "=" + r + "$2") : u + o + i + "=" + r, u + s) : null
                }
                function e() {
                    if (t) {
                        var i = f(n.location.href, t, !0);
                        i = f(i, "rnd", "1");
                        n.location.href = i
                    }
                }
                function o(t) {
                    if (r) {
                        var i = r;
                        t && (i = f(i, "src", t.target.getAttribute("src")));
                        n.location.href = i
                    }
                }
                n.fx = n.fx || {};
                n.fx[i] = n.fx[i] || e;
                n.fx[u] = n.fx[u] || o
            })(this, "nocdn", "disableCdn", "", "navigateToErrorPage")
        </script>
        <script src="<?php echo URL; ?>public/js/HeaderScripts_B111C26F.js" onerror="fx.disableCdn.apply(this,arguments)">
        </script> 

        <script>(function (n) {
                        "use strict";
                        n.Acom = n.Acom || {};
                        n.Acom.currentCulture = "pl-pl"
                    })(window)
        </script> 
        <meta name="application-name" content="Windows Azure Home"/>
        <meta name="msapplication-task" content="name=Get The Free Trial;action-uri=http://www.windowsazure.com/en-us/pricing/free-trial/?jl=t;icon-uri=https://az83882.vo.msecnd.net/favicon.ico"/>
        <meta name="msapplication-task" content="name=View Pricing Calculator;action-uri=http://www.windowsazure.com/en-us/pricing/calculator/?jl=t;icon-uri=https://az83882.vo.msecnd.net/favicon.ico"/>
        <meta name="msapplication-task" content="name=Like Windows Azure;action-uri=https://www.facebook.com/windowsazure;icon-uri=https://az83882.vo.msecnd.net/css/images/jumplist-fb.ico"/>
        <meta name="msapplication-task" content="name=Tweet Windows Azure;action-uri=http://twitter.com/#!/windowsazure;icon-uri=https://az83882.vo.msecnd.net/css/images/jumplist-twitter.ico"/>
        
        <script type="text/javascript">(function (n) {
                        n.requestIP = "193.27.6.28"
                    })(window)
        </script> 
        
        <script type="text/javascript">(function (n) {
                        n.requestRegion = "acom-prod-europenorth-01"
                    })(window)
        </script> 
        <title>cloudBay</title>
    </head>
    <body id="top" class=" page-" ng-app="acom">
        <form method="post" action="/pl-pl/" id="RunwayMasterForm">
            <div class="wa-container" data-tag-area="content" data-tag-group="body">
                <header data-tag-area="header" data-tag-group="header">
                    <div class="wa-content">
                        <ul class="site-login">
                            <li class="phone"><a href="<?php echo URL; ?>overview/sales-number/"><span class="geophone-label">Sprzedaż</span> <span data-control="geophone"></span> <span class="wa-header-tooltip">Find a <span>local sales</span> number</span></a></li>
                            <li> <a href="<?php echo URL; ?>account/">Moje konto</a> </li>
                            <li> <a href="<?php echo URL; ?>portal/">Portal</a> </li>
                            <li class="search">
                                <div class="wa-text wa-text-light wa-textSearch" data-control="textbox"> <input type="text" id="MainSearchBox" placeholder="Wyszukaj" onkeypress="return checkForEnterKey(event, 'MainSearchBox');"> <button type="button" id="header-search-button" class="search-button" title='Wyszukaj' onclick="doSearch('MainSearchBox');
                                         return false;"></button> </div>
                            </li>
                        </ul>
                        <!--<a class="logo" href="/pl-pl/">System cloudBay</a> -->
                        <a class="wa-heading1"><span style:color="#00ABEC">cloudBay</span></a>

                        <a class="wa-button wa-button-freeTrial" id="A1" onclick="dcsSetVar('WT.z_iLinks', 'Free Trial Arrow', 'WT.z_iLinks_actionoffer', 'inav-Try', 'WT.z_iLinks_targetcampaign', 'src-gtnav');" href="<?php echo URL; ?>pricing/free-trial/"><span>Bezpłatna wersja pr&#243;bna</span></a> 
                        <div class="site-navigation">
                            <nav>
                                <ul class="dev-navigation dev-navigation-b">
                                    <li class="nav-expander"><a id="menu_pricing_link" href="<?php echo URL; ?>pricing/"><?php echo $this->ltext[Session::get("lang")]['header-services']; ?></a></li>
                                    <li class="nav-expander"><a id="menu_pricing_link" href="<?php echo URL; ?>pricing/"><?php echo $this->ltext[Session::get("lang")]['header-customers']; ?></a></li>
                                    <li class="nav-expander"><a id="menu_documentation_link" href="<?php echo URL; ?>documentation/"><?php echo $this->ltext[Session::get("lang")]['header-community']; ?></a>                                     
                                    <li class="nav-expander"><a id="menu_downloads_link" href="<?php echo URL; ?>downloads/">Download</a> 
                                    <li class="nav-expander"><a id="menu_blog_link" href="<?php echo URL; ?>blog/">Blog</a></li>
                                    <li class="nav-expander"><a id="menu_aa"        href="<?php echo URL; ?>training/"><?php echo $this->ltext[Session::get("lang")]['header-training']; ?></a></li>
                                    <li class="nav-expander"><a id="menu_bb" href="<?php echo URL; ?>support/">Spport</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>