"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from 'react';
import Loader from '@/components/spiner/Spiner';
import { toast } from "react-toastify";

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "admin@acme.com",
    password: "admin",
  };
  const [showLoader, setShowLoader] = useState(false);

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      // `values` contains email & password. You can use provider to connect user

      // console.log(values)
      setShowLoader(true)

      const data = {
        username : values.email ,
        password : values.password
      }

      fetch(`${process.env.API_PATH}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          setShowLoader(false)
          if (res.status !== 200) {
            toast.error("error");
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data.success){
            createAuthCookie(data.data);
            // router.replace("/");
          }
          console.log(data);
        });



    },
    [router]
  );

  return (
    <>
      <div className='text-center text-[25px] font-bold mb-6'>ورود</div>
      {showLoader && < Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className='flex flex-col w-1/2 gap-4 mb-4'>
              <Input
                variant='bordered'
                label='Email'
                type='email'
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant='bordered'
                label='Password'
                type='password'
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant='flat'
              color='primary'>
              ورود
            </Button>
          </>
        )}
      </Formik>

      <div className='font-light text-slate-400 mt-4 text-sm'>
        اکانت ندارید ؟{" "}
        <Link href='/register' className='font-bold'>
          ثبت نام
        </Link>
      </div>
    </>
  );
};
