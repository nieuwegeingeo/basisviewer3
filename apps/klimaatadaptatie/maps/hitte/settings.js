Geogem.applicatieSettings = {

initialExtent: new OpenLayers.Bounds(131247,443641,138918,451212),

	overLays: [
        {
        type: 'wms',
        title: 'Hittestress door warme nachten huidig',
        url: 'http://' + location.host +'/geoserver/wms',
        //wmsinfoformat: 'application/vnd.ogc.gml',
        params: {
            layers: 'nieuwegein:klimaatadaptatie_hitte_hittestress_door_warme_nachten_huidig_app',
            format: 'image/jpeg'
            },
        options: {
            singleTile: true,
            visibility: false
            }
        },
        {
        type: 'wms',
        title: 'Hittestress door warme nachten 2050',
        url: 'http://' + location.host +'/geoserver/wms',
        //wmsinfoformat: 'application/vnd.ogc.gml',
        params: {
            layers: 'nieuwegein:klimaatadaptatie_hitte_hittestress_door_warme_nachten_2050_app',
            format: 'image/jpeg'
            },
        options: {
            singleTile: true,
            visibility: false
            }
        },
        {
        type: 'wms',
        title: 'Relatieve gevoelstemperatuur 2050',
        url: 'http://' + location.host +'/geoserver/wms',
        //wmsinfoformat: 'application/vnd.ogc.gml',
        params: {
            layers: 'nieuwegein:klimaatadaptatie_hittestress_relatieve_gevoelstemperatuur_2050_app',
            format: 'image/jpeg'
            },
        options: {
            singleTile: true,
            visibility: false
            }
        },

        {
        type: 'wms',
        title: 'Relatieve gevoelstemperatuur 2014',
        url: 'http://' + location.host +'/geoserver/wms',
        //wmsinfoformat: 'application/vnd.ogc.gml',
        params: {
            layers: 'klimaatadaptatie_hittestress_relatieve_gevoelstemperatuur_2014_app',
            format: 'image/jpeg'
            },
        options: {
            singleTile: true,
            visibility: false
            }
        },

        {
        type: 'wms',
        disabled: false,
        title: 'Opwarming oppevlaktewater 2050',
        url: 'http://' + location.host +'/geoserver/wms',
        //wmsinfoformat: 'application/vnd.ogc.gml',
        params: {
            layers: 'nieuwegein:klimaatadaptatie_hitte_opwarming_opp_water_2050_app'
            },
        options: {
            singleTile: true,
            visibility: false
            }
        },

        {
        type: 'wms',
        disabled: false,
        title: 'Opwarming oppevlaktewater huidig',
        url: 'http://' + location.host +'/geoserver/wms',
        //wmsinfoformat: 'application/vnd.ogc.gml',
        params: {
            layers: 'nieuwegein:klimaatadaptatie_hitte_opwarming_opp_water_huidig_app'
            },
        options: {
            singleTile: true,
            visibility: false
            }
        },

        {
        type: 'wms',
        disabled: false,
        title: 'Kwetsbare locaties',
        url: 'http://' + location.host +'/geoserver/wms',
        wmsinfoformat: 'application/vnd.ogc.gml',
        params: {
            layers: 'nieuwegein:klimaatadaptatie_hittestress_gevoelige_objecten_app'
            },
        fields: {
            'nieuwegein:klimaatadaptatie_hittestress_gevoelige_objecten_app': {
                'B':'Soort',
                'instelling':'Instelling',
                'straat':'Straat',
                'POSTCODE':'Postcode',
            }
        },
        options: {
            singleTile: true,
            visibility: false
            }
        },
],
	sidebar: false

};

Geogem.applicatieInit = function(){

}

