import { ThemeProvider } from '@/components/theme-provider';
import { useSearchParams } from 'react-router-dom';

import { FileDown, MoreHorizontal, Plus, Search } from 'lucide-react';
import { Button } from './components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Input } from './components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Header } from './components/header';
import { PaginationSection } from './components/pagination-section';
import { Checkbox } from './components/ui/checkbox';

export interface TagProps {
  first: number;
  prev: any;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Tag[];
}

export interface Tag {
  title: string;
  amountOfVideos: number;
  id: string;
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilter = searchParams.get('filter') ?? '';
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const [filter, setFilter] = useState(urlFilter);

  const { data: tagsData, isLoading } = useQuery<TagProps>({
    queryKey: ['get-tags', urlFilter, page],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/tags?_page=${page}&_per_page=10&title=${urlFilter}`,
      );
      const data = await response.json();

      return data;
    },
    placeholderData: keepPreviousData,
  });

  function handleFilter() {
    setSearchParams((params) => {
      params.set('page', '1')
      params.set('filter', filter)
      return params
    })
  }

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="py-10 space-y-8 max-w-6xl mx-auto">
        <Header />
        <main className="max-w-6xl mx-auto container space-y-5">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Tags</h1>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="space-x-2 rounded-full bg-teal-300 hover:bg-teal-500 text-teal-950 font-medium py-0"
                  size={'sm'}
                >
                  <Plus className="size-3" size={24} fontWeight={3} />
                  <p>create new</p>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center justify-between">
            <div className='flex flex-row gap-1 items-center'>
            <Input
              type="search"
              className="rounded-full w-72"
              placeholder="search samethings"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
            <Button onClick={handleFilter} className='rounded-full bg-neutral-800 text-white hover:bg-neutral-700' size={'icon'}>
              <Search/>
            </Button>
            </div>
            <Button size={'sm'} variant={'outline'} className="space-x-3">
              <FileDown size={16} />
              <p>Export</p>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Amount of videos</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tagsData?.data.map((value) => (
                <TableRow key={value.id}>
                  <TableCell className="font-medium">
                    <Checkbox id={value.id} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{value.title}</span>
                      <span className="text-xs text-neutral-500">{value.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="">{value.amountOfVideos} Video(s)</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className="size-4 mx-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {tagsData && (
            <PaginationSection
              pages={tagsData?.pages}
              items={tagsData?.items}
              page={page}
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
