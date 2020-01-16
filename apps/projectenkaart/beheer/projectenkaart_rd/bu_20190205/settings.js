Geogem.geoserverAutorisatie('projectenkaart_app');

Geogem.applicatieSettings = {

	overLays: [
        {
		  type: 'wms',
		  title: 'GBKNI',
		  url: '//' + location.host +'/geoserver/wms',
		  wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
		  params: {
			 layers: 'nieuwegein:GM_SP_GBKNI_LIJNEN',
			 format: 'image/png',
             query_layers: 'nieuwegein:GM_SP_GBKNI_LIJNEN'
		  },

		  options: {
			singleTile: true,   // meaning:  request only ONE tile (instead of multiple)
			visibility: false,
		  }
		},

        {
		  type: 'wms',
		  title: 'Projectenkaart',
		  url: '//' + location.host +'/geoserver/wms',
		  wmsinfoformat: 'application/vnd.ogc.gml', //'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
		  params: {
              layers: 'nieuwegein:projectenkaart_rd_app',
              format: 'image/png',
              buffer: 5,
		  },
		  fields: {
					'nieuwegein:projectenkaart_rd_app' : {
                        'PROJECTCODE'					:	'Projectcode: ',
                        'HOOFDGROEP'					:	'Hoofdgroep: ',
                        'PUBLICEREN'                    :   'Publiceren: ',
                        'JAAR'                          :   'Jaar:',
                        'OMSCHRIJVING'				 	: 	'Omschrijving: ',
                        'LOCATIE'						:	'Locatie: ',
                        'WIJK'							:	'Wijk: ',
                        'GROEP'					        :	'Wie/Team: ',
                        'SOORT'                         :   'Wat:',
                        'PROJECTLEIDER_CONTACTPERSOON'	:	'Projectleider/Contactpersoon: ',
                        'PROJECTLEIDER_CONTACTPERSOON_2':	'Vervangend Projectleider/Contactpersoon: ',
                        'RD_RO_ADVISEUR'                :	'RO Adviseur: ',
                        'RD_PROJECTWETHOUDER'           :	'Project Wethouder: ',
                        'CHECK_DOOR_COLLEGA'	        :	'Check door collega: ',
                        'UPDATE_STATUS'	                :	'Mailadressen voor update: ',
                        'FASE'			        		:	'Fase: ',
                        'RD_RISICOANALYSE_CLASSIFICATIE':	'Risicoanalyse: ',
                        'RD_STAKEHOLDERS'               :	'Stakeholders: ',
                        'RD_FINANCIEEL'                 :	'Financieel: ',
                        'RD_PROG_SOORTEN_GEBOUWEN'      :	'Programma - Soorten Gebouwen: ',
                        'RD_PROG_VON_PRIJZEN'           :	'Programma - VON Prijzen: ',
                        'RD_PROG_DOELGROEP'             :	'Programma - Doelgroep: ',
                        'RD_PROG_BOUWVORM'              :	'Programma - Bouwvorm: ',
                        'RD_PROG_CATEGORIE'             :	'Programma - Categorie: ',
                        'RD_PROG_GROND'			        :	'Programma - Grond: ',
                        'RD_PROG_TIJDELIJK_PERMANENT'   :	'Programma - Tijdelijk/Permanent: ',
					}
		  },
		  options: {
			singleTile: true,   // meaning:  request only ONE tile (instead of multiple)
			visibility: true,
            styles: [
                        {name:'Hoofdgroep', style:'projectenkaart_hoofdgroep_app_ysld'},
                        {name:'Groep', style:'projectenkaart_groep_app_style'},
                        {name:'Soort', style:'projectenkaart_soort_app_ysld'},
                    ],
            filter: true,
		  }
		},

	],

    legend: [
            {title:"Groep" ,url:'//'+ location.host +'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=projectenkaart_hoofdgroep_app_ysld'},
            {title:"Hoofdgroep",url:'//'+ location.host +'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=projectenkaart_hoofdgroep_app_style'},
            {title:"Soort",url:'//'+ location.host +'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=projectenkaart_soort_app_ysld'}
        ],



	sidebar: true,

    infoUrl: './info.html',

    styleSwitcher: true,

    formContainer: true,

    multiFilter: [{


        'PROJECTCODE': {
            TYPE: 'TEXT',
            TITLE: 'Projectcode',
        },

        'JAAR': {
            TYPE: 'TEXT',
            TITLE: 'Jaar',
        },

    }],
};

Geogem.applicatieInit = function(){

	layermanager = new OpenLayers.Control.LayerSwitcher();
	Geogem.map.addControl(layermanager);
	layermanager.activate();
	layermanager.maximizeControl();

	$('#Kaart').click();

	Geogem.map.getLayersByName('Kaart')[0].setOpacity(0.5);



    Geogem.featureTypes = {
		'FID':{
            TITLE: 'FID',
            TYPE: 'ID'
		},

        'ELE0-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},

        'PROJECTCODE':{
			TITLE: 'Projectcode',
			TYPE: 'TEXT',
            REQ: true,
            DISABLED: true,
            //FS_NAAM: true,
		},

        'PUBLICEREN':{
			TITLE: 'Publiceren',
			TYPE: 'SELECT',
            REQ: true,
            OPTIONS: [
                        {value: 'nee', title: 'Nee'},
                        {value: 'ja', title: 'Ja'}
            ]
            //FS_NAAM: true,
		},

        'HOOFDGROEP':{
			TYPE: 'SELECT',   // 'RADIO' of 'SELECT'
			TITLE: 'Hoofdgroep',
            REQ: true,
            DISABLED: true,
			OPTIONS: [
                        {value:'Ruimtelijk Domein', title:'Ruimtelijk Domein'},
                        {value:'Extern', title:'Extern'},
                        {value:'Openbaar Domein', title:'Openbaar Domein'},
                        {value:'Provincie', title:'Provincie'},
                        {value:'Rijkswaterstaat', title:'Rijkswaterstaat'},
                        {value:'Sociaal Domein', title:'Sociaal Domein'},
                        {value:'TVL', title:'TVL'},
                        {value:'Waterschap', title:'Waterschap'},
                        {value:'Wijkcoordinatoren', title:'Wijkcoördinatoren'},
                        {value:'Wooncorporaties', title:'Wooncorporaties'},
					]
		},

        'JAAR':{
			TITLE: 'Jaar',
			TYPE: 'SELECT',
            OPTIONS: [
                    {value:'', title:''},
                    {value:'2017', title:'2017'},
                    {value:'2018', title:'2018'},
                    {value:'2019', title:'2019'},
                    {value:'2020', title:'2020'},
                    {value:'2021', title:'2021'},
                    {value:'2022', title:'2022'},
                    {value:'2023', title:'2023'},
                    {value:'2024', title:'2024'},
                    {value:'2025', title:'2025'},
                    {value:'2026', title:'2026'},
                    {value:'2027', title:'2027'},
                    {value:'2028', title:'2028'},
                    {value:'2029', title:'2029'},
                    {value:'2030', title:'2030'},
                    {value:'2031', title:'2031'},
                    {value:'2032', title:'2032'},
                    {value:'2033', title:'2033'},
                    {value:'2034', title:'2034'},
                    {value:'2035', title:'2035'},
                    {value:'2036', title:'2036'},
                    {value:'2037', title:'2037'},
                ]
		},

        'ELE0-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'ELE1-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary></summary>',TYPE: 'ELEMENT'},

        'OMSCHRIJVING':{
			TITLE: 'Omschrijving',
			TYPE: 'TEXTAREA',
		},

        'LOCATIE':{
			TITLE: 'Locatie',
			TYPE: 'TEXTAREA',
		},
        'WIJK':{
			TITLE: 'Wijk',
			TYPE: 'SELECT',
            OPTIONS: [
						{value:'', title:''},
                        {value:'wijk overstijgend', title:'Wijk overstijgend'},
						{value:'Batau Noord', title:'Batau Noord'},
                        {value:'Batau Zuid', title:'Batau Noord'},
						{value:'Blokhoeve', title:'Blokhoeve'},
                        {value:'De Wiers', title:'De Wiers'},
                        {value:'Doorslag', title:'Doorslag'},
                        {value:'Fokkesteeg', title:'Fokkesteeg'},
                        {value:'Galecop', title:'Galecop'},
                        {value:'Het Klooster', title:'Het Klooster'},
                        {value:'Hoge Landen', title:'Hoge Landen'},
                        {value:'Hoogzandveld', title:'Hoogzandveld'},
                        {value:'Huis de Geer', title:'Huis de Geer'},
                        {value:'Jutphaas Wijkersloot', title:'Jutphaas Wijkersloot'},
                        {value:'Laagraven', title:'Laagraven'},
                        {value:'Lekboulevard', title:'Lekboulevard'},
                        {value:'Merwestein', title:'Merwestein'},
                        {value:'Park Oudegein', title:'Park Oudegein'},
                        {value:'Plettenburg', title:'Plettenburg'},
                        {value:'Rijnhuizen', title:'Rijnhuizen'},
                        {value:'Stadscentrum', title:'Stadscentrum'},
                        {value:'Vreeswijk', title:'Vreeswijk'},
                        {value:'Zandveld', title:'Zandveld'},
                        {value:'Zuilenstein', title:'Zuilenstein'},
					]
		},

        'GROEP':{
			TYPE: 'SELECT',   // 'RADIO' of 'SELECT'
			TITLE: 'Wie/Team',
			OPTIONS: [
                        {value:'', title:''},
                        {value:'Bewonersinitiatieven', title:'Bewonersinitiatieven'},
                        {value:'Betere Buurten', title:'Betere Buurten'},
                        {value:'Hoogheemraadschap de Stichtse Rijnlanden', title:'Hoogheemraadschap de Stichtse Rijnlanden'},
                        {value:'Jutphaas Wonen', title:'Jutphaas Wonen'},
                        {value:'Kabels en leidingen exploitanten', title:'Kabels en leidingen exploitanten'},
                        {value:'Mitros', title:'Mitros'},
                        {value:'Overige', title:'Overige'},
                        {value:'Portaal Utrecht', title:'Portaal Utrecht'},
                        {value:'Projectontwikkelaars', title:'Projectontwikkelaars'},
                        {value:'Provincie', title:'Provincie'},
                        {value:'Rijkswaterstaat', title:'Rijkswaterstaat'},
                        {value:'Ruimtelijke ontwikkeling', title:'Ruimtelijke ontwikkeling'},
                        {value:'U10', title:'U10'},
                        {value:'Veiligheidsregio Utrecht', title:'Veiligheidsregio Utrecht'},
                        {value:'Wijkcoördinatoren', title:'Wijkcoördinatoren'},
					]
		},

        'SOORT':{
			TYPE: 'SELECT',   // 'RADIO' of 'SELECT'
			TITLE: 'Wat',
			OPTIONS: [
                        {value:'', title:''},
                        {value:'Bewonersinitatieven', title:'Bewonersinitatieven'},
                        {value:'Gebiedsontwikkeling', title:'Gebiedsontwikkeling'},
                        {value:'Groen', title:'Groen'},
                        {value:'Kabels en leidingen', title:'Kabels en leidingen'},
                        {value:'Kunstwerken', title:'Kunstwerken'},
                        {value:'Overige', title:'Overige'},
                        {value:'Regiotram', title:'Regiotram'},
                        {value:'Riool', title:'Riool'},
                        {value:'Verkeer', title:'Verkeer'},
                        {value:'Water', title:'Water'},
                        {value:'Woningbouw', title:'Woningbouw'},
                        {value:'Woningbouwontwikkeling', title:'Woningbouwontwikkeling'},
					]
		},
        
        'SOORT_EXTERN':{
			TYPE: 'SELECT',   // 'RADIO' of 'SELECT'
			TITLE: 'Wat Extern',
			OPTIONS: [
                        {value:'', title:''},
                        {value:'Groen', title:'Groen'},
                        {value:'Kabels en leidingen', title:'Kabels en leidingen'},
                        {value:'Riool', title:'Riool'},
                        {value:'Stoep_straat', title:'Stoep_straat'},
                        {value:'Verkeer', title:'Verkeer'},
                        {value:'Water', title:'Water'},
                        {value:'Woningbouw', title:'Woningbouw'},
                        {value:'Woningbouwontwikkeling', title:'Woningbouwontwikkeling'},
					]
		},

        'ELE1-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},

        'ELE2-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap no-select"><details open><summary></summary>',TYPE: 'ELEMENT'},

        'ELEA-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},

        'PROJECTLEIDER_CONTACTPERSOON':{
			TITLE: 'Projectleider/Contactpersoon',
			TYPE: 'TEXT',
            REQ: true,
		},

        'PROJECTLEIDER_CONTACTPERSOON_2':{
			TITLE: 'Tweede projectleider',
			TYPE: 'TEXT',
		},

        'RD_RO_ADVISEUR':{
			TITLE: 'RO Adviseur',
			TYPE: 'TEXT',
		},

        'RD_PROJECTWETHOUDER':{
			TITLE: 'Project wethouder',
			TYPE: 'TEXT',
		},

        'ELEA-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'CHECK_DOOR_COLLEGA':{
			TITLE: 'Check door collega',
			TYPE: 'TEXTAREA',
		},

        'UPDATE_STATUS':{
			TITLE: 'Mailadressen voor update, puntkomma gescheiden voor meerdere adressen',
			TYPE: 'TEXTAREA',
            REQ: true,
		},

        'ELE2-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},

        'ELE3-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap no-select"><details open><summary></summary>',TYPE: 'ELEMENT'},

        'ELEy-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},

        'FASE':{
			TITLE: 'Fase',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
                        {value:'Loketfase', title:'Loketfase'},
                        {value:'Initatieffase', title:'Initatieffase'},
                        {value:'Haalbaarheidsfase', title:'Haalbaarheidsfase'},
                        {value:'Contractfase', title:'Contractfase'},
                        {value:'Voorbereidingsfase', title:'Voorbereidingsfase'},
                        {value:'Definitiefase_ontwerpfase', title:'Definitiefase/ontwerpfase'},
                        {value:'Realisatiefase', title:'Realisatiefase'},
                        {value:'Nazorg_evaluatiefase', title:'Nazorg / evaluatiefase'},
					]
		},

        'RD_RISICOANALYSE_CLASSIFICATIE':{
			TITLE: 'Risicoanalyse classificatie',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
					]
		},

        'RD_STAKEHOLDERS':{
			TITLE: 'Stakeholders',
			TYPE: 'TEXT',
		},

        'RD_FINANCIEEL':{
			TITLE: 'Financieel',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
					]
		},

        'ELEy-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'ELE3-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},

        'ELE4-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap no-select"><details open><summary>Programma</summary>',TYPE: 'ELEMENT'},

        'ELEz-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},

        'RD_PROG_SOORTEN_GEBOUWEN':{
			TITLE: 'Soorten gebouwen',
			TYPE: 'CHECKBOX',
            OPTIONS: [
                        {value:'Buurthuis', title:'Buurthuis'},
                        {value:'Culturele functie', title:'Culturele functie'},
                        {value:'Detailhandel', title:'Detailhandel'},
                        {value:'Fabriek', title:'Fabriek'},
                        {value:'Infrastructuur', title:'Infrastructuur'},
                        {value:'Kantoorgebouw', title:'Kantoorgebouw'},
                        {value:'Opslag', title:'Opslag'},
                        {value:'Religieus gebouw', title:'Religieus gebouw'},
                        {value:'Woningen', title:'Woningen'},
					]
		},

        'RD_PROG_VON_PRIJZEN':{
			TITLE: 'Programma met VON prijzen',
			TYPE: 'CHECKBOX',
            OPTIONS: [
                        {value:'Sociale huur', title:'Sociale huur'},
                        {value:'Midden huur tot 900', title:'Midden huur € 710,- tot € 900,-'},
                        {value:'Vrije sector huur', title:'Vrije sector huur'},
                        {value:'Sociale koopwoningen tot 200000', title:'Sociale koopwoningen (tot € 200.000,-)'},
                        {value:'Koopwoningen 200000 tot 300000', title:'Koopwoningen € 200.000,- tot € 300.000,-'},
                        {value:'Koopwoningen 300000 tot 400000', title:'Koopwoningen € 300.000,- tot  400.000,-'},
                        {value:'Koopwoningen 400000', title:'Koopwoningen > € 400.000,-'},
                        {value:'Koopprijs onbekend', title:'Koopprijs onbekend'},
					]
		},

        'ELEz-3':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'RD_PROG_DOELGROEP':{
			TITLE: 'Doelgroep',
			TYPE: 'CHECKBOX',
            OPTIONS: [
                        {value:'Niet van toepassing', title:'Niet van toepassing'},
                        {value:'Seniorenwoningen', title:'Seniorenwoningen'},
                        {value:'Starterswoningen', title:'Starterswoningen'},
                        {value:'Stijgers', title:'Stijgers'},
                        {value:'Zorgwoningen', title:'Zorgwoningen'},
					]
		},

        'RD_PROG_BOUWVORM':{
			TITLE: 'Bouwvorm',
			TYPE: 'CHECKBOX',
            OPTIONS: [
                        {value:'Alleen nieuwbouw', title:'Alleen nieuwbouw'},
                        {value:'Sloop nieuwbouw', title:'Sloop/nieuwbouw'},
                        {value:'Transformatie', title:'Transformatie'},
					]
		},

        'RD_PROG_CATEGORIE':{
			TITLE: 'Categorie',
			TYPE: 'CHECKBOX',
            OPTIONS: [
                        {value:'Grondgebonden', title:'Grondgebonden'},
                        {value:'Gestapeld', title:'Gestapeld'},
					]
		},

        'RD_PROG_GROND':{
			TITLE: 'Grond',
			TYPE: 'CHECKBOX',
            OPTIONS: [
                        {value:'Gemeente', title:'Gemeente'},
                        {value:'Particulier', title:'Particulier'},
					]
		},


        'RD_PROG_TIJDELIJK_PERMANENT':{
			TITLE: 'Tijdelijk of permanent',
			TYPE: 'CHECKBOX',
            OPTIONS: [
                        {value:'Permanent', title:'Permanent'},
                        {value:'Tijdelijk', title:'Tijdelijk'},
					]
		},

        'ELEz-3':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'ELE4-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},

        'GEWIJZIGD':{
			TITLE: 'Object gewijzigd',
            VALUE: 'ja',
			TYPE: 'HIDDEN'
		},
        'WIJZIG_DATUM':{
			TITLE: 'Wijzig datum',
			TYPE: 'DATUM',
            HIDDEN: true,
		},

        'SCRIPT-1':{CONTENT: '<script>Geogem.projectCodeFiller();</script>',TYPE: 'ELEMENT'},
	};

    wfs = new OpenLayers.Layer.Vector("Projectenkaart edit", {
        strategies: [new OpenLayers.Strategy.BBOX(), Geogem.saveStrategy],
		projection: new OpenLayers.Projection("EPSG:28992"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0",
            srsName: "EPSG:28992",
            url: '//' + location.host + '/geoserver/ows',
            featureNS: 'http://www.nieuwegein.nl',
            featureType: 'projectenkaart_edit_app',
            geometryName: 'GEOM',
            params: {}
		}),
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style(null, {rules: [wfsRule]})
        }),
        //multiFilter: true,
		// ,maxResolution: 0.8
		visibility:false,
        displayInLayerSwitcher: false,
        type: 'multi',
        snapping: true,
        cql_filter: "HOOFDGROEP = 'Ruimtelijk Domein'"
	});



	Geogem.initWFST(wfs);

    multiFilter.filterLoader();

    wfsRule.filter = format.read("HOOFDGROEP = 'Ruimtelijk Domein'")
    $('.point_icon').remove();

    $('#legendhead').click();

    Geogem.projectCodeFiller = function() {
        var newFeature = false;
        if ($('#form_PROJECTCODE').prop('value') === "") {
            newFeature = true;
        }
        var getProjectCode = function() {
            if (newFeature === true) {
                var featureHg = hoofdGroepCheck();
                var featureYear = jaarCheck();
                var featureNumber = 0;
                var featureCount = 0;
                var url = 'http://gng-ap713.nieuwegein.nl/geoserver/wfs?request=GetFeature&typeName=projectenkaart_app&version=1.1.0&';
                url = url + "CQL_FILTER=PROJECTCODE LIKE '%" + featureHg + "%'";
                url = url.replace(/%/g, '%25' )
                $.get(url, function(xml) {
                    var response = $(xml.documentElement.attributes);
                    Geogem.xml = xml;
                    Geogem.response = $.parseXML(xml.children);
                    for (var i = 0, len = response.length; i < len; i++ ) {
                        if (response[i].name == 'numberOfFeatures') {
                            featureCount = response[i].nodeValue;
                        }
                    }
                    if (featureCount != 0) {
                        var featureList = Geogem.xml.getElementsByTagName('gml:featureMembers')[0];
                        var featureNodes = featureList.childNodes;
                        var featureNumberArray = [];
                        $.each(featureNodes, function(index, item) {
                            var regex = /(.*)\.(.*)\.(.*)/;
                            var projectCode = item.getElementsByTagName('nieuwegein:PROJECTCODE')[0].textContent;
                            if (regex.test(projectCode)) {
                                if  (projectCode.slice(-7,-5) == featureYear) {
                                    featureNumberArray.push(projectCode.slice(-4));
                                }

                            }
                        })
                        if (featureNumberArray.length == 0) {featureNumberArray.push('0000')}
                        var lastFeatureNumber = featureNumberArray.sort().slice(-1);
                        featureNumber = Number(lastFeatureNumber[0]) + 1 + '';
                        while (featureNumber.length < 4) {featureNumber = '0' + featureNumber;}
                    } else {
                        featureNumber = '0001';
                    }
                    $('#form_PROJECTCODE').prop('value', featureHg + '.' + featureYear + '.' + featureNumber);
                })
            }
        }
        $('#form_HOOFDGROEP, #form_JAAR').on('change', getProjectCode)
        getProjectCode();

    }

    var hoofdGroepCheck = function() {
            var hoofdgroep = $('#form_HOOFDGROEP').prop('value');
            if (hoofdgroep === 'Extern') {
                return 'EXT';
            } else if (hoofdgroep === 'Openbaar Domein') {
                return 'OD';
            } else if (hoofdgroep === 'Provincie') {
                return 'PRV';
            } else if (hoofdgroep === 'Rijkswaterstaat') {
                return 'RWS';
            } else if (hoofdgroep === 'Ruimtelijk Domein') {
                return 'RD';
            } else if (hoofdgroep === 'Sociaal Domein') {
                return 'SD';
            } else if (hoofdgroep === 'TVL') {
                return 'TVL';
            } else if (hoofdgroep === 'Waterschap') {
                return 'WS';
            } else if (hoofdgroep === 'Wijkcoordinatoren') {
                return 'WIJCO';
            } else if (hoofdgroep === 'Wooncorporaties') {
                return 'WNCRP';
            } else {
                return '__';
            }
    }

    var jaarCheck = function() {
        var jaar = $('#form_JAAR').prop('value').slice(-2) + '';
        if (jaar === '') {
            jaar = '00';
        }
        return jaar;
    }
};
