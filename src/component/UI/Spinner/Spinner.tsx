import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { FC } from 'react';

interface SpinnerProps {
   color?:string;
   size?:string
}

const Spinner : FC<SpinnerProps> = ({color,size=24}) => {

const antIcon = <LoadingOutlined style={{ fontSize: size ,color:color}} spin />


   return <Spin indicator={antIcon} />

};

export default Spinner;