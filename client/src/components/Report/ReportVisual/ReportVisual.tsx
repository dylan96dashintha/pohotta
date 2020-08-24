import React from "react";

import { Line } from "react-chartjs-2";

interface IDataSet {
    data : number[];
    label : string;
    type? : string;
    backgroundColor? : string;
    borderColor? :string;
    showLine? : boolean;
    options? : {};
    pointRadius? : number;
    borderDash? : number[];
    pointBackgroundColor? : string;
    fill? : boolean;
    stack? : string;
    yAxisID? : string;
    hitRadius? : number;
    borderWidth? : number;
 
}

const editDataset = (dataset:IDataSet):IDataSet => {
    if (dataset) {

        if (dataset.label === "Pääoma") {
            dataset.backgroundColor =  'rgba(0, 196, 91, 0.5)';//'#00C45B';
            dataset.borderColor = '#00C45B';
            dataset.pointRadius = 1;
            dataset.hitRadius = 5;
            dataset.type = "line";
            dataset.fill = true;
            dataset.yAxisID ='normalAxis';
        }
        if (dataset.label === "Tuotto") {
            dataset.backgroundColor =  'rgba(0, 196, 91, 0.25)';//'#00C45B';
            dataset.borderColor = 'rgba(0, 196, 91, 0.45)';
            dataset.pointRadius = 1;
            dataset.hitRadius = 5;
            dataset.type = "line";
            dataset.fill = true;
            dataset.yAxisID ='normalAxis';
        }
        if (dataset.label === "Tavoite") {
            dataset.type = "line";
            dataset.borderColor = '#FFFFFF';
            dataset.pointRadius = 0;
            dataset.hitRadius = 5;
            dataset.borderDash = [7,10]; //7,10
            dataset.backgroundColor = 'transparent';
            dataset.fill = true;
            dataset.yAxisID ='goalAxis';
            dataset.borderWidth = 2;
        }
        
    }
    // console.log(dataset);
    return dataset;
}

const ReportVisual = (props:any) => {
    const {visualLabels, datasets} = props.report;
    const maxValue = datasets ? datasets[2].data[0] : 0; // max from goal
    const minValue = datasets ? Math.min.apply(Math, datasets[0].data) : 0; // min from current Math.min.apply(Math, nums)
    const readyDataset = datasets ? datasets.map( (dataset:IDataSet) => {
        return editDataset(dataset);
    }):[];

    const data = {
      labels: visualLabels,
      datasets: readyDataset
    };
    let basicOptions = {
      responsive: true,
      tooltips: {
        mode: "label"
      },
      tooltipEvents: ["mousemove", "touchstart", "touchmove", "click"],
      elements: {
        line: {
          fill: true,
          point:{
            radius: 0
          }
        }
      },
      scales: {
        xAxes: [{
            display: true,
            ticks: {
                maxTicksLimit: 11
            },
            gridLines: {
              color: "rgba(145, 145, 145, 0.4)"
            }}
        ],
        yAxes: [{
            id: "normalAxis",
            type: "linear",
            display: true,
            position: "left",
            gridLines: {
              display: true,
              color: "rgba(145, 145, 145, 0.4)"
            },
            ticks: {
              max: maxValue,
              min: minValue,
              maxTicksLimit: 5 
            },
            stacked: true
        },
        {
          id: "goalAxis",
          type: "linear",
          display: false,
          position: "left",
          gridLines: {
            display: true,
            color: "rgba(145, 145, 145, 0.4)"
          },
          ticks : {
            max: maxValue*1.006,
            min: minValue
        }
        }]
      }
    };
      
    const selectedVisual = (
        <Line
        data={data}
        options={basicOptions}
        />
    );

    return <div className="visual">{selectedVisual}</div>;
  };

export default ReportVisual;
