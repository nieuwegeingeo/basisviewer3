Geogem.geoserverAutorisatie('bedrijvenbestand_actualisatie_app');

Geogem.applicatieSettings = {

	baseLayers: [

		{
			title: 'Luchtfoto',
			url: '//' + location.host + '/mapproxy/service',
			params: {
				layers: 'basisluchtfoto',		// geowebcache layer
				format: 'image/png'
			},
			options: {
				//transitionEffect:'resize'
			}
		},

		{
			title: 'OpenTopo',
			url: '//' + location.host + '/mapproxy/service',
			params: {
				layers: 'opentopo',		// geowebcache layer
				format: 'image/png'
			},
			options: {
				//transitionEffect:'resize'
                opacity: 0.7,
			}
		},
],

overLays: [

        {
		  type: 'wms',
		  title: 'Bedrijvenbestand Actualisatie',
		  url: '//' + location.host + '/geoserver/wms',
		  wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
		  params: {
			 layers: 'nieuwegein:bedrijven_actualisatie_bouwen_app',
			 format: 'image/png'
		  },
          fields: {
              'nieuwegein:bedrijven_actualisatie_bouwen_app' : {
                    'NAAM_BEDRIJF' : 'Naam bedrijf',
                    'RELEVANTIE':'Relevantie',
                    'GECONTROLEERD' : 'Gecontroleerd',
                    'CAT_BEDRIJF' : 'Categorie bedrijf',
                    'DATUM_TIJD_CONTROLE':'Datum/tijd controle',
                    'CONTROLEUR' : '1e Controleur',
                    'CONTROLEUR_2' : '2e Controleur',
                    'KVK_NR' : 'KvK nr.',
                    'EIGENAAR_BEDRIJF_NAAM' : 'Voor- en achternaam',
                    'EIGENAAR_BEDRIJF_TEL' : 'Telefoonnummer',
                    'VESTIGING_STRAAT' : 'Vestigingsadres straat',
                    'VESTIGING_KADASTERNR' : 'Vestigingsadres kadasternr.',
                    'VESTIGING_HUISNUMMER' : 'Vestigingsadres huisnummer',
                    'VESTIGING_POSTCODE' : 'Vestigingsadres postcode',
                    'CORRESPONDENTIE_STRAAT' : 'Correspondentieadres straat',
                    'CORRESPONDENTIE_POSTCODE' : 'Correspondentieadres postscode',
                    'CORRESPONDENTIE_HUISNUMMER' : 'Correspondentieadres huisnummer',
                    'CONTACTPERS_VOORNAAM' : 'Contactpersoon voornaam',
                    'CONTACTPERS_ACHTERNAAM' : 'Contactpersoon achternaam',
                    'CONTACTPERS_TEL' : 'Contactpersoon telefoonnr',
                    'CONTACTPERS_MAIL' : 'Contactpersoon email',
                    'INRICHTING' : 'Inrichting',
                    'SOORT_BEDRIJF' : 'Soort bedrijf',
                    'BEDRIJFSACTIVITEITEN' : 'Bedrijfsactiviteiten',
                    'BIJZONDERHEDEN_BOUWEN_TEKST' : 'Bijzonderheden Bouwen',
                    'BIJZONDERHEDEN_MILIEU' : 'Bijzonderheden Milieu',
                    'BIJZONDERHEDEN_MILIEU_TEKST' : 'Bijzonderheden Milieu',
                    'BIJZONDERHEDEN_OVERIG' : 'Bijzonderheden Overig/Doorvewijzen naar',
                    'TOELICHTING_DOORVERWIJZING' : 'Toelichting doorverwijzing',
                    'FOTOS_GEMAAKT' : 'Fotos gemaakt',
                    'HUURDERS_ONDERVERHUURDERS' : 'Huurders of onderverhuurders',
                    'BIJZONDERHEDEN_OVERIG_TEKST' : 'Bijzonderheden Overig/Doorvewijzen naar',
              }
          },
		  options: {
			singleTile: true,
			visibility: true,
            filter: true,
            styles: [
                        {name:'Gecontroleerd', style:'bedrijven_actualisatie_app'},
                        {name:'Relevantie', style:'bedrijven_actualisatie_relevantie_app'},
                    ],
		  }
		}
    ],

    styleSwitcher: true,
    sidebar: true,
    sidebarHide: true,
    infoUrl: null,
    geolocation: 'locate',
    formContainer: true,
    legend: [
            {title:"Gecontroleerd" ,url:'//'+ location.host +'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=bedrijven_actualisatie_app', scale:true},
            {title:"Relevantie",url:'//'+ location.host +'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=bedrijven_actualisatie_relevantie_app', scale:true},
        ],
        
    multiFilter: [{
        'NAAM_BEDRIJF': {
            TYPE: 'TEXT',
            TITLE: 'Naam bedrijf',
        },

        'BEDRIJFSACTIVITEITEN': {
            TYPE: 'TEXT',
            TITLE: 'Bedrijfsactiviteiten',
        },

        'RELEVANTIE': {
            TYPE: 'RADIO',
            TITLE: 'Relevantie',
            OPTIONS: [
                        {value:"", title:'Relevantie leeg'},
                        {value:'milieu', title:'Milieu'},
                        {value:'oov', title:'OOV'},
                        {value:'oov_milieu', title:'OOV (constatering Milieu)'},
                        {value:'geen bijzondere relevantie', title:'Geen bijzondere relevantie'},
                        {value:'stichting_vereniging', title:'Stichting/Vereniging'},
                        {value:'staat leeg', title:'Staat leeg'},
					]
        },
        
        'CAT_BEDRIJF': {
            TYPE: 'RADIO',
            TITLE: 'Categorie bedrijf',
            OPTIONS: [
                        {value:"", title:'Geen Type'},
                        {value:"a", title:'Type A'},
                        {value:"b", title:'Type B'},
                        {value:"c", title:'Type C'},
					]
        },
     }],    
};

// OPTIONAL applicationinit implementation
Geogem.applicatieInit = function(){

    $('#tools').append('<span class="toolbutton location_icon" id="locatie" title="Klik hier voor uw locatie">Locatie</span>');
    $('#legendImage h3').addClass('folded');
    $('.legendImage').hide();
    $('#locatie').click(function() {
        Geogem.Settings.geolocation=='locate';
        Geogem.startGeolocation();
    });

    function addCSSClassRecursively(topElement, CssClass) {
    $(topElement).addClass(CssClass);
    $(topElement).children().each(
            function() {
                 $(this).addClass(CssClass);
                 addCSSClassRecursively($(this), CssClass);
            });
    }

    $('#OpenTopo').click();
    $('#baselayerbuttons').hide();

    // Proxy as we are using WFS!
	//Geogem.Settings.proxyUrl = "//"+window.location.host+"/proxy/proxy.py";

    Geogem.featureTypes = {
		'ID':{
            TITLE: 'ID',
            TYPE: 'HIDDEN'
		},
        'ELE0-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><div class="flex-container flex-group">',TYPE: 'ELEMENT'},

        'RELEVANTIE':{
			TYPE: 'CHECKBOX',   // 'RADIO' of 'SELECT' of 'CHECKBOX'
			TITLE: 'Relevantie',
			OPTIONS: [
                        {value:'milieu', title:'Milieu'},
                        {value:'oov', title:'OOV'},
                        {value:'oov_milieu', title:'OOV (constatering Milieu)'},
                        {value:'geen bijzondere relevantie', title:'Geen bijzondere relevantie'},
                        {value:'stichting_vereniging', title:'Stichting/Vereniging'},
					]
		},
        
        
        
        'CAT_BEDRIJF':{
			TITLE: 'Categorie bedrijf',
			TYPE: 'RADIO',
            OPTIONS: [
                        {value:"", title:'Geen Type'},
                        {value:"A", title:'Type A'},
                        {value:"B", title:'Type B'},
                        {value:"C", title:'Type C'},
					]
		},

        'GECONTROLEERD':{
			TYPE: 'RADIO',   // 'RADIO' of 'SELECT' of 'CHECKBOX'
			TITLE: 'Gecontroleerd',
			OPTIONS: [
                        {value:'nee', title:'Nee'},
                        {value:'ja', title:'Ja'},
                        {value:'gevel', title:'Gevel'},
                        {value:'rud', title:'RUD'},
                        {value:'provincie', title:'Provincie'},
                        {value:'staat leeg', title:'Staat leeg'},
                        {value:'braakliggend terrein', title:'Braakliggend terrein'},
                        {value:'wordt woonbestemming', title:'Wordt woonbestemming'},
					]
		},

        'ELE-funct-0':{CONTENT: '<script>$(\'[name="form_GECONTROLEERD"]\').parent().parent().siblings("div").css("width","30%");$(\'[name="form_GECONTROLEERD"]\').parent().parent().css("width","30%")</script>',TYPE: 'ELEMENT'},

        'ELE0-2':{CONTENT: '</div></section>',TYPE: 'ELEMENT'},
        
        'ELE0-3':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><summary class="form-summary">Bijzonderheden milieu</summary><div class="flex-container">',TYPE: 'ELEMENT'},
        
        'BIJZONDERHEDEN_MILIEU':{
			TYPE: 'CHECKBOX',   // 'RADIO' of 'SELECT' of 'CHECKBOX'
			TITLE: 'Bijzonderheden Milieu',
			OPTIONS: [
                        {value:'gevaarlijke_stoffen', title:'Gevaarlijke stoffen'},
						{value:'koelinstallatie', title:'Koelinstallatie'},
                        {value:'werkplaats', title:'Werkplaats'},
                        {value:'stook_installaties', title:'Stook installaties'},
                        {value:'overig', title:'Overig'},
					]
		},

        'BIJZONDERHEDEN_MILIEU_TEKST':{
			TITLE: 'Bijzonderheden Milieu opmerking',
			TYPE: 'TEXTAREA'
		},
        
        'ELE0-4':{CONTENT: '</section>',TYPE: 'ELEMENT'},
        
        'ELE0-5':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary class="form-summary">Bijzonderheden Bouwen</summary><div class="flex-container">',TYPE: 'ELEMENT'},
        
        'BIJZONDERHEDEN_BOUWEN_TEKST':{
			TITLE: 'Bijzonderheden Bouwen opmerking',
			TYPE: 'TEXTAREA'
		},
        
        'ELE0-6':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},
        
        'ELE1-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><div class="flex-container">',TYPE: 'ELEMENT'},
        'DATUM_CONTROLE':{
			TITLE: 'Datum controle',
			TYPE: 'DATUM'
		},
        'TIJD_CONTROLE':{
			TITLE: 'Tijd controle',
			TYPE: 'TIJD'
		},
        'CONTROLEUR':{
			TITLE: 'Controleur',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
                        {value:'Paul Oevermans', title:'Paul Oevermans'},
						{value:'Wouter Leduc', title:'Wouter Leduc'},
                        {value:'Carolien Neut', title:'Carolien Neut'},
                        {value:'Irma Achterberg', title:'Irma Achterberg'},
					]
		},
        'CONTROLEUR_2':{
			TITLE: 'Controleur 2',
			TYPE: 'SELECT',
            OPTIONS: [
                        {value:'', title:''},
						{value:'Wouter Leduc', title:'Wouter Leduc'},
                        {value:'Carolien Neut', title:'Carolien Neut'},
                        {value:'Ibrahim Yumusak', title:'Ibrahim Yumusak'},
					]
		},
        'ELE1-2':{CONTENT: '</div></section>',TYPE: 'ELEMENT'},

        'ELE2-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap">',TYPE: 'ELEMENT'},
        'NAAM_BEDRIJF':{
			TITLE: 'Naam bedrijf',
		        TYPE: 'TEXT',
                        FS_NAAM: true
		},
        'KVK_NR':{
			TITLE: 'Kvk nr.',
			TYPE: 'TEXT'
		},
        'ELE2-2':{CONTENT: '</section>',TYPE: 'ELEMENT'},

        'ELE3-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary class="form-summary">Eigenaar bedrijf</summary><div class="flex-container">',TYPE: 'ELEMENT'},
        'EIGENAAR_BEDRIJF_VOORNAAM':{
			TITLE: 'Voornaam',
			TYPE: 'TEXT'
		},
        'EIGENAAR_BEDRIJF_ACHTERNAAM':{
			TITLE: 'Achternaam',
			TYPE: 'TEXT'
		},
        'EIGENAAR_BEDRIJF_TEL':{
			TITLE: 'Telefoonnummer',
			TYPE: 'TEXT'
		},
        'ELE3-2':{CONTENT: '</div></details></section>',TYPE: 'ELEMENT'},

        'ELE4-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary class="form-summary">Vestigingsadres bedrijf</summary><div class="flex-container">',TYPE: 'ELEMENT'},
        'VESTIGING_STRAAT':{
			TITLE: 'Straat',
			TYPE: 'TEXT'
		},
        'VESTIGING_KADASTERNR':{
			TITLE: 'Kadasternr.',
			TYPE: 'TEXT'
		},
        'VESTIGING_HUISNUMMER':{
			TITLE: 'Huisnummer',
			TYPE: 'TEXT'
		},
        'VESTIGING_HUISNUMMER_TOEVOEGIN':{
			TITLE: 'Huisnummer toevoeging',
			TYPE: 'TEXT'
		},
        'VESTIGING_POSTCODE':{
			TITLE: 'Postcode',
			TYPE: 'TEXT'
		},
        'ELE4-2':{CONTENT: '</div></details></section>',TYPE: 'ELEMENT'},

        'ELE5-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary class="form-summary">Correspondentieadres bedrijf</summary><div class="flex-container">',TYPE: 'ELEMENT'},
        'CORRESPONDENTIE_STRAAT':{
			TITLE: 'Straat',
			TYPE: 'TEXT'
		},
        'CORRESPONDENTIE_POSTCODE':{
			TITLE: 'Postcode',
			TYPE: 'TEXT'
		},
        'CORRESPONDENTIE_HUISNUMMER':{
			TITLE: 'Huisnummer',
			TYPE: 'TEXT'
		},
        'CORRESPONDENTIE_HUISNUMMER_TOE':{
			TITLE: 'Huisnummer toevoeging',
			TYPE: 'TEXT'
		},
        'ELE5-2':{CONTENT: '</div></details></section>',TYPE: 'ELEMENT'},

        'ELE6-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary class="form-summary">Contactpersoon bedrijf</summary><div class="flex-container">',TYPE: 'ELEMENT'},
        'CONTACTPERS_VOORNAAM':{
			TITLE: 'Voornaam',
			TYPE: 'TEXT'
		},
        'CONTACTPERS_ACHTERNAAM':{
			TITLE: 'Achternaam',
			TYPE: 'TEXT'
		},
        'CONTACTPERS_TEL':{
			TITLE: 'Telefoonnummer',
			TYPE: 'TEXT'
		},
        'CONTACTPERS_MAIL':{
			TITLE: 'E-mail',
			TYPE: 'TEXT'
		},
        'ELE6-2':{CONTENT: '</div></details></section>',TYPE: 'ELEMENT'},

        'ELE7-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary class="form-summary">Bedrijfsdata</summary>',TYPE: 'ELEMENT'},
        'INRICHTING':{
			TYPE: 'SELECT',   // 'RADIO' of 'SELECT' of 'CHECKBOX'
			TITLE: 'Inrichting',
			OPTIONS: [
                        {value:'Ja', title:'Ja'},
						{value:'Nee', title:'Nee'},
                        {value:'Nvt', title:'Nvt'},

					]
		},
        
        
        'BEDRIJFSACTIVITEITEN':{
			TITLE: 'Bedrijfsactiviteiten',
			TYPE: 'TEXT'
		},
        'ELE7-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},

        'ELE8-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary class="form-summary">Bijzonderheden overig</summary>',TYPE: 'ELEMENT'},

        'BIJZONDERHEDEN_OVERIG':{
			TYPE: 'CHECKBOX',   // 'RADIO' of 'SELECT' of 'CHECKBOX'
			TITLE: 'Bijzonderheden Overig/Doorvewijzen naar',
			OPTIONS: [
                        {value:'bouwen', title:'Bouwen'},
                        {value:'geo-informatie', title:'Geo-informatie'},
                        {value:'oov', title:'OOV'},
					]
		},
        // 'ELE-funct-2':{CONTENT: '<script>$(\'[name="input_BIJZONDERHEDEN_OVERIG"]\').on(\'click\', function(){$(\'#form_BIJZONDERHEDEN_OVERIG_TEKST\').attr("type", "text").parent().show()})</script>',TYPE: 'ELEMENT'},

        'BIJZONDERHEDEN_OVERIG_TEKST':{
			TITLE: 'Bijzonderheden Overig opmerking',
			TYPE: 'TEXTAREA'
		},

        // 'TOELICHTING_DOORVERWIJZING':{
			// TITLE: 'Toelichting doorverwijzing',
			// TYPE: 'TEXTAREA'
		// },
        'ELE8-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},

        'ELE9-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary class="form-summary">Overig</summary>',TYPE: 'ELEMENT'},
        'FOTOS_GEMAAKT':{
			TYPE: 'SELECT',   // 'RADIO' of 'SELECT' of 'CHECKBOX'
			TITLE: 'Fotos gemaakt',
			OPTIONS: [
                        {value:'nee', title:'Nee'},
                        {value:'ja', title:'Ja'},
					]
		},
        'HUURDERS':{
			TITLE: 'Huurders',
			TYPE: 'TEXTAREA'
		},
        'ONDERVERHUURDERS':{
			TITLE: 'Onderverhuurders',
			TYPE: 'TEXTAREA'
		},

        'ELE9-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},
    };

    wfs = new OpenLayers.Layer.Vector("Bedrijvenbestand_Actualisatie_wfs", {
        strategies: [new OpenLayers.Strategy.BBOX(), Geogem.saveStrategy],
		projection: new OpenLayers.Projection("EPSG:28992"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0",
            srsName: "EPSG:28992",
            url: '//' + location.host + '/geoserver/ows',
            featureNS: 'http://www.nieuwegein.nl',
            featureType: 'bedrijven_actualisatie_app',
            geometryName: 'GEOM',
            params: {},
		}),
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style(null, {rules: [wfsRule]})
        }),
        multiFilter: true,
		visibility:false,
        displayInLayerSwitcher: false,
        type: 'point',

	});


    Geogem.initWFST(wfs);

    multiFilter.filterLoader()
    //addCSSClassRecursively('#barContainer','no-box');
};
