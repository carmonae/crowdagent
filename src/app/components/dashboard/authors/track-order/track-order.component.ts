import { Component } from '@angular/core';
import * as traceorder from '../../../../shared/data/data/default-dashboard/track-order'

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent {

  trackOrder = traceorder.trackOrder
}
