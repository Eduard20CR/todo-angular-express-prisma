export interface Todo {
  id: number;
  description: string;
  completed: boolean;
  order: number;
}

export interface TodoGroup {
  id: string;
  name: string;
  todos: Todo[];
}

export interface TodoDTO extends Todo {
  groupId: string;
}
