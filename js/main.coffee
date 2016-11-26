arrayEqual = (a, b) -> a.length is b.length and a.every (elem, i) -> elem is b[i]

UNIVERS =
  "Marrons": ["Anchaing", "Dimitile", "Cimendef", "Mafate", "Matouté"]
  "Marronnes" : ["Héva", "Marianne", "Raharianne", "Simangavola", "Sarlave"]
  "Bourreaux": ["Dugain", "Mussard", "Carron", "Bronchard", "Lautrec"]
  "Villes": ["Entre-Deux", "Salazie", "Cilaos", "Saint-Paul", "La Possession"]

INTEGRAMME = [ UNIVERS["Marrons"], UNIVERS["Bourreaux"], UNIVERS["Villes"], UNIVERS["Marronnes"] ]
HEADERSC = ["Marrons", "Bourreaux", "Villes"]
HEADERSL = ["Marronnes", "Villes", "Bourreaux"]

a = ["Anchaing", "Héva", "Bronchard", "Salazie"]
b = ["Dimitile", "Sarlave", "Lautrec", "Entre-Deux"]
c = ["Cimendef", "Marianne", "Dugain", "La Possession"]
d = ["Mafate", "Raharianne", "Mussard", "Saint-Paul"]
e = ["Matouté", "Simangavola", "Carron", "Cilaos"]
SOLUTION = [a, b ,c , d, e]

$ ->    
  html = "<tr><th colspan='2' rowspan='2'></th>"
  for c in [0..2]
    html +="<th colspan='5' class='categorie #{HEADERSC[c]}'>#{HEADERSC[c]}</th>"
  html += "</tr>"
  for c in [0..2]
    for i in [0..4]
      html +="<th class='rotate #{HEADERSC[c]}'><div><span>#{INTEGRAMME[c][i]}</div></span></th>"
 
  for l in [0..2]    
    for c in [0..4]
      if c is 0
        html +="<tr><th class='rotate categorie #{HEADERSL[l]}' rowspan='5'><div><span>#{HEADERSL[l]}</div></span></td><th class='headerC #{HEADERSL[l]}'>#{INTEGRAMME[3-l][c]}</th>"
      else
        html +="<tr><th class='headerC #{HEADERSL[l]}'>#{INTEGRAMME[3-l][c]}</th>"
      for j in [0..2] 
        html +="<td class='cell free' data-c1='#{HEADERSC[j]}' data-c2='#{HEADERSL[l]}' data-l='#{c}' data-c='#{m}'></td>" for m in [0..4]
    html += "</tr>"   
  $( "body" ).append "<div><table id='integramme'>#{html}</table><button id='soltoggle'>?</button>"
  $( "td[data-c1='Bourreaux'][data-c2='Bourreaux']").hide()
  $( "td[data-c1='Villes'][data-c2='Villes']").hide()
  $( "td[data-c1='Villes'][data-c2='Bourreaux']").hide()  
  
  
  html = """<table id="solution">
    <tr><th>Marrons</th><th>Marronnes</th><th>Bourreaux</th><th>Villes</th></tr>
  """
  for i in [1..5]
    html += "<tr>"
    for key, value of UNIVERS
      html +="<td><select class='menu' name='#{key}' id='#{key}'><option>#{key}</option>"
      for j in value
        html+= "<option>#{j}</option>"
      html+= "</select></td>"
    html += "</tr>"   
  $( "body" ).prepend "<table>#{html}</table>"
  
  $( "#solution" ).prependTo "#enonce"
  $( "#enonce" ).draggable()
   
  $( "td" ).on "click", ->
    if $( this ).hasClass "free"
      $( this ).toggleClass "free false"
    else
      if $( this ).hasClass "true"
        $( this ).toggleClass "true free"
      else
        $( this ).toggleClass "true false"
  
  $( "#enonce" ).hide()      
  $( "#soltoggle" ).on "click", -> $( "#enonce" ).toggle()
 
  $('.menu').selectmenu
    change:  ->
      myTableArray = []
      $("table#solution tr").each ->
        arrayOfThisRow = []
        tableData = $(this).find('td')
        if (tableData.length > 0) 
          tableData.each -> arrayOfThisRow.push($(this).find("option:selected").text())
          myTableArray.push(arrayOfThisRow)
      ok = true
      for i in [0..myTableArray.length-1]
        for j in [0..myTableArray.length-1]
          if i isnt j
            ok = false if arrayEqual myTableArray[i], myTableArray[j]     
      if ok
        for i in [0..myTableArray.length-1]
          good = false
          for j in [0..SOLUTION.length-1]
            good = true if arrayEqual myTableArray[i], SOLUTION[j]         
          ok = ok and good
      alert "gagné" if ok

