<?php

class Common {

  public static function get_param($name, $default) {
    return isset($_GET[$name]) ? urldecode($_GET[$name]) : $default;
  }

  // function add_param($url, $name, $value) {
  //   $sep = strpos($url, '?') !== false ? '&' : '?';
  //   return $url . $sep . $name . "=" . urlencode($value);
  // }

}