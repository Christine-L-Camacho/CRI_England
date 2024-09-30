// from https://observablehq.com/@jerryjappinen/url-params

export var urlParams = function urlParams(key) {
  var urlObj = new URL(document.baseURI)
  return urlObj.searchParams.get(key)
}

// from https://javascript-code.dev/articles/412412

export var changeParams = function changeParams(key, value, pageTitle, withHistory=false) {
  var baseUrl = window.location.href.split('?')[0]
  var newUrl = baseUrl + '?' + key + '=' + value;
  console.log(newUrl)
  var stateObject = { page: "new-page" };
  if (withHistory === true) {
  // Push the new state to the history stack
    window.history.pushState(stateObject, pageTitle, newUrl);
  // This will update the URL in the address bar, but the page content remains the same
  } else {
    window.history.replaceState(stateObject, pageTitle, newUrl);
  // This replaces the existing history entry rather than adding a new entry
  }
}

