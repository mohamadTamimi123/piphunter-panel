"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { RegisterSchema } from "@/helpers/schemas";
import { RegisterFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from 'react';
import { toast } from "react-toastify";
import Spiner from '@/components/spiner/Spiner';
import Loader from '@/components/spiner/Spiner';

export const Register = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);

  const initialValues: RegisterFormType = {
    name: "Acme",
    email: "admin@acme.com",
    password: "admin",
    confirmPassword: "admin",
  };
  const notify = () => toast("Wow so easy!");
  const handleRegister = useCallback(
    async (values: RegisterFormType) => {

      console.log(values)
      setShowLoader(true)

      const data = {
        username : values.email ,
        password : values.password
      }

      fetch(`${process.env.API_PATH}/api/v1/auth/register`, {
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
            router.replace("/");
          }
          console.log(data);
        });



    },
    [router]
  );

  return (
    <>
      <div className='text-center text-[25px] font-bold mb-6'>ثبت نام</div>
      {showLoader && < Loader />}
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <>
            <div className='flex flex-col w-1/2 gap-4 mb-4'>

              <Input
                variant='bordered'
                label='ایمیل'
                type='email'
                value={values.email}
                isInvalid={!!errors.email && !!touched.email}
                errorMessage={errors.email}
                onChange={handleChange("email")}
              />
              <Input
                variant='bordered'
                label='رمز عیور'
                type='password'
                value={values.password}
                isInvalid={!!errors.password && !!touched.password}
                errorMessage={errors.password}
                onChange={handleChange("password")}
              />
              <Input
                variant='bordered'
                label='تکرار رمز عیور'
                type='password'
                value={values.confirmPassword}
                isInvalid={
                  !!errors.confirmPassword && !!touched.confirmPassword
                }
                errorMessage={errors.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant='flat'
              color='primary'>
              ثبت نام
            </Button>
          </>
        )}
      </Formik>

      <div className='font-light text-slate-400 mt-4 text-sm'>
        اکانت ثیت شده دارید ؟{" "}
        <Link href='/login' className='font-bold'>
        ورود
        </Link>
      </div>
    </>
  );
};
