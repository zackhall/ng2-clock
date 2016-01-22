import {Component} from 'angular2/core';
import {StopwatchService} from './stopwatch-svc';

@Component({
    selector: 'stopwatch',
    template:
        `
        <div class="container">
          <h1>{{ formatTime(time) }}</h1>
          <div class="btn-group">
            <button (click)="start()">Start</button>
            <button (click)="stop()">Stop</button>
            <button (click)="reset()">Reset</button>
          </div>
        </div>
        `,
    styleUrls: ['app/stopwatch/stopwatch.css']
})

export default class Stopwatch {
    public stopwatchService: StopwatchService;
    public time: number;

    private timer: any;

    constructor(stopwatchService: StopwatchService) {
        this.stopwatchService = stopwatchService;
        this.time = 0;
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
