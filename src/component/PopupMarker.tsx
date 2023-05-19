import { FC } from "react";
interface PopupMarkerProps {
  point: any;
}
const PopupMarker: FC<PopupMarkerProps> = ({ point }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <img
          className={"popup_img"}
          src={point.imageUrl}
          style={{ width: "120px" }}
        />
        <br />
        {point.title} <br />
        цена: {point.price} <br />
        рейтинг : {point.rating}
      </div>
      <div className="popup-tip"></div>
    </div>
  );
};

export default PopupMarker;
