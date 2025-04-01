import { EReportType } from 'containers/sample/types';
import g from 'js';

const radius = 20;
const area = g.circleArea(radius);

console.log(area === Math.pow(g.getPi(), 2) * radius);
console.log(area === otherModule.circleArea(radius));
