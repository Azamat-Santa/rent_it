import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';



const Spinner = ({color,size=24}) => {

const antIcon = <LoadingOutlined style={{ fontSize: size ,color:color}} spin />


   return <Spin indicator={antIcon} />

};

export default Spinner;