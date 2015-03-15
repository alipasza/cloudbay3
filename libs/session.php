<?php

class Session {

    public static function init() {
        if (session_status() != PHP_SESSION_ACTIVE)
            session_start();
    }

    public static function set($key, $value) {
        $_SESSION[$key] = $value;
    }

    public static function get($key) {
        if (isset($_SESSION[$key])) {
            return $_SESSION[$key];
        }
    }

    public static function del($key) {
        unset($_SESSION[$key]);
    }

    public static function destroy() {
        //unset($_SESSION);
        session_destroy();
    }

}
