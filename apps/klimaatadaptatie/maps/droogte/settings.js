Geogem.applicatieSettings = {

initialExtent: new OpenLayers.Bounds(131247,443641,138918,451212),

	overLays: [

    {
      type: 'wms',
      disabled: false,
      title: 'Risico op paalrot',
//      url: '//'+window.location.host+'/qgis/qgis_mapserv.fcgi.exe?service=WMS&map=//nieuwegein//shared//geo//GIS_consultancy//2017//klimaatadaptatie//QGIS/klimaatadaptatie_droogte.qgs',
      url: '//'+ location.host +'/geoserver/ows?',
	  wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'klimaatadaptatie_droogte_effect_paalrot_app'
      },
      fields: {
        'droogte_effect_paalrot': {
          'BU_NAAM': 'Gebiedsnaam  ',
          'VZETTING': 'Verschilzetting  ',
          'PAALROT': 'Paalrot  '
        }
      },
	  options: {
		singleTile: true,
		visibility: false
	  }
    },

    {
      type: 'wms',
      disabled: false,
      title: 'Maximaal neerslag tekort huidig',
      url: '//'+ location.host +'/geoserver/ows?',
	  wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'nieuwegein:klimaatadaptatie_droogte_potentieel_maximaal_neerslagtekort_gem_huidig_app'
      },
        fields: { 'nieuwegein:klimaatadaptatie_droogte_potentieel_maximaal_neerslagtekort_gem_huidig_app': {
            'neerslagte': 'Neerslagtekort'
            }
        },
	  options: {
		singleTile: true,
		visibility: false,
        opacity: 0.7
	  }
    },
    {
      type: 'wms',
      disabled: false,
      title: 'Maximaal neerslag tekort 2050',
      url: '//'+ location.host +'/geoserver/ows?',
	  wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'nieuwegein:klimaatadaptatie_droogte_potentieel_maximaal_neerslagtekort_gem_2050_app'
      },
        fields: { 'nieuwegein:klimaatadaptatie_droogte_potentieel_maximaal_neerslagtekort_gem_2050_app': {
            'neerslagte': 'Neerslagtekort'
            }
        },
	  options: {
		singleTile: true,
		visibility: false,
        opacity: 0.7
	  }
    },
    {
      type: 'wms',
      disabled: false,
      title: 'Gemiddeld laagste grondwaterstand huidig',
      url: '//'+ location.host +'/geoserver/ows?',
	  wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'nieuwegein:klimaatadaptatie_droogte_gem_laagste_grondwaterstand_huidig_app'
      },
        fields: { 'nieuwegein:klimaatadaptatie_droogte_gem_laagste_grondwaterstand_huidig_app': {
            'GRAY_INDEX': 'Grondwaterstand (m)'
            }
        },
	  options: {
		singleTile: true,
		visibility: false,
        opacity: 0.7
	  }
    },
    {
      type: 'wms',
      disabled: false,
      title: 'Gemiddeld laagste grondwaterstand 2050',
      url: '//'+ location.host +'/geoserver/ows?',
	  wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'nieuwegein:klimaatadaptatie_droogte_gem_laagste_grondwaterstand_2050_app'
      },
        fields: { 'nieuwegein:klimaatadaptatie_droogte_gem_laagste_grondwaterstand_2050_app': {
            'GRAY_INDEX': 'Grondwaterstand (m)'
            }
        },
	  options: {
		singleTile: true,
		visibility: false,
        opacity: 0.7
	  }
    },
    ],
	sidebar: false

};

Geogem.applicatieInit = function(){

}

