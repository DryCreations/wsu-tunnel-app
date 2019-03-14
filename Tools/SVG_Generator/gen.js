$('form').submit(function(e1) {
  e1.preventDefault();

  var file = e1.target[8].files[0];
  var file2 = e1.target[9].files[0];

  var svgXMax = e1.target[5].value;
  var svgYMax = e1.target[4].value;

  var latMin = e1.target[0].value;
  var latMax = e1.target[1].value;
  var longMin = e1.target[2].value;
  var longMax = e1.target[3].value;

  var nodeRadius = e1.target[6].value;
  var strokeWidth = e1.target[7].value;

  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(e2) {
    var csv = e2.target.result;
    var data = $.csv.toArrays(csv);

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    for(var i = 1; i < data.length; i++) {
      var node = document.createElementNS(null, 'circle');
      node.setAttribute('id', 'N' + data[i][0]);

      node.setAttribute('cx', map(data[i][2], longMin, longMax, 0, svgXMax));
      node.setAttribute('cy', map(data[i][1], latMax, latMin, 0, svgYMax));

      node.setAttribute('r', nodeRadius);

      svg.appendChild(node);
    }

    var reader2 = new FileReader();
    reader2.readAsText(file2);
    reader2.onload = function(e3) {
      var csv2 = e3.target.result;
      var data2 = $.csv.toArrays(csv2);

      for(var i = 1; i < data2.length; i++) {
        var path = document.createElementNS(null, 'path');

        path.setAttribute('id', 'E' + data2[i][0]);

        path.setAttribute('d', 'M ' + map(data[data2[i][1]][2], longMin, longMax, 0, svgXMax) + ' ' + map(data[data2[i][1]][1], latMax, latMin, 0, svgYMax) + ' ' + map(data[data2[i][2]][2], longMin, longMax, 0, svgXMax) + ' ' + map(data[data2[i][2]][1], latMax, latMin, 0, svgYMax));

        svg.prepend(path);
      }

      svg.setAttribute('viewBox', '0 0 ' + svgXMax + ' ' + svgYMax);
      svg.setAttribute('version', '1.1');
      svg.setAttribute('id', 'Map');
      svg.setAttribute('stroke-width', strokeWidth + 'px');

      var serializer = new XMLSerializer();
      var source = serializer.serializeToString(svg);

      var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

      var down = document.createElement('a');
      down.setAttribute('href', url)
      down.setAttribute('download', 'map.svg')
      down.click();

      console.log(svg);
    }


  }
});

var map = function(e, fmin, fmax, tmin, tmax) {
  var frange = fmax - fmin;
  var trange = tmax - tmin;

  var r = e - fmin;

  r = r / frange;
  r = r * trange;

  r = r + tmin;

  return r;
}
