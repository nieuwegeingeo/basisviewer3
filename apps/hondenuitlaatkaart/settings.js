GeoApp.applicatieSettings = {
	overLays: [
		{
			type: 'wms',
			disabled: false,
			title: 'Gebieden met uitlaatvoorwaarden',
			url: 'http://geodev.nieuwegein.nl/geoserver/wms',
			params: {
				layers: 'nieuwegein:hondenuitlaatkaart_gebieden_app'
			},
			options: {
				wmsinfoformat: 'application/vnd.ogc.gml',
				singleTile: true,
				visible: true
			}
		},
		{
			type: 'wms',
			disabled: false,
			title: 'Honden afvalbak',
			url: 'http://geodev.nieuwegein.nl/geoserver/wms',

			params: {
				layers: 'nieuwegein:hondenuitlaatkaart_afvalbak_app'
			},
			options: {
				//wmsinfoformat: 'application/vnd.ogc.gml',
				singleTile: true,
				visible: true,
				maxResolution: 1.0
			}
		}
	],

	legend: [
		{
			title: "Afvalbakken",
			url: "//" + location.host + "/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=hondenuitlaatkaart_afvalbakken_style",
			scale: true
		},
		{
			title: "Gebieden",
			url: "//" + location.host + "/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=hondenuitlaatkaart_gebieden_style",
			scale: true
		},
	],

	layerManager: true,
};

GeoApp.applicatieInit = function () {


};