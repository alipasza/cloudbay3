<?php

//http://azure.microsoft.com/css/cvt-252380715b2d6c14abaf16464acbfc1d2225b60c/images/hero/developer-center-mobile.png
//url do sciagania plików
$url = 'http://azure.microsoft.com/';
// plik do przeszukania
$css_file = file_get_contents('CoreCss.css');
//usuniecie znaku '"'
$css_file = str_replace('"', '', $css_file);
$pos1 = 0;
while (strpos($css_file, 'background-image:url(', $pos1 + 21)) {
    $pos1 = strpos($css_file, 'background-image:url(', $pos1 + 21);
    $pos2 = strpos($css_file, ')', $pos1 + 21);
    $img1 = substr($css_file, $pos1 + 21, $pos2 - $pos1 - 21);

    if (strpos($img1, '.png', 1) || strpos($img1, '.svg', 1) || strpos($img1, '.jpg', 1)) {
        $img1 = str_replace('../', '', $img1);

        $filename = explode('/', $img1);

        if (!file_exists($_SERVER['DOCUMENT_ROOT'] . '/mvc3/public/images/getImagesFromNet/' . $filename[count($filename) - 1])) {

            echo $filename[count($filename) - 1];
            echo '<br>';
            echo $url . $img1;
            echo '<br>';
            // pobierz plik do katalogu
            $img_file = file_get_contents($url . $img1);
            $file_loc = $_SERVER['DOCUMENT_ROOT'] . '/mvc3/public/images/getImagesFromNet/' . $filename[count($filename) - 1];
            $file_handler = fopen($file_loc, 'w');
            if (fwrite($file_handler, $img_file) == false) {
                echo 'error:' . $url . $img1;
            }
            fclose($file_handler);
        }
    }
}
echo 'juz. Jeśli wystapil blad w czasie uruchamiania tego skryptu - uruchom go ponownie (odświerz)';
$img_file = 'http://azure.microsoft.com/css/cvt-252380715b2d6c14abaf16464acbfc1d2225b60c/images/hero/developer-center-mobile.png';

$img_file = file_get_contents($img_file);

$file_loc = $_SERVER['DOCUMENT_ROOT'] . '/mvc3/public/images/getImagesFromNet/developer-center-mobile.png';

$file_handler = fopen($file_loc, 'w');

if (fwrite($file_handler, $img_file) == false) {
    echo 'error';
}

fclose($file_handler);
?>