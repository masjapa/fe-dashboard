import React from 'react';
import Table from '../components/Table';
import Card from '../components/Card';
import Footer from '../components/Footer'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const data = useSelector((state) => state.data.data || []);
  const mainData = React.useMemo(() => data.filter((item) => item.dev === 'main'), [data]);
  const secondData = React.useMemo(() => data.filter((item) => item.dev === 'second'), [data]);
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 mt-[100px]'>
        <Card name={'Development 1'} count={data.filter((item) => item.dev === 'main').length} />
        <Card name={'Development 2'} count={data.filter((item) => item.dev === 'second').length} />
        <Card name={'Revenue Streams'} count={0} isCurrency={true} />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2  gap-4 mb-4'>
        <Table data={mainData} title={'Development Table'} type={'main'} />
        <Table data={secondData} title={'Development Table 2'} type={'second'} />
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
