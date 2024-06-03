import { Component, OnInit } from '@angular/core';
import { DEVICE, DEVICE_GROUP } from 'src/models/device.model';
import { forIn } from 'lodash';
import { ICON } from 'src/models/icon.model';
import { WsService } from 'src/services/ws.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent  implements OnInit {
  public deviceTabs: Array<DEVICE> = new Array<DEVICE>();

  messages: any[];
  newMessage: string;

  constructor(
    private wsService: WsService
  ) {
    this.messages = [];
    this.newMessage = '';
    }

  ngOnInit() {
    this.setDeviceTabs()

    this.wsService.connect('wss://whale-app-3wbzf.ondigitalocean.app');
    this.wsService.getMessages().subscribe((message: any) => {
      console.log(message)
      
      this.messages.push(message);
    });
  }

  private setDeviceTabs(): DEVICE[] {
    const deviceGroups: any[] = []

    forIn(DEVICE_GROUP, (value, key) => {
      deviceGroups.push(
          {
              value
          }
      )
    })

    if (deviceGroups && deviceGroups.length) {
      deviceGroups.forEach(device => {
        this.deviceTabs.push(
          {
            name: device.toString(),
            deviceGroup: device,
            icon: this.getDeviceIcon(device.value),
            route: `tabs/${(device.value).toLowerCase()}s`
          }
        )
      });
    }

    return this.deviceTabs

  }

  public setTabsMargin(tab: DEVICE): string {
    return this.deviceTabs.indexOf(tab) % 2 !== 0 ? '120px' : '0px'
  }

  private getDeviceIcon(deviceGroup: DEVICE_GROUP): ICON {
    switch (deviceGroup) {
      case DEVICE_GROUP.LIGHT:
        
        return ICON.LIGHT
      case DEVICE_GROUP.CAMERA:
        
        return ICON.CAMERA
      case DEVICE_GROUP.SENSOR:
        
        return ICON.SENSOR
      case DEVICE_GROUP.APPLIANCE:
        
        return ICON.APPLIANCE
  }
  }

  public setMessage(ev: any) {
    this.newMessage = ev.target.value;
  }

  public sendMessage() {
    this.wsService.sendMessage(this.newMessage);
  }
}
