import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useUpdateProfileSettings } from "./useUpdateProfileSettings";
import toast from "react-hot-toast";

type FormValues = {
  income: string | undefined;
};

const UpdateUserSettingsForm: React.FC<{
  isLoading: boolean;
  settings: { [key: string]: string | undefined } | undefined;
}> = ({ isLoading, settings }) => {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>();
  const { errors } = formState;

  const updateProfileSettingsMutation = useUpdateProfileSettings(["income"]);

  const onSubmit = ({ income }: FormValues): void => {
    const updateProfileSettings = updateProfileSettingsMutation.mutateAsync(
      { income },
      {
        onSettled: () => {
          reset();
        },
      }
    );

    toast.promise(updateProfileSettings, {
      loading: "Updating settings",
      success: "Successfully updated settings",
      error: (e: Error) => e.message,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Row label="Taxable income/yr (£)" error={errors?.income?.message}>
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          title="Please enter a valid income (numbers only)"
          placeholder={isLoading ? "Loading..." : settings?.["income"] || ""}
          disabled={updateProfileSettingsMutation.isLoading}
          {...register("income", {
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: "Invalid number",
            },
          })}
        />
      </Form.Row>

      <Form.SubmissionRow>
        <Button
          type="reset"
          $size="large"
          $variation="secondary"
          onClick={() => reset()}
          disabled={updateProfileSettingsMutation.isLoading}
        >
          Reset
        </Button>

        <Button
          $size="large"
          disabled={updateProfileSettingsMutation.isLoading}
        >
          Update settings
        </Button>
      </Form.SubmissionRow>
    </Form>
  );
};

export default UpdateUserSettingsForm;
