
import Landingpage from './components/screen/Landingpage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Landingpage></Landingpage>
    </QueryClientProvider>
  )
}

export default App
