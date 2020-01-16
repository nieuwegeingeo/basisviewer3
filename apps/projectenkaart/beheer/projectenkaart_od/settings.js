Geogem.geoserverAutorisatie('projectenkaart_edit_app');

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
              layers: 'nieuwegein:projectenkaart_od_app',
              format: 'image/png',
              buffer: 5,
		  },
		  fields: {
					'nieuwegein:projectenkaart_app' : {

					'PROJECTCODE'					:	'Projectcode: ',
					'FASE'			        		:	'Fase: ',
					'STATUS'			        	:	'Status: ',
                    'HOOFDGROEP'					:	'Hoofdgroep: ',
                    'GROEP'					        :	'Wie/Team: ',
                    'SOORT'                         :   'Wat:',
                    'SOORT_INTERN'                  :   'Wat (intern) indien niet in code:',
                    'SOORT_EXTER'                   :   'Wat (naar buiten):',
                    'OMSCHRIJVING'				 	: 	'Omschrijving: ',
					'PROJECTLEIDER_CONTACTPERSOON'	:	'Projectleider/Contactpersoon: ',
					'CHECK_DOOR_COLLEGA'	        :	'Check door collega: ',
					'UPDATE_STATUS'	                :	'Update status: ',
                    'LOCATIE'						:	'Locatie: ',
					'WIJK'							:	'Wijk: ',
					'JAAR'                          :   'Jaar:',
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

    altLayerswitcher: true,

	sidebar: true,

    infoUrl: './info.html',

    styleSwitcher: true,

    formContainer: true,
    
    printExtension: true,

    multiFilter: [{


        'PROJECTCODE': {
            TYPE: 'TEXT',
            TITLE: 'Projectcode',
        },

        'JAAR': {
            TYPE: 'TEXT',
            TITLE: 'Jaar',
        },

        'SOORT':{
			TYPE: 'CHECKBOX',
			TITLE: 'Wat',
			OPTIONS: [
                        {value:'Bewonersinitiatieven', title:'Bewonersinitiatieven'},
                        {value:'Civiele kunstwerken', title:'Civiele kunstwerken'},
                        {value:'Gebiedsontwikkeling', title:'Gebiedsontwikkeling'},
                        {value:'Groen', title:'Groen'},
                        {value:'Kabels en leidingen', title:'Kabels en leidingen'},
                        {value:'Openbare verlichting', title:'Openbare verlichting'},
                        {value:'Overige', title:'Overige'},
                        {value:'Regiotram', title:'Regiotram'},
                        {value:'Riolering', title:'Riolering'},
                        {value:'Schoolroutes', title:'Schoolroutes'},
                        {value:'Verkeer', title:'Verkeer'},
                        {value:'Verkeersregelinstallaties', title:'Verkeersregelinstallaties'},
                        {value:'Water', title:'Water'},
                        {value:'Waterhuishouding', title:'Waterhuishouding'},
                        {value:'Wegen', title:'Wegen'},
                        {value:'Wegen en trottoirs', title:'Wegen en trottoirs'},
                        {value:'Wegen_asfalt', title:'Wegen/asfalt'},
                        {value:'Woningbouw', title:'Woningbouw'},
                        {value:'Woningbouwontwikkeling', title:'Woningbouwontwikkeling'},
					]
		},

        'FASE':{
			TITLE: 'Fase',
			TYPE: 'CHECKBOX',
            OPTIONS: [
                        {value:'Nog opstarten', title:'Nog opstarten'},
                        {value:'Initiatieffase', title:'Initiatieffase'},
                        {value:'Haalbaarheidsfase', title:'Haalbaarheidsfase'},
                        {value:'Contractfase', title:'Contractfase'},
                        {value:'Voorbereidingsfase', title:'Voorbereidingsfase'},
                        {value:'Definitiefase_ontwerpfase', title:'Definitiefase/ontwerpfase'},
                        {value:'Realisatiefase', title:'Realisatiefase'},
                        {value:'Nazorg_evaluatiefase', title:'Nazorg / evaluatiefase'},
					]
		},

    }],

};

// OPTIONAL applicationinit implementation
Geogem.applicatieInit = function(){

	// layermanager = new OpenLayers.Control.LayerSwitcher();
	// Geogem.map.addControl(layermanager);
	// layermanager.activate();
	// layermanager.maximizeControl();

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
		},

        'GECONTROLEERD':{
			TITLE: 'Gecontroleerd',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value: 'nee', title: 'Nee'},
                        {value: 'ja', title: 'Ja'}
            ]
		},

        'ELE0-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

        'ELE1-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary></summary><div class="flex-container">',TYPE: 'ELEMENT'},

        'HOOFDGROEP':{
			TYPE: 'SELECT',
			TITLE: 'Hoofdgroep',
            REQ: true,
            DISABLED: true,
			OPTIONS: [
                        {value:'Openbaar Domein', title:'Openbaar Domein'},
                        /*{value:'Extern', title:'Extern'},
                        {value:'Provincie', title:'Provincie'},
                        {value:'Rijkswaterstaat', title:'Rijkswaterstaat'},
                        {value:'Ruimtelijk Domein', title:'Ruimtelijk Domein'},
                        {value:'Sociaal Domein', title:'Sociaal Domein'},
                        {value:'TVL', title:'TVL'},
                        {value:'Waterschap', title:'Waterschap'},
                        {value:'Wijkcoordinatoren', title:'Wijkcoördinatoren'},
                        {value:'Wooncorporaties', title:'Wooncorporaties'},*/
					]
		},



        'SOORT':{
			TYPE: 'SELECT',
			TITLE: 'Wat',
            REQ: true,
			OPTIONS: [
                        {value:'Bewonersinitiatieven', title:'Bewonersinitiatieven'},
                        {value:'Civiele kunstwerken', title:'Civiele kunstwerken'},
                        {value:'Gebiedsontwikkeling', title:'Gebiedsontwikkeling'},
                        {value:'Groen', title:'Groen'},
                        {value:'Kabels en leidingen', title:'Kabels en leidingen'},
                        {value:'Openbare verlichting', title:'Openbare verlichting'},
                        {value:'Overige', title:'Overige'},
                        {value:'Regiotram', title:'Regiotram'},
                        {value:'Riolering', title:'Riolering'},
                        {value:'Schoolroutes', title:'Schoolroutes'},
                        {value:'Verkeer', title:'Verkeer'},
                        {value:'Verkeersregelinstallaties', title:'Verkeersregelinstallaties'},
                        {value:'Water', title:'Water'},
                        {value:'Waterhuishouding', title:'Waterhuishouding'},
                        {value:'Wegen', title:'Wegen'},
                        {value:'Wegen en trottoirs', title:'Wegen en trottoirs'},
                        {value:'Wegen_asfalt', title:'Wegen/asfalt'},
                        {value:'Woningbouw', title:'Woningbouw'},
                        {value:'Woningbouwontwikkeling', title:'Woningbouwontwikkeling'},
					]
		},

        'SOORT_INTERN':{
			TYPE: 'SELECT',
			TITLE: 'Wat (intern) indien niet in code',
			OPTIONS: [
                        {value:'', title:''},
                        {value:'Asfaltverharding', title:'Asfaltverharding'},
                        {value:'Beweegbare bruggen', title:'Beweegbare bruggen'},
                        {value:'Damwanden_kademuur', title:'Damwanden / kademuur'},
                        {value:'Elementverharding', title:'Elementverharding'},
                        {value:'Half verharding', title:'Half verharding'},
                        {value:'Liften', title:'Liften'},
                        {value:'Pompen en gemalen', title:'Pompen en gemalen'},
                        {value:'Roltrappen', title:'Roltrappen'},
                        {value:'Tunnels', title:'Tunnels'},
                        {value:'Vaste bruggen', title:'Vaste bruggen'},
                        {value:'Viaducten', title:'Viaducten'},
					]
		},

        'SOORT_EXTERN':{
			TYPE: 'SELECT',
			TITLE: 'Wat Extern',
            REQ: true,
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

        'GROEP':{
			TYPE: 'SELECT',
			TITLE: 'Externe partij',
			OPTIONS: [
                        {value:'', title:''},
                        {value:'Bewonersinitiatieven', title:'Bewonersinitiatieven'},
                        {value:'Hoogheemraadschap de Stichtse Rijnlanden', title:'Hoogheemraadschap de Stichtse Rijnlanden'},
                        {value:'Jupthaas Wonen', title:'Jupthaas Wonen'},
                        {value:'Kabels en leidingen exploitanten', title:'Kabels en leidingen exploitanten'},
                        {value:'Mitros', title:'Mitros'},
                        {value:'Overige', title:'Overige'},
                        {value:'Portaal Utrecht', title:'Portaal Utrecht'},
                        {value:'Projectontwikkelaars', title:'Projectontwikkelaars'},
                        {value:'Provincie', title:'Provincie'},
                        {value:'QBUZZ', title:'QBUZZ'},
                        {value:'Rijkswaterstaat', title:'Rijkswaterstaat'},
                        {value:'U10', title:'U10'},
                        {value:'Veiligheidsregio Utrecht', title:'Veiligheidsregio Utrecht'},
					]
		},

        'FASE':{
			TITLE: 'Fase',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
                        {value:'Nog opstarten', title:'Nog opstarten'},
                        {value:'Initaitieffase', title:'Initaitieffase'},
                        {value:'Haalbaarheidsfase', title:'Haalbaarheidsfase'},
                        {value:'Contractfase', title:'Contractfase'},
                        {value:'Voorbereidingsfase', title:'Voorbereidingsfase'},
                        {value:'Definitiefase_ontwerpfase', title:'Definitiefase/ontwerpfase'},
                        {value:'Realisatiefase', title:'Realisatiefase'},
                        {value:'Nazorg_evaluatiefase', title:'Nazorg / evaluatiefase'},
                        {value:'Gereed', title:'Gereed'},
					]
		},

        'ELEA-1':{CONTENT: '<div class="flex-container">',TYPE: 'ELEMENT'},

        'FASE_PERIODE':{
			TITLE: 'Uitvoeringsjaar',
			TYPE: 'TEXT',
		},

        'FASE_KWARTAAL':{
			TITLE: 'Uitvoeringskwartaal',
			TYPE: 'SELECT',
             OPTIONS: [
                        {value:'Kwartaal 1', title:'Kwartaal 1'},
                        {value:'Kwartaal 2', title:'Kwartaal 2'},
                        {value:'Kwartaal 3', title:'Kwartaal 3'},
                        {value:'Kwartaal 4', title:'Kwartaal 4'},

					]
		},

        'ELEA-2':{CONTENT: '</div>',TYPE: 'ELEMENT'},

		'OMSCHRIJVING':{
			TITLE: 'Omschrijving',
			TYPE: 'TEXTAREA',
            REQ: true,
		},

        'ELE1-2':{CONTENT: '</div></details></section>',TYPE: 'ELEMENT'},

        'ELE2-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap no-select"><details open><summary></summary>',TYPE: 'ELEMENT'},

        'PROJECTLEIDER_CONTACTPERSOON':{
			TITLE: 'Projectleider/Contactpersoon',
			TYPE: 'TEXT',
            REQ: true,
		},

        'OPDRACHTGEVER':{
			TITLE: 'Opdrachtgever',
			TYPE: 'TEXT',
		},

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

        'JAAR':{
			TITLE: 'Jaar',
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


        'ELE3-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},

        'WIJZIGING_TOELICHTING':{
			TITLE: 'Wijziging toelichting',
			TYPE: 'TEXTAREA',
            REQ: true,
		},

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
		}),
        // styleMap: new OpenLayers.StyleMap({
            // "default": new OpenLayers.Style(null, {rules: [wfsRule]})
        // }),
        //multiFilter: true,
		// ,maxResolution: 0.8
		visibility:false,
        displayInLayerSwitcher: false,
        type: 'polygon',
        snapping: false,
	});


	Geogem.initWFST(wfs);

    //multiFilter.filterLoader();

    wfsRule.filter = format.read("HOOFDGROEP = 'Openbaar Domein'");

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
                var featureG = groepCheck();
                var featureYear = jaarCheck();
                var featureNumber = 0;
                var featureCount = 0;
                var url = '//' + location.host + '/geoserver/wfs?request=GetFeature&typeName=projectenkaart_app&version=1.1.0&';
                url = url + "CQL_FILTER=PROJECTCODE LIKE '%" + featureHg + "%'";
                url = url.replace(/%/g, '%25' );
                setTimeout(function() {
                $.get(url, function(xml) {
                    var response = $(xml.documentElement.attributes);
                    //console.log(response)
                    Geogem.xml = xml;
                    Geogem.response = $.parseXML(xml.children);
                    for (var i = 0, len = response.length; i < len; i++ ) {
                        if (response[i].name == 'numberOfFeatures') {
                            featureCount = response[i].nodeValue;
                            //console.log("featurecount:", featureCount)
                        }
                    }
                    if (featureCount != 0) {
                        var featureList = Geogem.xml.getElementsByTagName('gml:featureMembers')[0];
                        var featureNodes = featureList.childNodes;
                        var featureNumberArray = [];
                        //console.log(featureNodes)
                        $.each(featureNodes, function(index, item) {
                            //console.log('test')
                            var regex = /(.*)\.(.*)\.(.*)/;
                            var projectCode = item.getElementsByTagName('nieuwegein:PROJECTCODE')[0].textContent;
                            if (regex.test(projectCode)) {
                                if  (projectCode.slice(-7,-5) == featureYear) {
                                    featureNumberArray.push(projectCode.slice(-4));
                                }

                            }
                        });
                        //console.log(featureNumberArray.length)
                        if (featureNumberArray.length === 0) {featureNumberArray.push('0000');}
                        var lastFeatureNumber = featureNumberArray.sort().slice(-1);
                        featureNumber = Number(lastFeatureNumber[0]) + 1 + '';

                        while (featureNumber.length < 4) {featureNumber = '0' + featureNumber;}

                    } else {
                        featureNumber = '0001';
                    }
                    if (featureG === '') {
                        $('#form_PROJECTCODE').prop('value', featureHg + '.' + featureYear + '.' + featureNumber);
                    } else {
                        $('#form_PROJECTCODE').prop('value', featureHg + '.' + featureG + '.' + featureYear + '.' + featureNumber);
                    }
                });
                },1);
            }
        };
        $('#form_HOOFDGROEP, #form_JAAR, #form_SOORT').on('change', getProjectCode);
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

    var groepCheck = function() {
            var groep = $('#form_SOORT').prop('value');
            if (groep === 'Bewonersinitiatieven') {
                return 'BI';
            } else if (groep === 'Civiele kunstwerken') {
                return 'CK';
            } else if (groep === 'Gebiedsontwikkeling') {
                return 'GO';
            } else if (groep === 'Groen') {
                return 'GR';
            } else if (groep === 'Kabels en leidingen') {
                return 'KL';
            } else if (groep === 'Openbare verlichting') {
                return 'OVL';
            } else if (groep === 'Regiotram') {
                return 'RT';
            } else if (groep === 'Riolering') {
                return 'RI';
            } else if (groep === 'Schoolroutes') {
                return 'ScR';
            } else if (groep === 'Verkeer') {
                return 'VE';
            } else if (groep === 'Verkeersregelinstallaties') {
                return 'VRI';
            } else if (groep === 'Water') {
                return 'WA';
            } else if (groep === 'Waterhuishouding') {
                return 'WH';
            } else if (groep === 'Wegen') {
                return 'WE';
            } else if (groep === 'Wegen en trottoirs') {
                return 'WeT';
            } else if (groep === 'Wegen_asfalt') {
                return 'Asf';
            } else if (groep === 'Woningbouw') {
                return 'WB';
            } else if (groep === 'Woningbouwontwikkeling') {
                return 'WBO';
            } else {
                return '';
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
};
