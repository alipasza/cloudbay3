<?php

class Controller {

    function __construct() {
        //echo '<br>uruchomiono konstruktor kontrolera bazowego Controller(libs\controller.php)';
        //echo '<br>Konstruktor kontrolera bazowego Controller(libs\controller.php) powołuje obiekt klasy View';
        $this->view = new View();
        Session::init();
    }

    public function loadModel($name) {

        $path = 'models/' . $name . '_model.php';
        if (file_exists($path)) {
            require $path;
            $moduleName = $name . '_Model';
            //echo '<br>kontroler bazowy Controller znalazł i ładuje obiekt modelu ' . $moduleName . ' (models\\' . $moduleName . '.php)';
            $this->model = new $moduleName();
        }
    }

}

?>