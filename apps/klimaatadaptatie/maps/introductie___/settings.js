Geogem.applicatieSettings = {

initialExtent: new OpenLayers.Bounds(131247,443641,138918,451212),

	overLays: [
    
    {
      type: 'wms',
      disabled: false,
      title: 'Risico op paalrot',
      url: '//'+window.location.host+'/qgis/qgis_mapserv.fcgi.exe?service=WMS&map=//nieuwegein//shared//geo//GIS_consultancy//2017//klimaatadaptatie//QGIS/klimaatadaptatie_droogte.qgs',
	  wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'droogte_effect_paalrot'          
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
      url: '//'+window.location.host+'/qgis/qgis_mapserv.fcgi.exe?service=WMS&map=//nieuwegein//shared//geo//GIS_consultancy//2017//klimaatadaptatie//QGIS/klimaatadaptatie_droogte.qgs',
	  //wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'potentieel_maximaal_neerslagtekort_gem_huidig'          
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
      url: '//'+window.location.host+'/qgis/qgis_mapserv.fcgi.exe?service=WMS&map=//nieuwegein//shared//geo//GIS_consultancy//2017//klimaatadaptatie//QGIS/klimaatadaptatie_droogte.qgs',
	  //wmsinfoformat: 'application/vnd.ogc.gml',
      params: {
        layers: 'potentieel_maximaal_neerslagtekort_gem_2050'          
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


    /*Geogem.showSidebarContent()

    $('#sidebar_main_head h3').html("");
    $('#sidebar_content2_data').load('./info.html');
    $('#sidebar_content2_head').empty(); 
    $('#sidebar_content2_head').click();     
    $('#sidebar_content2_head').append('Lagen'); 
   */
}

