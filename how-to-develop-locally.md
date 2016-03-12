# How to develop locally from this repo
1.  Clone the repo to any directory (~/code)
2.  Install mamp from [mamp.info](http://www.mamp.info)
3.  Add local dev host to ~/etc/hosts (or /private/etc/hosts)
```
127.0.0.1 [project][-localSlug].dev
```
4. uncomment the include in /Applications/MAMP/conf/apache/httpd.conf:
```
# Virtual Hosts
# Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
```
5. Replace the examples in /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf with
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
6. Add local environment vars to craft/config/general.php:
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
7. Add production git repo:
```
git remote add production ssh://[user]@[project ssh host]:/path/to/[project_name].git
```
6. Start MAMP

