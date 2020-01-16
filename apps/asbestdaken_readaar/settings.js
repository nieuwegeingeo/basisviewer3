Geogem.geoserverAutorisatie('asbestdaken_readaar_app');

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
                attribution: '<a target="_blank" href="//www.opentopo.nl">Bron: J.W. van Aalst, www.opentopo.nl </a>',
				//transitionEffect:'resize'
                opacity: 0.5,
			}
		},
    ],
    
    overLays: [
    {
        type: 'wms',
        title: 'Luchtfoto 2016',
        url: '//' + location.host +'/geoserver/wms',
        // wmsinfoformat: 'application/vnd.ogc.gml', //application/vnd.ogc.gml/3.1.1, text/html
        params: {
            layers: 'nieuwegein_wa:luchtfoto_2016_wa',
            format: 'image/png',
        },

        options: {
            singleTile: true,
            visibility: false,

        }
    },
    {
        type: 'wms',
        title: 'Luchtfoto 2017',
        url: '//' + location.host +'/geoserver/wms',
        // wmsinfoformat: 'application/vnd.ogc.gml', //application/vnd.ogc.gml/3.1.1, text/html
        params: {
            layers: 'nieuwegein_wa:luchtfoto_2017_wa',
            format: 'image/png',
        },

        options: {
            singleTile: true,
            visibility: false,

        }
    },
    {
        type: 'wms',
        title: 'Luchtfoto 2018',
        url: '//' + location.host +'/geoserver/wms',
        // wmsinfoformat: 'application/vnd.ogc.gml', //application/vnd.ogc.gml/3.1.1, text/html
        params: {
            layers: 'nieuwegein_wa:luchtfoto_2018_wa',
            format: 'image/png',
        },

        options: {
            singleTile: true,
            visibility: false,

        }
    },
    {
        type: 'wms',
        title: 'Luchtfoto 2019',
        url: '//' + location.host +'/geoserver/wms',
        // wmsinfoformat: 'application/vnd.ogc.gml', //application/vnd.ogc.gml/3.1.1, text/html
        params: {
            layers: 'nieuwegein_wa:luchtfoto_2019_wa',
            format: 'image/png',
        },

        options: {
            singleTile: true,
            visibility: false,

        }
    },
    
    {
        type: 'wms',
        title: 'Asbestdaken',
        url: '//' + location.host +'/geoserver/wms',
        wmsinfoformat: 'application/vnd.ogc.gml', //application/vnd.ogc.gml/3.1.1, text/html
        params: {
            layers: 'nieuwegein:asbestdaken_readaar_app',
            format: 'image/png',
        },
        fields: { 
            'nieuwegein:asbestdaken_readaar_app' : {		// laagnaam
            'STRAATNAAM':'Straatnaam',										// velden die je wilt tonen, EN de hernoemde naam
            'HUISNUMMER':'Huisnummer',
            'HUISLETTER':'Huisletter',
            'POSTCODE':'Postcode',
            'OORDEEL':'Oordeel',
            'OPP_DAK':'Oppervlakte',
            'OPP_V_GOLF':'Oppervlakte verdacht Golfplaat',
            'OPP_V_LEI':'Oppervlakte verdacht Leisteen',
            'BOUWJAAR' : 'Bouwjaar',
            'E_TYPE':'Type eigenaar',
            'E_NAAM':'Naam Eigenaar',
            'ENERGIELABEL':'Energielabel',
            'LABEL_DATUM':'Label datum',
            'ASBEST_GEVEL':'Asbest in gevel',
            'GEBRUIK' : 'Gebruik',
            },
        },
        options: {
            singleTile: true,
            visibility: true,
            displayInLayerSwitcher: true,
            filter: true,
        }
        
    },
    
    {
        type: 'wms',
        title: 'Asbestgevels',
        url: '//' + location.host +'/geoserver/wms',
        wmsinfoformat: 'application/vnd.ogc.gml', //application/vnd.ogc.gml/3.1.1, text/html
        params: {
            layers: 'nieuwegein:asbestdaken_readaar_app',
            format: 'image/png',
            styles: 'asbestdaken_readaar_gevel_style'
        },
        fields: { 
            'nieuwegein:asbestdaken_readaar_app' : {		// laagnaam
            'STRAATNAAM':'Straatnaam',										// velden die je wilt tonen, EN de hernoemde naam
            'HUISNUMMER':'Huisnummer',
            'HUISLETTER':'Huisletter',
            'POSTCODE':'Postcode',
            'OORDEEL':'Oordeel',
            'OPP_DAK':'Oppervlakte dak',
            'OPP_V_GOLF':'Oppervlakte verdacht Golfplaat',
            'OPP_V_LEI':'Oppervlakte verdacht Leisteen',
            'BOUWJAAR' : 'Bouwjaar',
            'E_TYPE':'Type eigenaar',
            'E_NAAM':'Naam Eigenaar',
            'ENERGIELABEL':'Energielabel',
            'LABEL_DATUM':'Label datum',
            'ASBEST_GEVEL':'Asbest in gevel',
            'GEBRUIK' : 'Gebruik',
            },
        },
        options: {
            singleTile: true,
            visibility: false,
            filter: true,
        }
    },
    
    // {
        // type: 'wms',
        // title: 'Energielabels',
        // url: '//' + location.host +'/geoserver/wms',
        // wmsinfoformat: 'application/vnd.ogc.gml', //application/vnd.ogc.gml/3.1.1, text/html
        // params: {
            // layers: 'nieuwegein:energielabels_panden_app',
            // format: 'image/png',
        // },
        // fields: { 
            // 'nieuwegein:energielabels_panden_app' : {		// laagnaam
            // 'ADRES':'Adres',										// velden die je wilt tonen, EN de hernoemde naam
            // 'LABEL':'Energielabel',
            // },
        // },
        // options: {
            // singleTile: true,
            // visibility: false,

        // }
        
        
    
       
   ]
    ,legend: [
		{title:"Asbestdaken"    ,url:'//'+location.host+'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=asbestdaken_readaar_style'},
		{title:"Asbestgevels"    ,url:'//'+location.host+'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=asbestdaken_readaar_gevel_style'},
		{title:"Energielabels"  ,url:'//'+location.host+'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=energielabels_panden_style'}
    ],
    
	sidebar: true,	 
    
	infoUrl: './info.html',
    
    formContainer: true,
    
	altLayerswitcher: true,
    
    printExtension: true,
}

// OPTIONAL applicationinit implementation
Geogem.applicatieInit = function(){

	/*
	// If you want a layermanager, do this:
	layermanager = new OpenLayers.Control.LayerSwitcher();
	// If you want only ONE layer viewable at a time (like it is a radio group)
	//layermanager.singleDataLayerView=true;
	// else do nothing (default is a normal layermanager) or do
	//layermanager.singleDataLayerView=false;
	Geogem.map.addControl(layermanager);
	layermanager.activate();
	// if you want the layermanager to be opened at startup:
	layermanager.maximizeControl();
    */
    
	$('#OpenTopo').click()
    
    Geogem.map.layers.map(function(layer) {
        if (layer.params.CQL_FILTER) {
            layer.options.cql_filter = layer.params.CQL_FILTER;            
        }
    })
    
    
    Geogem.featureTypes = {
		
        
        'ID':{TITLE: 'ID',TYPE: 'HIDDEN'},
        'ELE1-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details><summary></summary>',TYPE: 'ELEMENT'},
        'PAND_KOPPEL':{TITLE: 'PAND_KOPPEL',TYPE: 'TEXT'},
        'ID_BAG_VBO':{TITLE: 'ID_BAG_VBO',TYPE: 'TEXT'},
        'ID_GEBOUW':{TITLE: 'ID_GEBOUW',TYPE: 'TEXT'},
        'ID_BAG_PAND':{TITLE: 'ID_BAG_PAND',TYPE: 'TEXT'},
        'E_NAAM':{TITLE: 'E_NAAM',TYPE: 'TEXT'},
        'E_TYPE':{TITLE: 'E_TYPE',TYPE: 'TEXT'},
        'STRAATNAAM':{TITLE: 'STRAATNAAM',TYPE: 'TEXT'},
        'HUISNUMMER':{TITLE: 'HUISNUMMER',TYPE: 'TEXT'},
        'HUISLETTER':{TITLE: 'HUISLETTER',TYPE: 'TEXT'},
        'TOEVOEGING':{TITLE: 'TOEVOEGING',TYPE: 'TEXT'},
        'POSTCODE':{TITLE: 'POSTCODE',TYPE: 'TEXT'},
        'WOONPLAATS':{TITLE: 'WOONPLAATS',TYPE: 'TEXT'},
        'GEMEENTE':{TITLE: 'GEMEENTE',TYPE: 'TEXT'},
        'BOUWJAAR':{TITLE: 'BOUWJAAR',TYPE: 'TEXT'},
        'BOUWJ_CONTR':{TITLE: 'BOUWJ_CONTR',TYPE: 'TEXT'},
        'OPP_POLYGON':{TITLE: 'OPP_POLYGON',TYPE: 'TEXT'},
        'OPP_DAK':{TITLE: 'OPP_DAK',TYPE: 'TEXT'},
        'OPP_V_GOLF':{TITLE: 'OPP_V_GOLF',TYPE: 'TEXT'},
        'OPP_V_LEI':{TITLE: 'OPP_V_LEI',TYPE: 'TEXT'},
        'OPP_NIETZIC':{TITLE: 'OPP_NIETZIC',TYPE: 'TEXT'},
        'BRON':{TITLE: 'BRON',TYPE: 'TEXT'},
        'BAG_PAND_ID':{TITLE: 'BAG_PAND_ID',TYPE: 'TEXT'},
        'BGT_ID':{TITLE: 'BGT_ID',TYPE: 'TEXT'},
        'KADASTRALEA':{TITLE: 'KADASTRALEA',TYPE: 'TEXT'},
        'FUNCTIE':{TITLE: 'FUNCTIE',TYPE: 'TEXT'},
        'OORDEEL':{TITLE: 'OORDEEL',TYPE: 'TEXT'},
        'ENERGIELABEL':{TITLE: 'ENERGIELABEL',TYPE: 'TEXT'},
        'LABEL_DATUM':{TITLE: 'LABEL_DATUM',TYPE: 'TEXT'},
        
        'ELE1-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},
        'ELE2-1':{CONTENT: '<section class="form-section zichtbaar-flex flex-wrap"><details open><summary></summary>',TYPE: 'ELEMENT'},
        'OLO_NUMMER':{
            TITLE: 'OLO Nummer',
            TYPE: 'TEXT'
		},
        
        'GESANEERD':{
            TITLE: 'Asbestdak gesaneerd:',
            TYPE: 'SELECT',
            OPTIONS: [
                {value:'nee', title:'nee'},
                {value:'ja', title:'ja'},
            ]
		},
        
        'ASBEST_GEVEL':{
            TITLE: 'Asbest in gevel?:',
            TYPE: 'SELECT',
            OPTIONS: [
                {value:'nee', title:'nee'},
                {value:'voor', title:'voor'},
                {value:'achter', title:'achter'},
                {value:'beide', title:'beide'},
                {value:'gesaneerd', title:'gesaneerd'},
            ]
		},
        
        'DATUM_MELDING':{
            TITLE: 'Datum melding',
            TYPE: 'TEXT'
		},
        'ELE2-2':{CONTENT: '</details></section>',TYPE: 'ELEMENT'},
    }
    
	wfs = new OpenLayers.Layer.Vector("asbestdaken_wfs", {
        strategies: [new OpenLayers.Strategy.BBOX(), Geogem.saveStrategy],
		projection: new OpenLayers.Projection("EPSG:28992"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0",
            srsName: "EPSG:28992",
            url: '//' + location.host + '/geoserver/ows',
            featureNS: 'http://www.nieuwegein.nl',
            featureType: 'asbestdaken_readaar_app',
            geometryName: 'GEOM',
            params: {},
		}),
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style(null, {rules: [wfsRule]})
        }),
		visibility:false,
        displayInLayerSwitcher: false,
        type: 'polygon',
	});

    
    
    
    
    Geogem.initWFST(wfs);
    
    wfsRule = Geogem.map.getLayersByName('asbestdaken_wfs')[0].styleMap.styles.default.rules[0];
    
   
}

