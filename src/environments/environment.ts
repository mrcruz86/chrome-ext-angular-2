// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  url: 'https://dev.intricately.com/',
  api: 'https://api-test.intricately.com/api/v1/',
  linkedinRedirect: 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&scope=r_basicprofile%20r_emailaddress&state=STATE&client_id=750vtgg7t743nf&redirect_uri=https://dev.intricately.com/authcallback',
  pubnub: {
    subscribeKey: 'sub-c-947a8452-21bd-11e4-a3bd-02ee2ddab7fe'
  },
  mixpanel: {
    key: 'b5e25f5085f3e0c6ab2b05fccea54fe5'
  },
  pendo: {
    key: 'c37a24e4-ff4e-4e17-655e-373a11bcef10'
  },
  intercom: {
    id: 'lzidr0yo'
  }
};
