import { Company } from './company';

export class Site {
  id: string;
  company : Company;
  report : SVGForeignObjectElement;
  services : Array<Object>;
  traffic : Object;

  constructor( site?: any) {
    console.log('setting site', site);
    this.id = site && site.id || null;
    this.company = site && site.company || null;
    this.report = site && site.report || null;
    this.services = site && site.services || [];
    this.traffic = site && site.traffic_distribution || null;
  }

}
