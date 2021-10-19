import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import { Formik, Form as FormikForm, FormikHelpers, Field } from 'formik';
import Button from '../Button';

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
  submitText
}: FormProps<T>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <FormikForm>
          {fields.map((field, key) => (
            <Field key={key} name={field.id.toString()}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  key={field.id.toString()}
                  isInvalid={
                    form.errors[field.id] && (form.touched[field.id] as boolean)
                  }
                >
                  <FormLabel>{field.label}</FormLabel>
                  <Input
                    disabled={field.disabled}
                    {...field}
                    type={field.type}
                    id={field.id.toString()}
                    placeholder={field.placeholder}
                  />
                  <FormErrorMessage>{form.errors[field.id]}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          ))}
          <Button
            disabled={fields.some(f => f.disabled)}
            mt={4}
            // isLoading={isSubmitting}
            type="submit"
            label={submitText ?? 'Submit'}
          />
        </FormikForm>
      )}
    </Formik>
  );
}

export default Form;
