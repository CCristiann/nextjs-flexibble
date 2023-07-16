import { Session } from "next-auth";


export interface formProps {
  title: string
  description: string
  image: string
  liveSiteUrl: string
  githubUrl: string
  category: string
}

export interface projectProps {
  _id: string
  title: string
  description: string
  image: string
  liveSiteUrl: string
  githubUrl: string
  category: string
  creator: {
    name: string
    email: string
    image: string
    _id: string
  }
}