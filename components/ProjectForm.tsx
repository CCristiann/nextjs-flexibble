import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

import ProjectFormField from "./ProjectFormField";
import { uploadImage } from "@/utils/actions";

import { formProps } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";
import CategoryMenu from "./CategoryMenu";

import { categoryFilters } from "@/costants/costants";
import Button from "./Button";
import { Session } from "next-auth";

const ProjectForm = ({ type, session }: any) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    image: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
    user: {},
  });

  const [categoryState, setCategoryState] = useState();

  const createProject = async (formState: formProps) => {
    const image = await uploadImage(formState.image);
    formState.image = image;

    try {
      const response = await fetch("/api/project/new", {
        method: "POST",
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    createProject(formState);
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

      handleFormStateChange("image", result);
    };
  };

  const handleFormStateChange = (fieldName: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
      user: session?.user,
    }));
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
          required={type === "create"}
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
          setFormState={(value) => handleFormStateChange("title", value)}
        />

        <ProjectFormField
          label="Description"
          isTextArea={true}
          placeholder="Showcase and discover remarkable developer projects."
          required={true}
          setFormState={(value) => handleFormStateChange("description", value)}
        />

        <ProjectFormField
          label="Website URL"
          isTextArea={false}
          placeholder="http://website.com"
          required={false}
          setFormState={(value) => handleFormStateChange("liveSiteUrl", value)}
        />

        <ProjectFormField
          label="GitHub URL"
          isTextArea={false}
          placeholder="http://github.com/ccristiann"
          required={false}
          setFormState={(value) => handleFormStateChange("githubUrl", value)}
        />

        <CategoryMenu
          title={formState.title}
          filters={categoryFilters}
          categoryState={formState.category}
          setCategoryState={(value) => handleFormStateChange("category", value)}
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
