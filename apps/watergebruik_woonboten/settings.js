Geogem.applicatieSettings = {

	baseLayers: [{
			title: 'Luchtfoto',
			url: 'http://' + location.host + '/mapproxy/service',
			params: {
				layers: 'basisluchtfoto', // geowebcache layer
				format: 'image/png'
			},
			options: {
				//transitionEffect:'resize'
			}
		},
		{ // LET OP!!! WE HERDEFINIEREN KAART HIER OMDAT WE DE OSM ONDERLAAG WILLEN
			title: 'OpenTopo',
			url: '//' + location.host + '/mapproxy/wms?',
			params: {
				layers: 'opentopo',
				format: 'image/png'
			},
			options: {
				// transitionEffect:'resize'
				singleTile: true,
				attribution: '<a target="_blank" href="http://www.opentopo.nl">Bron: J.W. van Aalst, www.opentopo.nl </a> &nbsp;',
				opacity: 0.6,
			}
		}

	],


	overLays: [

		{
			type: 'wms',
			title: 'Waterbeheerders',
			url: 'http://' + location.host + '/geoserver/wms',
			wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html

			params: {
				layers: 'nieuwegein:watergebruik_waterbeheerders_app',
				format: 'image/png',
			},
			// fields: {
			// 'nieuwegein:watergebruik_waterbeheerders_app': {
			// 'TYPE' : 'Type',
			// 'OMSCHRIJVI' : 'Omschrijving'
			// }
			// },
			options: {

				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				maxResolution: 14.0,
				visibility: true,
				opacity: 0.6,
			}
		},
		{
			type: 'wms',
			title: 'NHW vaarwegvakken',
			url: 'http://' + location.host + '/geoserver/wms',
			wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html

			params: {
				layers: 'nieuwegein:watergebruik_nhw_vaarwegvakken_app',
				format: 'image/png',

			},
			fields: {
				'nieuwegein:watergebruik_nhw_vaarwegvakken_app': {
					'VAARWEG_NAAM': 'Vaarwegnaam'
				}
			},
			options: {

				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				maxResolution: 14.0,
				visibility: true,
				opacity: 0.6,
			}
		},
		{
			type: 'wms',
			title: 'Ligplaatsen woonschepen/arken',
			url: 'http://' + location.host + '/geoserver/wms',
			wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html

			params: {
				layers: 'nieuwegein:watergebruik_woonboten_app',
				format: 'image/png',
			},
			fields: {
				'nieuwegein:watergebruik_woonboten_app': {
					'TYPE': 'Type',
					'OMSCHRIJVI': 'Omschrijving'
				}
			},
			options: {

				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				maxResolution: 14.0,
				visibility: true
			}
		},
		{
			type: 'wms',
			title: 'NHW Kilometerpunten',
			url: 'http://' + location.host + '/geoserver/wms',
			//wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html

			params: {
				layers: 'nieuwegein:watergebruik_nhw_kilometermarkering_app',
				format: 'image/png',

			},

			options: {

				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				maxResolution: 14.0,
				visibility: true
			}
		}
	],

	sidebar: true,

	sidebarHide: true,

	legend: [{
			title: "Woonboten",
			url: "./legenda_woonboten.png"
		},
		{
			title: "Waterbeheerders",
			url: "./legenda_beheerders.png"
		}
	]
};

Geogem.applicatieInit = function () {

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


	$('#OpenTopo').click();

	setTimeout(function () {
		Geogem.map.zoomTo(8);
	}, 10);
};