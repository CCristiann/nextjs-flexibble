export interface Session {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
}

export interface userProps {
  user: {
    _id: string
    username: string
    image: string
    email: string
    projects: Array<string>
  }
}

export interface formProps {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export interface projectProps {
  _id: string;
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  creator: {
    name: string;
    email: string;
    image: string;
    _id: string;
  };
}
