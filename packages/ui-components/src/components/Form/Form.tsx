import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import { Field, Form as FormikForm, Formik, FormikHelpers } from 'formik';
import React from 'react';
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
      {() => (
        <FormikForm>
          {fields.map(formField => (
            <Field key={formField.id} name={formField.id}>
              {({ field, form }: { field: any; form: any }) => (
                <FormControl
                  isInvalid={
                    form.errors[formField.id] &&
                    (form.touched[formField.id] as boolean)
                  }
                >
                  <FormLabel>{formField.label}</FormLabel>
                  <Input
                    disabled={formField.disabled}
                    {...field}
                    type={formField.type}
                    id={formField.id}
                    placeholder={formField.placeholder}
                  />
                  <FormErrorMessage>
                    {form.errors[formField.id]}
                  </FormErrorMessage>
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
