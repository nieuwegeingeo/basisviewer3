Geogem.applicatieSettings = {
	baseLayers: [{
			title: 'OpenTopo',
			url: location.protocol + '//' + location.hostname + '/mapproxy/service',
			params: {
				layers: 'opentopo', // geowebcache layer
				format: 'image/jpeg'
			},
			options: {
				attribution: 'Bron: J.W. van Aalst, www.opentopo.nl'
				//transitionEffect:'resize'
			}
		},

		{
			title: 'Basiskaart',
			url: location.protocol + '//' + location.hostname + '/mapproxy/service',
			params: {
				layers: 'basiskaart_nieuwegein', // geowebcache layer
				format: 'image/jpeg'
			},
			options: {
				attribution: 'Luchtfoto 2018'
				//transitionEffect:'resize'
			}
		},

	],

	overLays: [{
			type: 'wms',
			title: 'Zonnepanelen',
			url: '//' + location.host + '/geoserver/nieuwegein/wms',
			wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
			params: {
				layers: 'nieuwegein:zonnepanelen_totalen_app',
				format: 'image/png',
			},
			options: {
				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				visibility: true
			}
		},

		{
			type: 'wms',
			title: 'Speellocaties buurten',
			url: '//' + location.host + '/geoserver/nieuwegein/wms',
			wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
			params: {
				layers: 'nieuwegein:speellocaties_buurten_app',
				format: 'image/png',
			},
			options: {
				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				visibility: true
			}
		},
		{
			type: 'wms',
			title: 'Speellocaties',
			url: '//' + location.host + '/geoserver/nieuwegein/wms',
			wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
			params: {
				layers: 'nieuwegein:speellocaties_locaties_app',
				format: 'image/png',
			},
			options: {
				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				visibility: true
			}
		},

	],

	legendUrl: null,

	sidebar: true,

	sidebarHide: true,

	altLayerswitcher: true,

	printExtension: true,

}


Geogem.applicatieInit = function () {

	$('#legendhead').click();


	// });
}