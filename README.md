![Eustia](http://liriliri.github.io/eustia/static/img/banner.jpg)

# Eustia

**Eustia** is a tool for building your own JavaScript utility libraries. When we
create a new project, usually the first thing we do is choosing a JavaScript
library that provides useful programming helpers to make our lives easier. At
this point, we think of open source JavaScript libraries such as
**underscore.js** or **lodash**. However, there are times that we just want to
use one or two of its functions. Moreover, the function helper we just need
doesn't exist in it. And most of the time, we ended up extracting code from
those libraries and writing extra helpers ourselves. This is the problem Eustia
is trying to solve.

## How it Works

The tool will scan your source code to find strings that match the pattern
**util.method**, **util = require('./util')** or **import {...} from './util'**,
then generates a JavaScript library containing only the methods you have used.
It provides most of underscore's functions and some other useful small
libraries, for example, Class, cookie helpers. You can also collect your own
modules and functions to create libraries for multiple projects.


## Quick Example

You can install Eustia using Node Package Manager(**npm**).

```bash
npm install -g eustia
```

Suppose you are doing a new project, after creating a file named **index.html**,
you want to use **trim** function in it, so you just write the code down as follows:

```html
<html>
<head>
    <meta charset="utf-8"/>
    <title>Eustia</title>
    <script src="util.js"></script>
</head>
<body>
    <script>
    var projectName = _.trim(' Eustia ');
    // Some code...
    </script>
</body>
</html>
```

Inside the same folder, run command:

```bash
eustia build
```

The tool will scan you html code and generate a file name **util.js**(Default
output file name). And that is it, everything is just done!

## Use a Configuration File

You can use Eustia with command lines totally. It usually follows the same
pattern described below:

```bash
eustia build -o util.js index.html *.js ...<list of files to be scanned>
```

It's also possible to use a configuration file to save settings. This is pretty
helpful especially when you want to generate multiple utility libraries for
different sections of your website.

Just create a file named **.eustia** in your project root.

```json
{
    "page": {
        "files": "./layout/**/*.jade",
        "output": "./static/js/eustia.js"
    },
    "node": {
        "files": ["./lib/*.js", "./tool/**/*.js"],
        "output": "./lib/util.js"
    }
}
```

Running Eustia without any sub commands, the tool will find **.eustia**
under current working directory to read configuration to generate libraries. It
is almost the same as running build command from console, just a different way
of passing options.

> For a full list of options can be used, please check
[API](http://liriliri.github.io/eustia/api.html) page.

## Prepare LEGO Bricks

Materials must be prepared first to cook a good meal. Right now, our materials
is a bunch of functions. Eustia provides many in default. Still, there are times
you want to add your own ones. To achieve that, create a directory named
**eustia** in the root directory.

Now, let's say I want to have a function to compare version numbers. The first
step is to create a js file named **compareVersion.js** in **eustia** directory.
Then fills it with actual codes to finish the procedure.

```javascript
// eustia/compareVersion.js
_('isStr each'); // dependencies

// export object
compareVersion = function (v1, v2)
{
    if (!isStr(v1) || !isStr(v2)) return;
    ...
};
```

Now you can use **compareVersion** anywhere in your project.

> Using option **library** allows you to search functions in other paths, quite
useful when sharing functions among several projects.
