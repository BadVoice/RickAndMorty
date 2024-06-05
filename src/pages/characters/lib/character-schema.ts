import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { type FormContext, useForm } from 'vee-validate';

export function useCharacterForm(): {
  form: FormContext<any, {}>;
} {
  const schema = toTypedSchema(
    z.object({
     
    }),
  );

  const form = useForm({
    validationSchema: schema,
  });

  return {
    form,
  };
}
