import { Tag } from './app/models/tag';
import { Note } from './app/models/note';

const mockNoteContent =
  'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.\n' +
  '\n';
export const tags: Tag[] = ['test1', 'test2'];
export const notes: Note[] = [
  {
    id: '1',
    title: 'Test 1',
    content: mockNoteContent,
  },

  {
    id: '2',
    title: 'Test 1',
    content: mockNoteContent,
  },
  {
    id: '3',
    title: 'Test 1',
    content: mockNoteContent,
  },
  {
    id: '4',
    title: 'Test 1',
    content: mockNoteContent,
  },
  {
    id: '5',
    title: 'Test 1',
    content: mockNoteContent,
  },
  {
    id: '6',
    title: 'Test 1',
    content: mockNoteContent,
  },
  {
    id: '7',
    title: 'Test 1',
    content: mockNoteContent,
  },
];
