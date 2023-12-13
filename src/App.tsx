import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/routes.tsx';
import { LocalizationProvider } from './context/localizationContext';

const App = () => {
  return (
    <LocalizationProvider>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
};

export default App;
