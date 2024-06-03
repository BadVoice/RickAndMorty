import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { type FormContext, useForm } from 'vee-validate';

export function useCharacterForm(): {
  form: FormContext<any, {}>;
} {
  const schema = toTypedSchema(
    z.object({
      name: z.string({ required_error: 'Введите почту' }).optional(),
      phone: z.string({ required_error: 'Введите телефон' }).optional(),
      email: z.string({ required_error: 'Введите почту' }).optional(),
    }),
  );

  const form = useForm({
    validationSchema: schema,
  });

  return {
    form,
  };
}
