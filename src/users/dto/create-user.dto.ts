export class CreateUserDto {
  name!: string;
  username!: string;
  password!: string;
  unit!: string;
  role!: string;
  managedIds?: string[];
}
