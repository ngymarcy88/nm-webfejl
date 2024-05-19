export interface Torrent
{
    name: string;
    size: number;
    metric: string;
    link:string;
    username: string;
    owner?: string | undefined;
    date: any;
    description: string|undefined;
}