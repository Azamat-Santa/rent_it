// import { load } from "@2gis/mapgl";
import { useEffect, useState } from "react";
import "./map2Gis.scss";
import { Map, ObjectManager, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { adApi } from "../../api/ad";
import Spinner from "../Spinner/Spinner";

export const Map2Gis = ({ res }) => {
  const { data: mapProduct, isLoading: mapProductLoading, } = adApi.useFetchMapIdQuery(res.categoryId);
 
  const mapState = {
    center: res.location.x < res.location.y ? [res.location.x, res.location.y ]:[ res.location.y ,res.location.x],
    zoom: 15.4,
    behaviors: ["default", "scrollZoom"],
  };
  console.log(mapProduct);
  const collection = {
    type: "FeatureCollection",
    features: mapProduct && mapProduct !== undefined && mapProduct.map((point, id) => {
      return {
        id: id,
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: res.location.x < res.location.y ? [point.locationX,point.locationY] :[point.locationY,point.locationX],
        },
        properties: {
          balloonContent: `
          <div className="popup">
              <div className="popup-content">
                <img className='popup_img' src=${point.imageUrl} style='width:120px'/> <br/>
                ${point.title} <br/>
                цена: ${point.price} <br/>
                рейтинг : ${point.rating}
              </div>
            <div className="popup-tip"></div>
          </div>
        `}
      };
    }),
  };

 

  return (
    <>
         {
      mapProduct ? 
      <YMaps>
      <Map width="100%" height="400px" state={mapState}>
          <ObjectManager
            objects={{
              openBalloonOnClick: true,
            }}
            clusters={{}}
            options={{
              clusterize: true,
              gridSize: 32,
            }}
            defaultFeatures={collection}
            modules={[
              "objectManager.addon.objectsBalloon",
              "objectManager.addon.clustersBalloon",
            ]}
          />
        </Map>

      </YMaps>
      : 

      <Spinner/>
    }
    
    </>
  );
};
