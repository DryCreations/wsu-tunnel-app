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

    var userTransform = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    userTransform.setAttribute('id', 'UserTransform');

    var transformGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    transformGroup.setAttribute('id', 'TransformMap');
    transformGroup.style.r = nodeRadius;

    for(var i = 1; i < data.length; i++) {
      var node = document.createElementNS(null, 'circle');
      node.setAttribute('id', 'N' + data[i][0]);

      node.setAttribute('cx', map(data[i][2], longMin, longMax, 0, svgXMax));
      node.setAttribute('cy', map(data[i][1], latMax, latMin, 0, svgYMax));

      node.setAttribute('r', nodeRadius);

      node.setAttribute('style', 'transform-origin:' + map(data[i][2], longMin, longMax, 0, svgXMax) + 'px ' + map(data[i][1], latMax, latMin, 0, svgYMax) + 'px')

      switch(data[i][8]) {
        case '0':
          node.classList.add('intersection');
          break;
        case '1':
          node.classList.add('exit');
          break;
        case '2':
          node.classList.add('staircase');
          break;
        case '3':
          node.classList.add('elevator');
          break;
      }

      switch(data[i][5]) {
        case '0':
          node.classList.add('noBuilding');
          break;
        case '1':
          node.classList.add('allynHall');
          break;
        case '2':
          node.classList.add('biologicalSciencesI');
          break;
        case '3':
          node.classList.add('biologicalSciencesII');
          break;
        case '4':
          node.classList.add('brehmLaboratory');
          break;
        case '5':
          node.classList.add('creativeArtsCenter');
          break;
        case '6':
          node.classList.add('diggsLaboratory');
          break;
        case '7':
          node.classList.add('dunbarLibrary');
          break;
        case '8':
          node.classList.add('fawcettHall');
          break;
        case '9':
          node.classList.add('joshiCenter');
          break;
        case '10':
          node.classList.add('libraryAnnex');
          break;
        case '11':
          node.classList.add('mathAndMicrobiology');
          break;
        case '12':
          node.classList.add('medicalSciences');
          break;
        case '13':
          node.classList.add('millettHall');
          break;
        case '14':
          node.classList.add('motionPictures');
          break;
        case '15':
          node.classList.add('oelmanHall');
          break;
        case '16':
          node.classList.add('rikeHall');
          break;
        case '17':
          node.classList.add('russEngineering');
          break;
        case '18':
          node.classList.add('studentSuccessCenter');
          break;
        case '19':
          node.classList.add('studentUnion');
          break;
        case '20':
          node.classList.add('universityHall');
          break;
      }
      var backNode = node.cloneNode();
      backNode.classList.add('backNode');
      backNode.setAttribute('id', backNode.getAttribute('id') + 'B');
      backNode.setAttribute('r', nodeRadius * 10)

      transformGroup.appendChild(node);
      transformGroup.prepend(backNode);
    }

    var reader2 = new FileReader();
    reader2.readAsText(file2);
    reader2.onload = function(e3) {
      var csv2 = e3.target.result;
      var data2 = $.csv.toArrays(csv2);

      for(var i = 0; i < data2.length; i++) {
        var path = document.createElementNS(null, 'path');

        // path.setAttribute('id', 'E' + data2[i][0]);
        path.setAttribute('id', 'E' + (i+1));

        path.setAttribute('d', 'M ' + map(data[data2[i][1]][2], longMin, longMax, 0, svgXMax) + ' ' + map(data[data2[i][1]][1], latMax, latMin, 0, svgYMax) + ' ' + map(data[data2[i][2]][2], longMin, longMax, 0, svgXMax) + ' ' + map(data[data2[i][2]][1], latMax, latMin, 0, svgYMax));

        switch(data[data2[i][1]][8]) {
          case '0':
            path.classList.add('intersection');
            break;
          case '1':
            path.classList.add('exit');
            break;
          case '2':
            path.classList.add('staircase');
            break;
          case '3':
            path.classList.add('elevator');
            break;
        }

        switch(data[data2[i][1]][5]) {
          case '0':
            path.classList.add('noBuilding');
            break;
          case '1':
            path.classList.add('allynHall');
            break;
          case '2':
            path.classList.add('biologicalSciencesI');
            break;
          case '3':
            path.classList.add('biologicalSciencesII');
            break;
          case '4':
            path.classList.add('brehmLaboratory');
            break;
          case '5':
            path.classList.add('creativeArtsCenter');
            break;
          case '6':
            path.classList.add('diggsLaboratory');
            break;
          case '7':
            path.classList.add('dunbarLibrary');
            break;
          case '8':
            path.classList.add('fawcettHall');
            break;
          case '9':
            path.classList.add('joshiCenter');
            break;
          case '10':
            path.classList.add('libraryAnnex');
            break;
          case '11':
            path.classList.add('mathAndMicrobiology');
            break;
          case '12':
            path.classList.add('medicalSciences');
            break;
          case '13':
            path.classList.add('millettHall');
            break;
          case '14':
            path.classList.add('motionPictures');
            break;
          case '15':
            node.classList.add('oelmanHall');
            break;
          case '16':
            node.classList.add('rikeHall');
            break;
          case '17':
            node.classList.add('russEngineering');
            break;
          case '18':
            path.classList.add('studentSuccessCenter');
            break;
          case '19':
            path.classList.add('studentUnion');
            break;
          case '20':
            path.classList.add('universityHall');
            break;
        }
        switch(data[data2[i][2]][8]) {
          case '0':
            path.classList.add('intersection');
            break;
          case '1':
            path.classList.add('exit');
            break;
          case '2':
            path.classList.add('staircase');
            break;
          case '3':
            path.classList.add('elevator');
            break;
        }

        switch(data[data2[i][2]][5]) {
          case '0':
            path.classList.add('noBuilding');
            break;
          case '1':
            path.classList.add('allynHall');
            break;
          case '2':
            path.classList.add('biologicalSciencesI');
            break;
          case '3':
            path.classList.add('biologicalSciencesII');
            break;
          case '4':
            path.classList.add('brehmLaboratory');
            break;
          case '5':
            path.classList.add('creativeArtsCenter');
            break;
          case '6':
            path.classList.add('diggsLaboratory');
            break;
          case '7':
            path.classList.add('dunbarLibrary');
            break;
          case '8':
            path.classList.add('fawcettHall');
            break;
          case '9':
            path.classList.add('joshiCenter');
            break;
          case '10':
            path.classList.add('libraryAnnex');
            break;
          case '11':
            path.classList.add('mathAndMicrobiology');
            break;
          case '12':
            path.classList.add('medicalSciences');
            break;
          case '13':
            path.classList.add('millettHall');
            break;
          case '14':
            path.classList.add('motionPictures');
            break;
          case '15':
            path.classList.add('oelmanHall');
            break;
          case '16':
            path.classList.add('rikeHall');
            break;
          case '17':
            path.classList.add('russEngineering');
            break;
          case '18':
            path.classList.add('studentSuccessCenter');
            break;
          case '19':
            path.classList.add('studentUnion');
            break;
          case '20':
            path.classList.add('universityHall');
            break;
        }

        transformGroup.prepend(path);
      }

      userTransform.appendChild(transformGroup);
      svg.appendChild(userTransform);

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
