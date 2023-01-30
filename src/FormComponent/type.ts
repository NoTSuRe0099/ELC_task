export interface Entry {
  name: string;
  email: string;
  message: string;
}

export interface FormState {
  entries: Entry[];
  filteredEntries: Entry[];
  searchTerm: string;
  filterOption: 'name' | 'email' | 'message';
}