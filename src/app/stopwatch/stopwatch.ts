import {Component} from 'angular2/core';
import {NgClass, NgIf, NgFor} from 'angular2/common';
// import {Lap} from './stopwatch-svc';
import {StopwatchService} from './stopwatch-svc';

@Component({
    selector: 'stopwatch',
    template:
        `
        <div class="container">
          <h1>{{ formatTime(time) }}</h1>
          <div class="btn-group">
            <button (click)="toggle()">
              <i class="icon" 
                 [ngClass]="{ 'ion-play': !started, 'ion-pause': started }">
              </i>
            </button>
            <button (click)="reset()"><i class="icon ion-refresh"></i></button>
            <button (click)="lap()">Split</button>
          </div>
            <div class="laps"
                *ngIf="stopwatchService.laps.length > 1">

                <div class="lap"
                    *ngFor="#lap of stopwatchService.laps; #i = index; #last = last">
                    
                    <div>Round {{ i }}</div>
                    <div>{{ formatTime(lap.startMs) }}</div>
                    <div *ngIf="last">{{ formatTime(time) }}</div>
                    <div *ngIf="!last">{{ formatTime(lap.endMs) }}</div>

                </div>

            </div>
        </div>
        `,
    styleUrls: ['app/stopwatch/stopwatch.css'],
    directives: [NgClass, NgIf, NgFor]
})

export default class Stopwatch {
    public started: boolean;
    public stopwatchService: StopwatchService;
    public time: number;

    private timer: any;

    constructor(stopwatchService: StopwatchService) {
        this.stopwatchService = stopwatchService;
        this.time = 0;
        this.started = false;
    }

    formatTime(timeMs: number) {
        let minutes: string,
            seconds: string;

        minutes = Math.floor(timeMs / 60000).toString();
        seconds = ((timeMs % 60000) / 1000).toFixed(3);
        return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
    }

    getUpdate() {
        let self = this;

        return () => {
            self.time = this.stopwatchService.time();
        };
    }

    lap() {
        this.update();

        if (this.time) {
            this.stopwatchService.lap();
        }
    }

    reset() {
        this.stopwatchService.reset();
        this.started = false;
        this.update();
    }

    start() {
        this.timer = setInterval(this.getUpdate(), 1);
        this.stopwatchService.start();
    }

    stop() {
        clearInterval(this.timer);
        this.stopwatchService.stop();
    }

    toggle() {
        if (this.started) {
            this.stop();
        } else {
            this.start();
        }

        this.started = !this.started;
    }

    update() {
        this.time = this.stopwatchService.time();
    }

    onClick() {
        console.log(this.stopwatchService);
    }
}
