import { useEffect, useState } from "react";
import "./map2Gis.scss";
import { Map, ObjectManager, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { adApi } from "../../core/api/ad";
import Spinner from "../UI/Spinner/Spinner";
import { IAdDatails } from "../../core/types/IAdDatails";
import { FC } from "react";
import PopupMarker from "../PopupMarker";

interface YandexMapProps {
  res: IAdDatails;
}

export const YandexMap: FC<YandexMapProps> = ({ res }) => {
  const { data: mapProduct, isLoading: mapProductLoading } =
    adApi.useFetchMapIdQuery(res.categoryId);

  const mapState = {
    center:
      res.location.x < res.location.y
        ? [res.location.x, res.location.y]
        : [res.location.y, res.location.x],
    zoom: 15.4,
    behaviors: ["default", "scrollZoom"],
  };
  console.log(mapProduct);
  const collection = {
    type: "FeatureCollection",
    features:
      mapProduct &&
      mapProduct !== undefined &&
      mapProduct.map((point: any, id: number) => {
        return {
          id: id,
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates:
              res.location.x < res.location.y
                ? [point.locationX, point.locationY]
                : [point.locationY, point.locationX],
          },
          properties: {
            balloonContent: <PopupMarker point={point} />,
          },
        };
      }),
  };

  return (
    <>
      {mapProduct ? (
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
      ) : (
        <Spinner color={"blue"} />
      )}
    </>
  );
};
