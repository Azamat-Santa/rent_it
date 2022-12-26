import { Calendar, Modal } from 'antd';

const ProductModalCalendar = ({dateFullCellRender,isCalendarModalOpen,closeCalendarModal,onPanelChange}:any) => {
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