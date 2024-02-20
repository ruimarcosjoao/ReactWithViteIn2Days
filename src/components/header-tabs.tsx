import { Code2, ListVideo, Settings, Tags } from "lucide-react";
import { Badge } from "./ui/badge";

export function HeaderTags() {
    return (
        <div className="w-full py-4 flex flex-row gap-6">
            <Badge variant={'secondary'} className="space-x-2">
                <ListVideo size={18}/>
                <p>Uploads</p>
            </Badge>
            <Badge variant={'outline'} className="space-x-2">
                <Tags size={18}/>
                <p>Tags</p>
            </Badge>
            <Badge variant={'outline'} className="space-x-2">
                <Settings size={18}/>
                <p>Settings</p>
            </Badge>
            <Badge variant={'outline'} className="space-x-2">
                <Code2 size={18}/>
                <p>DEvelopers</p>
            </Badge>
        </div>
    )
}