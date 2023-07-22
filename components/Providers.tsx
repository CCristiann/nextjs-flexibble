"use client";

import { useState, useEffect } from "react";

import { getProviders, signIn } from "next-auth/react";

import Image from "next/image";

import Modal from "./Modal";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signInUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const Providers = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <Modal>
        <div className="flex flex-col justify-center items-center gap-10 max-w-xl mx-auto w-full h-full rounded-2xl px-10">
          <Image
            src="/assets/images/logo-purple.svg"
            width={150}
            height={80}
            alt="Logo"
          />

          <p className="">
            Choose a provider to start sharing your best projects!
          </p>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {providers &&
              Object.values(providers).map((provider: Provider) => (
                <button
                  type="button"
                  className="sign-in_btn_provider"
                  key={provider.name}
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl:
                        "http://localhost:3000",
                    })
                  }
                >
                  Sign in with
                  {
                    <Image
                      src={
                        provider.id === "google"
                          ? "/assets/icons/google-icon.svg"
                          : provider.id === "github"
                          ? "/assets/icons/github-icon.svg"
                          : ""
                      }
                      width={30}
                      height={30}
                      alt="provider icon"
                    />
                  }
                </button>
              ))}
          </div>
        </div>
      </Modal>
    );
  }
};

export default Providers;
