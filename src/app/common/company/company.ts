export class Company {
  id: string;
  name : string;
  desc : string;
  logo : string;
  location : Object;
  spend : number;
  social : Object = {};
  subsidiaries : Array<Object>;
  parent : string;
  services : Array<Object>;
  traffic : Object;

  constructor( company?: any) {
    console.log('setting company', company);
    this.id = company && company.id || null;
    this.name = company && company.name || null;
    this.desc = company && company.description || null;
    this.logo = company && company.square_logo_url || './assets/images/vendorlogos/cloudrupt.jpg';
    this.location = company && company.location || null;
    this.spend = company && company.ability_to_spend || null;
    if (company && company.social) {
      for (let key in company.social) {
        if (company.social[key].url) {
          this.social[key] = company.social[key];
        }
      }

      if (Object.keys(this.social).length < 1) {
        this.social = null;
      }
    } else {
      this.social = null;
    }
    this.subsidiaries = company && company.children || null;
    this.parent = company && company.parent || null;
    this.services = company && company.services || null;
    this.traffic = company && company.traffic_distribution || null;
  }

}
