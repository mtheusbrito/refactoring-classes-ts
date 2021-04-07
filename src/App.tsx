import { BrowserRouter  } from 'react-router-dom';
import { FoodsProvider } from './hooks/useFoods';

import Routes from './routes';

import GlobalStyle from './styles/global';

// const App = () => (
//   <>
//     <GlobalStyle />
//     <Router>
//       <Routes />
//     </Router>
//   </>
// );

const App = ():JSX.Element =>{
  return (
    <BrowserRouter>
      <FoodsProvider>
      <GlobalStyle/>
        <Routes/>
      </FoodsProvider>
    </BrowserRouter>
  )
}

export default App;
