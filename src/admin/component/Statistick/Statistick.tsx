
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as TitleStat,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import "./statistick.scss";
import { statistickApi } from "../../../api/statistick";
import { useState,useEffect } from "react";
import Title from "./../../../component/Title/Title";
import { DatePicker } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TitleStat,
  Tooltip,
  Filler,
  Legend
);


const labels = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const Statistick = () => {
  const [filterCategoryName, setFilterCategoryName] = useState();
  const [filterNumber, setfilterNumber] = useState();
  const [views, setViews] = useState();
  const [year,setYear]=useState(2022)

  const [getCategoryBySumm, { data: stat }] =
    statistickApi.useLazyGetCategoryBySummQuery();
  const [getViews, { data: view }] = statistickApi.useLazyGetViewsQuery();
  const {data:userCompeleteData,} = statistickApi.useGetCompleteUserQuery('')
  

  useEffect(() => {
    getCategoryBySumm("").then((data: any) => {
      const result: any = [];
      const result2: any = [];

      data.data.map((d: any) => {
        result.push(d.categoryName);
        result2.push(d.number);
      });

      setFilterCategoryName(result);
      setfilterNumber(result2);
    });

   
  }, []);
  useEffect(() => {
    getViews(year).then((data: any) => {
      let result: any = [];
      const labels = [
        { name: "Январь", number: 0 },
        { name: "Февраль", number: 0 },
        { name: "Март", number: 0 },
        { name: "Апрель", number: 0 },
        { name: "Май", number: 0 },
        { name: "Июнь", number: 0 },
        { name: "Июль", number: 0 },
        { name: "Август", number: 0 },
        { name: "Сентябрь", number: 0 },
        { name: "Октябрь", number: 0 },
        { name: "Ноябрь", number: 0 },
        { name: "Декабрь", number: 0 },
      ];

      labels.map((el) => {
        return Object.keys(data.data).map((key: any) => {
          if (key === el.name) {
            result.push(data.data[key]);
          }
        });
      });
      setViews(result);
    });
  }, [year])
  

  const data = {
    labels: filterCategoryName ? filterCategoryName : [],
    datasets: [
      {
        label: "Количество обьявлений",
        data: filterNumber ? filterNumber : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const completeData = {
    labels: ['Полные','Не полные'],
    datasets: [
      {
        label: "Количество",
        data: userCompeleteData ? [userCompeleteData.Complete.length,userCompeleteData.Incomplete.length] : [],
        backgroundColor: [
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
         
        ],
        borderColor: [
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataView = {
    labels,
    datasets: [
      {
        fill: true,
        label: `Данные за ${year}`,
        data: views,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="statistick">
      <div className="statistick__block" style={{width:'60%'}}>
        <Title text="Количество товаров в категориях" size="25px" />
        <Pie data={data} />
      </div>
      <div className="statistick__block">
        <Title text="Посещения по месяцам" size="25px" />
        <div>
          <DatePicker 
            placeholder="Выберите год"
            picker="year"
            onChange={(value:any)=>setYear(value?.format('YYYY'))}
          />
        </div>
        <Line  data={dataView} />
      </div>
      <div className="statistick__block" style={{width:'60%'}}>
        <Title text="Полн/не полные зарегистрированные" size="25px" textAlign="center" />
        <Pie data={completeData} />
      </div>
    </div>
  );
};

export default Statistick;
