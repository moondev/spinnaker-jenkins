webpackJsonp([2,3],{

/***/ 3304:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var feedbackUrl = process.env.FEEDBACK_URL;
var gateHost = process.env.API_HOST || '/gate';
var bakeryDetailUrl = process.env.BAKERY_DETAIL_URL || gateHost + '/bakery/logs/{{context.region}}/{{context.status.resourceId}}';
var authEndpoint = process.env.AUTH_ENDPOINT || gateHost + '/auth/user';
var authEnabled = false;
var netflixMode = false;
var chaosEnabled = netflixMode || process.env.CHAOS_ENABLED === 'true' ? true : false;
var fiatEnabled = false;
var entityTagsEnabled = false;
var debugEnabled = process.env.DEBUG_ENABLED === 'false' ? false : true;

window.spinnakerSettings = {
  checkForUpdates: false,
  debugEnabled: debugEnabled,
  defaultProviders: ['aws', 'gce', 'azure', 'cf', 'kubernetes', 'titus', 'openstack'],
  feedbackUrl: feedbackUrl,
  gateUrl: gateHost,
  bakeryDetailUrl: bakeryDetailUrl,
  authEndpoint: authEndpoint,
  pollSchedule: 30000,
  defaultTimeZone: process.env.TIMEZONE || 'America/Los_Angeles', // see http://momentjs.com/timezone/docs/#/data-utilities/
  defaultCategory: 'serverGroup',
  defaultInstancePort: 80,
  providers: {
    azure: {
      defaults: {
        account: 'azure-test',
        region: 'westus'
      }
    },
    aws: {
      defaults: {
        account: 'test',
        region: 'us-east-1',
        iamRole: 'BaseIAMRole'
      },
      defaultSecurityGroups: [],
      loadBalancers: {
        // if true, VPC load balancers will be created as internal load balancers if the selected subnet has a purpose
        // tag that starts with "internal"
        inferInternalFlagFromSubnet: false
      },
      useAmiBlockDeviceMappings: false
    },
    gce: {
      defaults: {
        account: 'my-google-account',
        region: 'us-central1',
        zone: 'us-central1-f'
      }
    },
    titus: {
      defaults: {
        account: 'titustestvpc',
        region: 'us-east-1',
        iamProfile: '{{application}}InstanceProfile'
      }
    },
    openstack: {
      defaults: {
        account: 'test',
        region: 'us-west-1'
      }
    },
    kubernetes: {
      defaults: {
        account: 'default',
        namespace: 'default',
        proxy: 'localhost:8001'
      }
    },
    appengine: {
      defaults: {
        account: 'my-appengine-account',
        editLoadBalancerStageEnabled: false
      }
    }
  },
  whatsNew: {
    gistId: '32526cd608db3d811b38',
    fileName: 'news.md'
  },
  notifications: {
    email: {
      enabled: true
    },
    hipchat: {
      enabled: true,
      botName: 'Skynet T-800'
    },
    sms: {
      enabled: true
    },
    slack: {
      enabled: true,
      botName: 'spinnakerbot'
    }
  },
  authEnabled: authEnabled,
  authTtl: 600000,
  gitSources: ['stash', 'github', 'bitbucket'],
  triggerTypes: ['git', 'pipeline', 'docker', 'cron', 'jenkins'],
  feature: {
    entityTags: entityTagsEnabled,
    fiatEnabled: fiatEnabled,
    pipelines: true,
    notifications: false,
    fastProperty: true,
    vpcMigrator: true,
    clusterDiff: false,
    roscoMode: false,
    netflixMode: netflixMode,
    chaosMonkey: chaosEnabled,
    // whether stages affecting infrastructure (like "Create Load Balancer") should be enabled or not
    infrastructureStages: process.env.INFRA_STAGES === 'enabled',
    jobs: false,
    snapshots: false
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(224)))

/***/ })

},[3304]);