Geogem.applicatieSettings = {

initialExtent: new OpenLayers.Bounds(131247,443641,138918,451212),

	overLays: [

    {
      type: 'wms',
      disabled: false,
      title: 'waterlopen',
      url: '//'+ location.host +'/geoserver/ows?',
	  //wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'nieuwegein:klimaatadaptatie_wateroverlast_waterlopen_app'
      },
	  options: {
		singleTile: true,
		visibility: false
	  }
    },
    {
      type: 'wms',
      disabled: false,
      title: 'Risico op wateroverlast',
      url: '//'+ location.host +'/geoserver/ows?',
	  wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'nieuwegein:klimaatadaptatie_wateroverlast_risico_op_overlast_app'
      },
      fields: {
          'nieuwegein:klimaatadaptatie_wateroverlast_risico_op_overlast_app': {
              'BU_NAAM': 'Wijk'
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
      title: 'Maximale overstromingsdiepte',
      url: '//'+ location.host +'/geoserver/ows?',
	  wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'nieuwegein:klimaatadaptatie_wateroverlast_maximale_overstromingsdiepte_app'
      },
      fields: {
          'nieuwegein:klimaatadaptatie_wateroverlast_maximale_overstromingsdiepte_app': {
              'GRAY_INDEX': 'Diepte (m)'
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
      title: 'Wateroverlast 100mm',
      url: '//'+ location.host +'/geoserver/ows?',
	  //wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'nieuwegein:klimaatadaptatie_wateroverlast_kaart_tauw_100mm_app'
      },
	  options: {
		singleTile: true,
		visibility: false,
        opacity: 1

	  }
    },
    ],
	sidebar: false
};

Geogem.applicatieInit = function(){

     $('#Kaart').click();
     $('#Kaart').click();
    var kaart = Geogem.map.getLayersByName('Kaart')[0];
    kaart.setOpacity(0.7);
}

