import { ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";
import { Frame } from "../model/frame";

export class PieChart {
    public chartOptions: ChartOptions = {
        responsive: true
    };
    public chartLabels: Label[] = ['Regular', 'Spare', 'Strike'];
    public chartData: number[] = [0, 0, 0];
    public chartType: ChartType = 'pie';
    public chartColors = [
        {
            backgroundColor: ['aqua', 'yellow', 'green'],
        },
    ];

    fillData(frameList: Frame[]) : number[]{
        let result: number[] =  [0, 0, 0];
        for (let frame of frameList) {
            if (!frame.flag.includes("/") && !frame.flag.includes("X")) {
                result[0]++;
            } 
            if (frame.flag.includes("/")) {
                result[1]++;
            } 
            if (frame.flag.includes("X")) {
                result[2]++;
            } 
        }
        return result;
    }
    
}