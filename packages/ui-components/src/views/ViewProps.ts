export interface ViewProps extends ViewWithLoginProps {
  /**
   * The Applozic Application ID as provided after onboarding
   */
  applicationId: string;
  /** GIPHY API Key to enable sending GIFs */
  giphyApiKey?: string;
  /** Google Maps API Key to enable sending Geo Location */
  gMapsApiKey?: string;
}

export interface ViewWithLoginProps {
  /** Login page customization */
  loginPage: {
    /** Top header in login page */
    topHeader: string;
    /** Welcome message in login page */
    topSubHeader: string;
  };
}
