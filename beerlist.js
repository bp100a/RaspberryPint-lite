
beer_list = [
    {
         "TAP": 3, "OG": "1.098", "FG": "1.022", "SRM": "9.7", "IBU": "60",
         "NAME": "Wheat Wine", "DESCRIPTION": "excess for barrel project",
         "STYLE": "Barley Wine", "BREWDATE": "20171226"
    },

    {
        "TAP": 4, "OG": "1.060", "FG": "1.020", "SRM": "5.0", "IBU": "19.2",
        "NAME": "Oud Bruin", "DESCRIPTION": "yeast cake & lactos culture",
        "STYLE": "Oud Bruin", "BREWDATE": "20171202"
    },

    {
        "TAP": 5, "OG": "1.098", "FG": "1.022", "SRM": "10", "IBU": "60",
        "NAME": "Barrel Wheat Wine", "DESCRIPTION": "wheat wine, barrel aged at Steve Ashtons",
        "STYLE": "Barley Wine", "BREWDATE": "20171226"
    },


    {
        "TAP": 6, "OG": "1.092", "FG": "1.018", "SRM": "23.7", "IBU": "19.34",
        "NAME": "Barrel Dark Strong", "DESCRIPTION": "aged 4 months in a wine barrel",
        "STYLE": "Belgian Dark Strong Ale", "BREWDATE": "20171122"
    },

    {
        "TAP": 7, "OG": "1.062", "FG": "1.014", "SRM": "15.8", "IBU": "10.5",
        "NAME": "St. Claire's Flanders Red", "DESCRIPTION": "a basic flanders red",
        "STYLE": "Flanders Red", "BREWDATE": "20180219"
    },


    {
        "TAP": 8, "OG": "1.046", "FG": "1.010", "SRM": "4.7", "IBU": "31.34",
        "NAME": "Hungus Witbier", "DESCRIPTION": "A beer brewed for Hungusfest 2018",
        "STYLE": "Belgian Witbier", "BREWDATE": "20171219"
    }

];

/*
    {
         "TAP": 3, "OG": "1.092", "FG": "1.018", "SRM": "23.7", "IBU": "19.34",
         "NAME": "Mike's Dark Strong", "DESCRIPTION": "No off flavors, moderately aged. Lacking complexity",
         "STYLE": "Belgian Dark Strong Ale"
    },

*/

function add_tap(tapnum){
    /* Here's what we are adding to this table cell
        <td class="tap-num">
            <span class="tapcircle">1</span>
        </td>
    */
    var td = document.createElement("td");
    td.className = "tap-num";
    span = document.createElement("span");
    span.className = "tapcircle";
    span.innerHTML = tapnum;
    td.appendChild(span);
    return td;
}

function add_bitterness(ibu, og, fg){
    /*
            <td class="ibu">
                <h3>
                    0.21
                    BU:GU
                </h3>
                <div class="ibu-container">
                    <div class="ibu-indicator">
                        <div class="ibu-full" style="height:18%"></div>
                    </div>
                </div>
                <h2>18 IBU</h2>
            </td>
    */
    td = document.createElement("td");

    td.className = "ibu";
    h3 = document.createElement("h3");
    /*
        Calculate the BU:GU 
        BU - bitterness units
        GU - gravity units

	    if( $beer['og'] > 1 ){
		    echo number_format((($beer['ibu'])/(($beer['og']-1)*1000)), 2, '.', '');
	    }else{
		    echo '0.00';    */
    if (og > 1.0) {
        bugu = ((og - 1.0) *100.0) / ibu;
    } else { bugu = 0.0; }

    h3.appendChild(document.createTextNode(bugu.toFixed(2) + " BU:GU"));
    td.appendChild(h3);

    div_container = document.createElement("div");
    div_container.className = "ibu-container";
    div_indicator = document.createElement("div");
    div_indicator.className = "ibu-indicator";
    div_full = document.createElement("div");
    div_full.className = "ibu-full";
    if (ibu > 100) { level = 100; }
    else { level = ibu;}
    div_full.style = "height:" + level + "%";
    div_indicator.appendChild(div_full);
    div_container.appendChild(div_indicator);
    td.appendChild(div_container);
    h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(ibu + " IBU"));
    td.appendChild(h2);

    return td;
}

function add_color(srm, og, fg){
    /*
        <td class="srm">
            <h3>1.084 OG</h3>
            <div class="srm-container">
                <div class="srm-indicator" style="background-color: rgb(213,188,38)"></div>
                <div class="srm-stroke"></div>
            </div>
            <h2>6.0 SRM</h2>
        </td>
    */
    var td = document.createElement("td");
    td.className = "srm";
    h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(og));
    td.appendChild(h3);

    div_container = document.createElement("div");
    div_container.className = "srm-container";
    div_indicator = document.createElement("div");
    div_indicator.className = "srm-indicator";

    // look up the SRM value
    rgb = srm_to_rgb[srm]
    div_indicator.style = "background-color: rgb(" + rgb + ")";
    div_stroke = document.createElement("div");
    div_stroke.className = "srm-stroke";
    div_container.appendChild(div_indicator);
    div_container.appendChild(div_stroke);
    td.appendChild(div_container)
    h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(srm + " SRM"));
    td.appendChild(h2);

    return td;
}

function lookup_bjcp2015_style(bstyle) {
    for (var i = 0; i < bjcp2015.length; i++) {
        if (bjcp2015[i]['style'] == bstyle) {
            style = bjcp2015[i]['style'] + ' ' + bjcp2015[i]['category'] + bjcp2015[i]['subcategory'];
            return style;
        }
    }

    return bstyle;
}

function add_beername(bname, bstyle, bdesc, brewdate) {
    /*
        <td class="name">
            <h1>Barrel Aged Imperial Saison</h1>
            <h2 class="subhead">Saison</h2>
            <p>This came out awesome! More like a chardonnay when still. The oak aging mellowed out the harsh flavors of the original Saison. This is an &quot;Imperial&quot;, and packs a punch! The intense fruity flavors are not a flaw, they were carefully cultivated.</p>
        </td>
    */

    // Dates are formated: YYYYMMDD
    //                     01234567
    year = brewdate.substring(0, 4);
    month = brewdate.substring(4, 6);
    day = brewdate.substring(6, 8);

    td = document.createElement("td");
    td.className = "name";
    td.contentEditable = true;

    h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(bname));
    td.appendChild(h1);

    h2 = document.createElement("h2");
    h2.className = "subhead";
    style = lookup_bjcp2015_style(bstyle); // get bjcp category & subcategory if available
    h2.appendChild(document.createTextNode(style));
    td.appendChild(h2);

    h2 = document.createElement("h2");
    h2.className = "subhead";
    h2.appendChild(document.createTextNode("Brewed on : " + month + "/" + day + "/" + year));
    td.appendChild(h2);

    p = document.createElement("p");
    p.appendChild(document.createTextNode(bdesc));
    td.appendChild(p);

    return td;
}

function add_calories(og, fg, abv, calories){
    /*
        <td class="abv">
            <h3>283 kCal</h3>
            <div class="abv-container">
                <div class="abv-indicator">
                    <div class="abv-full" style="height:100%"></div>
                </div>
                <div class="abv-indicator">
                    <div class="abv-full" style="height:100%"></div>
                </div>
                <div class="abv-offthechart"></div>
            </div>
            <h2>10.5% ABV</h2>
        </td>
    */
    if (abv == undefined) { abv = ((og - fg) * 131.25).toFixed(1); };
    if (calories == undefined) {
        calories_alcohol = 1881.22 * fg * (og - fg) / (1.775 - og);
        calories_carbohydrates = 3550.0 * fg * ((0.1808 * og) + (0.8192 * fg) - 1.0004);
        calories = (calories_alcohol + calories_carbohydrates).toFixed(0);
    };

    td = document.createElement("td");
    td.className = "abv";
    h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(calories+" kCal"));
    td.appendChild(h3);

    div_container = document.createElement("div");
    div_container.className = "abv-container";
    div_indicator = document.createElement("div");
    div_indicator.className = "abv-indicator";

    // for each 5% alcohol indicate a full glass, up to 2 glasses
    // if over 10% then 2 full glasses and an "over" glass on it's side
    if (abv > 5.0) {
        level = 100;
    } else { level = (abv /5.0) * 100.0;}
    div_full = document.createElement("div");
    div_full.className = "abv-full";
    div_full.style = "height:" + level + "%";
    div_indicator.appendChild(div_full);
    div_container.appendChild(div_indicator);

    if (abv > 5.0) {
        second_glass = abv - 5.0;
        if (second_glass > 5.0) {
            level = 100;
        } else { level = (second_glass/ 5.0) * 100.0;}
        div_secondglass = document.createElement("div");
        div_secondglass.className = "abv-full";
        div_secondglass.style = "height:" + level + "%";
        div_indicator2 = document.createElement("div");
        div_indicator2.className = "abv-indicator";
        div_indicator2.appendChild(div_secondglass);
        div_container.appendChild(div_indicator2);
    }
    if (abv > 10.0) {
        div_offthechart = document.createElement("div");
        div_offthechart.className = "abv-offthechart";
        div_container.appendChild(div_offthechart);
    }

    td.appendChild(div_container);
    h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(abv + "% ABV"));
    td.appendChild(h2);
    return td;
}

function display_beers() {
    j_beers = beer_list;

    // j_beers is a json list of beers
    var tblbody = document.getElementById("tblbody_beers");
    for (var i = 0; i < j_beers.length; i++) {
        var row = document.createElement("tr");
        if (i & 0x1) {
            row.className = "altrow";
        }

        row.appendChild(add_tap(j_beers[i]["TAP"]));
        row.appendChild(add_color(j_beers[i]["SRM"],j_beers[i]["OG"], j_beers[i]["FG"]));
        row.appendChild(add_bitterness(j_beers[i]["IBU"], j_beers[i]["OG"], j_beers[i]["FG"]));
        row.appendChild(add_beername(j_beers[i]["NAME"], j_beers[i]["STYLE"], j_beers[i]["DESCRIPTION"], j_beers[i]["BREWDATE"]));
        row.appendChild(add_calories(j_beers[i]["OG"], j_beers[i]["FG"], j_beers[i]["ABV"], j_beers[i]["CALORIES"]));

        tblbody.appendChild(row);
    }
}
