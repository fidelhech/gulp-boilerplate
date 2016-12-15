# GulpJS Boilerplate

A simple boilerplate with support for:

* sass
* sourcemaps
* pug
* browser-sync
* autoprefixer
* minification


## Installation

#### Node
Make sure Node and `npm` are installed on your machine. Install it via the [Node homepage](https://nodejs.org/en/) or using `homebrew` on OSX:

```
brew install node
```

Installing Node will also install `npm`.


#### Clone the repository

```
git clone https://github.com/fidelhech/gulp-boilerplate.git && cd gulp-boilerplate
```

#### Install dependencies

```
npm install
```


## File Structure

```
/
|-- src
|   |
|   |-- js
|   |-- sass
|   |   |
|   |   |-- base
|   |   |-- components
|   |   |- main.sass
|   |
|   |-- templates
|
|-- builds
|   |
|   |-- dev
|   |
|   |-- prod
|
|- gulpfile.js
|- package.json
```

All code is written in the `src` folder and then piped into `builds/dev` or `builds/prod` depending on current workflow (see below).

## Development

While in development mode, run:

```
gulp dev
```

This will start a [Browser-sync](https://browsersync.io/) server and will reload on all Sass and Pug file changes.







##Contributors

Fidel Hechavarria

Jake Wiesler
