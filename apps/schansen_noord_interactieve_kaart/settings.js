Geogem.applicatieSettings = {

	restrictedExtent: new OpenLayers.Bounds(134432.2, 447602.1, 135318.8, 448262.5),

	baseLayers: [

		{
			title: 'Luchtfoto',
			url: '//' + location.hostname + '/mapproxy/service',
			params: {
				layers: 'basisluchtfoto', // geowebcache layer
				format: 'image/png'
			},
			options: {
				//transitionEffect:'resize'
			}
		},

		{
			title: 'Schansen_Noord_ondergrond',
			url: '//' + location.hostname + '/mapproxy/service',
			params: {
				layers: 'bb_schansen_noord', // geowebcache layer
				format: 'image/png'
			},
			options: {
				//transitionEffect:'resize'
				singleTile: false,
			}
		},

		// {
		// title: 'Schets_ontwerp_papier',
		// url: '//' + location.hostname + '/mapproxy/service',
		// params: {
		// layers: 'bb_schansen_noord_schets',		// geowebcache layer
		// format: 'image/png'
		// },
		// options: {
		// transitionEffect:'resize'
		// }
		// }

	],

	overLays: [

		// {
		// type: 'wms',
		// title: 'Schetsontwerp',
		// url: '//' + location.host +'/geoserver/wms',
		// wmsinfoformat: 'application/vnd.ogc.gml',
		// params: {
		// layers: 'nieuwegein:bb_schansen_noord_schetsontwerp_cad_app',
		// format: 'image/png',
		// },
		// fields: {
		// 'nieuwegein:bb_schansen_noord_schetsontwerp_cad_app' : {
		// 'NAAM'         :'Soort uitvoer',
		// 'TEKST'         :'Tekst',
		// 'HEXCOLOR' : 'Hexcolor',
		// 'HEXFILLCOLOR' : 'Hexfillcolor',
		// 'TRANSPARENT' : 'Transparantie',
		// }
		// },
		// options: {
		// singleTile: false,
		// visibility: false,
		// }
		// },
		// {
		// type: 'wms',
		// title: 'Locaties',
		// url: '//' + location.host +'/geoserver/wms',
		// wmsinfoformat: 'application/vnd.ogc.gml',
		// params: {
		// layers: 'nieuwegein:bb_schansen_noord_locaties_app',
		// format: 'image/png'
		// },
		// fields: {
		// 'nieuwegein:bb_schansen_noord_locaties_app' : {
		// 'LOCATIENUMMER'         :'Nummer',
		// 'TITEL'                 :'Titel',
		// 'TEKST'                 :'Omschrijving',
		// 'FOTO_1'                :'Foto 1',
		// 'FOTO_2'                :'Foto 2',
		// 'FOTO_3'                :'Foto 3',
		// 'FOTO_4'                :'Foto 4',
		// 'FOTO_5'                :'Foto 5',
		// }
		// },
		// options: {
		// singleTile: true,
		// visibility: true,
		// }
		// },

		// {
		// type: 'wms',
		// title: 'Deelgebieden',
		// url: '//' + location.host +'/geoserver/wms',
		// params: {
		// layers: 'nieuwegein:bb_schansen_noord_deelgebieden_app',
		// format: 'image/png'
		// },

		// options: {
		// singleTile: true,
		// visibility: false,
		// }
		// },
		{
			type: 'wms',
			title: 'Voorlopig ontwerp',
			url: '//' + location.host + '/geoserver/wms',
			wmsinfoformat: 'application/vnd.ogc.gml',
			params: {
				layers: 'nieuwegein:bb_schansen_noord_voorlopig_ontwerp_app',
				format: 'image/png',
			},
			fields: {
				'nieuwegein:bb_schansen_noord_schetsontwerp_cad_app': {
					'NAAM': 'Soort uitvoer',
					'TEKST': 'Tekst',
					'HEXCOLOR': 'Hexcolor',
					'HEXFILLCOLOR': 'Hexfillcolor',
					'TRANSPARENT': 'Transparantie',
				}
			},
			options: {
				singleTile: false,
				visibility: false,
			}
		},
	],

	// legend: [
	// {title:"Schetsontwerp", url:"./legenda.png"},
	// ],
	legendUrl: "./legenda.png",

	urlParams: {
		centerx: 134856,
		centery: 447944,
		kaartschaal: 2500
	},

	sidebar: true,

	sidebarHide: true,

	infoUrl: null,

	infoTab: 'Welkom op de interactieve kaart van Schansen Noord.',

	altLayerswitcher: true,

};

Geogem.applicatieInit = function () {

	// layermanager = new OpenLayers.Control.LayerSwitcher();
	// Geogem.map.addControl(layermanager);
	// layermanager.activate();
	// layermanager.maximizeControl();

	// $('#legendhead').unbind();
	// $('#legendShowHide').remove();
	// $('#legendImage').css('padding-top', 0);
	// $('#legendImage h3').click();
	$('#legendhead').click();

	$('#Schansen_Noord_ondergrond').click();

	$('#topbar, #bottombar, .olControlScaleLine').remove();

	$('#barContainer, #zoomtools').css('top', '10px');
	$('#legend').css('bottom', '10px');


	wfs = new OpenLayers.Layer.Vector("Locaties wfs", {
		strategies: [new OpenLayers.Strategy.BBOX()],
		projection: new OpenLayers.Projection("EPSG:28992"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0",
			srsName: "EPSG:28992",
			url: '//' + location.host + '/geoserver/ows',
			featureNS: 'http://www.nieuwegein.nl',
			featureType: 'bb_schansen_noord_locaties_app',
			geometryName: 'geom',
		}),
		minScale: 6500,
		styleMap: new OpenLayers.StyleMap({
			"default": new OpenLayers.Style(null)
		}),
		multiFilter: true,
		// ,maxResolution: 0.8
		visibility: true,
		displayInLayerSwitcher: false,
	});


	Geogem.map.addLayer(wfs);

	$.each($('.olControlLayerSwitcher').children().children().children('input, label'), function (index, item) {
		console.log(item);
		$(item).on('click', function () {
			console.log('test');
		});
	});

	OpenLayers.Feature.Vector.style.default.pointRadius = 200;
	OpenLayers.Feature.Vector.style.default.fillColor = '#FF0000';
	OpenLayers.Feature.Vector.style.default.fillOpacity = 0.1;
	OpenLayers.Feature.Vector.style.default.strokeColor = '#88179F';
	OpenLayers.Feature.Vector.style.default.strokeWidth = 8;
	OpenLayers.Feature.Vector.style.default.strokeOpacity = 0;
	OpenLayers.Feature.Vector.style.default.cursor = 'pointer';

	Geogem.createIntroPopup = function () {

		$('body').append('<div class="form-overlay">' +
			'<div class="form-pos__container" style="max-width: 70em;">' +
			'<div class="form-body border-ng-paars border-round border-box shadow">' +
			'<div class="form-item"><h1>Welkom op de interactieve kaart!</h1></div>' +
			'<div class="flex-break"></div>' +
			'<div class="form-item"><p>Hier uitleg over de kaart!</p></div>' +
			'<div class="basic-button no-select" id="akkoord-button"><span>Ik ga akkoord</span></div>' +
			'<div class="basic-button no-select" id="niet-akkoord-button"><span>Ik ga niet akkoord</span></div>' +

			'</div>' +
			'</div>' +
			'</div>');

		$('#akkoord-button').on('click', function () {
			$('.form-overlay').remove();
			document.cookie = 'setAkkoord=1';
		});

		$('#niet-akkoord-button').on('click', function () {
			window.location.href = 'https://ikbennieuwegein.nl/projecten/buurtaanpak+schansen-noord/default.aspx';
		});

	};

	if (document.cookie !== 'setAkkoord=1') {
		Geogem.createIntroPopup();
	}



};