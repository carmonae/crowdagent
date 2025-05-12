import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as traceorder from '../../../../shared/data/data/default-dashboard/track-order';

@Component({
    selector: 'app-track-order',
    templateUrl: './track-order.component.html',
    styleUrls: ['./track-order.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterLink]
})
export class TrackOrderComponent {

  trackOrder = traceorder.trackOrder
}
