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
-  Add production git repo:
```
git remote add production ssh://[user]@[project ssh host]:/path/to/[project_name].git
```
-  Start MAMP

