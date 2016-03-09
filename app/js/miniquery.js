var miniQuery = (function() {
  var events = {}
  return {
    select: function(selector) {
      firstChr = selector.charAt(0)
      restChr = selector.substr(1)
      switch (firstChr){
        case '#':
          //statement
          return document.getElementById(restChr);
          break;
        case '.': 
          //statement
          return  document.getElementsByClassName(restChr);
          break;
        default:
          //statement
          return document.getElementsByTagName(selector);
          break;
      }

       // return document.getElementById(selector);
    },

    hide: function(selector) {
      miniQuery.select(selector).style.display = "none";
      },

    show: function(selector) {
      miniQuery.select(selector).style.display = "block";
      },

    addClass: function(selector, addedClass) {
      var el = miniQuery.select(selector);
      el.classList.add(addedClass)
      },

    removeClass: function(selector, addedClass) {
      var el = miniQuery.select(selector);
      el.classList.remove(addedClass)
      },

    on: function(selector, eName, callback) {
      var el = miniQuery.select(selector);
      var event = new Event(eName)
      events[eName] = event;
      if (el.constructor === HTMLCollection){
        for (var i = 0; i < el.length ; i++){
          el[i].addEventListener(eName, callback);
        }
      } else {
      el.addEventListener(eName, callback);
      };
      },
    trigger: function(selector, eName) {
      var el = miniQuery.select(selector);
      el.dispatchEvent(events[eName]);
    },

    ready: function(block){

      switch(document.readyState) {
        case "loading":
          document.addEventListener("DOMContentLoaded", function(event) {
            return block();
          });
          break;
        case "complete":
         return block();
        break;        
      }
    },



    request: function(header) {
      return new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();
        req.open(header.type, header.url);

        req.onload = function() {
          if (req.status == 200) {
            resolve(req.response);
          }
          
          else {
            reject(Error(req.statusText));
          }
        }

        req.onerror = function() {
          reject(Error("Network Error"));
        };
        req.send();
// PROMISE ENDS HERE
      })
    }
  }

})();
var $j = miniQuery;
