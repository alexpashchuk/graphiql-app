import { vi } from 'vitest';
import * as firestoreAuth from 'firebase/auth';
import { renderWithProviders } from '@/test/test-utils.tsx';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { registerWithEmailAndPassword } from '@/firebase/firebase.ts';
import { auth } from '@/firebase/firebase.ts';
import { SIGN_IN } from '@/constants/constants.ts';
import { setAuthView } from '@/store/slices/userSlice.tsx';
import SignUp from '@/components/SignUp/signUp.tsx';

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth');
  const auth = actual as typeof firestoreAuth;
  return {
    ...auth,
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
  };
});

const mockOnSubmit = vi.fn();
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form');
  return {
    ...actual,
    useForm: () => ({
      register: vi.fn(),
      watch: vi.fn(),
      handleSubmit: mockOnSubmit,
      formState: {
        errors: {},
      },
    }),
  };
});

const mockDispatch = vi.fn();
vi.mock('@/hooks/useRedux', async () => ({
  ...(await vi.importActual<Record<string, unknown>>('@/hooks/useRedux')),
  useAppDispatch: () => mockDispatch,
}));

describe('Sign up test', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('sign up with name, email and password ', async () => {
    const wrapper = renderWithProviders(<SignUp />);
    const testEmail = 'test@gmail.com';
    const testPassword = 'VKNbS9c%3bBcHLXSn';
    const testName = 'Test';

    const inputName = wrapper.getByTestId('name') as HTMLInputElement;
    const inputEmail = wrapper.getByTestId('email') as HTMLInputElement;
    const inputPassword = wrapper.getByTestId('password') as HTMLInputElement;
    const inputConfirmPassword = wrapper.getByTestId('confirmPassword') as HTMLInputElement;
    const submitButton = wrapper.getByText(/Submit/i);

    await act(async () => {
      fireEvent.change(inputName, { target: { value: testName } });
      fireEvent.change(inputEmail, { target: { value: testEmail } });
      fireEvent.change(inputPassword, { target: { value: testPassword } });
      fireEvent.change(inputConfirmPassword, { target: { value: testPassword } });
    });
    expect(inputName.value).toBe(testName);
    expect(inputEmail.value).toBe(testEmail);
    expect(inputPassword.value).toBe(testPassword);
    expect(inputConfirmPassword.value).toBe(testPassword);

    await act(async () => {
      fireEvent.submit(submitButton);
    });

    expect(mockOnSubmit).toHaveBeenCalled();

    await registerWithEmailAndPassword(testName, testEmail, testPassword);
    expect(firestoreAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, testEmail, testPassword);
  });

  it('change auth view', async () => {
    const wrapper = renderWithProviders(<SignUp />);
    const signInButton = wrapper.getByText(/Sign in/i);

    await act(async () => {
      fireEvent.click(signInButton);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setAuthView(SIGN_IN));
  });
});
