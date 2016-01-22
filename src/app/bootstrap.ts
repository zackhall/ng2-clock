import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {StopwatchService} from './stopwatch/stopwatch-svc';

import Stopwatch from './stopwatch/stopwatch';

@Component({
    selector: 'app',
    directives: [Stopwatch],
    template: '<div><stopwatch></stopwatch></div>'
})

class App { }

bootstrap(App, [StopwatchService]);
