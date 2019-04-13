
import { Zone } from './Zone';
import { ZoneStatic } from "./ZoneStatic";
import { ZoneDynamic } from "./ZoneDynamic";

interface Factory {
    createZone(name: string, backgroundImage: string): Zone;
}

export class ZoneFactory implements Factory {
    createZone(name, backgroundImage) {
        switch (name) {
            case 'road':
                return new ZoneDynamic(backgroundImage, true);
            case 'river':
                return new ZoneDynamic(backgroundImage, false);
            case 'tree':
                return new ZoneStatic(backgroundImage, true);
        }
    }
}