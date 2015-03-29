<?php

class Dashboard extends Controller {

    function __construct() {

        parent:: __construct();
    }

    public function index() {

        if (isdebug) {

            $this->view->render('dashboard/index', 'page-dashboard');
        } else {

            require 'libs/cache/top-cache.php';
            $this->view->render('dashboard/index', 'page-dashboard');
            require 'libs/cache/bottom-cache.php';
        }
    }

    public function index2() {

        if (isdebug) {

            $this->view->render('dashboard/index2', 'page-dashboard2');
        } else {

            require 'libs/cache/top-cache.php';
            $this->view->render('dashboard/index2', 'page-dashboard2');
            require 'libs/cache/bottom-cache.php';
        }
    }
    
        public function index3() {

        if (isdebug) {

            $this->view->render('dashboard/index3', 'page-dashboard2');
        } else {

            require 'libs/cache/top-cache.php';
            $this->view->render('dashboard/index3', 'page-dashboard2');
            require 'libs/cache/bottom-cache.php';
        }
    }
}

?>