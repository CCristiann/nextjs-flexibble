"use client";

import React, { useEffect, useState } from "react";

import RelatedProjects from "@/components/RelatedProjects";

import Image from "next/image";

import Modal from "@/components/Modal";
import Link from "next/link";

import { BsGithub, BsFillRocketTakeoffFill } from "react-icons/bs";

import ProjectPageSkeleton from "@/components/skeleton/ProjectPageSkeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteProject, getProjectDetails, updateUserProjects } from "@/utils/actions";

type Props = {
  params: {
    id: string;
  };
};

const ProjectPage = ({ params }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [project, setProject] = useState<any>();
  const [user, setUser] = useState<any>();

  const { data: session } : any = useSession();

  const router = useRouter();

  useEffect(() => {
    const getProject = async () => {
      const data = await getProjectDetails(params.id);
 
      setProject(data.project);
      setUser(data.user[0])
      
      setTimeout(() => {
        setIsLoading(false)
      }, 500)

    };

    getProject();
  }, [params.id]);


  const handleDelete = async () => {
    const hasConfirmedDelete = confirm(
      "Are you sure you want to delete this post?"
    );

    if (hasConfirmedDelete) {
      try {
        await deleteProject(params.id);
        await updateUserProjects(project.creator, params.id)

        router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = () => {};

  return (
    <Modal>
      {isLoading ? (
        <ProjectPageSkeleton />
      ) : (
        <>
          <section className="max-w-5xl w-full mx-auto flex flex-col gap-8">
            <section className="flex flex-wrap justify-between items-center gap-y-8">
              <div className="flex gap-4">
                <Link
                  className="flex items-center justify-center"
                  href={`/profile/${user._id}`}
                >
                  <Image
                    className="rounded-full"
                    src={user.image}
                    width={52}
                    height={52}
                    alt="Profile Image"
                  />
                </Link>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <p className="text-sm">
                    {user.username} -{" "}
                    <span className="text-[#9747ff] font-semibold">
                      {project.category}
                    </span>
                  </p>
                </div>
              </div>
              {session?.user?.id === project.creator && (
                <div className="flex gap-4 w-full sm:w-fit justify-center">
                  <button onClick={handleEdit} className="edit_btn">
                    <Image
                      src="/assets/icons/pencile.svg"
                      width={17}
                      height={17}
                      alt="pencil"
                    />
                  </button>
                  <button onClick={handleDelete} className="delete_btn">
                    <Image
                      src="/assets/icons/trash.svg"
                      width={17}
                      height={17}
                      alt="trash"
                    />
                  </button>
                </div>
              )}
            </section>
            <section className="flex flex-col gap-8">
              <div className="w-full lg:h-[65vh]">
                <Image
                  className="rounded-2xl w-full h-full object-cover"
                  src={project.image}
                  width={500}
                  height={500}
                  alt="Project Image"
                />
              </div>
              <p>{project.description}</p>

              <div className="flex gap-5 w-full justify-center">
                <Link
                  className="flex gap-2 items-center hover:text-[#9747ff] font-semibold transition"
                  href="/"
                >
                  <BsGithub />
                  GitHub
                </Link>
                <span>-</span>
                <Link
                  className="flex gap-2 items-center hover:text-[#9747ff] font-semibold transition"
                  href="/"
                >
                  <BsFillRocketTakeoffFill />
                  Live Site
                </Link>
              </div>
            </section>
          </section>

          <section className="w-full flex items-center gap-8 my-16 md:my-24">
            <span className="w-full h-[2px] bg-gray-200"></span>
            <Link
              className="flex items-center justify-center min-w-[82px] h-[82px]"
              href={`/profile/${project.creator}`}
            >
              <Image
                className="rounded-full"
                src={user.image}
                width={90}
                height={90}
                alt="Profile Image"
              />
            </Link>
            <span className="w-full h-[2px] bg-gray-200"></span>
          </section>

          <section className="w-full">
            <div className="w-full flex justify-between">
              <h4 className="font-semibold text-base">
                More by {user.username}
              </h4>
              <Link
                className="text-[#9747ff] text-base font-semibold"
                href={`/profile/${project.creator}`}
              >
                View All
              </Link>
            </div>

            <RelatedProjects user={user}/>
          </section>
        </>
      )}
    </Modal>
  );
};

export default ProjectPage;
