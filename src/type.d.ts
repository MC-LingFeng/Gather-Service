
declare type User = {
  user_id: number,
  username: string,
  password_encrypted: string,
  password_tag: string,
  password_key: string,
  password_vector: string,
  password_algorithm: string,
  grade: number,
  phone?: string,
  mail?: string,
  gender?: string,
}

declare type Route = {
  id: number,
  path: string,
  name: string,
  father_path: string | null,
  sort: number,
  user: number,
}

