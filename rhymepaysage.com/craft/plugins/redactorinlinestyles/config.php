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
                    'args' => ['nobr', 'class', 'ntl'],
                ),
                array(
                    'title' => 'Note Right',
                    'args' => ['nobr', 'class', 'ntr'],
                ),
                array(
                    'title' => 'Remove all styles',
                    'clear' => true,
                ),
            ),
        ),
    ),
);
