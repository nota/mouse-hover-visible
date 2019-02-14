# Hover visible

This library allows you to show CSS `:hover` pseudo-class only when triggered by the mouse.

There are several ways to achieve this goal.
Advantages of our aproach are:

- Works on the device that has **both** mouse and touch screen.
- Write CSS (& Sass) cleanly among other pseudo-classes like `:active` or `:focus`.
- Hide the hover style automatically when the keyboard is pressed.

### Install

`$ npm install mouse-hover-visible`

### How to use

Just import/require this library to your project.

```js
import 'mouse-hover-visible'
```

It sets `data-hover-visible` attribute on the `body` element when the pointer is moved using the mouse.
So you can apply the style as follows:

```css
[data-hover-visible] button:hover {
  background-color: #ccc;
}
```

You can also use it in Sass:

```scss
.foo-component {
  background-color: #fff;

  &:active,
  &:focus,
  [data-hover-visible] &:hover {
    background-color: #ccc;
  }
}
```

### Demo

See the live demo [here](https://nota.github.io/mouse-hover-visible/demo.html)

### Compatibility

Suports ordinary modern dekstop browsers (Chrome, Firefox, Safari, Opera, Edge) and mobile browsers (Chrome for Android, iOS Safari)

Does not throw error on IE.

### License

This software is released under the MIT License, see LICENSE.
