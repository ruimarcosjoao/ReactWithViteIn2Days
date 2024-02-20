import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { HeaderTags } from './header-tabs';

export function Header() {
  return (
    <nav className=" mx-auto max-w-6xl ">
      <div className='flex justify-between items-center h-12'>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row gap-2">
            <h1 className="text-lg text-teal-600 font-bold">Foro</h1>
            <Badge variant={'secondary'} className="rounded-full text-neutral-600">
              Beta
            </Badge>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <h5 className="">Novidades</h5>
            <Badge className="rounded-full bg-teal-900 text-teal-600">Pro</Badge>
            <ChevronDown size={18} />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <h5 className="">Ignite</h5>

            <ChevronDown size={18} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <h3 className="font-medium">Rui Marcos</h3>
            <p className="text-neutral-400 text-xs">ruimarcosjoao@gmail.com</p>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ChevronDown size={18} />
        </div>
      </div>
      <HeaderTags/>
    </nav>
  );
}
