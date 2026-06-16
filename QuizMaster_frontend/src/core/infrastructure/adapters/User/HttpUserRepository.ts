import type { CreateUserDto } from "../../../application/dtos/User/CreateUserDto.ts";
import type { UpdateUserDto } from "../../../application/dtos/User/UpdateUserDto.ts";
import { User } from "../../../domain/entities/User.ts";
import type { UserRepository } from "../../../domain/ports/UserRepository.ts";
import type { Role } from "../../../domain/valueObjects/Role.ts";
import fetchApi from "../FetchApi.ts";

interface RawUser {
  id: number;
  lastName: string;
  firstName: string;
  surname: string;
  mail: string;
  password: string;
  role: Role;
  quizIds: number[];
  roomIds: number[];
  teamIds: number[];
}

const API_URL = import.meta.env.VITE_API_URL

export class HttpUserRepository implements UserRepository {
  async findAllUsers(): Promise<User[]> {
    const response = await fetchApi(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const rawUsers: RawUser[] = await response.json();
    return rawUsers.map((rawUser) => new User(rawUser));
  }

  async findUserById(id: number): Promise<User | null> {
    const response = await fetchApi(`${API_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const data = await response.json();
    return new User(data.user);
  }

  async findUserByMail(
    mail: string,
    password: string,
  ): Promise<[string, number]> {
    const response = await fetchApi(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mail, password }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const { token, id } = await response.json();
    return [token, id];
  }

  async createUser(user: CreateUserDto): Promise<void> {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<void> {
    const response = await fetchApi(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
  }

  async deleteUser(id: number): Promise<void> {
    const response = await fetchApi(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
  }
}
