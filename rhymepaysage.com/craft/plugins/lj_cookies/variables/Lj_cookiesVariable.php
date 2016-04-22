<?php
namespace Craft;

/**
 * Lj_cookiesVariable provides simple access to get and store values to cookies
 * from within Cradt templates.
 *
 * @author     Lewis Jenkins <http://lewisjenkins.co.uk>
 */
class Lj_cookiesVariable
{
    /**
     * set() takes the same parameters as PHP's builtin setcookie();
     *
     * @param string $name
     * @param string $value
     * @param int $expire
     * @param string $path
     * @param string $domain
     * @param mixed $secure
     * @param mixed $httponly
     */
    function set($name = "", $value = "", $expire = 0, $path = "", $domain = "", $secure = false, $httponly = false)
    {
		setcookie($name, $value, (int) $expire, $path, $domain, $secure, $httponly);
		$_COOKIE[$name] = $value;
    }

	/**
     * get() lets you retrieve the value of a cookie.
	 *
	 * @param mixed $name
	 */
	function get($name)
	{
        return isset($_COOKIE[$name]) ? $_COOKIE[$name] : null;
    }
}
