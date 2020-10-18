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

    get dataHeader() {
        const columns = this.optimizeOptions.columns;
        if (columns) {
            return columns;
        }
        return ['Номер', 'Старт', 'Новый старт', 'Штраф', 'Изначальная длительность', 'Фактическая длительность', 'Штраф за длину'];
    }

    selectedOptimization = 0;

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


    dataSource = new MatTableDataSource<any[]>(this.realData);
    // get dataSource() {
    //     this.matTableDataSource.data = this.realData;
    //     return this.matTableDataSource;
    // }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    get columnNums() {
        const res = [];
        for (let i = 0; i < this.dataHeader.length; ++i) {
            res.push(i);
        }
        return res;
    }

    onSubmit() {
        console.log('hello');
        console.log(this.changesIdControl);
        this.nodesService.addChanges(
            this.changesIdControl.value,
            this.changesDateControl.value,
            this.changesDurationControl.value,
            (val) => {
                this.selectedOptimization = 0;
                this.dataSource = new MatTableDataSource<any[]>(this.realData);
                this.dataSource.paginator = this.paginator;
            }
        );
        this.formChanges.reset();
        this.dataSource.data = this.realData;
    }

    onSelectOptimization(index) {
        this.selectedOptimization = index;
        this.dataSource = new MatTableDataSource<any[]>(this.realData);
        this.dataSource.paginator = this.paginator;
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.nodesService.getGraph(null, (val) => {
            this.selectedOptimization = 0;
            this.dataSource = new MatTableDataSource<any[]>(this.realData);
            this.dataSource.paginator = this.paginator;
        });
    }

}
