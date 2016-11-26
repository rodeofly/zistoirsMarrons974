// Generated by CoffeeScript 1.10.0
(function() {
  var HEADERSC, HEADERSL, INTEGRAMME, SOLUTION, UNIVERS, a, arrayEqual, b, c, d, e;

  arrayEqual = function(a, b) {
    return a.length === b.length && a.every(function(elem, i) {
      return elem === b[i];
    });
  };

  UNIVERS = {
    "Marrons": ["Anchaing", "Dimitile", "Cimendef", "Mafate", "Matouté"],
    "Marronnes": ["Héva", "Marianne", "Raharianne", "Simangavola", "Sarlave"],
    "Bourreaux": ["Dugain", "Mussard", "Carron", "Bronchard", "Lautrec"],
    "Villes": ["Entre-Deux", "Salazie", "Cilaos", "Saint-Paul", "La Possession"]
  };

  INTEGRAMME = [UNIVERS["Marrons"], UNIVERS["Bourreaux"], UNIVERS["Villes"], UNIVERS["Marronnes"]];

  HEADERSC = ["Marrons", "Bourreaux", "Villes"];

  HEADERSL = ["Marronnes", "Villes", "Bourreaux"];

  a = ["Anchaing", "Héva", "Bronchard", "Salazie"];

  b = ["Dimitile", "Sarlave", "Lautrec", "Entre-Deux"];

  c = ["Cimendef", "Marianne", "Dugain", "La Possession"];

  d = ["Mafate", "Raharianne", "Mussard", "Saint-Paul"];

  e = ["Matouté", "Simangavola", "Carron", "Cilaos"];

  SOLUTION = [a, b, c, d, e];

  $(function() {
    var html, i, j, k, key, l, len, m, n, o, p, q, r, s, t, u, value;
    html = "<tr><th colspan='2' rowspan='2'></th>";
    for (c = k = 0; k <= 2; c = ++k) {
      html += "<th colspan='5' class='categorie " + HEADERSC[c] + "'>" + HEADERSC[c] + "</th>";
    }
    html += "</tr>";
    for (c = n = 0; n <= 2; c = ++n) {
      for (i = o = 0; o <= 4; i = ++o) {
        html += "<th class='rotate " + HEADERSC[c] + "'><div><span>" + INTEGRAMME[c][i] + "</div></span></th>";
      }
    }
    for (l = p = 0; p <= 2; l = ++p) {
      for (c = q = 0; q <= 4; c = ++q) {
        if (c === 0) {
          html += "<tr><th class='rotate categorie " + HEADERSL[l] + "' rowspan='5'><div><span>" + HEADERSL[l] + "</div></span></td><th class='headerC " + HEADERSL[l] + "'>" + INTEGRAMME[3 - l][c] + "</th>";
        } else {
          html += "<tr><th class='headerC " + HEADERSL[l] + "'>" + INTEGRAMME[3 - l][c] + "</th>";
        }
        for (j = r = 0; r <= 2; j = ++r) {
          for (m = s = 0; s <= 4; m = ++s) {
            html += "<td class='cell free' data-c1='" + HEADERSC[j] + "' data-c2='" + HEADERSL[l] + "' data-l='" + c + "' data-c='" + m + "'></td>";
          }
        }
      }
      html += "</tr>";
    }
    $("body").append("<div><table id='integramme'>" + html + "</table><button id='soltoggle'>?</button>");
    $("td[data-c1='Bourreaux'][data-c2='Bourreaux']").hide();
    $("td[data-c1='Villes'][data-c2='Villes']").hide();
    $("td[data-c1='Villes'][data-c2='Bourreaux']").hide();
    html = "<table id=\"solution\">\n<tr><th>Marrons</th><th>Marronnes</th><th>Bourreaux</th><th>Villes</th></tr>";
    for (i = t = 1; t <= 5; i = ++t) {
      html += "<tr>";
      for (key in UNIVERS) {
        value = UNIVERS[key];
        html += "<td><select class='menu' name='" + key + "' id='" + key + "'><option>" + key + "</option>";
        for (u = 0, len = value.length; u < len; u++) {
          j = value[u];
          html += "<option>" + j + "</option>";
        }
        html += "</select></td>";
      }
      html += "</tr>";
    }
    $("body").prepend("<table>" + html + "</table>");
    $("#solution").prependTo("#enonce");
    $("#enonce").draggable();
    $("td").on("click", function() {
      if ($(this).hasClass("free")) {
        return $(this).toggleClass("free false");
      } else {
        if ($(this).hasClass("true")) {
          return $(this).toggleClass("true free");
        } else {
          return $(this).toggleClass("true false");
        }
      }
    });
    $("#enonce").hide();
    $("#soltoggle").on("click", function() {
      $("body").fireworks("destroy");
      return $("#enonce").toggle();
    });
    return $('.menu').selectmenu({
      change: function() {
        var good, myTableArray, ok, ref, ref1, ref2, ref3, v, w, x, y;
        myTableArray = [];
        $("table#solution tr").each(function() {
          var arrayOfThisRow, tableData;
          arrayOfThisRow = [];
          tableData = $(this).find('td');
          if (tableData.length > 0) {
            tableData.each(function() {
              return arrayOfThisRow.push($(this).find("option:selected").text());
            });
            return myTableArray.push(arrayOfThisRow);
          }
        });
        ok = true;
        for (i = v = 0, ref = myTableArray.length - 1; 0 <= ref ? v <= ref : v >= ref; i = 0 <= ref ? ++v : --v) {
          for (j = w = 0, ref1 = myTableArray.length - 1; 0 <= ref1 ? w <= ref1 : w >= ref1; j = 0 <= ref1 ? ++w : --w) {
            if (i !== j) {
              if (arrayEqual(myTableArray[i], myTableArray[j])) {
                ok = false;
              }
            }
          }
        }
        if (ok) {
          for (i = x = 0, ref2 = myTableArray.length - 1; 0 <= ref2 ? x <= ref2 : x >= ref2; i = 0 <= ref2 ? ++x : --x) {
            good = false;
            for (j = y = 0, ref3 = SOLUTION.length - 1; 0 <= ref3 ? y <= ref3 : y >= ref3; j = 0 <= ref3 ? ++y : --y) {
              if (arrayEqual(myTableArray[i], SOLUTION[j])) {
                good = true;
              }
            }
            ok = ok && good;
          }
        }
        if (ok) {
          $("body").fireworks();
          return alert("gagné");
        }
      }
    });
  });

}).call(this);
