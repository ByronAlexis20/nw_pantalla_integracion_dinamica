// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  apiUrl: 'http://localhost:9091',
  apiValidacion: 'http://172.17.17.13:9004',
  apiUrlServicioIntegracion: 'http://172.17.102.21:9002',
  //apiUrlComponentes: 'http://172.17.17.17:9002',
  //apiUrlComponentes: 'http://localhost:9002',
  apiUrlComponentes: 'http://172.17.17.17:9002',
  apiUrlSockect: 'http://172.17.17.17:8080',
  //apiUrl: 'http://172.17.17.13:9091'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
