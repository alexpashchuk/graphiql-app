import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import Spinner from './spinner.tsx';

describe('Spinner tests', () => {
  it('renders Spinner', () => {
    render(<Spinner />);
  });
});
