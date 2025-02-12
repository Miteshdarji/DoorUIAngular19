import { Component } from '@angular/core';
import { DoorDesignVisualizeComponent } from '../door-design-visualize/door-design-visualize.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-door-design-list',
  imports: [DoorDesignVisualizeComponent,CommonModule],
  templateUrl: './door-design-list.component.html',
  styleUrl: './door-design-list.component.css'
})
export class DoorDesignListComponent {

}
