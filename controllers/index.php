<?php

class Index extends Controller {

    function __construct() {

        parent:: __construct();
    }

    public function index() {

        if (isset($_GET["lang"])) {
            Session::set("lang", $_GET["lang"]);
        } else {
            if ( empty(Session::get("lang"))) {
                Session::set("lang", "EN");
            }
        }

        //echo 'get=' . Session::get("lang");
        if (isdebug) {

            $this->view->render('index/index', 'page-index');
        } else {

            require 'libs/cache/top-cache.php';
            $this->view->render('index/index', 'page-index');
            require 'libs/cache/bottom-cache.php';
        }
    }
/*
    public function chooseLang() {

        header('location: ../index');
    }
*/
}

?>