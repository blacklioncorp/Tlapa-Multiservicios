"use client";

import { useState } from "react";
import type { Contributor } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddContributorForm } from "./add-contributor-form";
import { ImportContributors } from "./import-contributors";
import { ContributorsTable } from "./contributors-table";

type ContributorsClientProps = {
  contributors: Contributor[];
};

export function ContributorsClient({ contributors: initialContributors }: ContributorsClientProps) {
  const [contributors, setContributors] = useState<Contributor[]>(initialContributors);

  const handleAddContributor = (newContributor: Omit<Contributor, 'id' | 'fechaRegistro'>) => {
    const contributor: Contributor = {
      ...newContributor,
      id: `C${contributors.length + 1}`,
      fechaRegistro: new Date().toISOString().split('T')[0],
    };
    setContributors(prev => [...prev, contributor]);
  };
  
  const handleImportContributors = (newContributors: Contributor[]) => {
    setContributors(prev => [...prev, ...newContributors]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Lista de Contribuyentes</CardTitle>
                    <CardDescription>
                        Aquí puedes ver y buscar todos los contribuyentes registrados en el sistema.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ContributorsTable contributors={contributors} />
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                     <CardTitle className="font-headline">Gestionar Contribuyentes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="manual">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="manual">Añadir Manualmente</TabsTrigger>
                            <TabsTrigger value="import">Importar</TabsTrigger>
                        </TabsList>
                        <TabsContent value="manual">
                           <AddContributorForm onAddContributor={handleAddContributor} />
                        </TabsContent>
                        <TabsContent value="import">
                            <ImportContributors onImport={handleImportContributors} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
