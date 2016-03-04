# Setting up Craft Locally

## Install MAMP
- Install MAMP from www.mamp.info

## Setup Craft installation
- download Craft installation
- move its _craft_ and _public_ folders to the project folder
- change the htaccess for Apache: `mv public/htaccess public/.htaccess`
- change permissions for Craft folders
	- `chmod -R 777 craft/app`
	- `chmod -R 777 craft/config`
	- `chmod -R 777 craft/storage`

## Create Craft’s database
- Open MAMP
- In preferences:
	- Apache port: 80
	- MySQL port: 3306
- Start servers
	- accept incoming connections
	- MAMP home page will load
	- select phpMyAdmin link from the Home page
- open phpMyAdmin form the Home screen
	- select Databases tab
	- under Create Database: `[project_craft]`
	- collation: utf8_unicode_ci
- move db from MAMP to project
	- shut down MAMP servers
	- move project db from MAMP default to project location
	- create a unix symlink from the default location to the project location `ln -s [new path] [old path]`
	- an alias folder should appear in the old location
	- restart MAMP

## Connect Craft to the project database
- from the project site: `nano craft/config/db.php`
- add the new database name to `'database' => ''`
- server: localhost (or other database IP)
- user: root (or other database user)
- password: root (or other database pw)

## Create virtual host
- add `127.0.0.1       [project].dev` to /etc/hosts
- uncomment the include in /Applications/MAMP/conf/apache
```
# Virtual Hosts
# Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf
```

- replace the examples in /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf with

```
<VirtualHost *:80>
    DocumentRoot /Applications/MAMP/htdocs
    ServerName localhost
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "[site html root]"
    ServerName [project].dev
    <Directory "[site html root]">
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
</VirtualHost>
```

**note: use full path, not ~ notation.**

- restart MAMP

## Install Craft
- include the following lines in craft/config/general.php :
```
return array(
    'usePathInfo' => true,
    'omitScriptNameInUrls' => true,
);
```
- navigate to http://[project].dev/admin
- install Craft

## Setup remote production repo on the prod server

First:
- get ssh access to the prod server's web directory

Then:
- ssh in and note the project path with `pwd` (like `/home/user/site`)
- create a new project git repo (this can be anywhere -- files are not uploaded to this git directory)
```
mkdir -p [project_name].git
cd [project_name].git
```

- tell the git repo what to do when it's pinged
```
nano hooks/post-receive
```
add:
```
#!/bin/sh 
GIT_WORK_TREE=[project path noted earlier] git checkout -f
```
close, then chmod the permissions on this new file:
```
chmod +x post-receive
```

On the local machine:
- go the the project repo
- add the new remote:
```
git remote add production ssh://[user]@[project ssh host]:/path/to/[project_name].git
```

- setup the new master branch
```
git push production +master:refs/heads/master
```