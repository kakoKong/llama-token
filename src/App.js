import logo from './logo.svg';
import './App.css';
import FloatingAsset from './FloatingAsset';
import StaticAsset from './StaticAsset';

function App() {
  return (
    <div className="App">
      <FloatingAsset />
      {/* <StaticAsset /> */}
      <header className="App-header">
        <p>
          Your Website
        </p>
      </header>
    </div>
  );
}

export default App;
