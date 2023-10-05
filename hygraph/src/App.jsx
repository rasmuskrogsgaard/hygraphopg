
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { BlogPost } from './pages/blogpost';


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BlogPost></BlogPost>
    </QueryClientProvider>
  );
}

export default App;