"use client";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { schema } from "@/components/validationSchema";
import { FORM_FIELDS } from "@/components/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/lib/utils";

interface MyFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date | null;
  acceptTermsAndConditions: boolean;
}

export default function Home() {
  const methods = useForm<MyFormInput>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: MyFormInput) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Форма відправлена",
      description: "Ваші дані були успішно відправлені.",
    });
    reset();
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, errors },
    register,
  } = methods;

  return (
    <main className="flex items-center justify-center min-h-screen py-8 px-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Форма реєстрації
            </CardTitle>
            <CardDescription className="text-gray-600">
              Введіть ваші дані для реєстрації
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="firstName" className="text-lg font-medium">
                      Ваше ім'я
                    </Label>
                    <Input
                      {...register(FORM_FIELDS.FIRST_NAME)}
                      placeholder="Введіть ваше ім'я"
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        <span>{errors.firstName.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="lastName" className="text-lg font-medium">
                      Ваше прізвище
                    </Label>
                    <Input
                      {...register(FORM_FIELDS.LAST_NAME)}
                      placeholder="Введіть ваше прізвище"
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        <span>{errors.lastName.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="email" className="text-lg font-medium">
                      Email
                    </Label>
                    <Input
                      {...register(FORM_FIELDS.EMAIL)}
                      placeholder="Введіть ваш email"
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        <span>{errors.email.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-1">
                    <Label htmlFor="password" className="text-lg font-medium">
                      Пароль
                    </Label>
                    <Input
                      type="password"
                      {...register(FORM_FIELDS.PASSWORD)}
                      placeholder="Введіть ваш пароль"
                      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        <span>{errors.password.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <FormField
                    control={methods.control}
                    name="acceptTermsAndConditions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-300 p-4 w-auto">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>

                        <Label
                          htmlFor="acceptTermsAndConditions"
                          className="text-sm"
                        >
                          Погоджуюсь з умовами
                        </Label>
                        {errors.acceptTermsAndConditions && (
                          <p className="text-red-500 text-sm">
                            {errors.acceptTermsAndConditions.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1">
                      <FormLabel className="text-lg font-medium">
                        Дата народження
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-gray-500"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Оберіть дату</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value ?? undefined}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.birthDate && (
                        <p className="text-red-500 text-sm">
                          <span>{errors.birthDate.message}</span>
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="outline"
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!isDirty || !isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Відправити"
                  )}
                </Button>
              </form>
            </FormProvider>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={() => reset()}
                className="py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                disabled={!isDirty}
              >
                Reset
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
