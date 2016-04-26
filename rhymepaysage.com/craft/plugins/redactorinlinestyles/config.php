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
                    'args' => ['kbd', 'class', 'left'],
                ),
                array(
                    'title' => 'Note Right',
                    'args' => ['kbd', 'class', 'right'],
                ),
                array(
                    'title' => 'Remove all styles',
                    'clear' => true,
                ),
            ),
        ),
    ),
);
