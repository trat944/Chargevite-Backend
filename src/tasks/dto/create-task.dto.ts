export class CreateTaskDto {
  title: string;
  description: string;
  status: string;
}

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: string;
}
