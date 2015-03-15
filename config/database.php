<?php

if (isdebug) {
    define('DB_TYPE', 'mysql');
    define('DB_HOST', 'localhost');
    define('DB_NAME', 'mvc');
    define('DB_USER', 'root');
    define('DB_PASS', '');
} else {
    define('DB_TYPE', 'mysql');
    define('DB_HOST', 'sql213.koon.pl');
    define('DB_NAME', 'koon_15953615_mvc');
    define('DB_USER', 'koon_15953615');
    define('DB_PASS', 'januszb1');
}
?>