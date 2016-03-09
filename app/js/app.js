$.ready(function(){
  $.on(".name",'click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    id = e.target.innerHTML;
    var method1 = "GET";
    $.request({url: "http://localhost:3000/boots/" + id, method: method1})
    .then(function(response){
      var data = JSON.parse(response)
      $.hide("#boot_list");
      $.show("#badge_list");
      var source = $.select("#boot-template").innerHTML;
      var template = Handlebars.compile(source);
      var context = {boot: data.boot.name}
      var html = template(context)
      $.select("#name_div").innerHTML = html
      data.badges.sort(function(a, b) {return b.points-a.points})
      for (var i = 0; i < data.badges.length; i++) {
        var div = document.createElement("div")
        div.setAttribute('id', data.badges[i].id);
        source = $.select("#badge-template").innerHTML;
        template = Handlebars.compile(source);
        context = { badge_number: i + 1, badge_name: data.badges[i].name, badge_points: data.badges[i].points, badge_id: data.badges[i].id }
        html = template(context)
        div.innerHTML = html
        $.select("#badge_div").appendChild(div)
      }
      voteListener();
    })
  })
  $.on("#home",'click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $.hide('#badge_list');
    var node = $.select('#badge_div')
    while (node.hasChildNodes()) {
      node.removeChild(node.firstChild);
    }
    $.show('#boot_list');
  })
  $.on("#form", "submit", function(e) {
    e.preventDefault();
    e.stopPropagation();
    var params = e['target']['1']['value'];
    var method2 = "POST";
    $.request({url: "http://localhost:3000/boots/" + id +"/badges?name=" + params, method: method2})
    .then(function(response) {
      var data = JSON.parse(response);
      var div = document.createElement("div");
      div.setAttribute('id', data.badge.id);
      source = $.select("#badge-template").innerHTML;
      template = Handlebars.compile(source);
      context = { badge_number: data.badge_count, badge_name: data.badge.name, badge_points: data.badge.points, badge_id: data.badge.id }
      html = template(context)
      div.innerHTML = html
      $.select("#badge_div").appendChild(div)
      $.select("#text").value = "";
      document.removeEventListener('submit', updatePoints);
      voteListener();
    })
  })
})
function voteListener(){
  $.on(".vote",'submit',updatePoints)
}

function updatePoints(e){
  e.preventDefault();
  e.stopPropagation();
  var upDown = e['target']['1']['value'];
  var badgeId = e.target.parentElement.parentElement.parentElement.id;
  $.request({url: "http://localhost:3000/boots/" + id +"/badges/" + badgeId + "?upDown=" + upDown, method: "PUT"})
  .then(function(response) {
    var data = JSON.parse(response);
    $.select('#points_' + data.badge_id).innerHTML = data.badge_points;
    var buttons = $.select('.vote_' + data.badge_id);
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  })
}







