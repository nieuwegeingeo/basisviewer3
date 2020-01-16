Geogem.applicatieSettings = {

initialExtent: new OpenLayers.Bounds(131247,443641,138918,451212),

	overLays: [


	{
      type: 'wms',
      disabled: false,
      title: 'Waterstijgsnelheid',
      url: '//'+window.location.host+'/geoserver/ows?',
	  wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'nieuwegein:klimaatadaptatie_waterveiligheid_waterstijgsnelheid_app'
      },
      fields: {
          'nieuwegein:klimaatadaptatie_waterveiligheid_waterstijgsnelheid_app': {
              'GRAY_INDEX':'Stijgsnelheid (m/uur): ',
          }

      },
	  options: {
		singleTile: true,
		visibility: false,
        opacity: 0.6
	  }
    },

    ],

	sidebar: false

};

Geogem.applicatieInit = function(){
}

