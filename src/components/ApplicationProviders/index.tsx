import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../services/reactQueryClient";

type ApplicationProvidersProps = {
  children: React.ReactNode;
};

const ApplicationProviders: React.FC<ApplicationProvidersProps> = ({
  children,
}): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ApplicationProviders;
