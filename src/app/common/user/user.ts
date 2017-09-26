export class User {
  id: string;
  name : string;
  email: string;
  user_type: string;
  trial_expires_at: any;
  in_trial: any;
  service_order: any;
  preferred_services: any;
  access_tokens: any;
  customer: any;
  preferences: any;
  plan_name: string;
  created_at: any;
  linkedin_headline: string;
  linkedin_url: string;

  constructor( user?: any) {
    console.log('setting user', user);
    this.id = user && user.id || null;
    this.name = user && user.name || null;
    this.email = user && user.email || null;
    this.user_type = user && user.user_type || null;
    this.trial_expires_at = user && user.trial_expires_at || null;
    this.in_trial = user && user.in_trial || false;
    this.service_order = user && user.preferences.service_order || null;
    this.preferred_services = user && user.preferences.preferred_services || null;
    this.access_tokens = user && user.access_tokens || null;
    this.customer = user && user.customer || null;
    this.preferences = user && user.preferences || null;
    this.plan_name = user && user.plan_name || null;
    this.created_at = user && user.created_at || null;
    this.linkedin_headline = user && user.linkedin_headline || null;
    this.linkedin_url = user && user.linkedin_url || null;
  }

}
