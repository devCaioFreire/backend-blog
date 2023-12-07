export interface IPost {
  id: string,
  title: string;
  summary: string;
  content: string;
  image: string | null;
  date: Date;
  authorID: string,
}