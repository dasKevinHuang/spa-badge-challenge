
// Staging template scripts
 var theTemplateScript = $j.select("#header").text;  
var teacherShowScript = $j.select('#teachershow').text;
var badgeTemplateScript = $j.select('#badgetemplate').text;

// Compiling Template Scripts
 var theTemplate = Handlebars.compile (theTemplateScript);
 var teacherShow = Handlebars.compile (teacherShowScript);
var badgeTemplate = Handlebars.compile (badgeTemplateScript);

// ADD BADGE EVENT
var addBadgeFormListener = function( teacherId){
  $j.on('#add-badge-'+teacherId, 'submit', function(e){
    e.preventDefault();
    var newTitle = this.elements[0].value
      var newBadgeUrl = "http://localhost:3000/v1/api/teachers/"+teacherId+"/badges.json" + "?title="+ newTitle
      $j.request({
        type: "POST",
        url: newBadgeUrl
      }).then(function(newBadge){
        if (newBadge == "Error"){
          console.log(newBadge)
          console.log("Input not allowed")
        } else{

        var newBadgeObj = JSON.parse(newBadge)
          var badgeData = {
            teacherId: teacherId,
            badge: newBadgeObj
          }
        var badgeList = $j.select('#slogan-list-'+teacherId)
          badgeList.innerHTML = badgeList.innerHTML + badgeTemplate(badgeData);
        }
      }).catch(function(error){
        console.log("----NEW BADGE CREATION REQUEST ERROR ---- ")
      });
  });
};

// UP VOTE EVENT
var addUpVoteListener = function(e, teacherId){
          if (e.target && e.target.matches('img.up-'+teacherId)){
    console.log("Clicked: Up Button")
      e.preventDefault();
    currId = e.target.id.replace('up-', '');
    var editBadgeUrl = 'http://localhost:3000/v1/api/teachers/'+teacherId+'/badges/'+currId +'.json?value=1'
      $j.request({
        type: "PATCH",
        url: editBadgeUrl
      }).then(function(upResponse){
        var newVote = JSON.parse(upResponse)
          var countId = '#'+currId+'-pointcount'
          var countSpan = $j.select(countId)
          countSpan.innerHTML = newVote.points
					addCookieValue(1);
          console.log("Success: Up vote was completed. Count for badge #"+currId+" is "+newVote.points)
					sortBadges(teacherId)
      }).catch(function(error){
        console.log("-----UP VOTE ERROR-----")});
          }
};
// COOKIE COUNT VIEW
var showCookieValue = function(){
$j.select('#cookie-count').innerHTML = document.cookie
}
// ADD VALUE TO COOKIE

var addCookieValue = function(value){
if (document.cookie == ""){
	document.cookie = "0"
}
document.cookie = parseInt(document.cookie) + value
showCookieValue()
}

// DOWN VOTE EVENT
var addDownVoteListener = function(e, teacherId){
          if (e.target && e.target.matches('img.down-'+teacherId)){
    console.log("Clicked: Downvote Button")
      e.preventDefault();
    currId = e.target.id.replace('down-', '');
    var editBadgeUrl = 'http://localhost:3000/v1/api/teachers/'+teacherId+'/badges/'+currId +'.json?value=-1'
      $j.request({
        type: "PATCH",
        url: editBadgeUrl
      }).then(function(upResponse){
        var newVote = JSON.parse(upResponse)
          var countId = '#'+currId+'-pointcount'
          var countSpan = $j.select(countId)
          countSpan.innerHTML = newVote.points
					addCookieValue(-1);
          console.log("Success: Down vote was completed. Count for badge #"+currId+" is "+newVote.points)
					sortBadges(teacherId)
      }).catch(function(error){
        console.log("-----Down VOTE ERROR-----")});
          }
};

//SORTING ALGORITHM
var sortBadges = function(teacherId){
var list = $j.select('#slogan-list-'+teacherId);

var items = list.children;
var itemsArr = [];
for (var i in items) {
    if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
        itemsArr.push(items[i]);
    }
}
console.log(itemsArr)

itemsArr.sort(function(a, b) {
  return b.getElementsByTagName('span')[0].innerHTML - a.getElementsByTagName('span')[0].innerHTML
});
console.log(itemsArr)
for (i = 0; i < itemsArr.length; ++i) {
	console.log(itemsArr[i].getElementsByTagName('span').outerHTML)
  list.appendChild(itemsArr[i]);
}
console.log("Sorting finished")
}

// RETURN TO INDEX BUTTON
var addReturnIndexListener = function(e, teacherId){
  console.log(e.target)
          if (e.target && e.target.matches("button.return-to-index")){
            console.log("Hiding details #details-"+teacherId)
        $j.hide('#details-'+teacherId)
          }
}

// ACTION CONTROLLER 
var addShowActionDelegates = function(teacherId){
      $j.on('#details-'+teacherId, 'click', function(e){
        addReturnIndexListener(e, teacherId)
        addUpVoteListener(e, teacherId);
        addDownVoteListener(e, teacherId);
      })
}


// CURRENT INDEX ROUTE 
var getTeachersIndex = function(){
  if ($j.select('#teachers-list') == null){
$j.request({
  type: "GET",
  url: "http://localhost:3000/v1/api/teachers.json"
}).then(function(response){
  var teacherdata = JSON.parse(response);
    var theData = { teacherdata: teacherdata}
   $j.select('.container')[0].innerHTML = $j.select('.container')[0].innerHTML + (theTemplate (theData));

}).catch(function(error){
  console.log("request failed")
})
  } else {
        $j.show('#teachers-list')

}
}

// SHOW ROUTE
var showTeacherDetails = function(teacherId){
  if ($j.select('#details-'+teacherId) == null){
    var container = $j.select('.container')
    var teacherObjId = teacherId - 1
    var teacherUrl = "http://localhost:3000/v1/api/teachers/"+teacherId+".json"
    var badgeUrl = "http://localhost:3000/v1/api/teachers/"+teacherId+"/badges.json"

    $j.request({
      type: "GET",
      url: teacherUrl
    }).then(function(teacherResponse){
    // GET BADGE AJAX
    var teacherData = JSON.parse(teacherResponse)
        var badges = teacherData.badges
        var detailData = { 
          teacherId: teacherObjId,
          badges: badges,
          teacher: teacherData}
      if ($j.select('#teachers-list')){
      $j.hide('#teachers-list')
      }
      container[0].innerHTML = container[0].innerHTML + teacherShow(detailData);

      // SET EVENT DELEGATES
      addShowActionDelegates(teacherId);

        // ADD BADGE EVENT
        addBadgeFormListener(teacherId)

    });
  } else {
      $j.hide('#teachers-list')
    $j.show('#details-'+teacherId)
  }
};

// ON DOCUMENT LOAD
$j.ready(function(){
  router()
	showCookieValue()
})
if ("onhashchange" in window){
  alert("The browser supports the hashcange event!")
}

// HASH ROUTER
function router(){
  
  // #teachers/SHOW
  if (route = location.hash.match(/#teachers\/(.*)/)){
    showTeacherDetails(route[1]);  

  // #teachers INDEX
  }else if (location.hash === "#teachers"){
    console.log("Router: GET Index '#teachers'")
    getTeachersIndex();

  // #/ INDEX REDIRECT
}else if (location.hash === ""){
    location.hash = '#teachers'
}
}

// SET WINDOW LISTENER FOR HASH LOCATION CHANGES
window.onhashchange = router;
