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
                    'args' => ['ntl'],
                ),
                array(
                    'title' => 'Note Right',
                    'args' => ['ntr'],
                ),
                array(
                    'title' => 'Remove all styles',
                    'clear' => true,
                ),
            ),
        ),
    ),
);
