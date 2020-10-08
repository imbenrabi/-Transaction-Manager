import { HandlerService } from './handler.service';
import { ParsingService } from './parsing.service';

/**
 * Export singleton services
 */
export const services = {
    handler: new HandlerService(),
    parsing: new ParsingService()
};
