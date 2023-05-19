import { Calendar, Modal } from "antd";
import { Dayjs } from "dayjs";
import { FC } from 'react';



interface ProductModalCalendarProps{
dateFullCellRender:(day:Dayjs)=> React.ReactNode;
isCalendarModalOpen:boolean;
closeCalendarModal:()=>void;
onPanelChange:(day:Dayjs)=>void
}

const ProductModalCalendar :FC<ProductModalCalendarProps> = ({
  dateFullCellRender,
  isCalendarModalOpen,
  closeCalendarModal,
  onPanelChange,
}) => {
  return (
    <Modal
      open={isCalendarModalOpen}
      onCancel={closeCalendarModal}
      footer={null}
      width="720px"
    >
      <Calendar
        fullscreen={false}
        dateFullCellRender={dateFullCellRender}
        onPanelChange={onPanelChange}
        mode={"month"}
      />
    </Modal>
  );
};

export default ProductModalCalendar;
