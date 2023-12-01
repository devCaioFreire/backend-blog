// export interface Post {
//   id: string,
//   title: string,
//   body: string,
//   image: string,
//   date: Date | null,
//   authorID: string,
// }

export interface IPost {
  id: string,
  title: string;
  summary: string;
  content: string;
  image: string[];
  date: Date;
  authorID: string,
}