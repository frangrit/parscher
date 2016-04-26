<?php

return array(
    'translatable' => array(
        'Note Left', 'Note Right'
    ),
    'buttonsAddAfter' => 'italic',
    'buttonsAdd' => array(
        array(
            'title' => 'Notes',
            'dropdown' => array(
                array(
                    'title' => 'Note Left',
                    'args' => ['mark', 'class', 'ntl'],
                ),
                array(
                    'title' => 'Note Right',
                    'args' => ['mark', 'class', 'ntr'],
                ),
                array(
                    'title' => 'Remove all styles',
                    'clear' => true,
                ),
            ),
        ),
    ),
);
