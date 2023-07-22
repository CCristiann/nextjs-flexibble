"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";

import ProfilePageSkeleton from "@/components/skeleton/ProfilePageSkeleton";
import RelatedProjects from "@/components/RelatedProjects";

import { getRelatedProjects, getUserDetails } from "@/utils/actions";


type Props = {
  params: {
    id: string;
  };
};

const ProfilePage = ({ params }: Props) => {

  const [isLoading, setIsLoading] = useState(true)

  const [user, setUser] = useState<any>();
  const [projects, setProjects] = useState<any>();

  useEffect(() => {
    const getUser = async () => {
      const data = await getUserDetails(params.id);
      setUser(data);

      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }

    getUser();
  }, [params.id]);  

  useEffect(() => {
    const getProjects = async () => {
      const data = await getRelatedProjects(params.id)

      setProjects(data)
    }

    getProjects()
  }, [params.id])

  return (
    <section className="w-full flex flex-col gap-16 paddings mb-20">
      {isLoading ? (
        <ProfilePageSkeleton />
      ) : (
        <>
        <div className="flex flex-wrap items-center gap-20 w-full justify-between">
        <div className="flex flex-col gap-12">
          <Image
            className="rounded-full"
            src={user?.image}
            width={90}
            height={90}
            alt="User Image"
          />
          <p className="text-3xl md:text-5xl font-[800]">
            Hi I'm <br></br>
            {user?.username} 👋
          </p>

          <div className="flex gap-4">
            <button className="flex gap-4 bg-slate-200 md:px-5 md:py-3 px-4 py-2 items-center rounded-xl text-black font-medium text-sm">
              Follow
            </button>
            <button className="flex gap-4 bg-[#9747ff] px-5 py-3 rounded-xl text-white font-medium text-sm">
              Hire me
            </button>
          </div>
        </div>
        {projects.length !== 0 && (
          <div>
            <Image
              className="object-contain rounded-xl shadow-lg"
              src={projects[0].image}
              width={739}
              height={554}
              alt="Project Image"
            />
          </div>  
        )}
      </div>
      {projects.length !== 0 && (
        <>
        <section>
          <h4 className="font-semibold text-lg">Recent Work</h4>
          <RelatedProjects user={user}/>
        </section>
        </>
      )}
      </>
      )}
    </section>
  );
};

export default ProfilePage;
