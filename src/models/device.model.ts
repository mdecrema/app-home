import { ICON } from "./icon.model";

export interface DEVICE {
    name: string,
    deviceGroup: DEVICE_GROUP,
    icon: ICON,
    route: string
}

export enum DEVICE_GROUP {
    LIGHT = 'LIGHT',
    CAMERA = 'CAMERA',
    SENSOR = 'SENSOR',
    APPLIANCE = 'APPLIANCE'
}