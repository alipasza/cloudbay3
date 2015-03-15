<?php

class Error extends Controller {

    function __construct($arg = '') {

        parent:: __construct();
    }

    public function index($par1 = '') {

        if (strlen($par1) > 0) {
            $this->view->render('error/index', 'page-error', $par1);
        } else {
            $this->view->render('error/index', 'page-error', "This Page Doesn't Exist");
        }
    }

}
