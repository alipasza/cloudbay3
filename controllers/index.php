<!-- mvc3/controllers/index.php -->
<?php

class Index extends Controller {

    function __construct() {

        parent:: __construct();
    }

    public function index() {

        if (isset($_GET["lang"])) {
            Session::set("lang", $_GET["lang"]);
        } else {
            Session::set("lang", "EN");
        }

        if (isdebug) {

            $this->view->render('index/index', 'page-index');
        } else {
            require 'libs/cache/top-cache.php';
            $this->view->render('index/index', 'page-index');
            require 'libs/cache/bottom-cache.php';
        }
    }

    public function login() {

        $this->view->render('index/login', 'page-index-action-login');
    }

    public function aboutus() {

        $this->view->render('index/terms', 'page-index-action-terms');
    }

    public function details() {

        $this->view->render('index/index', 'page-details');
    }

}

?>