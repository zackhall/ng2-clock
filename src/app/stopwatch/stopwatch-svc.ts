import {Injectable} from 'angular2/core';


@Injectable()
export class StopwatchService {
    private startAt: number;
    private lapTime: number;

    constructor() {
        this.startAt = null;
        this.lapTime = null;
    }

    now() {
        return (new Date()).getTime();
    }

    reset() {
        this.startAt = 0;
        this.lapTime = 0;
    }

    start() {
        this.startAt = this.startAt
            ? this.startAt
            : this.now();
    }

    stop() {
        this.lapTime = this.startAt
            ? this.lapTime + this.now() - this.startAt
            : this.lapTime;

        this.startAt = 0;
    }

    time() {
        return this.lapTime
            + (this.startAt ? this.now() - this.startAt : 0);
    }
}
