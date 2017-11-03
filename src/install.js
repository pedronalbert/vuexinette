import { extend } from 'lodash';
import entities from './modules/entities';

export default store => extend(store, { entities });

