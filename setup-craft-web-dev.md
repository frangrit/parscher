# Set up a dev environment for Craft
Get started with all the tools to manage a local Craft project with Gulp

## Initialize Node in the project site folder
- in [project]/site: `node init`
- name: project-name-site [lowercase, no spaces]
- version: 0.0.0
- description: [description]
- entry point: [default]
- test command: [default]
- git repository: [github repo url]
- keywords: [default]
- author: [your name], [your org]
- license: UNLICENSED

This creates the package.json file in the site directory.

## Add the dev dependencies
Add all these packages for a MAMP/Gulp workflow:
- gulp
- gulp-sass
- gulp-autoprefixer
- gulp-cssnano
- browser-sync
- gulp-notify
- gulp-sourcemaps
- jshint
- gulp-jshint
- gulp-concat
- gulp-clean
- gulp-rename
- gulp-uglify
- gulp-mamp

In the site folder:
- `npm install -g gulp` [unless already installed globally]
- `npm install -g jshint` [unless already installed globally] 
- `npm install --save-dev gulp gulp-sass gulp-autoprefixer gulp-cssnano browser-sync gulp-notify gulp-sourcemaps jshint gulp-jshint gulp-concat gulp-clean gulp-rename gulp-uglify gulp-mamp`

package.json should now end with a devDependencies section that looks something like this:
```
  "devDependencies": {
    "browser-sync": "^2.11.1",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-clean": "^0.3.1",
    "gulp-concat": "^2.6.0",
    "gulp-cssnano": "^2.1.1",
    "gulp-jshint": "^2.0.0",
    "gulp-mamp": "0.0.4",
    "gulp-minify-css": "^1.2.3",
    "gulp-notify": "^2.2.0",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^2.2.0",
    "gulp-sourcemaps": "^1.6.0",
    "gulp-uglify": "^1.5.2",
    "jshint": "^2.9.1"
  }
```