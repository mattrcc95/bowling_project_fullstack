import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";
import { Frame } from "../model/frame";

export class BarChart {
    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    public barChartType: ChartType = 'bar';
    public barChartColors: any[] = [
        {
            backgroundColor: 'aqua',
        },
    ];

    public barChartLabels: Label[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    public barChartLegend = true;
    public barChartData: ChartDataSets[] = [
        { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Absolute Shot Frequency' }
    ];

    fillData(frameList: Frame[]): number[] {
        let result: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let frame of frameList) {
            if (frame.shot1 != null)
                result[frame.shot1]++
            if (frame.shot2 != null)
                result[frame.shot2]++
            if (frame.shot3 != null)
                result[frame.shot3]++
        }

        return result
    }
}
