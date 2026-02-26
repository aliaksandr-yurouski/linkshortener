import { auth } from '@clerk/nextjs/server';
import { getLinksByUserId } from '@/data/links';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CreateLinkDialog } from './create-link-dialog';
import { EditLinkDialog } from './edit-link-dialog';
import { DeleteLinkDialog } from './delete-link-dialog';
import { createLinkAction, updateLinkAction, deleteLinkAction } from './actions';

export default async function DashboardPage() {
  const { userId } = await auth();
  const links = await getLinksByUserId(userId!);

  return (
    <main className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>My Links</CardTitle>
          <CreateLinkDialog createLink={createLinkAction} />
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <p className="text-muted-foreground text-sm">No links yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Short slug</TableHead>
                  <TableHead>Original URL</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell>
                      <a
                        href={`/l/${link.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Badge variant="secondary" className="cursor-pointer hover:opacity-80">{link.slug}</Badge>
                      </a>
                    </TableCell>
                    <TableCell className="max-w-sm truncate">
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {link.originalUrl}
                      </a>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {link.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <EditLinkDialog link={link} updateLink={updateLinkAction} />
                        <DeleteLinkDialog link={link} deleteLink={deleteLinkAction} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
