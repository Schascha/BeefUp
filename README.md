# BeefUp

[![Build](https://github.com/Schascha/BeefUp/workflows/Build/badge.svg)](https://github.com/Schascha/BeefUp/actions)
[![npm](https://img.shields.io/npm/v/beefup)](https://www.npmjs.com/package/beefup)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/beefup/badge)](https://www.jsdelivr.com/package/npm/beefup)
[![install size](https://packagephobia.com/badge?p=beefup)](https://packagephobia.com/result?p=beefup)

> Just a jQuery accordion plugin

https://schascha.github.io/BeefUp/

**Examples:**

* [Toggle buttons](https://jsfiddle.net/Schascha/2Lzmfdb1/)
* [Hashchange](http://jsfiddle.net/Schascha/kovejmab/)
* [CSS animations](https://jsfiddle.net/Schascha/ohb07vzq/)
* [Self block](https://jsfiddle.net/Schascha/cek0g8ah/)

## Installation

You can use BeefUp in your project by installing it using [npm](https://www.npmjs.com/package/beefup):

```sh
npm install beefup --save
```

## Usage

1. Include jQuery

    ```html
    <script src="dist/js/jquery.min.js"></script>
    ```

2. Include plugin

    ```html
    <script src="dist/js/jquery.beefup.min.js"></script>
    ```

3. Add styles

    ```html
    <link rel="stylesheet" href="dist/css/jquery.beefup.css">
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

Option			| Type		| Default			| Description
---				| ---		| ---				| ---
accessibility	| boolean	| true				| Enable accessibility features like tab control
trigger			| string	| '.beefup__head'	| Selector of the trigger element
content			| string	| '.beefup__body'	| Selector of the collapsible content
openClass		| string	| 'is-open'			| Name of the class which shows if a accordion is triggered or not
animation		| string	| 'slide'			| Set animation type to "slide", "fade" or leave empty ""
openSpeed		| integer	| 200				| Set the speed of the open animation
closeSpeed		| integer 	| 200				| Set the speed of the close animation
scroll			| boolean	| false				| Scroll to accordion on open
scrollSpeed		| integer	| 400				| Set the speed of the scroll animation
scrollOffset	| integer	| 0					| Additional offset to accordion position
openSingle		| boolean	| false				| Open just one accordion at once
stayOpen		| mixed		| null				| Leave items open, accepts null, integer (index) or string (selector, "first" or "last")
selfBlock		| boolean	| false				| Block close event on click
selfClose		| boolean	| false				| Close accordion on click outside
hash			| boolean	| true				| Open accordion with id on hash change
breakpoints		| array		| null				| Array of objects, see [example](https://schascha.github.io/BeefUp/#breakpoints)
onInit			| function	| null				| Callback: Fires after the accordions initially setup
onOpen			| function	| null				| Callback: Fires after the accordions initially setup
onClose			| function	| null				| Callback: Fires after the accordions initially setup
onScroll		| function	| null				| Callback: Fires after the accordions initially setup

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

## Bugs? 🐛

Please let me know: https://github.com/Schascha/BeefUp/issues

## Buy me a Coffee ☕

Support this project and [others](https://github.com/Schascha?tab=repositories) via [PayPal](https://www.paypal.me/LosZahlos). Thanks

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/Schascha/BeefUp/releases).

## License

[MIT](./LICENSE)

Copyright (c) 2014-present Sascha Künstler
