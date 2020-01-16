import {Projection} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';

proj4.defs('EPSG:28992', `+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.2369,50.0087,465.658,-0.406857,0.350733,-1.87035,4.0812 +units=m +no_defs`);
register(proj4);
const rdNew = new Projection({
  code: 'EPSG:28992',
  extent: [482.06, 308914.15, 275902.39, 636381.86],
  units: 'm'
});

const ngExtent = [0, 300000, 300000, 600000];
// const ngExtent = [130000, 445000, 140000, 455000];

function getScale(map) {
    var resolution = map.getView().getResolution();
    var dpi = 25.4 / 0.28;
    var mpu = rdNew.getMetersPerUnit();
    var inchesPerMeter = 39.37;
    return parseFloat(resolution.toString()) * mpu * inchesPerMeter * dpi;

}

export {rdNew, ngExtent, getScale};