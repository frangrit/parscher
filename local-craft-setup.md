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
- add `127.0.0.1       [project][-localSlug].dev` to /etc/hosts (or /private/etc/hosts)
- uncomment the include in /Applications/MAMP/conf/apache//httpd.conf
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
    ServerName [project][-localSlug].dev
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
- include the following lines in craft/config/general.php (filling in [project], [-localSlug], [localPath], and [projectPath]):
```
<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */


return array(
    '*' => array(
        'usePathInfo' => true,
	    'omitScriptNameInUrls' => true,
    ),

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* add a copy of this section for each local development env */

    '[project][-localSlug].dev' => array(
        'devMode' => true,
		'siteUrl' => 'http://[project][-localSlug].dev/',
        'environmentVariables' => array(
            'basePath' => '[localPath]',
            'baseUrl'  => 'http://[project][-localSlug].dev/',
        )
    ),

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    '.com' => array(
        'cooldownDuration' => 0,
		'siteUrl' => 'http://[project].com/',
        'environmentVariables' => array(
            'basePath' => '[projectPath]',
            'baseUrl'  => 'http://[project].com/',
        )
    )    
    
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

## Create and sync new craft db

- create a new db on the server
- dump the local database with phpmyadmin
- import the local dump on the server's phpmyadmin

Make sure config/db.php is gitignored. If not, add, then: 
```
git rm --cached ../craft/config/db.php
```

- update with a new commit
- push to production
- on the server, manually update db.php with the following:
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
