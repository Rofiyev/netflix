"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { createAccountSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PinInput from "react-pin-input";

const CreateAccountForm = () => {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { name: "", pin: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof createAccountSchema>) => {
    console.log(values);
  };

  return (
    <>
      <h1 className="text-white text-center font-bold text-3xl">
        Create your account
      </h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    className="h-[56px] !rounded-md"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription className="text-neutral-500">
                  Your name is used to identify your account.
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <PinInput
                    length={4}
                    initialValue={field.value}
                    secret
                    disabled={isSubmitting}
                    secretDelay={200}
                    type="numeric"
                    onChange={(value: string) => field.onChange(value)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4,1fr)",
                      gap: "10px",
                    }}
                    inputStyle={{
                      borderColor: "RGBA(255,255,255,0.16)",
                      height: "56px",
                      width: "100%",
                      fontSize: "40px",
                      borderRadius: "6px",
                    }}
                    inputFocusStyle={{ borderColor: "RGBA(255,255,255,0.80)" }}
                    autoSelect
                  />
                </FormControl>
                <FormDescription className="text-neutral-500">
                  Your pin is used to identify your account.
                </FormDescription>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <Button
            className="w-full h-[56px] bg-red-700 hover:bg-red-600 flex justify-center items-center text-white mt-4"
            disabled={isSubmitting}
          >
            Create Account
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateAccountForm;
