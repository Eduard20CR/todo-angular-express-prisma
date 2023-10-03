export interface Note {
  id: number;
  title: string;
  description: string;
}

export interface NoteGroup {
  id: string;
  name: string;
  notes: Note[];
}
