import { Component } from '@angular/core';
import { trips } from '../data/trips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css' 
})
export class TripListingComponent {
  trips: Array<any> = trips;
}
