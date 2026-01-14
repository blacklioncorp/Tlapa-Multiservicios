import { ContributorsClient } from "@/components/contributors/contributors-client";
import { mockContributors } from "@/lib/data";

export default function ContributorsPage() {
  const contributors = mockContributors;
  return <ContributorsClient contributors={contributors} />;
}
