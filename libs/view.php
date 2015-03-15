<?php

class View {

    var $ltext;

    function __construct() {
        //require 'config/lang/multilingual.php';
        //$curl = 1;

        //$ltext[1]['services'] = "Welcome to my site. blah blah blah";
        //$ltext[1]['customers'] = "Please enter your username and password to login";
        //echo 'x' . $ltext[1]['services'];
    }

    public function Pokaz() {
        //echo 'Pokaz sie';
    }

    //$name - nazwa strony do wyrenderowania
    //$bodyName - lancuch ktory trafi do html ->body-> 
    //$msg - komunikat przekazywany do strpny html
    public function render($name, $bodyNamePar = 'body', $msgPar = '') {

        require 'config/lang/multilingual.php';

        $bodyName = $bodyNamePar;
        $msg = $msgPar;

        if (strpos($name, '.php') > 0) {
            $name = substr($name, 0, strpos($name, '.php'));
        }

        require 'views/header.php';
        require 'views/' . $name . '.php';
        require 'views/footer.php';
    }

    public function validateText($str, &$retValue, $minLenStr = 0, $maxLenStr = 128) {

        //$retValue = '';

        if (!preg_match("/^[a-zA-Z ]*$/", $str)) {
            $retValue .= "only letters, white space allowed";
            return false;
        }

        if (strlen($str) < $minLenStr) {
            $retValue .= "min len of " . $minLenStr . " chars";
            return false;
        }

        if (strlen($str) > $maxLenStr) {
            $retValue .= "text must not exceed " . $maxLenStr . " chars";
            return false;
        }

        return true;
    }

    public function validateTextAndNumber($str, &$retValue, $minLenStr = 0, $maxLenStr = 128) {

        //$retValue = '';

        if (!preg_match("/^[a-zA-Z0-9 ]*$/", $str)) {
            $retValue .= "only letters,white space, digits allowed";
            return false;
        }

        if (strlen($str) < $minLenStr) {
            $retValue .= "min len of " . $minLenStr . " chars not reached";
            return false;
        }

        if (strlen($str) > $maxLenStr) {
            $retValue .= "text must not exceed " . $maxLenStr . " chars";
            return false;
        }

        return true;
    }

    public function validateEmail($email, &$retValue) {

        //$retValue = '';

        if (strlen($email) == 0) {
            $retValue .= "email is empty";
            return false;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $retValue .= "invalid email format";
            return false;
        }
        return true;
    }

    public function validateWebsite($website, &$retValue) {

        //$retValue = '';

        if (strlen($website) == 0) {
            $retValue .= "url is empty";
            return false;
        }

        if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i", $website)) {
            $retValue .= "Invalid url";
            return false;
        }
        return true;
    }

    public function prepareInputDataForChecking($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

}

?>