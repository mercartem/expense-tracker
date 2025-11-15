import createBalance from '../entities/Balance/api/createBalance';
import getBalance from '../entities/Balance/api/getBalance';
import loginUser from '../entities/User/api/loginUser';
import registerUser from '../entities/User/api/registerUser';
import { Auth } from '../entities/User/lib/types/user';
import server from '../shared/constants/url';

describe('loginUser', () => {
  it('should return the user on successful login', async () => {
    const mockResponse = new Response(
      JSON.stringify({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
      }),
      { status: 200 },
    );
    const mockFetchPromise = Promise.resolve(mockResponse);
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const user: Auth = {
      email: 'test@example.com',
      password: 'password',
    };

    const result = await loginUser(user);
    expect(result).toEqual({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    });
  });

  it('should return the error message on unsuccessful login', async () => {
    const mockResponse = {
      status: 403,
      json: () => Promise.resolve([{ msg: 'Incorrect email or password' }]),
    };
    const mockFetchPromise = Promise.resolve(new Response(JSON.stringify(mockResponse)));
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const user: Auth = {
      email: 'test@example.com',
      password: 'password',
    };

    const result = await loginUser(user);
    expect(result).toEqual({ status: 403 });
  });
});

it('should return the error message on unsuccessful registration', async () => {
  const mockFetchPromise = Promise.resolve(
    new Response(
      JSON.stringify({
        status: 403,
        json: () => Promise.resolve([{ msg: 'Email already exists' }]),
      }),
    ),
  );
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  const user: Required<Auth> = {
    email: 'test@example.com',
    password: 'password',
    fullName: 'test',
  };

  const result = await registerUser(user);
  expect(result).toEqual({ status: 403 });
});

it('should return the error message on internal server error', async () => {
  const mockFetchPromise = Promise.resolve(
    new Response(
      JSON.stringify({
        status: 500,
        json: () => Promise.resolve({ message: 'Internal server error' }),
      }),
    ),
  );
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  const user: Required<Auth> = {
    email: 'test@example.com',
    password: 'password',
    fullName: 'test',
  };

  const result = await registerUser(user);
  expect(result).toEqual({ status: 500 });
});

it('should return the registered user data on successful registration', async () => {
  const mockFetchPromise = Promise.resolve(
    new Response(
      JSON.stringify({
        status: 200,
        json: () => Promise.resolve({ id: 1, name: 'Test User', email: 'test@example.com' }),
      }),
    ),
  );
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  const user: Required<Auth> = {
    email: 'test@example.com',
    password: 'password',
    fullName: 'test',
  };

  const result = await registerUser(user);
  expect(result).toEqual({ status: 200 });
});

it('should return the balance if token is valid', async () => {
  const mockFetchPromise = Promise.resolve(
    new Response(
      JSON.stringify({
        status: 200,
        json: () => Promise.resolve('100'),
      }),
    ),
  );
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  const token = 'valid-token';
  const result = await getBalance(token);
  expect(result).toEqual({ status: 200 });
});

it('should return 0 if the token is invalid', async () => {
  const mockFetchPromise = Promise.resolve(
    new Response(
      JSON.stringify({
        status: 404,
        json: () => Promise.resolve(null),
      }),
    ),
  );
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  const token = 'invalid-token';
  const result = await getBalance(token);
  expect(result).toEqual({ status: 404 });
});

describe('createBalance', () => {
  it('should create balance successfully', async () => {
    const mockFetchPromise = Promise.resolve(
      new Response(
        JSON.stringify({
          status: 201,
        }),
      ),
    );
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const balance = 100;
    const id = '1';
    const token = 'token';

    await createBalance(balance, id, token);

    expect(fetch).toHaveBeenCalledWith(`${server}/balance/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ balance }),
    });
  });

  it('should throw an error if balance creation fails', async () => {
    const mockFetchPromise = Promise.resolve(
      new Response(
        JSON.stringify({
          status: 400,
          json: () => Promise.resolve({ message: 'Error creating balance' }),
        }),
      ),
    );
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const balance = 100;
    const id = '1';
    const token = 'token';

    try {
      await createBalance(balance, id, token);
    } catch (error) {
      expect(error).toEqual('Error creating balance');
    }
  });
});
