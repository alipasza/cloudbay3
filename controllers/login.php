<!-- mvc3/controllers/login.php -->
<?php

class Login extends Controller {

    function __construct() {

        parent:: __construct();
        $this->view->js = array('login/js/default.js');
    }

    public function index() {

        $errMsg = '';
        $this->view->email = $this->view->password = "";

        if (isset($_COOKIE['login'])) {
            $this->view->email = $_COOKIE['login'];
        }

        if ($_SERVER["REQUEST_METHOD"] == "POST") {

            if (empty($_POST['password'])) {
                $errMsg = 'Password required';
            }
            $this->view->password = $_POST['password'];

            if (empty($_POST['email'])) {
                $errMsg = 'Email required';
            }
            $this->view->email = $_POST['email'];

            if (strlen($errMsg) != 0) {
                $this->view->render('login/index', 'page-user-action-login', $errMsg);
                return;
            }
            $joindatetime = '';
            $res = $this->model->isLoginRegistered($_POST['email'], $_POST['password'], $role, $joindatetime, $timezone);

            if (isdebug) {
                Session::set('email', $_POST['email']);
                Session::set('role', $role);
                Session::set('loggedIn', true);
                Session::set('joindatetime', $joindatetime);
                Session::set('timezone', $timezone);
                setcookie('login', $this->view->email, time() + (86400 * 30), "/"); // 86400 = 1 day
                header('location: ' . URL . 'dashboard', 'page-dashboard');
                return;
            } else {
                if ($res == true) {
                    Session::set('email', $_POST['email']);
                    Session::set('role', $role);
                    Session::set('loggedIn', true);
                    Session::set('joindatetime', $joindatetime);
                    Session::set('timezone', $timezone);

                    setcookie('login', $this->view->email, time() + (86400 * 30), "/"); // 86400 = 1 day
                    header('location: ' . URL . 'dashboard', 'page-dashboard');
                    return;
                } else {
                    $this->view->render('login/index', 'page-user-action-login', 'Incorrect Credentials');
                    return;
                }
            }
        } else {
            $this->view->render('login/index', 'page-user-action-login');
            return;
        }
    }

    public function register() {

        $errMsg = '';
        $this->view->alias = $this->view->email = $this->view->password = $this->view->confirm_password = '';

        if ($_SERVER["REQUEST_METHOD"] == "POST") {

            $this->view->alias = $this->view->prepareInputDataForChecking($_POST['alias']);
            $this->view->email = $this->view->prepareInputDataForChecking($_POST['email']);
            $this->view->password = $this->view->prepareInputDataForChecking($_POST['password']);
            $this->view->confirm_password = $this->view->prepareInputDataForChecking($_POST['confirm_password']);

            //alias field validation
            if (!$this->view->validateTextAndNumber($this->view->alias, $errMsg, 4, 32)) {
                $this->view->render('login/register', 'page-user-action-register', 'Alias: ' . $errMsg);
                return;
            }
            //alias field validation
            if (!$this->view->validateEmail($this->view->email, $errMsg)) {
                $this->view->render('login/register', 'page-user-action-register', 'Email: ' . $errMsg);
                return;
            }
            //email field validation
            if ($this->model->isEmailAlreadyRegistered($this->view->email)) {
                $this->view->render('login/register', 'page-user-action-register', 'Email: email already registred');
                return;
            }
            //password field validation
            if (!$this->view->validateTextAndNumber($this->view->password, $errMsg, 4)) {
                $this->view->render('login/register', 'page-user-action-register', 'Password: ' . $errMsg);
                return;
            }

            if (strlen($errMsg) == 0) {

                if ($this->view->password != $this->view->confirm_password) {
                    $this->view->render('login/register', 'page-user-action-register', 'Your passwords do not match.');
                    return;
                }
            }

            //register Login
            $res = $this->model->RegisterLogin($this->view->alias, $this->view->email, $this->view->password);
            if ($res) {
                Session::set('role', $role);
                Session::set('loggedIn', true);
                header('location: ' . URL . 'dashboard'); // header powoduje GETa a w FORM jest POST wiec aby to byl GET trzeba ustawic 'location'  
                return;
            } else {

                $this->view->render('login/register', 'page-user-action-register', 'DBO error');
                return;
            }
        } else {
            $this->view->render('login/register', 'page-user-action-register');
        }
    }

    public function password() {

        $this->view->render('login/password', 'page-user-action-password');
    }

    public function doPasswordReset() {
        
    }

}

?>