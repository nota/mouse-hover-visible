(function () {
  let currentHoverVisible = false

  const modifierKeys = [
    16, // shift
    17, // control
    18, // alt
    27, // esc
    91, // Windows key / left Apple cmd
    93 // Windows menu / right Apple cmd
  ]

  function supportsPassiveEvent () {
    let exist = false
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function () { exist = true }
      })
      window.addEventListener('test', null, opts)
    } catch (e) {}
    return exist
  }

  function init () {
    // set useCapture to true to capture all events
    // some components like Boostrap Dropdown menu call stopPropagate()
    const useCapture = true
    const options = supportsPassiveEvent()
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
    // We must set hover-visible on macOS Safari
    if (!('ontouchstart' in window)) {
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
    const body = document.body
    if (hoverVisible) {
      body.dataset.hoverVisible = ''
    } else {
      delete body.dataset.hoverVisible
    }
  }

  init()
})()
