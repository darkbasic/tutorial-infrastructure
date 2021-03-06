import {ParsedPatchDefinition} from './patch-definition';
import {Observable} from 'rxjs';
import {Http} from '@angular/http';

export interface TutorialDefinition {
  id: string;
  name: string;
  deprecated?: boolean;
  gitHub: string;
  baseRoute: string;
  versions: {[gitTagIdentifier: string]: {
    urlName: string;
    displayName?: string;
    dateString?: string;
    isLatest: boolean;
    steps: TutorialStep[];
  }};
  improveCodeUrlResolve?: (
    tutorial: TutorialDefinition,
    patchDetails: ParsedPatchDefinition,
    filename: string,
    stepNumber: string,
    revision: string,
    http: Http) => Observable<{
      url: string;
    }>;
}

export interface TutorialStep {
  url: string;
  name: string;
  template: string;
  youtubeVideoId?: string;
  hideCodeDiff?: boolean;
  noZipDownload?: boolean;
}

export interface TutorialBundle {
  tutorial: TutorialDefinition;
  steps: any[];
}
