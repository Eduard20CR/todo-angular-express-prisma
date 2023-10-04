export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface NoteGroup {
  id: string;
  name: string;
  notes: Note[];
}

export interface NoteDTO extends Note {
  groupId: string;
}
