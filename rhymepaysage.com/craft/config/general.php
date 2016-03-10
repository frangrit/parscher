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

    '.dev' => array(
        'devMode' => true,
		'siteUrl' => 'http://rhymepaysage.dev/',
        'environmentVariables' => array(
            'basePath' => '/Users/dano/code/parscher/rhymepaysage.com/public/',
            'baseUrl'  => 'http://rhymepaysage.dev/',
        )
    ),

    '.com' => array(
        'cooldownDuration' => 0,
		'siteUrl' => 'http://rhymepaysage.com/',
        'environmentVariables' => array(
            'basePath' => '/home/rhyme_site/sites/rhymepaysage.com/public/',
            'baseUrl'  => 'http://rhymepaysage.com/',
        )
    )    
    
);
