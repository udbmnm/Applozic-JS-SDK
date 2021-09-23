import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Formik, Form as FormikForm, FormikHelpers, Field } from "formik";
import Button from "../Button";

export interface FormProps<T> {
  /**
   * intialValues
   */
  initialValues: T;
  /**
   * Yup based validation schema contents
   */
  validationSchema?: any;
  onSubmit: ((
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<any>) &
    ((values: T, actions: FormikHelpers<T>) => void);
  fields: {
    id: keyof T;
    label: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
  }[];
  submitText?: string;
}

function Form<T>({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitText,
}: FormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <FormikForm>
          {fields.map((ffield) => (
            <Field name={ffield.id.toString()}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  key={ffield.id.toString()}
                  isInvalid={
                    form.errors[ffield.id] &&
                    (form.touched[ffield.id] as boolean)
                  }
                >
                  <FormLabel>{ffield.label}</FormLabel>
                  <Input
                    disabled={ffield.disabled}
                    {...field}
                    type={ffield.type}
                    id={ffield.id.toString()}
                    placeholder={ffield.placeholder}
                  />
                  <FormErrorMessage>{form.errors[ffield.id]}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          ))}
          <Button
            disabled={fields.some((f) => f.disabled)}
            mt={4}
            // isLoading={isSubmitting}
            type="submit"
            label={submitText ?? "Submit"}
          />
        </FormikForm>
      )}
    </Formik>
  );
}

export default Form;
