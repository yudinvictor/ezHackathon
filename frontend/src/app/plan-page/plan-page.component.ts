import {Component, OnInit} from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NodesService} from '../services/nodes.service';
import {FormControl, FormGroup} from '@angular/forms';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: 'app-plan-page',
    templateUrl: './plan-page.component.html',
    styleUrls: ['./plan-page.component.scss']
})
export class PlanPageComponent implements OnInit, AfterViewInit {

    constructor(private nodesService: NodesService) {
    }

    dataHeader = ['Номер', 'Старт', 'Новый старт', 'Штраф', 'Изначальная длительность', 'Фактическая длительность', 'Штраф за длину'];
    selectedOptimization = 0;

    data = [[10000, 2449, 1278, 43327, 0, 0, 0],
        [8562, 429, 429, 0, 0, 0, 0],
        [1645, 177, 177, 0, 163, 163, 0],
        [836, 2, 2, 0, 170, 170, 0],
        [7359, 232, 232, 0, 189, 189, 0],
        [6444, 100, 100, 0, 125, 65, 0],
        [2360, 7, 0, 0, 84, 84, 0],
        [5565, 3, 3, 0, 133, 133, 0],
        [8158, 132, 132, 0, 194, 194, 0],
        [7474, 6, 0, 0, 119, 37, 0],
        [2548, 2, 2, 0, 130, 130, 0],
        [9987, 1095, 1095, 0, 0, 0, 0],
        [3260, 38, 38, 0, 11, 11, 0],
        [619, 10, 10, 0, 19, 19, 0],
        [9950, 722, 722, 0, 6, 6, 0],
        [1180, 10, 10, 0, 73, 73, 0],
        [8098, 335, 335, 0, 131, 131, 0],
        [2462, 142, 142, 0, 190, 190, 0],
        [1198, 1, 1, 0, 134, 134, 0],
        [7211, 157, 157, 0, 86, 86, 0],
        [1853, 9, 9, 0, 14, 14, 0],
        [4737, 6, 6, 0, 144, 144, 0],
        [8135, 54, 54, 0, 54, 54, 0],
        [5085, 13, 13, 0, 32, 8, 0],
        [4433, 6, 6, 0, 0, 0, 0],
        [7035, 8, 8, 0, 2, 2, 0],
        [7508, 182, 182, 0, 54, 54, 0],
        [5224, 154, 148, 0, 28, 28, 0],
        [994, 5, 5, 0, 129, 129, 0],
        [2488, 8, 2, 0, 146, 146, 0],
        [2252, 2, 2, 0, 0, 0, 0],
        [9834, 488, 488, 0, 42, 42, 0],
        [8683, 321, 321, 0, 116, 116, 0],
        [4033, 45, 45, 0, 126, 126, 0],
        [187, 11, 11, 0, 30, 30, 0],
        [1913, 9, 0, 0, 0, 0, 0],
        [908, 9, 9, 0, 0, 0, 0],
        [6274, 291, 288, 0, 21, 21, 0],
        [1193, 11, 0, 0, 92, 92, 0],
        [3852, 253, 253, 0, 35, 35, 0],
        [1953, 94, 92, 0, 157, 157, 0],
        [846, 2, 2, 0, 90, 90, 0],
        [5569, 30, 30, 0, 115, 115, 0],
        [2855, 6, 6, 0, 19, 19, 0],
        [9526, 481, 481, 0, 0, 0, 0],
        [9221, 341, 334, 0, 130, 130, 0],
        [5418, 337, 334, 0, 0, 0, 0],
        [566, 8, 8, 0, 127, 119, 0],
        [4939, 142, 142, 0, 192, 192, 0],
        [2959, 2, 2, 0, 135, 41, 0],
        [8630, 326, 326, 0, 0, 0, 0],
        [6540, 185, 185, 0, 136, 136, 0],
        [859, 1, 1, 0, 57, 57, 0],
        [3567, 86, 86, 0, 91, 91, 0],
        [1661, 1, 1, 0, 67, 67, 0],
        [3037, 2, 2, 0, 80, 80, 0],
        [2592, 9, 9, 0, 152, 152, 0],
        [8491, 133, 133, 0, 138, 138, 0],
        [5534, 101, 101, 0, 26, 26, 0],
        [4460, 3, 3, 0, 95, 95, 0],
        [8071, 94, 92, 0, 31, 31, 0],
        [5337, 1, 1, 0, 91, 91, 0],
        [5585, 3, 3, 0, 54, 35, 0],
        [7810, 130, 130, 0, 165, 165, 0],
        [5884, 124, 124, 0, 5, 5, 0],
        [1866, 2, 2, 0, 120, 34, 0],
        [7981, 14, 14, 0, 7, 7, 0],
        [7203, 4, 4, 0, 0, 0, 0],
        [9701, 616, 557, 0, 99, 99, 0],
        [9177, 472, 472, 0, 141, 85, 0],
        [2278, 200, 200, 0, 0, 0, 0],
        [1021, 11, 11, 0, 181, 86, 0],
        [7121, 225, 225, 0, 0, 0, 0],
        [1868, 41, 41, 0, 178, 178, 0],
        [1390, 1, 1, 0, 30, 30, 0],
        [5854, 1, 1, 0, 91, 91, 0],
        [6061, 8, 8, 0, 0, 0, 0],
        [8856, 443, 443, 0, 22, 22, 0],
        [7621, 254, 254, 0, 187, 187, 0],
        [7098, 123, 123, 0, 0, 0, 0],
        [1543, 8, 8, 0, 12, 12, 0],
        [4601, 5, 5, 0, 0, 0, 0],
        [6041, 10, 10, 0, 111, 71, 0],
        [7464, 123, 123, 0, 124, 124, 0],
        [7184, 30, 30, 0, 4, 2, 0],
        [3682, 9, 9, 0, 8, 8, 0],
        [3769, 5, 0, 0, 20, 20, 0],
        [5193, 116, 116, 0, 0, 0, 0],
        [5067, 1, 1, 0, 107, 107, 0],
        [5880, 1, 1, 0, 0, 0, 0],
        [9401, 433, 433, 0, 0, 0, 0],
        [7465, 164, 164, 0, 104, 104, 0],
        [1091, 4, 0, 0, 155, 155, 0],
        [2335, 11, 11, 0, 105, 105, 0],
        [7466, 264, 264, 0, 159, 159, 0],
        [4775, 184, 184, 0, 80, 80, 0],
        [749, 3, 3, 0, 112, 112, 0],
        [3672, 25, 25, 0, 159, 159, 0],
        [1083, 7, 7, 0, 18, 18, 0],
        [3959, 67, 67, 0, 0, 0, 0]];

    formChanges = new FormGroup({
            id: new FormControl(),
            date: new FormControl(),
            duration: new FormControl(),
        }
    );

    get changesIdControl() {
        return this.formChanges.get('id');
    }

    get changesDateControl() {
        return this.formChanges.get('date');
    }

    get changesDurationControl() {
        return this.formChanges.get('duration');
    }

    get optimizeOptions() {
        return this.nodesService.optimizeOptions;
    }

    get realData(): any[] {
        console.log(this.selectedOptimization);
        const options = this.optimizeOptions;
        return options[options.penalty[this.selectedOptimization][0]];
    }

    selectFinishPlan = 0;

    get dataSource() {
        return new MatTableDataSource<any[]>(this.realData);
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    columnNums = [0, 1, 2, 3, 4, 5, 6];

    onSubmit() {
        console.log('hello');
        console.log(this.changesIdControl);
        this.nodesService.addChanges(
            this.changesIdControl.value,
            this.changesDateControl.value,
            this.changesDurationControl.value,
        );
        this.formChanges.reset();
    }

    onSelectOptimization(index) {
        this.selectedOptimization = index;
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
    }

}
