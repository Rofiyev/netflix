"use client";

import { Dispatch, FC, SetStateAction } from "react";
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
import axios from "axios";
import { AccountResponse, IAccount } from "@/types";
import useModal from "@/zustand/modal";
import { toast } from "../ui/use-toast";
import Loading from "../Loading";

interface Props {
  uid: string;
  accounts: IAccount[];
  setAccounts: Dispatch<SetStateAction<IAccount[]>>;
}

const CreateAccountForm: FC<Props> = ({ uid, accounts, setAccounts }) => {
  const { setOpen } = useModal();
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: { name: "", pin: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof createAccountSchema>) => {
    try {
      const { data } = await axios.post<AccountResponse>("/api/account", {
        ...values,
        uid,
      });
      if (data.success) {
        setAccounts([...accounts, data.data as IAccount]);
        setOpen(false);
        form.reset();
        return toast({
          title: data.message,
          description: "Your account has been created successfully!",
        });
      } else {
        return toast({
          title: data.message,
          description: "You cannot create an account that already exists!",
          variant: "destructive",
        });
      }
    } catch (error) {
      return toast({
        title: "Error creating",
        description: "An error occurred while creating your account!",
        variant: "destructive",
      });
    }
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
            {isSubmitting && <Loading className="ml-2" />}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateAccountForm;
