"use client"

import React, { ChangeEvent, useEffect, useState, useReducer } from "react";
import Image from "next/image";

import ProjectFormField from "./ProjectFormField";
import { createProject, updateProject, uploadImage } from "@/utils/actions";

import { formProps, projectProps, userProps } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";
import CategoryMenu from "./CategoryMenu";

import { categoryFilters } from "@/costants/costants";
import Button from "./Button";

type ProjectDataProps = {
  project: projectProps
  user: userProps
}

type ProjectFormProps = {
  type: string
  session: any,
  projectData?: ProjectDataProps
}

type ActionProps = 
  | { type: 'UPDATE_INPUT', KEY: string, value: string}
  | { type: 'UPDATE_CATEGORY', KEY: string, value: string}
  | { type: 'UPDATE_USER', payload: {
    name: string,
    email: string,
    image: string,
    id: string
  }}

type DispatchProps = {
  type: string
  KEY: string
  value: string
}

const initialState = {
  title: "",
  description: "",
  image: "",
  liveSiteUrl: "",
  githubUrl: "",
  category: "",
  user: null
}

function reducer(formState : formProps, action : ActionProps) {
  switch(action.type){
    case 'UPDATE_INPUT':
      return {
        ...formState,
        [action.KEY] :  action.value
      };
    
    case 'UPDATE_CATEGORY':
      return {
        ...formState,
        category: action.value
      }
  
    case 'UPDATE_USER':
      return {
        ...formState,
        user: action.payload
      }
    
    default:
    return formState
  }
}

const ProjectForm = ({ type, session, projectData } : ProjectFormProps, ) => {

  const router = useRouter();

  const [formState, dispatch] = useReducer(reducer, initialState)

  useEffect(() => { //Set user in the formState object
    dispatch({
      type: 'UPDATE_USER',
      payload: session?.user
    })

  }, [session])

  useEffect(() => { //Updating all form fields after fetching the project data
    if(projectData){
      dispatch({
      type: 'UPDATE_INPUT',
      KEY: 'title',
      value: projectData!.project.title
    })
    dispatch({
      type: 'UPDATE_INPUT',
      KEY: 'description',
      value: projectData!.project.title
    })
    dispatch({
      type: 'UPDATE_INPUT',
      KEY: 'image',
      value: projectData!.project.image
    })
    dispatch({
      type: 'UPDATE_INPUT',
      KEY: 'liveSiteUrl',
      value: projectData!.project.liveSiteUrl
    })
    dispatch({
      type: 'UPDATE_INPUT',
      KEY: 'githubUrl',
      value: projectData!.project.githubUrl
    })
    dispatch({
      type: 'UPDATE_INPUT',
      KEY: 'category',
      value: projectData!.project.category
    })
    }
  }, [projectData])

  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitProject = async (formState: formProps) => {
  
    if(type === 'create'){
      const response = await createProject(formState)

      if(response?.ok) router.push('/')
    }

    if(type === 'edit'){

      const isBase64DataURL = (value: string) => {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
      }

      const isUploadingNewImage = isBase64DataURL(formState.image)

      if(isUploadingNewImage) {
        const newImage =  await uploadImage(formState.image);
        formState.image = newImage
  
      }

      const response = await updateProject(formState, projectData?.project._id!)

      if(response) router.push('/')
      // if(response.ok) router.push('/')
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    submitProject(formState);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please select an image");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      dispatch({
        type: 'UPDATE_INPUT',
        KEY: 'image',
        value: result
      })
    };
  };

  return (
    <form onSubmit={handleSubmit} className="project_form">
      <div className="form_image-container">
        <label htmlFor="poster" className="form_image-label">
          {!formState.image && "Choose a poster for your project"}
        </label>
        <input
          className="form_file-input"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          onChange={handleImageChange}
        />
        {formState.image && (
          <Image
            src={formState?.image}
            alt="Project Poster"
            width={270}
            height={270}
          />
        )}
      </div>

      <div className="flex flex-col items-start justify-start gap-6">
        <ProjectFormField
          label="Title"
          isTextArea={false}
          placeholder="Project Name"
          required={true}
          state={formState.title}
          onChange={() => {}}
          dispatch={dispatch}
          KEY='title'
        />

        <ProjectFormField
          label="Description"
          isTextArea={true}
          placeholder="Showcase and discover remarkable developer projects."
          required={true}
          state={formState.description}
          onChange={() => {}}
          dispatch={dispatch}
          KEY='description'
        />

        <ProjectFormField
          label="Website URL"
          isTextArea={false}
          placeholder="http://website.com"
          required={false}
          state={formState.liveSiteUrl}
          onChange={() => {}}
          dispatch={dispatch}
          KEY='liveSiteUrl'
        />

        <ProjectFormField
          label="GitHub URL"
          isTextArea={false}
          placeholder="http://github.com/ccristiann"
          required={false}
          state={formState.githubUrl}
          onChange={() => {}}
          dispatch={dispatch}
          KEY='githubUrl'
        />

        <CategoryMenu
          title={formState.title}
          filters={categoryFilters}
          state={formState.category}
          onChange={() => {}}
          dispatch={dispatch}
          KEY='category'
        />
      </div>

      <Button
        title={
          isSubmitting
            ? `${type === "create" ? "Creating..." : "Editing"}`
            : `${type === "create" ? "Create" : "Edit"}`
        }
        type="submit"
        leftIcon={isSubmitting ? "" : "/assets/icons/plus.svg"}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default ProjectForm;
