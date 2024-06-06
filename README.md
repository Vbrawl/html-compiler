# Description
This project allows to compile separated HTML files into a single HTML file.

# Usage
To use this module you need to separate your HTML structure to a single component per file.
After that you need to use the `<static-import>PATH</static-import>` to place a component in
it's place.

Then run:
```bash
npm install -g @vweb-original/html-compiler
html-compile input.html output.html

OR

npm install @vweb-original/html-compiler --save-dev
npx html-compile input.html output.html
```

# Example
**file structure:**
```
* (project root / cwd)
|
|--- * (src)
|    |
|    |--- * (_header.html)
|    |
|    |--- * (index.template.html)
|
|--- * (out)
```

**src/_header.html:**
```html
<header>
    <a href="someLink">Link1</a>
    <a href="someLink2">Link2</a>
</header>
```

**src/index.template.html:**
```html
<html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <static-import>./_header.html</static-import>
        <div class="body">blah blah blah</div>
    </body>
</html>
```

To generate `out/index.html` run:
```bash
html-compile src/index.template.html out/index.html
```

**out/index.html:**
```html
<html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <header>
            <a href="someLink">Link1</a>
            <a href="someLink2">Link2</a>
        </header>
        <div class="body">blah blah blah</div>
    </body>
</html>
```