# BeefUp

Just a jQuery accordion plugin

**Demo:** http://beefup.schaschaweb.de/

**Examples:**
* [Toggle buttons](https://jsfiddle.net/Schascha/2Lzmfdb1/)
* [CSS animations](https://jsfiddle.net/Schascha/ohb07vzq/)
* [Self block](https://jsfiddle.net/Schascha/cek0g8ah/)

## Installation

You can use BeefUp in your project by installing it using a package manager:

### Bower

```sh
bower install beefup --save
```

### npm

```sh
npm install beefup --save
```    

## Usage

1. Include jQuery

    ```html
    <script src="js/jquery.min.js"></script>
    ```

2. Include plugin

    ```html
    <script src="js/jquery.beefup.min.js"></script>
    ```

3. Add styles

    ```html
    <link rel="stylesheet" href="css/jquery.beefup.css">
    ```

4. Add markup

    ```html
    <article class="beefup">
        <h2 class="beefup__head">Headline</h2>
        <div class="beefup__body">My fancy collapsible content.</div>
    </article>
    ```

5. Call the plugin

    ```html
    <script>
        $(function() {
            $('.beefup').beefup();
        });
    </script>
    ```

## Configuration

```javascript
trigger: '.beefup__head',   // String: Name of the trigger element
content: '.beefup__body',   // String: Name of the collapsible content
openClass: 'is-open',       // String: Name of the class which shows if a accordion is triggered or not
animation: 'slide',         // String: Set animation type to "slide", "fade" or leave empty ""
openSpeed: 200,             // Integer: Set the speed of the open animation
closeSpeed: 200,            // Integer: Set the speed of the close animation
scroll: false,              // Boolean: Scroll to accordion
scrollSpeed: 400,           // Integer: Set the speed of the scroll feature
scrollOffset: 0,            // Integer: Additional offset to accordion position
openSingle: false,          // Boolean: Open just one accordion at once
stayOpen: null,             // Mixed: Leave one item open, accepts null, integer or string
selfBlock: false,           // Boolean: Block close event on click
selfClose: false,           // Boolean: Close on click outside
hash: true,                 // Boolean: Open accordion with id on hash change
breakpoints: null,          // Mixed: Null or array of objects
onInit: function() {},      // Callback: Fires after the accordions initially setup
onOpen: function() {},      // Callback: Fires after accordion opens content
onClose: function() {},     // Callback: Fires after accordion close content
onScroll: function() {}     // Callback: Fires after scroll animation
```

## Advanced

### API Methods



```javascript
var $beefup = $('.beefup').beefup();
```    

#### Open

```javascript
$beefup.open($('#beefupID'));
```

#### Close

```javascript
$beefup.close($('#beefupID'));
```

#### Click

```javascript
$beefup.click($('#beefupID'));
```

#### Scroll

```javascript
$beefup.scroll($('#beefupID'));
```

### Callbacks

```javascript
$('.beefup').beefup({
    onInit: function ($this) {
        // Do something after initially setup
    },
    onOpen: function ($this) {
        // Do something after accordion open the content
    },
    onClose: function ($this) {
        // Do something after accordion close the content
    },
    onScroll: function ($this) {
        // Do something after scroll animation
    }
});
```

### HTML5 data attributes

```html
<article class="beefup" data-beefup-options='{"animation": "", "openSpeed": 800}'>
    ...
</article>
```

## Bugs?

Please let me know: https://github.com/Schascha/BeefUp/issues

## License

[MIT](./LICENSE)

Copyright (c) 2014-present Sascha Künstler
