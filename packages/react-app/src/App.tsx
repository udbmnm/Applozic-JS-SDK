import { FullView } from '@applozic/ui-components';
import './App.css';

const APPLICATION_ID = 'applozic-sample-app';

console.log('App.js loaded', FullView);

function App() {
  return (
    <FullView
      applicationId={APPLICATION_ID}
      giphyApiKey={'CBATnkyl4HPNGTSyBTN6PcFQTVozxLpM'}
      gMapsApiKey={'AIzaSyBXW2LRG4ysc1Tt7i_Agj4RRCn2jScxox0'}
      loginPage={{
        topHeader: 'My Brand',
        topSubHeader: 'Welcome message'
      }}
    />
  );
}

export default App;
