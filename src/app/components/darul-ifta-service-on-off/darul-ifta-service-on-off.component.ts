import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-darul-ifta-service-on-off',
  templateUrl: './darul-ifta-service-on-off.component.html',
  styleUrls: ['./darul-ifta-service-on-off.component.css']
})
export class DarulIftaServiceOnOffComponent implements OnInit {

  fatwaOnOff : boolean;

  constructor() { }

  ngOnInit(): void {
    this.fatwaOnOff = true;
  }

  fatwaOnOffSetting() {
    this.fatwaOnOff = true;
  }

}
