"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@heroui/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useCallback, useState} from "react";
import {toast} from "react-toastify";
import {errorTO__handle} from "@/config/errorTO__handle";
import {Icon} from "@iconify/react";
import FadeIn from "react-fade-in";
import {GoogleLogin} from "@react-oauth/google";
import {Divider} from "@heroui/divider";
import {LineMdEmailPlusTwotone} from "@/components/v2/icons/EmailIcon";


export const Login = () => {
  const router = useRouter();
    const [pend, setPend] = useState(false)

  const initialValues: LoginFormType = {
    email: "admin@acme.com",
    password: "admin",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      // `values` contains email & password. You can use provider to connect user

        const newData = {
            username : values.email ,
            password:  values.password
        }

        setPend(true)





      fetch(`${process.env.API_PATH}/api/v1/auth/login` , {
          method : "POST" ,
          headers : {
            "content-type" : "Application/json"
          } ,
          body : JSON.stringify(newData)
      }).then(res => {
          setPend(false)
          if (res.ok){

              return res.json()
          }else {
            const error = errorTO__handle(res)
              toast.error(error)
          }



      })
          .then(data => {
              if (data?.success){

                  createAuthCookie(data.data);
                  router.replace("/");
              }else {
                  // toast.error("خطایی رخ داده!")
                  // return
              }
          })
    },
          [router]
  );
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
  return (
      <section className={"flex flex-col h-full w-full justify-center items-center"}>
          <div className={"grow flex flex-col justify-center w-1/3 "}>
              <FadeIn>
                  <div className='text-center text-[25px] font-bold mb-6'>ورود</div>

                  <Formik
                      initialValues={initialValues}
                      validationSchema={LoginSchema}
                      onSubmit={handleLogin}>
                      {({values, errors, touched, handleChange, handleSubmit}) => (
                          <>
                              <div className='flex flex-col  gap-4 mb-4'>
                                  <Input
                                      variant='bordered'
                                      label='ایمیل'
                                      type='email'
                                      endContent={
                                          <Icon icon="line-md:email" width="24" height="24"/>
                                      }
                                      value={values.email}
                                      isInvalid={!!errors.email && !!touched.email}
                                      errorMessage={errors.email}
                                      onChange={handleChange("email")}
                                  />

                                  <Input
                                      type={isVisible ? "text" : "password"}
                                      variant='bordered'
                                      label='رمز عبور'
                                      endContent={
                                          <button
                                              aria-label="toggle password visibility"
                                              className="focus:outline-none"
                                              type="button"
                                              onClick={toggleVisibility}
                                          >
                                              {isVisible ? (
                                                  <Icon icon="line-md:watch" width="24" height="24"/>
                                              ) : (
                                                  <Icon icon="line-md:watch-off" width="24" height="24"/>
                                              )}
                                          </button>
                                      }
                                      value={values.password}
                                      isInvalid={!!errors.password && !!touched.password}
                                      errorMessage={errors.password}
                                      onChange={handleChange("password")}
                                  />
                                  <Button
                                      onPress={() => handleSubmit()}
                                      isLoading={pend}
                                      variant='flat'
                                      className={"h-14"}
                                      endContent={
                                          <Icon icon="line-md:login" width="24" height="24"/>
                                      }
                                      color='primary'>
                                      ورود
                                  </Button>
                              </div>


                          </>
                      )}
                  </Formik>





                  <div className="flex items-center gap-4 py-2 mt-4 mb-4">
                      <Divider className="flex-1"/>
                      <p className="shrink-0 text-tiny text-default-500">یـا</p>
                      <Divider className="flex-1"/>
                  </div>


                  <GoogleLogin
                      onSuccess={credentialResponse => {
                          // console.log(credentialResponse);
                          // @ts-ignore

                          signUpGoogle(credentialResponse.credential)
                          // console.log(jwtDecode(credentialResponse.credential));
                      }}
                      onError={() => {
                          console.log('Login Failed');
                      }}
                  />

              </FadeIn>
          </div>


          <div className={'w-full'}>

              <FadeIn>
                  <div>
                      <Divider/>

                      <div className='font-light text-center bottom-10 text-slate-400 mt-4 text-sm'>
                          از قبل اکانت دارید؟{" "}
                          <Link href='/register' className='font-bold'>
                              ثبت نام
                          </Link>
                      </div>
                  </div>
              </FadeIn>
          </div>

      </section>

  );
};
