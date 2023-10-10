export interface Todo {
  id: number;
  description: string;
  done: boolean;
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
export interface TodoGroupArr {
  groupId: string;
  todos: Todo[];
}
