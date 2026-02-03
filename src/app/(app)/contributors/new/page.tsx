import { NewServiceAccountForm } from "@/components/contributors/new-service-account-form";

export default function NewContributorPage() {
    return (
        <div className="container py-6">
            <h1 className="text-2xl font-bold mb-6">Alta de Contribuyente / Cuenta</h1>
            <NewServiceAccountForm />
        </div>
    );
}
