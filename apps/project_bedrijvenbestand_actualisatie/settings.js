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
			 layers: 'nieuwegein:bedrijven_actualisatie_app',
			 format: 'image/png'
		  },
          fields: {
              'nieuwegein:bedrijven_actualisatie_app' : {
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

    multiFilter.filterLoader()

};
