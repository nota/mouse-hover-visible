(function () {
  var currentHoverVisible = false

  var modifierKeys = [
    16, // shift
    17, // control
    18, // alt
    27, // esc
    91, // Windows key / left Apple cmd
    93 // Windows menu / right Apple cmd
  ]

  function supportsPassiveEvent () {
    var exist = false
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function () { exist = true }
      })
      window.addEventListener('test', null, opts)
    } catch (e) {}
    return exist
  }

  function init () {
    // set useCapture to true to capture all events
    // some components like Boostrap Dropdown menu call stopPropagate()
    var useCapture = true
    var options = supportsPassiveEvent()
      ? { passive: true, capture: useCapture }
      : useCapture

    // listen pointer events (mouse, pen, touch)
    if (window.PointerEvent) {
      window.addEventListener('pointerover', onPointerOver, options)

      // keyboard events
      window.addEventListener('keydown', onKeyDown, useCapture)
      return
    }

    // Safari (iOS and macOS) does not support pointerover events yet
    if ('ontouchstart' in window) {
      // on iOS Safari, we need this event to enable any :active state
      window.addEventListener('touchstart', function () { }, options)
    } else {
      // we must set hover-visible on macOS Safari
      updateDoc(true)
      // force to apply the new hover style
      // this is a bad trick for Safari
      document.body.style.pointerEvents = 'none'
      window.requestAnimationFrame(function () {
        document.body.style.pointerEvents = 'auto'
      })
    }
  }

  function onPointerOver (event) {
    updateDoc(event.pointerType === 'mouse')
  }

  function onKeyDown (event) {
    if (modifierKeys.indexOf(event.which) > -1) return
    updateDoc(false)
  }

  function updateDoc (hoverVisible) {
    if (currentHoverVisible === hoverVisible) return
    currentHoverVisible = hoverVisible
    var body = document.body
    if (hoverVisible) {
      body.dataset.hoverVisible = ''
    } else {
      delete body.dataset.hoverVisible
    }
  }

  if (document.readyState === 4) {
    init()
  } else {
    document.addEventListener('load', init)
  }
})()
