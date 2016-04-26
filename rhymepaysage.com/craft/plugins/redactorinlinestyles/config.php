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
                    'args' => ['noteleft'],
                ),
                array(
                    'title' => 'Note Right',
                    'args' => ['noteright'],
                ),
                array(
                    'title' => 'Remove all styles',
                    'clear' => true,
                ),
            ),
        ),
    ),
);
