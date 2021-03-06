import {Component, OnInit} from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NodesService} from '../services/nodes.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';

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

    constructor(private nodesService: NodesService, private snackBar: MatSnackBar) {
    }

    get dataHeader() {
        let columns: any[] = this.optimizeOptions.columns;
        if (columns) {
            if (!this.haveIsBig && this.checkIsBig) {
                this.haveIsBig = true;
                columns.pop();
            }
            return columns;
        }
        return ['Номер', 'Старт', 'Новый старт', 'Штраф', 'Изначальная длительность', 'Фактическая длительность', 'Штраф за длину'];
    }

    haveIsBig = false;

    get checkIsBig() {
        const columns: any[] = this.optimizeOptions.columns;
        if (!columns) {
            return false;
        }
        return columns[columns.length - 1] === 'is_big';
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
                this.haveIsBig = false;
                this.openSnackBar('Данные успешно обновленны');
            }
        );
        this.formChanges.reset();
        this.dataSource.data = this.realData;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onSelectOptimization(index) {
        this.selectedOptimization = index;
        this.dataSource.data = this.realData;
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    openSnackBar(message: string, action: string = null) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    ngOnInit(): void {
        this.nodesService.getGraph(null, (val) => {
            this.selectedOptimization = 0;
            this.dataSource.data = this.realData;
            this.haveIsBig = false;
        });
    }

    get isBigCol() {
        return this.dataHeader.indexOf('is_big');
    }

    classByElement(element: any) {
        if (this.haveIsBig) {
            return element[element.length - 1] ? 'big' : '';
        } else {
            return '';
        }
    }
}
