var $, miniQuery;
var $ = miniQuery = (function() {
  function select(element) {
    if (element[0] == "#") {
      return document.getElementById(element.substring(1));
    } else if (element[0] == ".") {
      return document.getElementsByClassName(element.substring(1));
    } else {
      return document.getElementsByTagName(element);
    }
  }

  function hide(element) {
    var hidden = this.select(element);
    if (hidden.constructor.name == "HTMLCollection") {
      for (var i = 0; i < hidden.length; i++) {
        hidden[i].style.display = "none";
    }
    } else {
      hidden.style.display = "none";
    }
  }

  function show(element) {
    var revealed = this.select(element);
    if (revealed.constructor.name == "HTMLCollection") {
      for (var i = 0; i < revealed.length; i++) {
        revealed[i].style.display = "block";
      }
      } else {
        revealed.style.display = "block";
      }
  }

  var shadi = {};
  function on(element, event, action) {
    shadi.event = new Event(event);
    var elem = this.select(element);
    if (elem.constructor.name == "HTMLCollection") {
      for (var i = 0; i < elem.length; i++) {
        elem[i].addEventListener(event, action);
      }
    } else
      elem.addEventListener(event, action);
  }

  function trigger(element, event){
    var elem = this.select(element);
    if (elem.constructor.name == "HTMLCollection") {
      for (var i = 0; i < elem.length; i++) {
        elem[i].dispatchEvent(shadi.event);
      }
    } else
      elem.dispatchEvent(shadi.event);
  }

  function request(args){
    return new Promise(function(resolve, reject) {
      var oReq = new XMLHttpRequest();
      oReq.onload = function(e) {
        if (oReq.status >= 200 && oReq.status < 300)
          resolve(oReq.response)
        else
          reject(oReq)
      }
      oReq.open(args.method, args.url, true);
      oReq.send();
    })
  }

  function ready(action){
    if (document.readyState == "complete") {
      action();
    } else {
      document.addEventListener('DOMContentLoaded', action);
    }
  }

  return {
    select: select,
    hide: hide,
    show: show,
    on: on,
    trigger: trigger,
    request: request,
    ready: ready
  }

})();




// miniQuery.ready( function() { console.log("The DOM is ready"); })












