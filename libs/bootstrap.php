<?php

class bootstrap {

    function __construct() {

        $url = isset($_GET['url']) ? $_GET['url'] : null;
        $url = rtrim($url, '/');
        $url = explode('/', $url);

        Session::init();

        if (strpos($url[0], '.php') > 0) {
            $url[0] = substr($url[0], 0, strpos($url[0], '.php'));
        }

        if (empty($url[0])) {

            require 'controllers/index.php';
            $controller = new Index();
            $controller->index();
            return false;
        }

        $file = 'controllers/' . $url[0] . '.php';
        if (file_exists($file) && $url[0] != 'error') {
            require $file;
        } else {
            require 'controllers/error.php';
            $controller = new Error();
            $controller->index('');
            return false;
        }
        $controller = new $url[0];
        $controller->loadModel($url[0]);

        //calling methods 
        if (isset($url[2])) {
            if (method_exists($controller, $url[1])) {
                $controller->{$url[1]}($url[2]);
            } else {
                require 'controllers/error.php';
                $error = new Error();
                $error->index('There is no method:"' . $url[1] . '" in class:"' . $url[0] . '"');
                return false;
            }
        } else {
            if (isset($url[1])) {
                if (method_exists($controller, $url[1])) {
                    $controller->{$url[1]}();
                } else {
                    require 'controllers/error.php';
                    $error = new Error();
                    $error->index('There is no method:"' . $url[1] . '" in class:"' . $url[0] . '"');
                    return false;
                }
            } else {
                $controller->index();
            }
        }
    }

}

?>
