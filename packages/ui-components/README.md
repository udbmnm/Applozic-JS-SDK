# Applozic UI Components JavaScript SDK

## Installation

```bash
$ npm i @applozic/ui-components
```

## Importing (using npm import)

```TypeScript
import { FullView } from '@applozic/ui-components';
```

## Views

### Full View

```TypeScript
function App() {
  return (
    <FullView
      applicationId={'YOUR-APPLOZIC-APP-ID'}
      giphyApiKey={'YOUR-GIPHY-API-KEY'}
      gMapsApiKey={'YOUR-GOOGLE-MAPS-API-KEY'}
      loginPage={{
        topHeader: 'Brand Name',
        topSubHeader: 'Welcome Message'
      }}
    />
  );
}
```