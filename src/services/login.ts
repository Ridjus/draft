export interface LoginCredentialsDTO {
  email: string;
  password: string;
}

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO) => {
  return fetch('http://127.0.0.1:5173/login', {
    method: 'POST',
    body: JSON.stringify({ email: data.email, password: data.password }),
  });
};
