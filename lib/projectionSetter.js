import {get as getProjection, Projection} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';


proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs");
register(proj4);

const rdNew = new Projection({
  code: 'EPSG:28992',
  // extent: [-7000, -289000, 300000, 629000],
  // extent: [0, 300000, 300000, 600000],
  // extent: [646.36, 276050.82, 308975.28, 636456.31],
  extent: [12628.0541, 308179.0423, 283594.4779, 611063.1429],
  // extent: [482.06, 308914.15, 275902.39, 636381.86],
  units: 'm',
  //center: [142892.19,470783.87]
});

// const ngExtent = [0, 300000, 300000, 600000];
const ngExtent = [130000, 445000, 140000, 455000];

function getScale(map) {
    var resolution = map.getView().getResolution();
    var dpi = 25.4 / 0.28;
    var mpu = rdNew.getMetersPerUnit();
    var inchesPerMeter = 39.37;
    return parseFloat(resolution.toString()) * mpu * inchesPerMeter * dpi;
}

export {rdNew, ngExtent, getScale};