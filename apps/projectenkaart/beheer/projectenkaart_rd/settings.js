Geogem.geoserverAutorisatie('projectenkaart_edit_app');
rapport = {};
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
                        'FASE_PERIODE'                  :   'Uitvoeringsjaar:',
                        'FASE_KWARTAAL'                 :   'Uitvoeringskwartaal:',
                        'OMSCHRIJVING'				 	: 	'Omschrijving: ',
                        'LOCATIE'						:	'(Grenzend aan) Welke straatnamen: ',
                        'WIJK'							:	'Wijk: ',
                        'GROEP'					        :	'Bij wie komt het initiatief vandaan: ',
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
                        {name:'Hoofdgroep', style:'projectenkaart_hoofdgroep_app_style'},
                        {name:'Gecontroleerd', style:'projectenkaart_gecontroleerd_app_style'},
                    ],
            filter: true,
            downloadformat: 'excel'
		  }
		},

	],

    legend: [
            //{title:"Groep" ,url:'//'+ location.host +'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=projectenkaart_hoofdgroep_app_ysld'},
            {title:"Hoofdgroep",url:'./legenda_hoofdgroep.png'},
            {title:"Gecontroleerd",url:'//'+ location.host +'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=projectenkaart_gecontroleerd_app_style'}
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

        'GECONTROLEERD': {
            TYPE: 'CHECKBOX',
            TITLE: 'Gecontroleerd',
            OPTIONS: [
                {value:'ja', title:'ja'},
                {value:'nee', title:'nee'}
            ],
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
			TITLE: 'Projectcode (ext)',
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
		},


        'HOOFDGROEP':{
			TYPE: 'SELECT',
			TITLE: 'Hoofdgroep',
            REQ: true,
            DISABLED: true,
			OPTIONS: [
                        {value:'Ruimtelijk Domein', title:'Ruimtelijk Domein'},
					]
		},

        'JAAR':{
			TITLE: 'Startjaar (ext)',
			TYPE: 'SELECT',
            REQ: true,
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



        'SHAREPOINT_LINK':{
			TITLE: 'Sharepoint link en/of zaaknummers CRM en/of RIS-nummers',
			TYPE: 'TEXTAREA',
            //FS_NAAM: true,
		},

        'ELE0-11':{CONTENT: '<script></script>',TYPE: 'ELEMENT'},

        'ELE0-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'ELE1-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary></summary>',TYPE: 'ELEMENT'},

        'OMSCHRIJVING':{
			TITLE: 'Omschrijving (ext)',
			TYPE: 'TEXTAREA',
		},

        'LOCATIE':{
			TITLE: '(Grenzend aan) Welke straatnamen (ext)',
			TYPE: 'TEXTAREA',
		},
        'WIJK':{
			TITLE: 'Wijk (ext)',
			TYPE: 'SELECT',
            OPTIONS: [
						{value:'', title:''},
                        {value:'wijk overstijgend', title:'Wijk overstijgend'},
						{value:'Batau Noord', title:'Batau Noord'},
                        {value:'Batau Zuid', title:'Batau Zuid'},
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
			TYPE: 'CHECKBOX',
			TITLE: 'Bij wie komt het initiatief vandaan',
			OPTIONS: [
                        // {value:'', title:''},
                        {value:'Bewoners', title:'Bewoners'},
                        {value:'Betere Buurten', title:'Betere Buurten'},
                        {value:'Gemeente Nieuwegein', title:'Gemeente Nieuwegein'},
                        {value:'Hoogheemraadschap de Stichtse Rijnlanden', title:'Hoogheemraadschap de Stichtse Rijnlanden'},
                        {value:'Jutphaas Wonen', title:'Jutphaas Wonen'},
                        {value:'Kabels en leidingen exploitanten', title:'Kabels en leidingen exploitanten'},
                        {value:'Mitros', title:'Mitros'},
                        {value:'Overige', title:'Overige'},
                        {value:'Portaal Utrecht', title:'Portaal Utrecht'},
                        {value:'Projectontwikkelaars', title:'Projectontwikkelaars'},
                        {value:'Provincie', title:'Provincie'},
                        {value:'Rijkswaterstaat', title:'Rijkswaterstaat'},
                        {value:'U10', title:'U10'},
					]
		},

        'SOORT_EXTERN':{
			TYPE: 'CHECKBOX',
			TITLE: 'De activiteiten/ werkzaamheden betreffen hoofdzakelijk (ext)',
			OPTIONS: [
                        {value:'Bedrijven', title:'Bedrijven'},
                        {value:'Detailhandel', title:'Detailhandel'},
                        {value:'Duurzaamheid', title:'Duurzaamheid'},
                        {value:'Horeca', title:'Horeca'},
                        {value:'Maatschappelijke gebouwen', title:'Maatschappelijke gebouwen'},
                        {value:'Onderwijs', title:'Onderwijs'},
                        {value:'Openbaar vervoer', title:'Openbaar vervoer'},
                        {value:'Parkeergarages', title:'Parkeergarages'},
                        {value:'Recreatie', title:'Recreatie'},
                        {value:'Sport', title:'Sport'},
                        {value:'Verkeer', title:'Verkeer'},
                        {value:'Water', title:'Water'},
                        {value:'Woningen', title:'Woningen'},
					]
		},

        'ELE1-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},

        'ELE2-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap no-select"><details open><summary></summary>',TYPE: 'ELEMENT'},

        'ELEA-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},

        'PROJECTLEIDER_CONTACTPERSOON':{
			TITLE: 'Projectleider/Contactpersoon, voornaam (roepnaam) en achternaam volledig uitschrijven',
			TYPE: 'TEXT',
            REQ: true,
		},

        'PROJECTLEIDER_CONTACTPERSOON_2':{
			TITLE: 'Tweede projectleider, voornaam (roepnaam) en achternaam volledig uitschrijven',
			TYPE: 'TEXT',
		},

        'RD_RO_ADVISEUR':{
			TITLE: 'RO Adviseur, voornaam (roepnaam) en achternaam volledig uitschrijven',
			TYPE: 'TEXT',
		},

        'RD_PROJECTWETHOUDER':{
			TITLE: 'Portefeuillehouder',
			TYPE: 'SELECT',
            OPTIONS: [
                {value:'', title:''},
                {value:'Hans Adriani', title:'Hans Adriani'},
                {value:'Ellie Eggengoor', title:'Ellie Eggengoor'},
                {value:'Marieke Schouten', title:'Marieke Schouten'},
                {value:'Jan Kuiper', title:'Jan Kuiper'},
                {value:'John van Engelen', title:'John van Engelen'},
                {value:'Frans Backhuijs', title:'Frans Backhuijs'},
            ]
		},

        'ELEA-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},


        'UPDATE_STATUS':{
			TITLE: 'Mailadressen voor wie er een melding moet krijgen voor een update van de gegevens (tussen de mailadressen moet een ‘;’ komen)',
			TYPE: 'TEXTAREA',
            REQ: true,
		},

        'ELE2-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},

        'ELE3-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap no-select"><details open><summary></summary>',TYPE: 'ELEMENT'},

        'ELEy-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},

        'FASE':{
			TITLE: 'Fase werkzaamheden project (ext)',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
                        {value:'Verkenningsfase', title:'Verkenningsfase'},
                        {value:'Initiatieffase', title:'Initiatieffase'},
                        {value:'Definitiefase_ontwerpfase', title:'Definitiefase/ontwerpfase'},
                        {value:'Voorbereidingsfase', title:'Voorbereidingsfase'},
                        {value:'Realisatiefase', title:'Realisatiefase'},
                        {value:'Nazorg_evaluatiefase', title:'Nazorg/evaluatiefase'},
					]
		},

        'FASE_PERIODE':{
			TITLE: 'Uitvoeringsjaar (ext)',
            TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
                        {value:'2019', title:'2019'},
                        {value:'2020', title:'2020'},
                        {value:'2021', title:'2021'},
                        {value:'2022', title:'2022'},
                        {value:'2023', title:'2023'},
                        {value:'2024', title:'2024'},
                        {value:'2025', title:'2025 en verder'},

            ]
		},

        'FASE_KWARTAAL':{
			TITLE: 'Uitvoeringskwartaal (ext)',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
                        {value:'Kwartaal 1', title:'Kwartaal 1'},
                        {value:'Kwartaal 2', title:'Kwartaal 2'},
                        {value:'Kwartaal 3', title:'Kwartaal 3'},
                        {value:'Kwartaal 4', title:'Kwartaal 4'},
            ]
		},

        'RD_FASE_WONINGBOUWMONITOR':{
			TITLE: 'Fase woningbouw tbv woningbouwmonitor',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
                        {value:'Initiatief', title:'Initiatief'},
                        {value:'In procedure_bouwvergunning', title:'In procedure / bouwvergunning'},
                        {value:'In aanbouw', title:'In aanbouw'},
                        {value:'Opgeleverd', title:'Opgeleverd'},

					]
		},

   /*
        'RD_RISICOANALYSE_CLASSIFICATIE':{
			TITLE: 'Risicoanalyse classificatie',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
					]
		},
*/
        'RD_STAKEHOLDERS':{
			TITLE: 'Stake- / shareholders (bedrijfsnamen volledig uitschrijven)',
			TYPE: 'TEXT',
		},



        'RD_FINANCIEEL':{
			TITLE: 'Financiering gemeentelijke kosten',
			TYPE: 'CHECKBOX',
            OPTIONS: [
                        {value:'Anterieure overeenkomst', title:'Anterieure overeenkomst'},
                        {value:'Financiering gemeentelijke kosten', title:'Financiering gemeentelijke kosten'},
                        {value:'Grex', title:'Grex'},
                        {value:'Leges', title:'Leges'},
					]
		},

        'ELEy-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'ELE3-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},

        'ELE4-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap no-select"><details open><summary>Programma (meerdere antwoorden zijn mogelijk)</summary>',TYPE: 'ELEMENT'},

        'ELEz-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},

        'RD_PROG_SOORTEN_GEBOUWEN':{
			TITLE: 'Soorten gebouwen',
			TYPE: 'CHECKBOX',
            OPTIONS: [
                        {value:'Buurthuis', title:'Buurthuis'},
                        {value:'Culturele functie', title:'Culturele functie'},
                        {value:'Detailhandel', title:'Detailhandel'},
                        {value:'Fabriek', title:'Fabriek'},
                        {value:'Infrastructuur', title:'Gebouw voor infrastructuur'},
                        {value:'Kantoorgebouw', title:'Kantoorgebouw'},
                        {value:'Opslag', title:'Opslag'},
                        {value:'Religieus gebouw', title:'Religieus gebouw'},
                        {value:'Woningen', title:'Woningen'},
					]
		},

        'RD_PROG_VON_PRIJZEN':{
			TITLE: 'Woonprogramma met VON prijzen',
			TYPE: 'CHECKBOX_TABLE',
            WAARDE: 'Aantal',
            OPTIONS: [
                        {value:'Onzelfstandige woningen', title:'Onzelfstandige woningen'},
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

        'ELEz-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'ELEzz-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},

        'RD_PROG_DOELGROEP':{
			TITLE: 'Doelgroep',
			TYPE: 'CHECKBOX_TABLE',
            WAARDE: 'Aantal',
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

        'ELEzz-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'ELEzzz-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},

        'RD_PROG_CATEGORIE':{
			TITLE: 'Categorie',
			TYPE: 'CHECKBOX_TABLE',
            WAARDE: 'Aantal',
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

        'RD_OPLEVERING_WONINGBOUW':{
			TITLE: 'Planning oplevering woningbouw',
			TYPE: 'SELECT',
            OPTIONS: [
                {value:'', title:''},
                {value:'2019', title:'2019'},
                {value:'2020', title:'2020'},
                {value:'2021', title:'2021'},
                {value:'2022', title:'2022'},
                {value:'2023', title:'2023'},
                {value:'2024', title:'2024'},
                {value:'2025', title:'2025 en verder'},
            ]
		},

        'ELEzzz-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'ELEzzzz-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},



        'ELEzzzz-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

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

        'ELE5-':{CONTENT: '<p>Let op dat de volgende punten gecontroleerd zijn:'+
                            '<ul><li>Schrijffouten zijn gecontroleerd</li>'+
                            '<ul><li>De projectfase woningbouw is geactualiseerd tbv de woningbouwmonitor</li>'+
        '</ul><p>',TYPE: 'ELEMENT'},
        'GECONTROLEERD':{
			TITLE: 'Gecontroleerd',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value: 'nee', title: 'Nee'},
                        {value: 'ja', title: 'Ja'}
            ]
		},

        'SCRIPT-1':{CONTENT: '<script>Geogem.projectCodeFiller();Geogem.wijzigDatum();</script>',TYPE: 'ELEMENT'},
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
        // styleMap: new OpenLayers.StyleMap({
            // "default": new OpenLayers.Style(null, {rules: [wfsRule]}),
        // }),
        //multiFilter: true,
		// ,maxResolution: 0.8
		visibility:false,
        displayInLayerSwitcher: false,
        type: 'polygon',
        snapping: true,
        //cql_filter: "HOOFDGROEP = 'Ruimtelijk Domein'"
	});


	Geogem.initWFST(wfs);

    multiFilter.filterLoader();
    console.log(wfsRule);
    wfsRule.filter = format.read("HOOFDGROEP = 'Ruimtelijk Domein'");
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
                var url = '//' + location.host + '/geoserver/wfs?request=GetFeature&typeName=projectenkaart_app&version=1.1.0&';
                url = url + "CQL_FILTER=PROJECTCODE LIKE '%" + featureHg + "%'";
                url = url.replace(/%/g, '%25' );
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
                        });
                        if (featureNumberArray.length == 0) {featureNumberArray.push('0000');}
                        var lastFeatureNumber = featureNumberArray.sort().slice(-1);
                        featureNumber = Number(lastFeatureNumber[0]) + 1 + '';
                        while (featureNumber.length < 4) {featureNumber = '0' + featureNumber;}
                    } else {
                        featureNumber = '0001';
                    }
                    $('#form_PROJECTCODE').prop('value', featureHg + '.' + featureYear + '.' + featureNumber);
                });
            }
        };
        $('#form_HOOFDGROEP, #form_JAAR').on('change', getProjectCode);
        getProjectCode();

    };

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
    };

    var jaarCheck = function() {
        var jaar = $('#form_JAAR').prop('value').slice(-2) + '';
        if (jaar === '') {
            jaar = '00';
        }
        return jaar;
    };
    
    Geogem.wijzigDatum = function() {
        setTimeout(function() {
            var d = new Date(Date.now());
            var datumNu = d.toISOString().substring(8, 10) + "-" + d.toISOString().substring(5, 7) + "-" + d.toISOString().substring(0, 4);
            $('#form_WIJZIG_DATUM').val(datumNu);
        },100)
    }
    
    $('body').arrive('.wfsform-buttonheader',function(){
        $('#formsubmit').before('<input id="open-rapport" style="width:unset; max-width:20em; margin-left:2em;" class="basic-button" onclick="" type="button" value="RISICOANALYSE">');
        $('#open-rapport').click(function() {
            $('body').append('<div class="rapport-container"><div class="rapport-body border-ng-paars border-round shadow">' +
            '<div class="rapport-buttonheader"><input id="close-rapport" class="basic-button" type="button" value="SLUIT"></div>'+
            '<div class="rapport-table__container"></div>'+
            '</div></div>');
// $(\'.rapport-container\').remove()
            $(".rapport-table__container").html('<iframe id="rapport-object" src="http://geodev.nieuwegein.nl/sql_rapport/">');

            window.addEventListener('message', postListner, false);

            function postListner(event) {
                if (event.origin !== "http://geodev.nieuwegein.nl"){
                    console.log("Denied for origin", origin);
                    return;
                }

                if (event.data === 'frameloaded') {
                    console.log('sending post');
                    var iframeFL = $('#rapport-object')[0];
                    iframeFL.contentWindow.postMessage('projectcode_' + $('#form_PROJECTCODE').val(), 'http://geodev.nieuwegein.nl');
                    // window.frames['rapport-object'].contentWindow.postMessage('projectcode_' + $('#form_PROJECTCODE').val(), 'http://geodev.nieuwegein.nl');

                } else if (event.data === 'rapportloaded') {
                    var iframeRL = $('#rapport-object')[0];
                    if ($('#print-rapport').length === 0) {
                        $('.rapport-buttonheader').append('<input id="print-rapport" class="basic-button" type="button" value="DOWNLOAD">');
                        $('#print-rapport').click(function() {
                            iframeRL.contentWindow.postMessage('printrapport', 'http://geodev.nieuwegein.nl');
                        });
                    }
                }
            }
            
            $('#close-rapport').click(removePopup);
            
            function removePopup() {
                $('.rapport-container').remove();
                window.removeEventListener('message', postListner);
            }
        });
    });

            

};
