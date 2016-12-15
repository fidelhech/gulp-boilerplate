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

### Sass

This project encourages Sass use. Keep your Sass files modular inside `src/sass/base` and `src/sass/components` as Partials ([more info on partials here](http://sass-lang.com/guide)). Feel free to add more folders as your project grows.

Import all partials inside `main.sass`:

```
// main.sass

@import 'base/variables'
@import 'base/base'
@import 'components/button'
```

Remember that cascading will come in to play when importing partials. Make sure to import the least specific CSS rules at the top.

*Note: It's important to prefix your Sass partials with an underscore `_` (`ie. _filename.sass`). This keeps Sass from generating a CSS file for the partial file.*


### Pug

We use [PugJS](https://pugjs.org/api/getting-started.html) as a templating engine for our HTML files. These `.pug` files are written inside  `src/templates` and then converted to HTML using `gulp`.


## Development

The first time you start a project, you will need to create your `builds` folder in order for Browser-sync to successfully serve your project's files.

Run

```
gulp init
```

then

```
gulp dev
```

`gulp init` creates your `builds` directory and `gulp dev` will start a [Browser-sync](https://browsersync.io/) server and will reload on all Sass and Pug file changes.

*Note: only run `gulp init` the first time you start a project. This repo doesn't ship with a `builds` directory. You will need to initialize it yourself.*






##Contributors

Fidel Hechavarria

Jake Wiesler
