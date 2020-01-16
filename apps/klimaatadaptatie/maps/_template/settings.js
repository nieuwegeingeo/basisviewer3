Geogem.applicatieSettings = {
	
	// popups are default max 400x400 pixels
	// can be overridden with:
	// defaultPopupSize: '500,500',
	
	// example to change the restricted extent: 
	// restrictedExtent: new OpenLayers.Bounds(130502, 442002, 140500, 455500),
	
	// example with an OSM layer !
	// because we do want two base layers, we redefine the 'Kaart'-layer
	// so redefine baseLayers:
	/*
	baseLayers: [
		// Onderstaande kan bv worden gebruikt om voor het cachen even te 
		// kijken hoe de luchtfoto combi en/of topocombi eruit zien als 
		// single tile WMS
		{
			title: 'singletile',
			url: 'http://' + location.hostname + '/geoserver/wms',
			params: {
				layers: 'luchtfotocombi',	 	// geoserver wms test 
				//layers: 'topocombi',	 	// geoserver wms test
				format: 'image/jpeg'
			}
			,options: { singleTile: true }  
		},	
		{	// WMTS from PDOK baselayer example
			title: 'PDOK',
			type: 'wmts',
			name: 'wmts layer',
			url: 'http://geodata.nationaalgeoregister.nl/wmts',
			layer: 'brtachtergrondkaart',
			matrixSet: 'EPSG:28992',
			visibility: true,
			isBaseLayer: true,
			format: 'image/png8',
			attribution:'Kadaster', 
		},
		{
			title: 'Luchtfoto',
			url: 'http://' + location.hostname + '/mapproxy/service',
			params: {
				layers: 'basisluchtfoto',		// geowebcache layer	 
				format: 'image/png'
			},
			options: {
				//transitionEffect:'resize'
			}  
		}
		,{	// LET OP!!! WE HERDEFINIEREN KAART HIER OMDAT WE DE OSM ONDERLAAG WILLEN
			title: 'Kaart',
			url: 'http://' + location.hostname + '/mapproxy/service',
			params: {
				layers: 'osm',
				format: 'image/png'
			},
			options: {
				//transitionEffect:'resize'
			}  
		}
		,{	
			type: 'tms',
			title: 'Kaart',
			url: 'http://openbasiskaart.nl/mapcache/tms',
			options: {
				//transitionEffect:'resize'
				layername: 'osm@rd',
				type: 'png'
			}  
		}
	],
   */
   
   // different types of overlays:
   overLays: []
   /* 
   overLays: [
		{
		  type: 'wms',
		  title: 'Meetpunten stikstofdioxide (NO2)',
		  url: 'http://' + location.host +'/geoserver/wms',
		  wmsinfoformat: 'text/plain', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
		  buffer: 1,  // buffer is the buffer around a featureinfo-click. OpenLayers defaults to 5, for ipad we set it to 20, but sometimes for polygons you want just 1
		  
		  // met fields (indien infoformat==gml) kun je velden verbergen en/of hernoemen (ook voor het downloaden!!)
		  fields: { 
			'nieuwegein:GM_SP_GROENBEHEER_MAAIVELDEN' : {		// laagnaam
				'ID':'id',										// velden die je wilt tonen, EN de hernoemde naam
				'NAME':'Naam',
				'IGDS_COMMENT':'Commentaar'
		    },
			'nieuwegein:foo' : {		// laagnaam
				'NAME':'Naam',
		    }
		  },
		  params: {
			 layers: 'nieuwegein:Meetpunten_NO2_2011',
			 format: 'image/png'
		  },
		  options: {
		    hover: true  		// meaning: getfeaturinfo when hovering over the layer. Defaults to false
			singleTile: true,   // meaning:  request only ONE tile (instead of multiple)
			maxResolution: 14.0,
			visibility: true,
			downloadformat: 'excel2007',  // can be shape-zip, csv, excel, excel2007  (this will start the downloadcontrol), by using 'fields' above you can limit the fields
			displayInLayerSwitcher: false  // do NOT show it in the layermanager / layerswitcher (note: visibility should be true in this case (==default))
		  }
		}
		,
		{
			type: 'kml',
			title: 'Dit is een kml laag',
			// if you want a label, uncomment follow line and give attribute name 
			// which you want to use as label
			//label: "name",
			// if you want to use a sld file for this vector/kml layer, use a sld parameter:
			//sld: "kml.sld",
			// KML has standard info popups, if you do NOT want infopops:
			//infopopup: false,
			protocolOptions: {
					url: "kunstroute.kml"
					,format: new OpenLayers.Format.KML({
						kmlns: "http://earth.google.com/kml/2.2",
						extractStyles: true,
						extractAttributes: true })
			}
		}
		,
		{
			type: 'wfs',
			title: 'Bekendmakingen (punten)',
			options: {
				filter: new OpenLayers.Filter.Spatial({type: OpenLayers.Filter.Spatial.BBOX, value: new OpenLayers.Bounds(131716,445273,137300,453000)})
				//projection: new OpenLayers.Projection("EPSG:28992")
			},
			protocolOptions: {
				url: 'http://geodata.nationaalgeoregister.nl/pdok/wfs',
				featureType: 'bekendmakingen_punt',
				featurePrefix: 'pdok'
			}
		}
		,
		{
		  type: 'wms',
		  title: 'BAG adressen (excel)',
		  url: 'http://' + location.host +'/geoserver/wms',
		  wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
		  params: {
			 layers: 'nieuwegein:GM_SP_BAG_ADRESSEN',
			 format: 'image/png'
		  },
		  // met fields (indien infoformat==gml) kun je velden verbergen en/of hernoemen (ook voor het downloaden!!)
		  fields: { 
				'nieuwegein:GM_SP_BAG_ADRESSEN' : {		// laagnaam
					'OBR_NAAM':'Straat',				// eigenschap (en titel) die je wilt zien in infopop EN download(!)
					'NAD_HUISNUMMER':'Nummer',
					'NAD_HUISLETTER':'Letter',
					'NAD_HUISNUMMERTOEVOEGING':'Toev.',
					'NAD_POSTCODE':'Postcode'
				}
		  },
		  options: {
			singleTile: true,   // meaning:  request only ONE tile (instead of multiple)
			//maxResolution: 14.0,
			visibility: true,
			downloadformat: 'excel'
		  }
		}	
	]
	*/
	
	// example to center on a point (can also be used with querystring !!)
	//,urlParams: {centerx:134192, centery:448499, kaartschaal:15000 }
	// is the same as calling page with
	// ?centerx=134192&centery=448499&kaartschaal=15000
	
	//If provided a (fixed) legend image, it will be shown in the map
	,legendUrl: null
    //,legendUrl: 'Legenda_FR_WR_route.PNG'
	// or (newer)
	//,legend: 'http://example.com/images/Legenda_FR_WR_route.PNG'
	// alternative way to have several images, with a title in a harmonica
	/*,legend: [
		{title:"kb1 Historisch cultuurlandschap en prestedelijk landschap", url:"kb1.png"},
		{title:"kb2 Historische bouwkunst en stedenbouw", url:"kb2.png"},
		{title:"kb3 Historisch-geografische elementen", url:"kb3.png"},
		{title:"kb4 Erfgoed van oorlog en defensie", url:"kb4.png"},
		{title:"kb5 Waardering van historisch cultuurlandschap en prestedelijk landschap", url:"kb5.png"},
		{title:"kb6 Waardering van historische bouwkunst en stedenbouw", url:"kb6.png"},
		{title:"kb7 Integrale gebiedswaardering", url:"kb7.png"},
	]*/
	
	// show featureinfo in sidebar instead of popup
	,sidebar: false
	
	/**
	 * If property 'geolocation'=='locate' or 'track', the geolocation control
	 * will be activated and
	 * try to do a one time 'find my position' (in case of 'locate')
	 * try to track every x seconds (in case of 'track')
	 */
	,geolocation: false  // default false, or either 'locate' or 'track'
	
	/**
	 * Geocoder settings, defaulting to Nieuwegein geocoder
	 */
	,geocoder: {
		// nieuwegein geocoder (alleen werkend voor Nieuwegein!)
		// heeft 'autocomplete'
		// url: 'http://' + location.host + '/geocoder/geocode?',
        //url: location.protocol + '//' + location.host + '/geocoder/geocode?',
		
		// pdok geocoder
		// heeft GEEN 'autocomplete' omdat de pdok geocoder geen wildcards ondersteund
		//url: location.protocol + '//geodata.nationaalgeoregister.nl/geocoder/Geocoder?',
		//type: 'pdok',
		//city: 'nieuwegein',
        
        // pdok locatieserver V3
        //url: location.protocol + '//geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?',
		//type: 'pdoklocatieserver',
		//city: 'nieuwegein',
	}
	
	/**
	 * If provided an infourl, th html 
	 * from the url will be shown in sidebar content
	 */
	,infoUrl: null
	//,infoUrl: './info.html'
    
    /**
     * position flag/icon showing after a geocoding result  
     */
    ,usePositionFlag: true  // defaulting to true
    
    ,keepPositionFlag: false // to NOT let it fade away after 2 zoom/pans, defaulting to false
    
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
	
	
	// to show a Kaart instead of Luchtfoto, click on Kaart button:
	//$('#Kaart').click()
	// to show a Luchtfoto instead of Kaart, click on Luchtfoto button:
	//$('#Luchtfoto').click()
	
	//to  start whith minimized legend(image):
	$('#legendhead').click();
	
	// to change opacity
	//Geogem.map.getLayersByName('Kaart')[0].setOpacity(0.3);
	//or
	//Geogem.map.getLayersByName('Luchtfoto')[0].setOpacity(0.3);
	
	
	// PROXY
	// do not define: OpenLayers.ProxyHost because problems with the geocoder will arise
	// instead define Geogem.Settings.proxyUrl
	// Geogem.Settings.proxyUrl = "http://"+window.location.host+"/proxy/proxy.py";
	
	// to add downloadbuttons (will show up in 'legend-bar'
	//Geogem.addDownloadButton("bevolkingspyramide_nieuw.html", "Bevolkingspiramide.png", "Bevolkingspyramide");
	//                                  ^^ url ^^                     ^^ image ^^             ^^ tooltip ^^
}


// OPTIONAL getfeatureinfo implementation
/*
Geogem.getfeatureinfo = function(event, popupContent){
	// IF you define featureinfoformat as text/plain
	console.log(event.text);
	// IF you define featureinfoformat as application/vnd.ogc.gml
	//console.log(event.features);
	// generate th actual popup content (eg a Form) here
	console.log(popupContent);
	popupContent = "<h2>Hello world</h2>"
	// show it in the sidebar
	Geogem.showSidebarContent(popupContent);
}
*/