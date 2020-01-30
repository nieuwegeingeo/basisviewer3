import {get as getProjection, Projection} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';


proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs");
register(proj4);

const rdNew = new Projection({
  code: 'EPSG:28992',
  extent: [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999],
  units: 'm',
});

const ngExtent = [130000, 445000, 140000, 455000];

function getScale(map) {
    var resolution = map.getView().getResolution();
    var dpi = 25.4 / 0.28;
    var mpu = rdNew.getMetersPerUnit();
    var inchesPerMeter = 39.37;
    return parseFloat(resolution.toString()) * mpu * inchesPerMeter * dpi;
}

export {rdNew, ngExtent, getScale};