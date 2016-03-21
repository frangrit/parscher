# How to develop locally from this repo
-  Clone the repo to any directory (~/code)
-  Install mamp from [mamp.info](http://www.mamp.info)
-  Add local dev host to ~/etc/hosts (or /private/etc/hosts)
```
127.0.0.1 [project][-localSlug].dev
```
-  uncomment the include in /Applications/MAMP/conf/apache/httpd.conf:
```
# Virtual Hosts
# Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
```
-  Replace the examples in /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf with
```
<VirtualHost *:80>
    DocumentRoot /Applications/MAMP/htdocs
    ServerName localhost
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "[site html root]"
    ServerName [project][-localSlug].dev
    <Directory "[site html root]">
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
```
-  Add local environment vars to craft/config/general.php:
```
    '[project][-localSlug].dev' => array(
        'devMode' => true,
        'siteUrl' => 'http://[project][-localSlug].dev/',
        'environmentVariables' => array(
            'basePath' => '[localPath]',
            'baseUrl'  => 'http://[project][-localSlug].dev/',
        )
    ),
```
-  Create new db settings in craft/config/db.php (not kept in repo for security):
```
<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(

    // The database server name or IP address. Usually this is 'localhost' or '127.0.0.1'.
    'server' => '[server]',

    // The name of the database to select.
    'database' => '[db]',

    // The database username to connect with.
    'user' => '[u]',

    // The database password to connect with.
    'password' => '[p]',

    // The prefix to use when naming tables. This can be no more than 5 characters.
    'tablePrefix' => 'craft',

);
```
-  Add production git repo:
```
git remote add production ssh://[user]@[project ssh host]:/path/to/[project_name].git
```
-  Start MAMP
-  change preferences/ports to :80 and :3306
-  Start MAMP servers
-  `npm install` from the project folder to install the dependencies
-  run `gulp --dev [devEnv]` where `devEnv` is the local development env (e.g. greenleaf) to start gulp

