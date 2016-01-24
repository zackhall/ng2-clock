import {Component} from 'angular2/core';
import {NgClass} from 'angular2/common';
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
          </div>
        </div>
        `,
    styleUrls: ['app/stopwatch/stopwatch.css'],
    directives: [NgClass]
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

    reset() {
        this.stopwatchService.reset();
        this.started = false;
        (this.update())();
    }

    start() {
        this.timer = setInterval(this.update(), 1);
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
        let self = this;

        return () => {
            self.time = this.stopwatchService.time();
        };
    }

    onClick() {
        console.log(this.stopwatchService);
    }
}
