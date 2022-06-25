export function createActiveXObject (id, classId, wrapper, width, height = width) {
  let activeXObject = window.document.createElement('object')

  activeXObject.setAttribute('id', id)
  activeXObject.setAttribute('classid', classId)

  if (wrapper && width) {
    activeXObject.setAttribute('width', String(width))
    activeXObject.setAttribute('height', String(height))
    wrapper.appendChild(activeXObject)
  } else {
    window.document.body.appendChild(activeXObject)
  }

  return activeXObject
}

export function createActiveXScript (forId, eventName, eventHandler = eventName) {
  let activeXScript = window.document.createElement('script')

  activeXScript.setAttribute('for', forId)
  activeXScript.setAttribute('event', eventName)
  activeXScript.innerHTML = eventHandler

  window.document.body.appendChild(activeXScript)

  return activeXScript
}
