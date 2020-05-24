import React, { useState } from 'react';
import Map from '../map/map';
import { DatePicker } from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import HomeHeader from './home-header';
import './home.css';
import LineChart from '../line-chart/line-chart';



function disabledDate(current) {
	// Can not select days before today and today
	return current && current >= moment().endOf('day');
}

export default function Home() {

	const [date, setDate] = useState('2020-02-24');
	function onChange(date, dateString) {
		console.log(date, dateString);
		setDate(dateString);
	}

	return (
		<div>
			<HomeHeader />
			<div className="datepicker-container">
				<span>按日期选择：</span>
				<DatePicker
					defaultValue={moment('2020-02-24', 'YYYY-MM-DD')}
					format={'YYYY-MM-DD'}
					onChange={onChange}
					locale={locale}
					disabledDate={disabledDate}
				/>
			</div>
			<Map date={date} />
			<LineChart />
		</div>
	)
}
